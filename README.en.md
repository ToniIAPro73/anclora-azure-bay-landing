<div align="center">

<img src="./public/logo-anclora-private-estates-exp.png" alt="Anclora Private Estates logo" width="420" />

# Anclora Azure Bay Landing

### Premium landing page for a beachfront luxury residential development

A bilingual digital experience combining high-end visual design, ALTCHA-verified lead capture, server-side personalised PDF dossier generation and HubSpot integration.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-deploy-000000?logo=vercel&logoColor=white)](https://vercel.com/)

<br />

[Español](./README.md) | **English**

</div>

---

<img
  src="./public/assets/imagenes/hero-background.png"
  alt="Azure Bay landing interface"
  width="100%"
/>

> **Portfolio disclosure**
>
> All commercial content, prices, investment figures and contact details shown in this project are used exclusively to demonstrate product design and software engineering capabilities within the Anclora ecosystem.

## Project overview

Anclora Azure Bay Landing is the commercial and visual showcase of a beachfront luxury residential development, deployed on Vercel.

The project goes beyond visual presentation. It demonstrates how a premium real-estate landing can combine brand positioning, bilingual content, bot-protected lead capture, real-time personalised PDF generation and hybrid local/S3 storage.

| Area                  | What the project demonstrates                                              |
| --------------------- | -------------------------------------------------------------------------- |
| Product design        | Premium positioning, visual hierarchy and conversion-oriented storytelling |
| Frontend              | Immersive responsive sections and a carefully crafted golden aesthetic     |
| Internationalisation  | Complete Spanish and English experience, including emails and dossiers     |
| Lead capture          | ALTCHA-verified form with direct HubSpot submission                        |
| Backend               | Personalised PDF generation, local/S3 storage and signed URLs              |
| Communication         | Bilingual transactional emails via SMTP or Resend, with operational alerts |
| Quality               | Strict TypeScript, ESLint and automated tests with Vitest                  |

## Key features

### Premium real-estate experience

- Immersive hero, gallery, apartments, location and FAQ in modular sections.
- Editorial design with carefully structured typography, spacing and visual rhythm.
- Responsive behaviour across desktop, tablet and mobile.
- Spanish and English content with an integrated language selector.
- HubSpot Meetings integration to book visits directly from the landing.

### Verified lead capture

- ALTCHA (proof-of-work) anti-bot widget, frictionless for real users.
- Server-side challenge verification before any lead is processed.
- Validated submission to the HubSpot Forms API with UTM attribution and `hubspotutk`.
- Bilingual response emails personalised by lead language.
- Operational email alerts when the base dossier is unavailable.

### Personalised PDF dossier

- Base PDF personalisation with `pdf-lib` and `@pdf-lib/fontkit` on the server.
- Spanish and English versions matching the lead's language.
- Hybrid storage: local directory (`DOSSIER_LOCAL_DIR`) or S3/Cloudflare R2.
- Signed download URLs via `@aws-sdk/s3-request-presigner`.
- Graceful fallback to the generic dossier if personalisation fails; never a 500.

### Engineering quality

- Strict TypeScript configuration.
- ESLint with the Next.js configuration.
- Automated Vitest coverage of the storage logic.
- Testable storage abstraction in `lib/dossier-storage.ts`.
- ALTCHA challenge generation and verification in `lib/altcha.ts`.

## Technology stack

<div align="center">

| Frontend       | Backend and data               | Quality and tooling |
| -------------- | ------------------------------ | ------------------- |
| Next.js 16     | Next.js Route Handlers         | TypeScript          |
| React 18       | pdf-lib + fontkit              | Vitest              |
| Tailwind CSS 4 | ALTCHA (anti-bot verification) | ESLint              |
| Radix UI       | AWS SDK S3 + signed URLs       | PostCSS             |
| Lucide React   | HubSpot Forms API              | Vercel              |
| next-themes    | Resend / nodemailer (SMTP)     | GitHub Actions      |

</div>

## Architecture

```text
app/
├── page.tsx            # Client Component with hero, gallery and dossier CTA
├── landing-config.ts   # Site configuration and lead-flow types
├── sections/           # Hero, gallery, apartments, location, FAQ, lead form
├── hooks/              # Landing hooks
├── api/
│   ├── submit-lead/          # Lead capture + PDF personalisation
│   ├── altcha/challenge/     # ALTCHA challenge generation
│   └── local-dossiers/[file] # Download of locally stored dossiers
├── legal/ privacy/ terms/    # Legal pages

components/ui/          # Reusable design system
lib/
├── altcha.ts           # ALTCHA challenge generation and verification
└── dossier-storage.ts  # Local/S3 storage detection and abstraction

public/assets/
├── imagenes/           # Landing imagery
├── planos/             # Floor-plan PDFs
└── dossier/            # Base and fallback dossier PDFs

tests/                  # Vitest suite
docs/                   # Briefing, migrations, design and email templates
scripts/                # Migration and sync scripts
```

The project separates page composition, lead-capture logic, anti-bot verification, document generation and persistence concerns.

## API endpoints

### Lead capture

```http
POST /api/submit-lead
```

Responsibilities:

- validate the submitted payload;
- verify the ALTCHA challenge before processing;
- register the lead in HubSpot with campaign attribution;
- personalise the PDF dossier with the lead's name;
- store it locally or in S3 and generate the download URL;
- send the bilingual response email;
- return a controlled response, with graceful fallback on errors.

### ALTCHA challenge

```http
GET /api/altcha/challenge
```

Generates the proof-of-work challenge that the form widget solves client-side. TTL configurable with `ALTCHA_CHALLENGE_TTL`.

### Local dossiers

```http
GET /api/local-dossiers/[file]
```

Serves personalised dossiers stored in the local directory when S3 is not in use.

## Local development

### Requirements

- Node.js 18+ and npm (or pnpm)

### Installation

```bash
git clone git@github.com:ToniIAPro73/anclora-azure-bay-landing-page.git
cd anclora-azure-bay-landing-page

npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

For the dossier flow to work locally, `ALTCHA_SECRET` and `DOSSIER_LOCAL_DIR` must be defined before opening the landing.

## Environment configuration

The repository includes `.env.example` as a reference for the required variables. Real credentials, SMTP passwords and production keys must never be committed.

```dotenv
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# HubSpot
NEXT_PUBLIC_HUBSPOT_PORTAL_ID="your-portal-id"
HUBSPOT_FORM_GUID="your-form-guid"
HUBSPOT_MEETINGS_URL_ES="https://meetings-eu1.hubspot.com/your-user"
HUBSPOT_MEETINGS_URL_EN="https://meetings-eu1.hubspot.com/your-user"

# ALTCHA (anti-bot security)
ALTCHA_SECRET="replace-with-a-secure-random-secret"
ALTCHA_CHALLENGE_TTL=180

# Personalised dossier
DOSSIER_LOCAL_DIR="/local/path/dossiers"
DOSSIER_ALERT_EMAIL_ES="alerts-es@example.com"
DOSSIER_ALERT_EMAIL_EN="alerts-en@example.com"

# S3 / Cloudflare R2 storage (optional locally)
S3_Endpoint="https://your-account.r2.cloudflarestorage.com"
S3_BUCKET_NAME="your-bucket"
S3_ACCESS_KEY_ID="your-access-key"
S3_SECRET_ACCESS_KEY="your-secret-key"
S3_REGION_CODE="auto"
# FORCE_S3_STORAGE=true

# Transactional email (SMTP or Resend)
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

Run the complete local validation suite:

```bash
npm run lint
npm run test
npm run build
```

Current baseline:

| Check                    | Status                                       |
| ------------------------ | -------------------------------------------- |
| ESLint                   | Passing                                      |
| TypeScript               | Passing                                      |
| Automated tests          | 9/10 passing (1 environment-dependent)       |
| Production build         | Passing                                      |

> The environment-dependent test validates the `getLocalDossierDir` fallback to the user's `Documents` directory; its result varies with the environment variables of the machine running it.

## Technical documentation

- [Documentation index](./docs/README.md)
- [Project context](./docs/CONTEXTO.md)
- Design, migrations, reports and verification in [`docs/`](./docs)

## The Anclora ecosystem

This repository is the commercial and visual case study.

The [`anclora-portfolio`](https://github.com/ToniIAPro73/anclora-portfolio) repository is the reusable technical engine.

- **Azure Bay** — the showcase of results.
- **Anclora Portfolio** — the scalable technical foundation.

## Production considerations

- Personalised dossiers never live in `public/`; they are written to `DOSSIER_LOCAL_DIR` or to the configured S3/R2 bucket.
- On Vercel, local storage uses `/tmp/dossiers`; S3/R2 must be configured for real persistence.
- If the base PDF is missing from `public/assets/dossier/`, the form returns a friendly notice and an email alert is sent (Spanish for ES leads, English for EN leads).
- SMTP credentials, the ALTCHA secret and S3 keys must be configured both locally and on Vercel.

## Project scope

This repository is intended to demonstrate:

- premium frontend execution;
- reliable, bot-protected lead capture;
- server-side personalised document generation;
- testable hybrid storage;
- maintainable, product-oriented architecture.

It is not presented as a live property listing service or an investment offer.

---

<div align="center">

### Antonio Ballesteros

Product-oriented developer focused on premium web applications, automation and AI-assisted digital solutions.

[![GitHub](https://img.shields.io/badge/GitHub-ToniIAPro73-181717?logo=github)](https://github.com/ToniIAPro73)

<br />

**Designed and engineered as part of the Anclora digital ecosystem.**

</div>
