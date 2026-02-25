---
trigger: always_on
---

# Anclora Azure Bay Landing — Project Rules

## Identidad

Repositorio de portfolio premium inmobiliario orientado a conversión, credibilidad visual y excelencia técnica.

## Objetivo operativo

Cada cambio debe proteger simultáneamente:

1. Experiencia visual premium.
2. Rendimiento (Lighthouse).
3. Accesibilidad real.
4. Mantenibilidad del código.

## Jerarquía normativa

1. `.agent/rules/workspace-governance.md`
2. `README.md` y documentación técnica vigente del repo.
3. `sdd/core/*`.
4. `sdd/features/<feature>/*`.

## Reglas inmutables

1. No introducir datos reales de clientes o propiedades sensibles.
2. No romper la narrativa visual del sector lujo-inmobiliario.
3. Cada feature nueva debe pasar `lint`, `test` y `build`.
4. No mergear cambios con regresión de Lighthouse sin justificación y plan de recuperación.
5. Mantener i18n coherente (`es`/`en`) cuando se toque texto visible.

## Guardrails Lighthouse (obligatorio)

### Performance

- Preservar LCP del hero: evitar animaciones que oculten contenido crítico durante first paint.
- Imágenes above-the-fold con prioridad explícita y compresión adecuada.
- Evitar JS no crítico en carga inicial; diferir scripts secundarios.
- No añadir librerías pesadas sin justificación y medición.

### Accessibility

- Prohibido `label-content-name-mismatch`.
- Contraste mínimo WCAG AA en CTAs y textos funcionales.
- Jerarquía de headings secuencial (`h1 -> h2 -> h3`).

### SEO / Best Practices

- Mantener metadatos, canonical y OpenGraph consistentes.
- Evitar recursos bloqueantes innecesarios en first load.

## Definition of Done por feature

- Código implementado.
- Tests y checks locales en verde.
- Evidencia de impacto (antes/después) en KPIs si afecta al render inicial.
- Documento SDD de la feature actualizado.

