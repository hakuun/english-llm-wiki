import type { DailySection, SectionKind } from '../../types/daily.js';

const headingPattern = /^##\s+(.+)$/gm;

export function splitSections(body: string): DailySection[] {
  const matches = [...body.matchAll(headingPattern)];
  return matches.map((match, index) => {
    const headingStart = match.index ?? 0;
    const contentStart = headingStart + match[0].length;
    const nextStart = matches[index + 1]?.index ?? body.length;
    const title = match[1].trim();
    const markdown = body.slice(contentStart, nextStart).trim();

    return {
      id: slugify(title),
      title,
      kind: classifySection(title),
      markdown,
    };
  });
}

export function classifySection(title: string): SectionKind {
  const lower = title.toLowerCase();
  if (lower.includes('today') && lower.includes('focus')) return 'focus';
  if (lower.includes('review')) return 'review';
  if (lower.includes('warm-up') || lower.includes('warmup')) return 'warmup';
  if (lower.includes('input')) return 'input';
  if (lower.includes('comprehension')) return 'comprehension';
  if (lower.includes('vocabulary')) return 'vocabulary';
  if (lower.includes('grammar') || lower.includes('sentence pattern')) return 'grammar';
  if (lower.includes('small output')) return 'output';
  if (lower.includes('speaking')) return 'speaking';
  if (lower.includes('stuck')) return 'stuck';
  if (lower.includes('completion record')) return 'completion';
  if (lower.includes('ui completion submission')) return 'submission';
  if (lower.includes('llm correction')) return 'correction';
  return 'unknown';
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/^[0-9]+\.\s*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}
