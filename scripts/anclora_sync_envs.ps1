<#
.SYNOPSIS
  Sincronizador universal multi-entorno para repos Anclora y derivados.

.DESCRIPTION
  Sincroniza las ramas canónicas:
    development → staging → production → main
  Detecta diferencias (ahead/behind), ejecuta merges seguros (--no-edit),
  y evita sobrescribir cambios ajenos. Totalmente genérico y portable.

.EXAMPLES
  ./scripts/anclora_sync_envs.ps1 -Mode Auto
  ./scripts/anclora_sync_envs.ps1 -Mode StagingToProduction
#>

param(
  [Parameter(Mandatory = $false)]
  [ValidateSet("Auto", "FullSync", "DevToStaging", "StagingToProduction", "ProductionToMain")]
  [string]$Mode = "Auto",

  [Parameter(Mandatory = $false)]
  [switch]$Force
)

Write-Host "`n⚓ ANCLORA SYNC ENVS - Universal Branch Synchronizer" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────────────────────" -ForegroundColor DarkGray

# --- 1️⃣ Detección robusta de ramas ---
$branches = git branch -r | ForEach-Object { $_.Trim() }

function Detect-Branch($patterns) {
  foreach ($p in $patterns) {
    $match = $branches | Where-Object { $_ -match "origin/$p$" }
    if ($match) { return $p }
  }
  return $null
}

$devBranch = Detect-Branch @("development")
$stagingBranch = Detect-Branch @("staging")
$prodBranch = Detect-Branch @("production")
$mainBranch = Detect-Branch @("main", "master")

Write-Host "📦 Ramas detectadas:"
Write-Host "  Dev:     $devBranch"
Write-Host "  Staging: $stagingBranch"
Write-Host "  Prod:    $prodBranch"
Write-Host "  Main:    $mainBranch"

if (-not $devBranch -or -not $stagingBranch -or -not $prodBranch -or -not $mainBranch) {
  Write-Host "❌ Faltan ramas esenciales (development/staging/production/main)." -ForegroundColor Red
  exit 1
}

# --- 2️⃣ Función para sincronizar dos ramas ---
function Sync-Branches($from, $to) {
  Write-Host "`n🔄 Sincronizando $from → $to..." -ForegroundColor Yellow

  git fetch origin
  git checkout $to
  git pull origin $to

  $status = git rev-list --left-right --count origin/$from...origin/$to
  $ahead, $behind = $status -split "`t"; $ahead = [int]$ahead; $behind = [int]$behind

  if ($ahead -eq 0 -and $behind -eq 0) {
    Write-Host "✅ $from y $to ya están sincronizadas." -ForegroundColor Green
    return
  }

  git merge origin/$from --no-edit
  if ($LASTEXITCODE -eq 0) {
    git push origin $to
    Write-Host "✔️ $to actualizado desde $from." -ForegroundColor Green
  } else {
    Write-Host "⚠️ Conflictos detectados entre $from y $to — resolver manualmente." -ForegroundColor Red
  }
}

# --- 3️⃣ Ejecución por modo ---
switch ($Mode) {
  "Auto" { $Mode = "FullSync" }
  "FullSync" {
    Sync-Branches $devBranch $stagingBranch
    Sync-Branches $stagingBranch $prodBranch
    Sync-Branches $prodBranch $mainBranch
  }
  "DevToStaging"      { Sync-Branches $devBranch $stagingBranch }
  "StagingToProduction" { Sync-Branches $stagingBranch $prodBranch }
  "ProductionToMain"  { Sync-Branches $prodBranch $mainBranch }
}

Write-Host "`n🏁 Sincronización completada correctamente." -ForegroundColor Cyan