import { Book, Box, CheckCircle, FileCode } from 'lucide-react';
import { CompleteReview } from '../types';
import { ScoreCard } from './ScoreCard';
import { SuggestionCard } from './SuggestionCard';

interface ReviewReportProps {
  review: CompleteReview;
}

export function ReviewReport({ review }: ReviewReportProps) {
  if (!review.report || !review.suggestions) {
    return null;
  }

  const { report, suggestions } = review;

  const suggestionsByCategory = suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = [];
    }
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {} as Record<string, typeof suggestions>);

  const suggestionsBySeverity = suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.severity]) {
      acc[suggestion.severity] = [];
    }
    acc[suggestion.severity].push(suggestion);
    return acc;
  }, {} as Record<string, typeof suggestions>);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <FileCode className="w-8 h-8" />
          <h2 className="text-2xl font-bold">{review.filename}</h2>
        </div>
        <p className="text-blue-100 leading-relaxed">{report.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard
          title="Overall Score"
          score={report.overallScore}
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <ScoreCard
          title="Readability"
          score={report.readabilityScore}
          icon={<Book className="w-5 h-5" />}
        />
        <ScoreCard
          title="Modularity"
          score={report.modularityScore}
          icon={<Box className="w-5 h-5" />}
        />
        <ScoreCard
          title="Best Practices"
          score={report.bestPracticesScore}
          icon={<CheckCircle className="w-5 h-5" />}
        />
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Review Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-gray-900">{suggestions.length}</p>
            <p className="text-sm text-gray-600">Total Issues</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-red-600">
              {suggestionsBySeverity.critical?.length || 0}
            </p>
            <p className="text-sm text-gray-600">Critical</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-orange-600">
              {suggestionsBySeverity.high?.length || 0}
            </p>
            <p className="text-sm text-gray-600">High</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-yellow-600">
              {suggestionsBySeverity.medium?.length || 0}
            </p>
            <p className="text-sm text-gray-600">Medium</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Suggestions for Improvement
        </h3>
        <div className="space-y-4">
          {suggestions
            .sort((a, b) => {
              const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
              return severityOrder[a.severity] - severityOrder[b.severity];
            })
            .map(suggestion => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
        </div>
      </div>
    </div>
  );
}
