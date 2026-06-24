/**
 * @adminlynere/notion-sync
 *
 * Worker de sincronización entre Notion (control plane) y GitHub:
 *
 *  - **Work Items ↔ issues**: estado, asignación, enlace bidireccional.
 *  - **ADR ↔ docs**: decisiones arquitectónicas versionadas.
 *  - **Incidents ↔ postmortems**: incidentes y sus postmortems.
 *
 * Estado: esqueleto del mapeo puro (`src/mapping.ts`). El runtime del worker y los clientes
 * Notion/GitHub arrancan en `lynere/` (base: `.github/workflows/issue-notion-agent.yml`) y
 * migran aquí — ver docs/decision.md.
 */
export * from './mapping';
