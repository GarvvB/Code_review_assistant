import { CodeReview, ReviewReport, ReviewSuggestion } from '../types';

interface AnalysisResult {
  report: ReviewReport;
  suggestions: ReviewSuggestion[];
}

export async function analyzeCode(review: CodeReview): Promise<AnalysisResult> {
  const prompt = `You are an expert code reviewer. Review the following ${review.language || 'code'} for readability, modularity, potential bugs, performance issues, security vulnerabilities, and adherence to best practices.

Filename: ${review.filename}
Code:
\`\`\`
${review.fileContent}
\`\`\`

Provide a comprehensive review in the following JSON format:
{
  "overallScore": <0-100>,
  "readabilityScore": <0-100>,
  "modularityScore": <0-100>,
  "bestPracticesScore": <0-100>,
  "summary": "<brief overall assessment>",
  "suggestions": [
    {
      "category": "<readability|modularity|bug|performance|security|best_practice>",
      "severity": "<low|medium|high|critical>",
      "lineNumber": <optional line number>,
      "title": "<brief issue title>",
      "description": "<detailed explanation>",
      "codeSnippet": "<optional relevant code>",
      "suggestedFix": "<optional recommended solution>"
    }
  ]
}

Focus on providing actionable, specific feedback. Identify at least 3-5 suggestions for improvement.`;

  try {
    const analysis = await mockLLMAnalysis(review);

    const reportId = crypto.randomUUID();
    const report: ReviewReport = {
      id: reportId,
      codeReviewId: review.id,
      overallScore: analysis.overallScore,
      readabilityScore: analysis.readabilityScore,
      modularityScore: analysis.modularityScore,
      bestPracticesScore: analysis.bestPracticesScore,
      summary: analysis.summary,
      createdAt: new Date(),
    };

    const suggestions: ReviewSuggestion[] = analysis.suggestions.map(s => ({
      id: crypto.randomUUID(),
      reportId,
      category: s.category,
      severity: s.severity,
      lineNumber: s.lineNumber,
      title: s.title,
      description: s.description,
      codeSnippet: s.codeSnippet,
      suggestedFix: s.suggestedFix,
    }));

    return { report, suggestions };
  } catch (error) {
    throw new Error('Failed to analyze code: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

async function mockLLMAnalysis(review: CodeReview) {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const lines = review.fileContent.split('\n');
  const hasComments = review.fileContent.includes('//') || review.fileContent.includes('/*');
  const hasFunctions = review.fileContent.includes('function') || review.fileContent.includes('=>');
  const hasTypeErrors = review.fileContent.includes('any') || !review.fileContent.includes('type');
  const longLines = lines.filter(line => line.length > 100).length;
  const totalLines = lines.length;

  let overallScore = 75;
  let readabilityScore = 80;
  let modularityScore = 70;
  let bestPracticesScore = 75;

  if (!hasComments) readabilityScore -= 15;
  if (longLines > totalLines * 0.3) readabilityScore -= 10;
  if (totalLines > 300) modularityScore -= 20;
  if (hasTypeErrors && review.language === 'typescript') bestPracticesScore -= 15;

  overallScore = Math.round((readabilityScore + modularityScore + bestPracticesScore) / 3);

  const suggestions = [];

  if (!hasComments) {
    suggestions.push({
      category: 'readability',
      severity: 'medium',
      title: 'Insufficient code documentation',
      description: 'The code lacks comments explaining complex logic and function purposes. Adding descriptive comments will improve maintainability and help other developers understand the codebase.',
      suggestedFix: 'Add JSDoc comments for functions and inline comments for complex logic blocks.',
    });
  }

  if (longLines > 0) {
    suggestions.push({
      category: 'readability',
      severity: 'low',
      title: 'Long lines detected',
      description: `Found ${longLines} lines exceeding 100 characters. Long lines can be difficult to read and may cause horizontal scrolling.`,
      suggestedFix: 'Break long lines into multiple lines, especially for long strings, complex conditions, or chained method calls.',
    });
  }

  if (totalLines > 200) {
    suggestions.push({
      category: 'modularity',
      severity: 'high',
      title: 'Large file size',
      description: `This file contains ${totalLines} lines of code. Large files are harder to maintain, test, and understand. Consider breaking it into smaller, focused modules.`,
      suggestedFix: 'Extract related functionality into separate files. Group related components, utilities, or services into logical modules.',
    });
  }

  if (hasTypeErrors && review.language === 'typescript') {
    suggestions.push({
      category: 'best_practice',
      severity: 'high',
      title: 'Weak typing detected',
      description: 'Usage of "any" type or missing type annotations weakens TypeScript\'s type safety. This can lead to runtime errors and reduces code quality.',
      suggestedFix: 'Replace "any" with specific types. Add explicit type annotations for function parameters and return values.',
    });
  }

  if (!review.fileContent.includes('try') && hasFunctions) {
    suggestions.push({
      category: 'bug',
      severity: 'medium',
      title: 'Missing error handling',
      description: 'No error handling mechanisms detected. Without proper error handling, unexpected issues can crash the application.',
      suggestedFix: 'Add try-catch blocks around operations that might fail. Implement proper error logging and user feedback.',
    });
  }

  if (review.fileContent.includes('console.log')) {
    suggestions.push({
      category: 'best_practice',
      severity: 'low',
      title: 'Console statements in code',
      description: 'Console.log statements found. These should be removed or replaced with proper logging in production code.',
      suggestedFix: 'Remove debug console statements or replace with a proper logging library.',
    });
  }

  const summary = overallScore >= 80
    ? `Good code quality with ${suggestions.length} areas for improvement. The code demonstrates solid practices but could benefit from attention to documentation and structure.`
    : overallScore >= 60
    ? `Moderate code quality with several areas needing attention. Focus on improving readability, modularity, and following best practices.`
    : `Code needs significant improvement. Multiple issues detected that impact maintainability, readability, and potential reliability.`;

  return {
    overallScore,
    readabilityScore,
    modularityScore,
    bestPracticesScore,
    summary,
    suggestions,
  };
}
