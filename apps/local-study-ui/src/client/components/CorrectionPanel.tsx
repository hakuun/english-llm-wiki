import type { DailyPlan } from '../types.js';
import { MarkdownBlock } from './MarkdownBlock.js';

export function CorrectionPanel({ daily }: { daily: DailyPlan }) {
  if (!daily.correction.exists) {
    return (
      <section className="panel muted-panel">
        <h2>批改结果</h2>
        <p>这篇 daily page 还没有 LLM correction section。</p>
      </section>
    );
  }

  if (!daily.correction.isCorrected) {
    return (
      <section className="panel muted-panel">
        <h2>批改结果</h2>
        <p>还没有批改结果。完成学习后点击“提交并批改”。</p>
      </section>
    );
  }

  return (
    <section className="panel correction-panel">
      <h2>批改结果</h2>
      <MarkdownBlock markdown={daily.correction.markdown ?? ''} />
    </section>
  );
}
