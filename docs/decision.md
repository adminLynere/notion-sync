# Decisión: ¿arranca aquí o en `lynere/`?

**Decisión (2026-06):** el worker **arranca en `lynere/`** y migra a este repo después.

## Por qué

- Ya existe base en el monorepo: `.github/workflows/issue-notion-agent.yml` (resuelve el id de
  Notion desde la issue/comentario, upsert del bloque de enlace, etiqueta `notion-linked`,
  comenta y dispara `repository_dispatch issue_notion_linked`). Reaprovecharla es lo más rápido.
- El intake usa scripts del monorepo (`pnpm notion:task --page-id <id>`) y tipos/contracts de
  `lynere/`.
- Plan del ecosistema (README maestro, §"06→03/04 blando"): **03/04 arrancan en `lynere/` y
  migran después** → 06 no bloquea a 04.

## Qué vive dónde (ahora)

| Pieza | Ahora | Destino |
| --- | --- | --- |
| Mapeo puro (id Notion, estado Work Item) | este repo (`src/mapping.ts`, esqueleto) | este repo |
| Workflow de enlace issue↔Notion | `lynere/.github/workflows/issue-notion-agent.yml` | se generaliza y migra |
| Scripts de intake | `lynere/tools/scripts` | se mueven con el worker |

## Disparador de la migración

Cuando el flujo bidireccional (issue↔Work Item, ADR↔docs, Incident↔postmortem) esté probado en
`lynere/` y el contrato de eventos sea estable, se mueve el worker aquí en un PR coordinado.
