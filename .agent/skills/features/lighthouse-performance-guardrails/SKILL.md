# SKILL: Lighthouse Performance Guardrails

## Cuándo usar

- Cualquier cambio que afecte hero, navegación, tipografías, imágenes o scripts de terceros.

## Objetivo

Mantener `Performance` de Lighthouse en 100 (o recuperar rápidamente tras regresión).

## Checklist

1. Identificar LCP real del informe JSON.
2. Asegurar prioridad y compresión del recurso LCP.
3. Eliminar retrasos artificiales de render (animaciones de entrada bloqueantes).
4. Diferir JS no crítico (`lazyOnload`, carga condicional, dynamic import).
5. Reducir trabajo en main thread en first load.
6. Validar `lint`, `test`, `build`.
7. Re-ejecutar Lighthouse desktop/mobile y comparar.

## Guardrails

- No degradar UX premium por micro-ganancias sin validación visual.
- No introducir hacks no mantenibles.
