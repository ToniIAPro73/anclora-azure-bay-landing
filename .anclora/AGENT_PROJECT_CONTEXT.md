# Anclora Azure Bay Landing — Agent Project Context

AGENT_PROJECT_CONTEXT_VERSION=3.0
STATUS=ACTIVE
AUTHORITY=anclora-governance

## 1. Project Identity

APPLICATION_NAME=Anclora Azure Bay Landing
REPOSITORY=anclora-azure-bay-landing
PROJECT_ROLE=Static Production Frontend / Showcase (Next.js)
PRODUCT_FAMILY=Anclora Group

## 2. Bootstrap (minimal router)

```text
AUTHORITY=anclora-governance
AGENT_PROJECT_CONTEXT_ROLE=MINIMAL_ROUTER
```

Authority, QA, token economy, Git, promotion and the verification matrix are defined by Governance
([`AOS_ADOPTION_STANDARD`](../../anclora-governance/standards/AOS_ADOPTION_STANDARD.md),
[`AGENT_EXECUTION_POLICY`](../../anclora-governance/standards/AGENT_EXECUTION_POLICY.md),
[`AGENT_OPERATING_STANDARD`](../../anclora-governance/standards/AGENT_OPERATING_STANDARD.md)) and are not
duplicated here. Entry point: [`../AGENTS.md`](../AGENTS.md). Repository facts: [`PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md).
Adoption and exceptions: [`AOS_ADOPTION.md`](AOS_ADOPTION.md). Load each only when the task needs it.

## 4. Core Project Contracts

- **PRODUCTION_RUNTIME**: [`.anclora/PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md)
  - Confirms status `STATIC_PRODUCTION_RUNTIME`, deployed on Vercel (`https://anclora-azure-bay-landing-m77mq2yza-pmi140979-6354s-projects.vercel.app`), with FULL_PROMOTION Git workflow model.
- **AOS_ADOPTION**: [`.anclora/AOS_ADOPTION.md`](AOS_ADOPTION.md)
  - Documents AOS adoption, governance level, and design system alignment.

## 4. Task Routing

| Task Domain | Primary Authority to Read First | Secondary / Operational Sources |
| :--- | :--- | :--- |
| **Static Runtime / Hosting** | [`.anclora/PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md) | `../package.json` |
| **UI Design / Tokens** | [`../../anclora-design-system/`](../../anclora-design-system/) | [`../../anclora-vault/00-governance/contracts/`](../../anclora-vault/00-governance/contracts/) |
| **AOS Governance** | [`.anclora/AOS_ADOPTION.md`](AOS_ADOPTION.md) | [`../../anclora-governance/`](../../anclora-governance/) |
| **Git Workflow** | [`.anclora/PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md) | `../AGENTS.md` |

## 5. Source Authority

- Operational Rules: `../AGENTS.md`
- Governance: [`../../anclora-governance/`](../../anclora-governance/)

<!-- ANCLORA-AOS:START -->
ANCLORA_AOS_AUTHORITY=anclora-governance
Canonical rules: [AOS Adoption Standard](../../anclora-governance/standards/AOS_ADOPTION_STANDARD.md). Repository-specific facts remain in this repository's `.anclora/` contracts.
<!-- ANCLORA-AOS:END -->
