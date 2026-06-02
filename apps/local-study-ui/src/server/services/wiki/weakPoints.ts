import { promises as fs } from 'node:fs';
import path from 'node:path';
import { wikiRoot } from '../../config.js';

export async function readWeakPoints(): Promise<Array<{
  title: string;
  evidence?: string;
  nextAction?: string;
}>> {
  const filePath = path.join(wikiRoot, 'profile', 'weak-points.md');
  const raw = await fs.readFile(filePath, 'utf8');
  const current = raw.split(/^##\s+Current weak points\s*$/m)[1]?.split(/^##\s+/m)[0] ?? raw;
  const blocks = current.split(/^###\s+/m).slice(1);

  return blocks.map((block) => {
    const [titleLine = '', ...rest] = block.split(/\r?\n/);
    const content = rest.join('\n');
    return {
      title: titleLine.trim(),
      evidence: extractParagraphAfterLabel(content, 'Evidence'),
      nextAction: extractParagraphAfterLabel(content, 'Next action'),
    };
  }).filter((item) => item.title.length > 0);
}

function extractParagraphAfterLabel(content: string, label: string): string | undefined {
  const match = content.match(new RegExp(`${label}:\\s*\\n?([\\s\\S]*?)(?=\\n[A-Z][A-Za-z ]+:|$)`, 'i'));
  return match?.[1].trim().replace(/\n+/g, ' ');
}
