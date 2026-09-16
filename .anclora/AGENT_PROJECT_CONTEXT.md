# Anclora Azure Bay Landing — Agent Project Context

AGENT_PROJECT_CONTEXT_VERSION=1.0
STATUS=ACTIVE

## 1. Project Identity

APPLICATION_NAME=Anclora Azure Bay Landing
REPOSITORY=anclora-azure-bay-landing
PROJECT_ROLE=Static Production Frontend / Showcase (Next.js)
PRODUCT_FAMILY=Anclora Group

## 2. Mandatory Bootstrap

When starting work in this repository, agents must read sources in this exact order:

1. Current explicit instruction from Toni (highest operational priority).
2. Workspace agent policy (`../../ANCLORA_WORKSPACE_AGENT_POLICY.md` — currently `WORKSPACE_POLICY_STATUS=PENDING_GLOBAL_INSTALLATION`, with `../../AGENTS.md` as interim workspace guidance).
3. Repository agent rules (`../AGENTS.md`).
4. `.anclora/AGENT_PROJECT_CONTEXT.md` (this file — bootstrap, index, routing, and authority map).
5. `.anclora/PRODUCTION_RUNTIME.md` (canonical runtime contract: topology, Vercel hosting, Git).
6. `.anclora/AOS_ADOPTION.md` (governance declaration, canonical AOS sources, standards).
7. Repository-specific agent instructions (`../CLAUDE.md`, `../GEMINI.md`, etc., when present).

## 3. Core Project Contracts

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
