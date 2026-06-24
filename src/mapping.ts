/**
 * Mapeo Notion↔GitHub para el worker de sincronización.
 *
 * Esqueleto puro (sin I/O). El cliente de Notion/GitHub y el runtime del worker arrancan en
 * `lynere/` (base: `.github/workflows/issue-notion-agent.yml`) y migran aquí — ver docs/decision.md.
 *
 * Pares sincronizados: Work Items↔issues · ADR↔docs · Incidents↔postmortems.
 */

const HEX32 = /\b[a-f0-9]{32}\b/i;
const UUID = /\b[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\b/i;

/**
 * Extrae y normaliza un id de página de Notion desde texto libre (cuerpo de issue/comentario).
 * Acepta UUID con guiones o hex de 32 — también cubre URLs de notion.so, donde el id aparece
 * como un run contiguo de 32 hex. Devuelve el id en formato UUID con guiones, o `null` si no hay
 * ninguno. (Mirror de la lógica de `issue-notion-agent.yml`.)
 */
export function notionIdFromText(text: string): string | null {
  const raw = text.match(UUID)?.[0] ?? text.match(HEX32)?.[0] ?? '';
  const normalized = raw.replace(/[^a-f0-9]/gi, '').toLowerCase();
  if (normalized.length !== 32) return null;
  return [
    normalized.slice(0, 8),
    normalized.slice(8, 12),
    normalized.slice(12, 16),
    normalized.slice(16, 20),
    normalized.slice(20),
  ].join('-');
}

/** Estado de un Work Item en Notion (control plane). */
export type WorkItemStatus = 'Backlog' | 'In Progress' | 'In Review' | 'Done';

export interface IssueLike {
  readonly state: 'open' | 'closed';
  readonly labels: readonly string[];
  readonly hasOpenPr?: boolean;
}

/** Deriva el estado del Work Item a partir del estado/labels de la issue de GitHub. */
export function workItemStatusFromIssue(issue: IssueLike): WorkItemStatus {
  if (issue.state === 'closed') return 'Done';
  if (issue.hasOpenPr || issue.labels.includes('in-review')) return 'In Review';
  if (issue.labels.includes('in-progress')) return 'In Progress';
  return 'Backlog';
}
