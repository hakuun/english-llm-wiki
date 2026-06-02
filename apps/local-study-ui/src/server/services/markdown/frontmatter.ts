import matter from 'gray-matter';

export function parseMarkdownWithFrontmatter(markdown: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  const parsed = matter(markdown);
  return {
    frontmatter: parsed.data,
    body: parsed.content,
  };
}
