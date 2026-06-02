export type DailySection = {
  id: string;
  title: string;
  kind: string;
  markdown: string;
};

export type DailyPlan = {
  exists: true;
  date: string;
  path: string;
  frontmatter: Record<string, unknown>;
  title: string;
  status: 'planned' | 'submitted' | 'corrected' | 'unknown';
  sections: DailySection[];
  submission: string | null;
  correction: {
    exists: boolean;
    isCorrected: boolean;
    markdown: string | null;
  };
  focusSummary: string | null;
};

export type MissingDailyPlan = {
  exists: false;
  date: string;
  path: string;
};

export type DailyResponse = DailyPlan | MissingDailyPlan;

export type SubmissionPayload = {
  warmupAnswers: string;
  inputCompletion: string[];
  comprehensionAnswers: string;
  vocabularyAnswers: string;
  grammarAnswers: string;
  smallOutput: string;
  stuckPoints: string[];
  optionalNote: string;
  completionRecord: {
    review: string;
    input: string;
    newWordsRemembered: string;
    outputSentences: string;
    errorsToday: string;
    difficulty: string;
    tomorrowReview: string;
  };
};

export type ClaudeJob = {
  id: string;
  type: string;
  date?: string;
  status: 'queued' | 'running' | 'succeeded' | 'failed';
  stdout: string;
  stderr: string;
  error?: string;
};

export type ProgressSummaryData = {
  daily: {
    total: number;
    planned: number;
    submitted: number;
    corrected: number;
    recent: Array<{ date: string; title: string; status: string; focus: string | null; path: string }>;
  };
  vocabulary: {
    weak: number;
    active: number;
    review: number;
    mastered: number;
    weakItems: Array<Record<string, string>>;
  };
  errors: {
    active: Array<{ title: string; pattern?: string; correction?: string; lastSeen?: string }>;
  };
  weakPoints: Array<{ title: string; evidence?: string; nextAction?: string }>;
  log: {
    recent: Array<{ date: string; category: string; title: string; body: string }>;
  };
};
