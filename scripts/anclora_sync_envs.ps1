<#
.SYNOPSIS
  Sincronizador universal multi-entorno para repos Anclora y derivados.

.DESCRIPTION
  Sincroniza las ramas canónicas:
    development → staging → production → main
  Usa EXCLUSIVAMENTE fast-forward de referencia (sin merge, sin commits
  sintéticos, sin --force). Si el destino no es ancestro directo del origen,
  falla ruidosamente y NO toca la rama.

.EXAMPLES
  ./scripts/anclora_sync_envs.ps1 -Mode Auto
  ./scripts/anclora_sync_envs.ps1 -Mode StagingToProduction
#>

param(
  [Parameter(Mandatory = $false)]
  [ValidateSet("Auto", "FullSync", "DevToStaging", "StagingToProduction", "ProductionToMain")]
  [string]$Mode = "Auto"
)

$ErrorActionPreference = "Stop"

Write-Host "`n⚓ ANCLORA SYNC ENVS - Universal Branch Synchronizer (fast-forward only)" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────────────────────" -ForegroundColor DarkGray

git fetch origin
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ git fetch origin falló." -ForegroundColor Red
  exit 1
}

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

# --- 2️⃣ Función para sincronizar dos ramas (fast-forward de referencia only) ---
function Sync-Branches($from, $to) {
  Write-Host "`n🔄 Sincronizando $from → $to..." -ForegroundColor Yellow

  git rev-parse --verify --quiet "origin/$from" | Out-Null
  if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ origin/$from no existe." -ForegroundColor Red
    return $false
  }
  git rev-parse --verify --quiet "origin/$to" | Out-Null
  if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ origin/$to no existe." -ForegroundColor Red
    return $false
  }

  $fromSha = git rev-parse "origin/$from"
  $toSha = git rev-parse "origin/$to"

  if ($fromSha -eq $toSha) {
    Write-Host "✅ $from y $to ya están sincronizadas ($toSha)." -ForegroundColor Green
    return $true
  }

  # ¿$to es ancestro directo de $from? Si no, hay commits en $to que $from no
  # tiene (divergencia real) — no se puede avanzar por fast-forward.
  git merge-base --is-ancestor "origin/$to" "origin/$from"
  if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ $to NO es ancestro de $from — ramas divergentes. Fast-forward imposible. Resolver manualmente (no se realiza merge/rebase/force automático)." -ForegroundColor Red
    return $false
  }

  # Ref-update sin --force: Git rechaza el push si no es fast-forward real,
  # lo cual es una segunda barrera de seguridad además del check anterior.
  git push origin "origin/${from}:refs/heads/${to}"
  if ($LASTEXITCODE -eq 0) {
    Write-Host "✔️ $to avanzado a $fromSha (fast-forward, sin commits nuevos)." -ForegroundColor Green
    return $true
  } else {
    Write-Host "❌ Fast-forward de $to hacia $from falló (rechazado por remoto)." -ForegroundColor Red
    return $false
  }
}

# --- 3️⃣ Ejecución por modo ---
$ok = $true
switch ($Mode) {
  "Auto" { $Mode = "FullSync" }
  "FullSync" {
    $ok = (Sync-Branches $devBranch $stagingBranch)
    if ($ok) { $ok = (Sync-Branches $stagingBranch $prodBranch) }
    if ($ok) { $ok = (Sync-Branches $prodBranch $mainBranch) }
  }
  "DevToStaging"      { $ok = (Sync-Branches $devBranch $stagingBranch) }
  "StagingToProduction" { $ok = (Sync-Branches $stagingBranch $prodBranch) }
  "ProductionToMain"  { $ok = (Sync-Branches $prodBranch $mainBranch) }
}

if (-not $ok) {
  Write-Host "`n❌ Sincronización interrumpida — un paso falló. No se ejecutan pasos posteriores." -ForegroundColor Red
  exit 1
}

Write-Host "`n🏁 Sincronización completada correctamente." -ForegroundColor Cyan
exit 0
