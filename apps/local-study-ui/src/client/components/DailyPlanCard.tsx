import type { DailyPlan } from '../types.js';
import { MarkdownBlock } from './MarkdownBlock.js';

const statusLabels: Record<string, string> = {
  planned: '待学习',
  submitted: '已提交，待批改',
  corrected: '已批改',
  unknown: '未知',
};

export function DailyPlanCard({ daily }: { daily: DailyPlan }) {
  const focus = daily.sections.find((section) => section.kind === 'focus');

  return (
    <section className="hero-card">
      <div>
        <span className={`status-pill status-${daily.status}`}>{statusLabels[daily.status] ?? daily.status}</span>
        <h1>{daily.title}</h1>
        <p className="hero-card__meta">{daily.path}</p>
      </div>
      {focus ? <MarkdownBlock markdown={focus.markdown} /> : <p>今天还没有重点摘要。</p>}
    </section>
  );
}
