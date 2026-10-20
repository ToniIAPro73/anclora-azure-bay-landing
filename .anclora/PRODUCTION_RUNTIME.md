# Anclora Azure Bay Landing — Production Runtime Manifest

PRODUCTION_RUNTIME_MANIFEST_VERSION=2.0
PROMOTION_REPORT=SINGLE_SUMMARY_AT_END
PROMOTION_PARALLEL_ACROSS_REPOS=true
PROMOTION_MULTI_REPO_SCOPE_ALLOWED=true
PROMOTION_USER_VERIFIES_EACH_BRANCH=true
PROMOTION_AGENT_PER_HOP_VERIFICATION=false
PROMOTION_WAIT_FOR_WORKFLOW_COMPLETION=true
PROMOTION_STOP_ON_GATE_FAILURE=true
PROMOTION_REQUIRES_PRE_STEP_GATES=true
PROMOTION_AUTHORIZATION_TOKEN=PROMOTE=FULL
PROMOTION_MECHANISM=.github/workflows/promote.yml
PROMOTION_FLOW=development->staging->production->main
PROMOTION_SUPPORTED=true
SECRET_COMMIT_FORBIDDEN=true
SECRET_OUTPUT_FORBIDDEN=true
PROMOTION_FORCE_PUSH_ALLOWED=false
PROMOTION_AUTHORIZATION_CLEAR_ON_UNAUTHORIZED_PROMPT=true
PROMOTION_AUTHORIZATION_CLEAR_ON_NEW_SESSION=true
PROMOTION_AUTHORIZATION_SCOPE=CURRENT_TASK_OR_CONVERSATION
AUTO_PROMOTE=false
TEST_EXECUTION_POLICY=BATCHED
STOP_WHEN_SUFFICIENT_EVIDENCE=true
CAVEMAN_GRANULARITY=TASK
CAVEMAN_MODE_DEFAULT=AUTO
TOKEN_ECONOMY_POLICY=ADAPTIVE
QA_MODE_DEFAULT=AUTO
STOP_AFTER_DEVELOPMENT_PUSH=true
PUSH_TARGET=origin/development
FEATURE_BRANCHES=DISALLOWED
DEFAULT_BRANCH=development
WORKING_BRANCH=development
ANCLORA_FLOW_CONTRACT_VERSION=2.0
ANCLORA_FLOW_VERSION=1
RUNTIME_CONTRACT_AUTHORITY=CANONICAL
STATUS=STATIC_PRODUCTION_RUNTIME
LOCAL_RUNTIME_MODEL=PRODUCTION_BACKED_STATIC
DO_NOT_CREATE_DEVELOPMENT_DATABASE=true

Runtime, environment, database, migration, QA and Git rules declared in this
manifest override generic agent defaults or home-directory agent policies.

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

Runtime, environment, database, migration, QA and Git rules declared in this
manifest override generic agent defaults or home-directory agent policies.

Local development previews UI identical to Vercel production build.

## QA Contract

QA_POLICY=WORKSPACE_PROPORTIONAL
FAST_TARGETED_TESTING_POLICY=MINIMUM_SUFFICIENT_SET
FAST_FULL_TEST_SUITE_ALLOWED=false
FULL_GATES_AFTER_EVERY_EDIT=false
REPEAT_UNCHANGED_SUCCESSFUL_GATES=false
VISUAL_QA_EXECUTION=BY_QA_MODE

QA_MINIMUM_FOR_RELEASE_PROMOTION=FULL


QA_AUTH_MODEL=NOT_APPLICABLE
QA_IS_DEDICATED=false
QA_IS_REAL_USER=false
REAL_USER_AS_QA_ALLOWED=false
QA_SCOPE=none
QA_REUSE=false
QA_CREATE_IF_MISSING=false
QA_DELETE_AFTER_TEST=false
QA_CREATION_CONFIRMATION_REQUIRED=false
QA_PERSISTENT_IDENTITY=NONE

Public surface; dedicated authentication QA not applicable.

## 11. Git Branch & Operational Policy

GIT_WORKFLOW_MODEL=FULL_PROMOTION
WORK_BRANCH=development
MAIN_ONLY_MODEL_ALLOWED=false
PROMOTION_REQUIRED=true
PROMOTION_POLICY=Follow repository Git contract (FULL_PROMOTION).
EXPLICIT_PROMOTION_ALLOWED=true
PROMOTION_ORDER=development->staging->production->main
PROMOTION_OLD_AUTHORIZATION_PERSISTS=false

<!-- ANCLORA-MODS:START -->
ANCLORA_MODS_COMMON_CONTRACT_VERSION=1.0.0
Canonical shared rules: [Anclora Common Agent Contract](../anclora-mods/contracts/ANCLORA_COMMON_AGENT_CONTRACT_V1.md) and [Flow Amendment v2](../anclora-mods/ANCLORA_FLUJO_UNICO_V2.md). Repository-specific facts remain in this repository's `.anclora/` contracts.
<!-- ANCLORA-MODS:END -->
