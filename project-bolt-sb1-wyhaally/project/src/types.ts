export interface CodeReview {
  id: string;
  filename: string;
  fileContent: string;
  language: string;
  fileSize: number;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  createdAt: Date;
}

export interface ReviewReport {
  id: string;
  codeReviewId: string;
  overallScore: number;
  readabilityScore: number;
  modularityScore: number;
  bestPracticesScore: number;
  summary: string;
  createdAt: Date;
}

export interface ReviewSuggestion {
  id: string;
  reportId: string;
  category: 'readability' | 'modularity' | 'bug' | 'performance' | 'security' | 'best_practice';
  severity: 'low' | 'medium' | 'high' | 'critical';
  lineNumber?: number;
  title: string;
  description: string;
  codeSnippet?: string;
  suggestedFix?: string;
}

export interface CompleteReview extends CodeReview {
  report?: ReviewReport;
  suggestions?: ReviewSuggestion[];
}
