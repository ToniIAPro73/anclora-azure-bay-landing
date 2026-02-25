# SKILL: Lead Capture Reliability and Trust

## Cuándo usar

- Cambios en formularios de contacto, validación, anti-bot, envío de leads y estados de feedback al usuario.

## Objetivo

Aumentar fiabilidad de captura de leads sin sacrificar experiencia premium ni rendimiento.

## Checklist

1. Validación de campos obligatorios y formato email.
2. Estados de envío claros (idle/loading/success/error).
3. Prevención de doble submit y reintentos controlados.
4. Integración anti-bot no intrusiva y diferida cuando sea posible.
5. Mensajes UX bilingües (`es`/`en`) consistentes.
6. Verificación técnica (`lint`, `test`, `build`).
7. Lighthouse tras cambios si se altera JS inicial.

## Criterios NO-GO

- Errores silenciosos en envío de lead.
- Flujos sin feedback para usuario.
- Regresión en accesibilidad de formularios.
