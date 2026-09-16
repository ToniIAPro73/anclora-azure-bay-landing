# Anclora Azure Bay Landing — Production Runtime Manifest

PRODUCTION_RUNTIME_MANIFEST_VERSION=1.0
STATUS=STATIC_PRODUCTION_RUNTIME
LOCAL_RUNTIME_MODEL=PRODUCTION_BACKED_STATIC
DO_NOT_CREATE_DEVELOPMENT_DATABASE=true

## 1. Application Identity

APPLICATION_NAME=Anclora Azure Bay Landing
REPOSITORY=anclora-azure-bay-landing
APPLICATION_TYPE=STATIC_FRONTEND
FRAMEWORK=Next.js

## 2. Runtime Topology

FRONTEND_PROVIDER=Vercel
BACKEND_PROVIDER=NONE
PRODUCTION_DOMAIN=anclora-azure-bay-landing-m77mq2yza-pmi140979-6354s-projects.vercel.app
PRODUCTION_DEPLOYMENT_PROVIDER=Vercel (Project: anclora-azure-bay-landing)

```text
Browser / Client
   ↓
Vercel Edge Network (Static Production CDN / Frontend)
   ├── Framework: Next.js
   └── Production Domain: https://anclora-azure-bay-landing-m77mq2yza-pmi140979-6354s-projects.vercel.app
```

This repository deploys a production-grade static showcase/landing on Vercel.
It does not maintain an independent stateful backend or database.

## 3. Production Database Contract

DATABASE_PROVIDER=NONE
DATABASE_SCOPE=NONE
LOCAL_DATABASE_SCOPE=NONE

No database is connected or required for this static frontend.

## 4. Database Migration Contract

MIGRATION_SYSTEM=NONE
MIGRATION_STRATEGY=NONE
MIGRATION_DIRECTORY=NONE
MIGRATION_RUNNER=NONE

## 5. Storage Contract

STORAGE_PROVIDER=Vercel Edge CDN
STORAGE_SCOPE=production

Assets are bundled and distributed via Vercel Edge Network.

## 6. Authentication Contract

AUTH_PROVIDER=NONE
AUTH_SCOPE=NONE

Publicly accessible showcase / landing; no authentication required.

## 7. External Services & Integrations

EXTERNAL_SERVICES=Vercel Deployment Pipeline, Anclora Design System assets

## 8. Environment Files & Loading Order

ENV_FILES=NONE / .env.example
Static frontend does not require runtime secrets.

## 9. Local vs Production Model

LOCAL_RUNTIME_MODEL=STATIC_OR_LOCAL_DEV
DO_NOT_CREATE_DEVELOPMENT_DATABASE=true

Local development previews UI identical to Vercel production build.

## 10. Persistent QA User Contract

PERSISTENT_QA_USER=NOT_APPLICABLE (Public surface)

## 11. Git Branch & Operational Policy

GIT_WORKFLOW_MODEL=FULL_PROMOTION
WORK_BRANCH=development
MAIN_ONLY_MODEL_ALLOWED=false
PROMOTION_REQUIRED=true
PROMOTION_POLICY=Follow repository Git contract (FULL_PROMOTION).
