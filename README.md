# notion-sync

> Worker de sincronización **Notion↔GitHub**. Mantiene el control plane de Notion y el código
> en GitHub en sincronía, en ambos sentidos.

Repo privado de `adminLynere`. Parte del ecosistema agentic — ver [`infra`](https://github.com/adminLynere/infra) para el diagrama de interconexión.

## Qué sincroniza

| Par | Dirección | Detalle |
| --- | --- | --- |
| **Work Items ↔ issues** | bidireccional | estado, asignación, enlace; estado derivado de issue/PR (ver `src/mapping.ts`). |
| **ADR ↔ docs** | Notion → repo | decisiones arquitectónicas versionadas como markdown. |
| **Incidents ↔ postmortems** | bidireccional | un incidente (Notion) ↔ su postmortem (repo). |

## Estado y decisión de ubicación

**Esqueleto** del mapeo puro (`src/mapping.ts`, testeado). El runtime del worker y los clientes
Notion/GitHub **arrancan en `lynere/`**, sobre la base ya existente
`.github/workflows/issue-notion-agent.yml` (resuelve el id de Notion desde la issue, etiqueta,
comenta y dispara `repository_dispatch`). Migra aquí cuando estabilice — ver
[`docs/decision.md`](docs/decision.md).

## Data sources de Notion (referencia)

Work Items `87584360-…` · ADR `3c9f1b3f-…` · Incident `8b9d7c41-…` · Agent Action Log `9c4de093-…`.
Acceso vía connector OAuth de Notion (en sesiones Claude) o `NOTION_TOKEN` (worker) — ver
`infra/secrets-catalog.md`.

## Desarrollo

```bash
nvm use            # Node 22
pnpm install
pnpm lint
pnpm build
pnpm test
```

CI: `.github/workflows/ci.yml` (lint + build + test). Equivale al reusable
`adminLynere/infra/.github/workflows/reusable-node-ci.yml`.
