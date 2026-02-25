---
trigger: always_on
---

# Workspace Governance — Anclora Azure Bay Landing (SDD)

## Jerarquía normativa

1. `.agent/rules/workspace-governance.md`
2. `sdd/core/constitution-canonical.md`
3. `sdd/core/product-spec-v0.md`
4. `sdd/core/spec-core-v1.md`
5. `sdd/features/<feature>/*`
6. `.agent/skills/**/SKILL.md`
7. `.antigravity/prompts/**`

Si hay conflicto, gana el nivel superior.

## Regla Core vs Feature

- El core no se altera de forma implícita por una feature.
- Si una feature necesita tocar core, crear nueva versión de spec en `sdd/core` y registrar en `sdd/core/CHANGELOG.md`.

## Flujo SDD obligatorio

1. Definir spec de feature (`spec-<feature>-v1.md`).
2. Definir plan de pruebas (`test-plan-v1.md`).
3. Implementar incrementalmente.
4. Ejecutar `npm run -s lint`, `npm run -s test`, `npm run -s build`.
5. Ejecutar Lighthouse (mobile + desktop) cuando afecte UI/render.
6. Cerrar con gate final en prompts.

## QA/Gate mínimo

- Sin errores P0 en UX (solapes, overflow, navegación rota).
- Sin regresión A11y (nombres accesibles, contraste, heading order).
- Sin regresión de performance en mobile en secciones críticas (hero/nav).
- No dejar scripts temporales o artefactos de debug en el repo.

## Política de cambios

- No modificar archivos generados automáticamente salvo necesidad real.
- No introducir dependencias nuevas sin justificar coste de bundle.
- Todo cambio de UI debe documentar impacto esperado en Lighthouse.

