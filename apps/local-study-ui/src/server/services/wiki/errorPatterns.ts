import { promises as fs } from 'node:fs';
import path from 'node:path';
import { wikiRoot } from '../../config.js';

export async function readActiveErrorPatterns(): Promise<Array<{
  title: string;
  pattern?: string;
  correction?: string;
  lastSeen?: string;
}>> {
  const filePath = path.join(wikiRoot, 'profile', 'error-patterns.md');
  const raw = await fs.readFile(filePath, 'utf8');
  const blocks = raw.split(/^##\s+Error:\s+/m).slice(1);

  return blocks
    .map((block) => {
      const [titleLine = '', ...rest] = block.split(/\r?\n/);
      const content = rest.join('\n');
      if (!/^Status:\s*active\s*$/mi.test(content)) {
        return null;
      }

      return {
        title: titleLine.trim(),
        pattern: extractField(content, 'Pattern'),
        correction: extractField(content, 'Correction'),
        lastSeen: extractField(content, 'Last seen'),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

function extractField(content: string, field: string): string | undefined {
  const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return content.match(new RegExp(`^${escaped}:\\s*(.+)$`, 'mi'))?.[1].trim();
}
