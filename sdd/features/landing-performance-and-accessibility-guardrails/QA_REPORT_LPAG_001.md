# QA Report — LPAG_001

Feature: `landing-performance-and-accessibility-guardrails`  
Estado: PASS

## Scope verificado

- Guardrail ejecutable de Lighthouse para reports JSON.
- Guardrail global de movimiento reducido para limitar coste de animaciones.

## Evidencias técnicas

- `npm run -s lint` ✅
- `npm run -s test` ✅
- `npm run -s build` ✅

## Artefactos implementados

- `scripts/lighthouse-kpi-gate.mjs`
- `package.json` (`check:lighthouse`)
- `app/globals.css` (media query `prefers-reduced-motion`)

## Riesgos residuales

- El gate de Lighthouse depende de reports externos limpios (sin ruido de extensiones del navegador).
