import { FormEvent, useState } from 'react';
import type { SubmissionPayload } from '../types.js';

const difficultyOptions = ['太简单', '合适', '有点难', '太难'];
const completionOptions = ['完成', '未完成', '不适用'];
const stuckOptions = [
  "I don't know the words.",
  "I understand the words, but I can't use them.",
  "I don't understand `spend + time + doing`.",
  "I don't understand `must / can / cannot`.",
  "I don't know what to write.",
  'The reading/listening was too difficult.',
  'The task was too easy.',
  'The task was too hard.',
];

export function AnswerForm({
  disabled,
  onSave,
  onSubmitAndCorrect,
}: {
  disabled: boolean;
  onSave: (payload: SubmissionPayload) => Promise<void>;
  onSubmitAndCorrect: (payload: SubmissionPayload) => Promise<void>;
}) {
  const [payload, setPayload] = useState<SubmissionPayload>({
    warmupAnswers: '',
    inputCompletion: [],
    comprehensionAnswers: '',
    vocabularyAnswers: '',
    grammarAnswers: '',
    smallOutput: '',
    stuckPoints: [],
    optionalNote: '',
    completionRecord: {
      review: '完成',
      input: '完成',
      newWordsRemembered: '',
      outputSentences: '',
      errorsToday: '',
      difficulty: '合适',
      tomorrowReview: '',
    },
  });

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    await onSave(payload);
  }

  async function handleSubmitAndCorrect() {
    await onSubmitAndCorrect(payload);
  }

  function updateText(key: keyof SubmissionPayload, value: string) {
    setPayload((current) => ({ ...current, [key]: value }));
  }

  function updateRecord(key: keyof SubmissionPayload['completionRecord'], value: string) {
    setPayload((current) => ({
      ...current,
      completionRecord: { ...current.completionRecord, [key]: value },
    }));
  }

  function toggleArray(key: 'inputCompletion' | 'stuckPoints', value: string) {
    setPayload((current) => {
      const existing = current[key];
      return {
        ...current,
        [key]: existing.includes(value) ? existing.filter((item) => item !== value) : [...existing, value],
      };
    });
  }

  return (
    <form className="answer-form" onSubmit={handleSave}>
      <div className="form-grid">
        <label>
          <span>Warm-up answers</span>
          <textarea value={payload.warmupAnswers} onChange={(event) => updateText('warmupAnswers', event.target.value)} placeholder="1. B&#10;2. A&#10;3. B" />
        </label>
        <label>
          <span>Comprehension answers</span>
          <textarea value={payload.comprehensionAnswers} onChange={(event) => updateText('comprehensionAnswers', event.target.value)} placeholder="用中文回答理解题。" />
        </label>
        <label>
          <span>Vocabulary answers</span>
          <textarea value={payload.vocabularyAnswers} onChange={(event) => updateText('vocabularyAnswers', event.target.value)} placeholder="填写词汇题答案和 hard / okay / easy 感受。" />
        </label>
        <label>
          <span>Grammar answers</span>
          <textarea value={payload.grammarAnswers} onChange={(event) => updateText('grammarAnswers', event.target.value)} placeholder="填写句型/语法题答案。" />
        </label>
      </div>

      <label>
        <span>Small output</span>
        <textarea className="large-textarea" value={payload.smallOutput} onChange={(event) => updateText('smallOutput', event.target.value)} placeholder="写 Option A / B / C 的输出。" />
      </label>

      <div className="checkbox-panel">
        <h3>Input completion</h3>
        {['第 1 遍大声读', '第 2 遍默读', '第 3 遍找关键词'].map((item) => (
          <label key={item} className="checkbox-row">
            <input type="checkbox" checked={payload.inputCompletion.includes(item)} onChange={() => toggleArray('inputCompletion', item)} />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <div className="checkbox-panel">
        <h3>Stuck points</h3>
        {stuckOptions.map((item) => (
          <label key={item} className="checkbox-row">
            <input type="checkbox" checked={payload.stuckPoints.includes(item)} onChange={() => toggleArray('stuckPoints', item)} />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <div className="completion-grid">
        <label>
          <span>复习/错误修复</span>
          <select value={payload.completionRecord.review} onChange={(event) => updateRecord('review', event.target.value)}>
            {completionOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>阅读材料</span>
          <select value={payload.completionRecord.input} onChange={(event) => updateRecord('input', event.target.value)}>
            {completionOptions.slice(0, 2).map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>新词记住几个？</span>
          <input value={payload.completionRecord.newWordsRemembered} onChange={(event) => updateRecord('newWordsRemembered', event.target.value)} />
        </label>
        <label>
          <span>输出写了几句？</span>
          <input value={payload.completionRecord.outputSentences} onChange={(event) => updateRecord('outputSentences', event.target.value)} />
        </label>
        <label>
          <span>今天难度</span>
          <select value={payload.completionRecord.difficulty} onChange={(event) => updateRecord('difficulty', event.target.value)}>
            {difficultyOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>明天继续复习</span>
          <input value={payload.completionRecord.tomorrowReview} onChange={(event) => updateRecord('tomorrowReview', event.target.value)} />
        </label>
      </div>

      <label>
        <span>今天还错在哪里？</span>
        <textarea value={payload.completionRecord.errorsToday} onChange={(event) => updateRecord('errorsToday', event.target.value)} />
      </label>
      <label>
        <span>Optional note</span>
        <textarea value={payload.optionalNote} onChange={(event) => updateText('optionalNote', event.target.value)} />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={disabled}>保存提交</button>
        <button type="button" className="primary-button" disabled={disabled} onClick={handleSubmitAndCorrect}>提交并批改</button>
      </div>
    </form>
  );
}
