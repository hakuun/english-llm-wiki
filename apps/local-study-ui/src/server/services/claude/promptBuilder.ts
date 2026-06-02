export function buildGenerateTodayPrompt(date: string): string {
  return [
    '请遵守 CLAUDE.md 和 wiki/study-plans/command-shortcuts.md。',
    '执行“制定今天的学习计划”。',
    `请创建或更新 wiki/study-plans/daily/${date}.md。`,
    '默认 30 分钟，review-first，基于最近完成记录、错误、词汇和难度反馈。',
    '完成后按现有规则更新必要的索引和 wiki/log.md。',
    '不要执行 shell 命令。',
  ].join('\n');
}

export function buildCorrectDailyPrompt(date: string): string {
  return [
    '我完成了今天的计划。',
    '请遵守 CLAUDE.md 和 wiki/study-plans/command-shortcuts.md。',
    `请读取 wiki/study-plans/daily/${date}.md，特别是 ## UI completion submission。`,
    '执行 daily correction and wiki update：',
    '- 在 daily page 的 LLM correction and update section 写入批改结果',
    '- 更新 wiki/vocabulary/vocabulary-review.md',
    '- 只在 repeated/high-value/blocking evidence 足够时更新 wiki/profile/error-patterns.md',
    '- 只在证据足够时更新 wiki/profile/weak-points.md',
    '- append 更新 wiki/log.md',
    "- 给出 tomorrow's likely review focus",
    '不要执行 shell 命令。',
  ].join('\n');
}
