import { promises as fs } from 'node:fs';
import path from 'node:path';
import { wikiRoot } from '../../config.js';

export async function readRecentLogEntries(limit = 8): Promise<Array<{
  date: string;
  category: string;
  title: string;
  body: string;
}>> {
  const filePath = path.join(wikiRoot, 'log.md');
  const raw = await fs.readFile(filePath, 'utf8');
  const entryPattern = /^##\s+\[(\d{4}-\d{2}-\d{2})\]\s+([^|]+)\|\s*(.+)$/gm;
  const matches = [...raw.matchAll(entryPattern)];

  return matches.slice(0, limit).map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? raw.length;
    return {
      date: match[1],
      category: match[2].trim(),
      title: match[3].trim(),
      body: raw.slice(start, end).trim(),
    };
  });
}
