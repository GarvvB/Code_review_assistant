import { FileCode, Clock, TrendingUp } from 'lucide-react';
import { CompleteReview } from '../types';
import { formatDate } from '../utils/fileUtils';

interface ReviewHistoryProps {
  reviews: CompleteReview[];
  onSelectReview: (review: CompleteReview) => void;
  selectedReviewId?: string;
}

export function ReviewHistory({ reviews, onSelectReview, selectedReviewId }: ReviewHistoryProps) {
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
        <FileCode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No reviews yet</p>
        <p className="text-sm text-gray-400 mt-1">Upload a code file to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">Review History</h3>
        <p className="text-sm text-gray-500 mt-0.5">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {reviews.map(review => (
          <button
            key={review.id}
            onClick={() => onSelectReview(review)}
            className={`
              w-full px-4 py-3 text-left transition-colors
              ${selectedReviewId === review.id
                ? 'bg-blue-50 border-l-4 border-l-blue-600'
                : 'hover:bg-gray-50 border-l-4 border-l-transparent'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div className={`
                p-2 rounded-lg flex-shrink-0
                ${review.status === 'completed' ? 'bg-green-100' :
                  review.status === 'analyzing' ? 'bg-blue-100' :
                  review.status === 'failed' ? 'bg-red-100' : 'bg-gray-100'}
              `}>
                <FileCode className={`
                  w-5 h-5
                  ${review.status === 'completed' ? 'text-green-600' :
                    review.status === 'analyzing' ? 'text-blue-600' :
                    review.status === 'failed' ? 'text-red-600' : 'text-gray-600'}
                `} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {review.filename}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(review.createdAt)}</span>
                  {review.language && (
                    <>
                      <span>•</span>
                      <span className="capitalize">{review.language}</span>
                    </>
                  )}
                </div>

                {review.report && (
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-3 h-3 text-gray-400" />
                    <span className={`
                      text-sm font-medium
                      ${review.report.overallScore >= 80 ? 'text-green-600' :
                        review.report.overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}
                    `}>
                      {review.report.overallScore}/100
                    </span>
                  </div>
                )}

                {review.status === 'analyzing' && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-600 h-full w-2/3 animate-pulse"></div>
                      </div>
                      <span className="text-xs text-gray-500">Analyzing...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
