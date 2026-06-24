import { describe, it, expect } from 'vitest';
import { notionIdFromText, workItemStatusFromIssue } from './mapping';

describe('notionIdFromText', () => {
  const dashed = '385fe6e8-ba9b-817e-adc0-cfe3a1539911';
  const hex = '385fe6e8ba9b817eadc0cfe3a1539911';

  it('normaliza un UUID con guiones', () => {
    expect(notionIdFromText(`ref ${dashed} fin`)).toBe(dashed);
  });

  it('normaliza un hex de 32', () => {
    expect(notionIdFromText(`Notion: ${hex}`)).toBe(dashed);
  });

  it('extrae de una URL de notion.so', () => {
    expect(notionIdFromText(`see https://www.notion.so/Page-${hex}`)).toBe(dashed);
  });

  it('devuelve null si no hay id', () => {
    expect(notionIdFromText('sin referencia')).toBeNull();
  });
});

describe('workItemStatusFromIssue', () => {
  it('closed → Done', () => {
    expect(workItemStatusFromIssue({ state: 'closed', labels: [] })).toBe('Done');
  });

  it('PR abierta → In Review', () => {
    expect(workItemStatusFromIssue({ state: 'open', labels: [], hasOpenPr: true })).toBe('In Review');
  });

  it('label in-progress → In Progress', () => {
    expect(workItemStatusFromIssue({ state: 'open', labels: ['in-progress'] })).toBe('In Progress');
  });

  it('open sin señales → Backlog', () => {
    expect(workItemStatusFromIssue({ state: 'open', labels: [] })).toBe('Backlog');
  });
});
