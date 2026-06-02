import { promises as fs } from 'node:fs';
import path from 'node:path';
import { wikiRoot } from '../../config.js';
import { parseMarkdownTable } from '../markdown/tableParser.js';

export async function readVocabularySummary(): Promise<{
  weak: number;
  active: number;
  review: number;
  mastered: number;
  weakItems: Array<Record<string, string>>;
}> {
  const filePath = path.join(wikiRoot, 'vocabulary', 'vocabulary-review.md');
  const raw = await fs.readFile(filePath, 'utf8');
  const activeSection = raw.split(/^##\s+Active Vocabulary\s*$/m)[1]?.split(/^##\s+/m)[0] ?? '';
  const rows = parseMarkdownTable(activeSection);

  const count = (status: string) => rows.filter((row) => row.status === status).length;

  return {
    weak: count('weak'),
    active: count('active'),
    review: count('review'),
    mastered: count('mastered'),
    weakItems: rows.filter((row) => row.status === 'weak'),
  };
}
