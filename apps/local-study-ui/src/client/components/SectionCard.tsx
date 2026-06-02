import type { DailySection } from '../types.js';
import { MarkdownBlock } from './MarkdownBlock.js';

const labels: Record<string, string> = {
  focus: '今日重点',
  review: '复习修复',
  warmup: '热身选择',
  input: '输入材料',
  comprehension: '理解检查',
  vocabulary: '词汇练习',
  grammar: '句型语法',
  output: '小输出',
  speaking: '朗读练习',
  stuck: '卡点反馈',
  completion: '完成记录',
  submission: '网页提交',
  correction: 'LLM 批改',
  unknown: '学习内容',
};

export function SectionCard({ section }: { section: DailySection }) {
  return (
    <article className={`section-card section-${section.kind}`}>
      <div className="section-card__header">
        <span className="section-card__eyebrow">{labels[section.kind] ?? '学习内容'}</span>
        <h3>{section.title}</h3>
      </div>
      <MarkdownBlock markdown={section.markdown} />
    </article>
  );
}
