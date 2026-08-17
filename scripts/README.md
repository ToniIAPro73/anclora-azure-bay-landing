# ⚓ ANCLORA DEV SHELL — SCRIPTS DE SINCRONIZACIÓN Y PROMOCIÓN

> 📦 Versión: **v2.2 (Noviembre 2025)**  
> 👨‍💻 Autor: **Antonio Ballesteros Alonso (Toni)**  
> 🧭 Propósito: Automatizar y asegurar la sincronización total entre ramas del ecosistema Anclora  
> 🌊 Framework: **Anclora Dev Shell**

---

## 🧠 1. VISIÓN GENERAL

El ecosistema Anclora gestiona cuatro ramas canónicas sincronizadas de forma continua:

| Rama          | Propósito           | Descripción                                                               |
| ------------- | -------------------- | -------------------------------------------------------------------------- |
| `development` | Desarrollo activo    | Rama de trabajo principal donde se crean y prueban nuevas funcionalidades |
| `staging`     | Pre-producción       | Entorno de validación antes del despliegue final                          |
| `production`  | Producción           | Código verificado, desplegado y validado públicamente                     |
| `main`        | Baseline verificado  | Última producción verificada (rama base usada por Vercel)                 |

Flujo canónico: `development → staging → production → main`.

El script activo para esta sincronización es **`anclora_sync_envs.ps1`**
(invocado por `.github/workflows/anclora_auto_sync.yml`). **`promote.ps1` es
legacy/deprecated** (ver sección 9-bis) — no usarlo para promoción rutinaria.

---

## 🧩 2. SCRIPT LEGACY — `promote.ps1` (DEPRECATED)

> ⚠️ **DEPRECATED.** `promote.ps1` no tiene consumidor activo en CI y su modo `full`
> usa `git reset --hard`, `push --force-with-lease`, `branch -D` y `pull --rebase`
> sobre la jerarquía obsoleta `development → main → preview → production`. Está
> bloqueado con un guard (`ANCLORA_ALLOW_LEGACY_PROMOTE`) salvo en modos de solo
> lectura (`report`, `scan`, `dry-run`). La promoción canónica activa
> (`development → staging → production → main`) la ejecuta el workflow de GitHub
> Actions junto con `anclora_sync_envs.ps1`. La descripción funcional a
> continuación documenta el comportamiento histórico del script, no el flujo
> recomendado actual.

### 🧭 Descripción funcional

`promote.ps1` sincroniza de forma segura todas las ramas clave de Anclora:

- Detecta cuál rama tiene el commit más reciente.
- Valida el estado de todas las ramas locales y remotas.
- Propaga la versión correcta al resto.
- Garantiza que al final todas compartan el mismo **commit HEAD**.

### ⚙️ Características principales

| Funcionalidad                           | Descripción                                                                   |
| --------------------------------------- | ----------------------------------------------------------------------------- |
| 🔍 **Detección automática**             | Identifica la rama más reciente según la fecha del último commit              |
| 🧱 **Validación de estado local**       | Comprueba si hay cambios sin commit y ofrece crear un backup automático       |
| 🌐 **Check remoto avanzado**            | Detecta commits locales no subidos y divergencias remotas                     |
| 🧠 **Prevención de conflictos**         | Aborta la ejecución si detecta conflictos de merge o divergencias simultáneas |
| 🧩 **Verificación post-sincronización** | Confirma que todas las ramas compartan el mismo hash final                    |
| 🧪 **Modo Dry-Run (simulación)**        | Simula toda la ejecución sin modificar el repositorio                         |
| 📜 **Logging detallado**                | Crea un registro completo de cada sesión en `/logs/`                          |
| 💾 **Backup automático opcional**       | Crea un commit temporal si existen cambios sin guardar                        |
| 🧭 **Compatibilidad inteligente**       | Funciona con repos que usan `main` o `master` como rama principal             |

---

## ⚡ 3. USO BÁSICO

### 🔹 Ejecución estándar

```powershell
./scripts/promote.ps1
```

### 🔹 Modo simulación (sin cambios reales)

```powershell
./scripts/promote.ps1 -DryRun
```

Durante la ejecución:

- Muestra la **rama fuente** (la más reciente).
- Informa el **hash y la fecha del último commit**.
- Solicita confirmación antes de sincronizar.
- Propaga la versión aprobada a todas las demás ramas.
- Verifica que los hashes queden idénticos al finalizar.

---

## 🧱 4. ESCENARIOS GESTIONADOS

| Escenario                     | Comportamiento del script                                                 |
| ----------------------------- | ------------------------------------------------------------------------- |
| 📁 Cambios locales sin commit | Pregunta si deseas crear un commit de respaldo automático                 |
| 🚀 Commits locales sin push   | Detecta y ofrece hacer `git push` automáticamente                         |
| 🔄 Divergencia local/remoto   | Detiene el proceso con aviso claro para evitar sobrescritura              |
| ⚔️ Conflicto de merge         | Aborta y solicita resolución manual antes de continuar                    |
| 🧭 Detección `main/master`    | Adapta la lista de ramas al entorno                                       |
| ✅ Verificación final         | Compara los hashes de todas las ramas remotas                             |
| 📜 Logging                    | Guarda una copia completa de la sesión en `/logs/promote_<timestamp>.txt` |
| 🧩 Auditoría segura           | Permite rastrear el historial de todas las sincronizaciones               |
| 🔬 Dry-Run                    | Simula el proceso completo sin modificar ramas                            |

---

## 🧠 5. DETALLES TÉCNICOS DE PROTECCIÓN

El script implementa una serie de **validaciones automáticas** antes de actuar:

### 5.1. Validación de entorno

- Comprueba que existan las ramas configuradas (`development`, `main/master`, `preview`, `production`).
- Actualiza referencias (`git fetch --all`).
- Rechaza la ejecución si el repositorio no está limpio (`git status --porcelain` ≠ vacío).

### 5.2. Comprobación de commits ahead/behind

Usa `git rev-list --left-right --count` para identificar si:

- Hay commits locales no subidos.
- Hay commits en remoto que no están localmente.

### 5.3. Prevención de sobrescritura

Si una rama contiene commits únicos, el script:

1. Muestra advertencia clara.
2. Solicita confirmación.
3. Detiene ejecución si se niega o si la divergencia requiere revisión manual.

### 5.4. Gestión de conflictos

Durante el merge:

- Si `git merge` devuelve código ≠ 0, se interrumpe el proceso.
- El usuario recibe un mensaje:

  ```bash
  ❌ Conflicto detectado al fusionar 'production' → 'main'. Corrige manualmente.
  ```

### 5.5. Registro de sesión (Logging)

- Cada ejecución genera un archivo `/logs/promote_<timestamp>.txt`.
- Incluye todos los pasos, decisiones y confirmaciones.
- Facilita auditoría y trazabilidad en caso de error.

---

## 🧩 6. FLUJO DE TRABAJO RECOMENDADO (canónico, activo)

### 🔹 Escenario normal (desarrollo → producción)

1. Trabaja siempre sobre `development`.
2. Al hacer push a `development`, el workflow `anclora_auto_sync.yml` ejecuta
   `anclora_sync_envs.ps1 -Mode FullSync`, propagando de forma segura:

   `development → staging → production → main`

3. Verifica en GitHub que todas las ramas comparten el mismo commit HEAD.
4. Despliega en Vercel (rama `production` o `main` según entorno).

---

### 🔹 Escenario alternativo (promoción manual por entorno)

```powershell
./scripts/anclora_sync_envs.ps1 -Mode DevToStaging
./scripts/anclora_sync_envs.ps1 -Mode StagingToProduction
./scripts/anclora_sync_envs.ps1 -Mode ProductionToMain
```

> Nota: `promote.ps1` (sección 2) es legacy/deprecated y no forma parte de este flujo.

---

## 📜 7. EJEMPLO DE SALIDA (histórico — `promote.ps1` legacy, jerarquía obsoleta)

```sql
⚓ ANCLORA DEV SHELL — PROMOTE FULL v2.2
🔄 Actualizando referencias remotas...

🧭 Último commit detectado:
   → Rama: development
   → Hash: fc88df6
   → Fecha: 12/11/2025 23:59

¿Deseas usar 'development' como fuente y sincronizar las demás? (S/N): S

🔁 Sincronizando 'main' con 'development'...
🔁 Sincronizando 'preview' con 'development'...
🔁 Sincronizando 'production' con 'development'...

✅ Todas las ramas están perfectamente sincronizadas.
🏁 Log guardado en /logs/promote_2025-11-12_23-59-00.txt
```

---

## 🧩 8. ESTRUCTURA DE CARPETAS

```bash
scripts/
│
├── promote.ps1             # [DEPRECATED] legacy, sin consumidor activo en CI
├── anclora_git_recover.ps1 # [DEPRECATED] legacy interactivo, superseded por *_cli.ps1
├── anclora_git_recover_cli.ps1 # Recuperación activa (usada por anclora_auto_recover.yml)
├── anclora_sync_envs.ps1   # Sincronización activa (usada por anclora_auto_sync.yml)
├── README.md               # Este documento
│
└── logs/
    ├── promote_2025-11-12_23-59-00.txt
    ├── promote_2025-11-13_00-20-02.txt
    └── ...
```

---

## 🧱 9. MANTENIMIENTO FUTURO

| Tarea                             | Frecuencia             | Descripción                                                           |
| --------------------------------- | ---------------------- | --------------------------------------------------------------------- |
| 🧹 Limpieza de logs               | Mensual                | Eliminar logs antiguos si superan los 50 MB                           |
| 🧭 Revisión de ramas              | Trimestral             | Validar que no existan ramas huérfanas o duplicadas                   |
| ⚙️ Actualización de `anclora_sync_envs.ps1` | Según cambios en flujo | Reajustar arrays de ramas si se añaden nuevas (ej. `beta`) |
| 🧪 Test en modo Dry-Run           | Antes de cada refactor | Verificar comportamiento sin modificar repositorio                    |

---

## 🧭 10. MODOS ESPECIALES

### 🔬 Dry-Run (simulación completa)

Permite ejecutar el flujo sin tocar el repositorio:

```powershell
./scripts/promote.ps1 -DryRun
```

Muestra qué ramas serían sincronizadas, los hashes actuales y las acciones previstas,
pero **no ejecuta merges ni pushes**.

### 🧱 Auto-Backup temporal

Si hay cambios sin commit, el script ofrece:

```scss
¿Deseas crear un backup automático antes de continuar? (S/N)
```

Y si se acepta:

```bash
🧩 Backup automático previo a promote full (2025-11-12_23-55-00)
```

creando un commit temporal antes de cualquier merge.

---

## 🧩 11. FALLBACK Y RECUPERACIÓN

En caso de error o corrupción:

1. Ejecutar `anclora_git_recover_cli.ps1 -Mode DevToStaging|StagingToProduction|ProductionToMain`
   para restaurar la rama afectada al último estado válido (`anclora_git_recover.ps1` interactivo
   es legacy/deprecated — ver sección 8).
2. Consultar el log más reciente en `/scripts/logs/`.
3. Reintentar la sincronización con `anclora_sync_envs.ps1` una vez resuelto el conflicto manualmente.

---

## 📘 12. REFERENCIAS TÉCNICAS

- [Git rev-list — Documentación oficial](https://git-scm.com/docs/git-rev-list)
- [Git merge — Documentación oficial](https://git-scm.com/docs/git-merge)
- [PowerShell Transcript — Logging](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.host/start-transcript)
- [Vercel — Git Integration](https://vercel.com/docs/git/vercel-for-git)

---

## 🌊 13. CIERRE

Este sistema de sincronización garantiza que todas las ramas de un proyecto Anclora
mantengan coherencia total, minimizando errores humanos, conflictos y divergencias entre entornos.

> “El verdadero orden no se impone, se automatiza.” — _Anclora Dev Shell_

---

© 2025 — **Anclora Technologies**
Arquitectura y Automatización por **Antonio Ballesteros Alonso (Toni)**
