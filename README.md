<div align="center">

<img src="./public/logo-anclora-private-estates-exp.png" alt="Logotipo de Anclora Private Estates" width="420" />

# Anclora Azure Bay Landing

### Landing page premium para una promoción residencial de lujo frente al mar

Experiencia digital bilingüe que combina diseño visual de alta gama, captura de leads verificada con ALTCHA, generación de dossiers PDF personalizados en servidor e integración con HubSpot.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white)](https://vercel.com/)

<br />

**Español** | [English](./README.en.md)

</div>

---

<img
  src="./public/assets/imagenes/hero-background.png"
  alt="Interfaz de la landing de Azure Bay"
  width="100%"
/>

> **Aviso de portfolio**
>
> Todos los contenidos comerciales, precios, cifras de inversión y datos de contacto mostrados en este proyecto se utilizan exclusivamente para demostrar capacidades de diseño de producto e ingeniería de software dentro del ecosistema Anclora.

## Descripción del proyecto

Anclora Azure Bay Landing es la vitrina comercial y visual de una promoción residencial de lujo frente al mar, desplegada en Vercel.

El proyecto va más allá de la presentación visual. Demuestra cómo una landing inmobiliaria premium puede combinar posicionamiento de marca, contenido bilingüe, captura de leads protegida contra bots, generación de documentos PDF personalizados en tiempo real y almacenamiento híbrido local/S3.

| Área                 | Qué demuestra el proyecto                                                       |
| -------------------- | ------------------------------------------------------------------------------- |
| Diseño de producto   | Posicionamiento premium, jerarquía visual y storytelling orientado a conversión |
| Frontend             | Secciones inmersivas responsive y estética dorada cuidada al detalle            |
| Internacionalización | Experiencia completa en español e inglés, incluidos emails y dossiers           |
| Captura de leads     | Formulario verificado con ALTCHA y envío directo a HubSpot                      |
| Backend              | Generación de PDF personalizado, almacenamiento local/S3 y URLs firmadas        |
| Comunicación         | Emails transaccionales bilingües vía SMTP o Resend, con alertas operativas      |
| Calidad              | TypeScript estricto, ESLint y tests automatizados con Vitest                    |

## Funcionalidades clave

### Experiencia inmobiliaria premium

- Hero inmersivo, galería, apartamentos, ubicación y FAQ en secciones modulares.
- Diseño editorial con tipografía, espaciado y ritmo visual cuidadosamente estructurados.
- Comportamiento responsive en escritorio, tablet y móvil.
- Contenido en español e inglés con selector de idioma integrado.
- Integración de HubSpot Meetings para agendar visitas desde la landing.

### Captura de leads verificada

- Widget ALTCHA (proof-of-work) anti-bots, sin fricción visual para el usuario.
- Verificación del challenge en servidor antes de procesar ningún lead.
- Envío validado a HubSpot Forms API con atribución UTM y `hubspotutk`.
- Emails de respuesta bilingües personalizados por idioma del lead.
- Alertas operativas por email cuando el dossier base no está disponible.

### Dossier PDF personalizado

- Personalización del PDF base con `pdf-lib` y `@pdf-lib/fontkit` en servidor.
- Versiones en español e inglés según el idioma del lead.
- Almacenamiento híbrido: directorio local (`DOSSIER_LOCAL_DIR`) o S3/Cloudflare R2.
- URLs firmadas de descarga mediante `@aws-sdk/s3-request-presigner`.
- Fallback amable al dossier genérico si la personalización falla; nunca un 500.

### Calidad de ingeniería

- Configuración estricta de TypeScript.
- ESLint con la configuración de Next.js.
- Tests automatizados con Vitest sobre la lógica de almacenamiento.
- Abstracción de almacenamiento testeable en `lib/dossier-storage.ts`.
- Generación y verificación de challenges ALTCHA en `lib/altcha.ts`.

## Stack tecnológico

<div align="center">

| Frontend       | Backend y datos                 | Calidad y tooling |
| -------------- | ------------------------------- | ----------------- |
| Next.js 16     | Route Handlers de Next.js       | TypeScript        |
| React 18       | pdf-lib + fontkit               | Vitest            |
| Tailwind CSS 4 | ALTCHA (verificación anti-bot)  | ESLint            |
| Radix UI       | AWS SDK S3 + URLs firmadas      | PostCSS           |
| Lucide React   | HubSpot Forms API               | Vercel            |
| next-themes    | Resend / nodemailer (SMTP)      | GitHub Actions    |

</div>

## Arquitectura

```text
app/
├── page.tsx            # Client Component con hero, galería y CTA del dossier
├── landing-config.ts   # Configuración del sitio y tipos del flujo de leads
├── sections/           # Hero, galería, apartamentos, ubicación, FAQ, formulario
├── hooks/              # Hooks de la landing
├── api/
│   ├── submit-lead/          # Captura de leads + personalización del PDF
│   ├── altcha/challenge/     # Generación de challenges ALTCHA
│   └── local-dossiers/[file] # Descarga de dossiers almacenados en local
├── legal/ privacy/ terms/    # Páginas legales

components/ui/          # Sistema de diseño reutilizable
lib/
├── altcha.ts           # Generación y verificación de challenges ALTCHA
└── dossier-storage.ts  # Detección y abstracción de almacenamiento local/S3

public/assets/
├── imagenes/           # Imágenes de la landing
├── planos/             # Planos de planta en PDF
└── dossier/            # PDFs base y fallback del dossier

tests/                  # Suite Vitest
docs/                   # Briefing, migraciones, diseño y plantillas de email
scripts/                # Scripts de migración y sincronización
```

El proyecto separa la composición de la página, la lógica de captura de leads, la verificación anti-bots, la generación de documentos y la persistencia.

## Endpoints de la API

### Captura de leads

```http
POST /api/submit-lead
```

Responsabilidades:

- validar el payload enviado;
- verificar el challenge ALTCHA antes de procesar;
- registrar el lead en HubSpot con atribución de campaña;
- personalizar el dossier PDF con el nombre del lead;
- almacenarlo en local o S3 y generar la URL de descarga;
- enviar el email de respuesta bilingüe;
- devolver una respuesta controlada, con fallback amable ante errores.

### Challenge ALTCHA

```http
GET /api/altcha/challenge
```

Genera el challenge proof-of-work que el widget del formulario resuelve en cliente. TTL configurable con `ALTCHA_CHALLENGE_TTL`.

### Dossiers locales

```http
GET /api/local-dossiers/[file]
```

Sirve los dossiers personalizados almacenados en el directorio local cuando no se usa S3.

## Desarrollo local

### Requisitos

- Node.js 18+ y npm (o pnpm)

### Instalación

```bash
git clone git@github.com:ToniIAPro73/anclora-azure-bay-landing-page.git
cd anclora-azure-bay-landing-page

npm install
cp .env.example .env.local
npm run dev
```

Abrir:

```text
http://localhost:3000
```

Para que el flujo del dossier funcione en local es imprescindible definir `ALTCHA_SECRET` y `DOSSIER_LOCAL_DIR` antes de abrir la landing.

## Configuración de entorno

El repositorio incluye `.env.example` como referencia de las variables necesarias. Nunca deben commitearse credenciales reales, contraseñas SMTP ni claves de producción.

```dotenv
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# HubSpot
NEXT_PUBLIC_HUBSPOT_PORTAL_ID="your-portal-id"
HUBSPOT_FORM_GUID="your-form-guid"
HUBSPOT_MEETINGS_URL_ES="https://meetings-eu1.hubspot.com/your-user"
HUBSPOT_MEETINGS_URL_EN="https://meetings-eu1.hubspot.com/your-user"

# ALTCHA (seguridad anti-bots)
ALTCHA_SECRET="replace-with-a-secure-random-secret"
ALTCHA_CHALLENGE_TTL=180

# Dossier personalizado
DOSSIER_LOCAL_DIR="/ruta/local/dossiers"
DOSSIER_ALERT_EMAIL_ES="alertas-es@example.com"
DOSSIER_ALERT_EMAIL_EN="alertas-en@example.com"

# Almacenamiento S3 / Cloudflare R2 (opcional en local)
S3_Endpoint="https://your-account.r2.cloudflarestorage.com"
S3_BUCKET_NAME="your-bucket"
S3_ACCESS_KEY_ID="your-access-key"
S3_SECRET_ACCESS_KEY="your-secret-key"
S3_REGION_CODE="auto"
# FORCE_S3_STORAGE=true

# Email transaccional (SMTP o Resend)
SMTP_HOST="smtp.example.com"
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER_ES="leads-es@example.com"
SMTP_PASS_ES="replace-me"
SMTP_USER_EN="leads-en@example.com"
SMTP_PASS_EN="replace-me"
# RESEND_API_KEY="re_xxxxxxxx"
```

## Quality gates

Ejecuta la suite completa de validación local:

```bash
npm run lint
npm run test
npm run build
```

Estado actual:

| Check               | Estado                                     |
| ------------------- | ------------------------------------------ |
| ESLint              | Correcto                                   |
| TypeScript          | Correcto                                   |
| Tests automatizados | 9/10 en verde (1 dependiente del entorno)  |
| Build de producción | Correcto                                   |

> El test dependiente del entorno valida el fallback de `getLocalDossierDir` al directorio `Documents` del usuario; su resultado varía según las variables de entorno de la máquina donde se ejecute.

## Documentación técnica

- [Índice de documentación](./docs/README.md)
- [Contexto del proyecto](./docs/CONTEXTO.md)
- Diseño, migraciones, informes y verificación en [`docs/`](./docs)

## El ecosistema Anclora

Este repositorio representa el caso de estudio comercial y visual.

El repositorio [`anclora-portfolio`](https://github.com/ToniIAPro73/anclora-portfolio) representa el motor técnico reutilizable.

- **Azure Bay** — la vitrina de resultados.
- **Anclora Portfolio** — la base técnica escalable.

## Consideraciones de producción

- Los dossiers personalizados nunca viven en `public/`; se escriben en `DOSSIER_LOCAL_DIR` o en el bucket S3/R2 configurado.
- En Vercel el almacenamiento local usa `/tmp/dossiers`; para persistencia real debe configurarse S3/R2.
- Si el PDF base no existe en `public/assets/dossier/`, el formulario devuelve un aviso amable y se envía una alerta por email (español para leads ES, inglés para EN).
- Las credenciales SMTP, el secreto ALTCHA y las claves S3 deben configurarse tanto en local como en Vercel.

## Alcance del proyecto

Este repositorio pretende demostrar:

- ejecución frontend premium;
- captura de leads fiable y protegida contra bots;
- generación de documentos personalizados en servidor;
- almacenamiento híbrido testeable;
- arquitectura mantenible orientada a producto.

No se presenta como un servicio real de listado de propiedades ni una oferta de inversión.

---

<div align="center">

### Antonio Ballesteros

Desarrollador orientado a producto, centrado en aplicaciones web premium, automatización y soluciones digitales asistidas por IA.

[![GitHub](https://img.shields.io/badge/GitHub-ToniIAPro73-181717?logo=github)](https://github.com/ToniIAPro73)

<br />

**Diseñado y desarrollado como parte del ecosistema digital Anclora.**

</div>
