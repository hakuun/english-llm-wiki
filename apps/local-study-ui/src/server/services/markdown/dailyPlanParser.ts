import { promises as fs } from 'node:fs';
import { parseMarkdownWithFrontmatter } from './frontmatter.js';
import { splitSections } from './sectionParser.js';
import { resolveDailyPath, toRepoRelative } from '../safety/pathGuards.js';
import type { DailyPlan, DailyResponse } from '../../types/daily.js';

export async function readDailyPlan(date: string): Promise<DailyResponse> {
  const filePath = resolveDailyPath(date);

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return parseDailyPlan(raw, date, filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return {
        exists: false,
        date,
        path: toRepoRelative(filePath),
      };
    }

    throw error;
  }
}

export function parseDailyPlan(raw: string, date: string, filePath: string): DailyPlan {
  const { frontmatter, body } = parseMarkdownWithFrontmatter(raw);
  const sections = splitSections(body);
  const submission = sections.find((section) => section.kind === 'submission')?.markdown ?? null;
  const correctionSection = sections.find((section) => section.kind === 'correction');
  const correctionMarkdown = correctionSection?.markdown ?? null;
  const isCorrected = correctionMarkdown ? hasSubstantialCorrection(correctionMarkdown) : false;
  const title = extractTitle(body) ?? String(frontmatter.title ?? `Daily Study ${date}`);

  return {
    exists: true,
    date,
    path: toRepoRelative(filePath),
    frontmatter,
    title,
    status: isCorrected ? 'corrected' : submission ? 'submitted' : 'planned',
    sections,
    submission,
    correction: {
      exists: Boolean(correctionSection),
      isCorrected,
      markdown: correctionMarkdown,
    },
    focusSummary: extractFocusSummary(sections.find((section) => section.kind === 'focus')?.markdown ?? ''),
  };
}

function extractTitle(body: string): string | null {
  const match = body.match(/^#\s+(.+)$/m);
  return match?.[1].trim() ?? null;
}

function extractFocusSummary(markdown: string): string | null {
  const input = markdown.match(/^-\s+Input:\s+(.+)$/m)?.[1];
  const grammar = markdown.match(/^-\s+Grammar \/ error focus:\s+(.+)$/m)?.[1];
  if (input && grammar) return `${input}; ${grammar}`;
  return input ?? grammar ?? markdown.split(/\r?\n/).find((line) => line.trim().startsWith('- '))?.replace(/^-\s*/, '') ?? null;
}

function hasSubstantialCorrection(markdown: string): boolean {
  const stripped = markdown
    .replace(/This section is filled by the LLM after the learner completes the page\./gi, '')
    .replace(/^###\s+.+$/gm, '')
    .replace(/```text\s*```/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return stripped.length > 30;
}
