import { AlertCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import { ReviewSuggestion } from '../types';

interface SuggestionCardProps {
  suggestion: ReviewSuggestion;
}

export function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    const className = "w-5 h-5";
    switch (severity) {
      case 'critical':
        return <XCircle className={`${className} text-red-600`} />;
      case 'high':
        return <AlertCircle className={`${className} text-orange-600`} />;
      case 'medium':
        return <AlertTriangle className={`${className} text-yellow-600`} />;
      case 'low':
        return <Info className={`${className} text-blue-600`} />;
      default:
        return <Info className={`${className} text-gray-600`} />;
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className={`border-l-4 rounded-lg p-4 bg-white shadow-sm ${getSeverityColor(suggestion.severity)}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getSeverityIcon(suggestion.severity)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
              {getCategoryLabel(suggestion.category)}
            </span>
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded uppercase">
              {suggestion.severity}
            </span>
            {suggestion.lineNumber && (
              <span className="text-xs text-gray-500">
                Line {suggestion.lineNumber}
              </span>
            )}
          </div>

          <h4 className="text-base font-semibold text-gray-900 mb-2">
            {suggestion.title}
          </h4>

          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
            {suggestion.description}
          </p>

          {suggestion.codeSnippet && (
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-600 mb-1">Code Snippet:</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                <code>{suggestion.codeSnippet}</code>
              </pre>
            </div>
          )}

          {suggestion.suggestedFix && (
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <p className="text-xs font-medium text-green-800 mb-1">Suggested Fix:</p>
              <p className="text-sm text-green-900">{suggestion.suggestedFix}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
