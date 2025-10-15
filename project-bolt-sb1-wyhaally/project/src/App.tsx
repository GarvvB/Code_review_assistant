import { useState } from 'react';
import { FileCode, RefreshCw, ArrowLeft, Sparkles } from 'lucide-react';
import { CompleteReview, CodeReview } from './types';
import { FileUpload } from './components/FileUpload';
import { CodePreview } from './components/CodePreview';
import { ReviewReport } from './components/ReviewReport';
import { ReviewHistory } from './components/ReviewHistory';
import { detectLanguage } from './utils/fileUtils';
import { analyzeCode } from './services/codeAnalyzer';

type ViewMode = 'upload' | 'analyzing' | 'results';

function App() {
  const [reviews, setReviews] = useState<CompleteReview[]>([]);
  const [currentReview, setCurrentReview] = useState<CodeReview | null>(null);
  const [selectedReview, setSelectedReview] = useState<CompleteReview | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('upload');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = async (file: File) => {
    try {
      const content = await file.text();
      const language = detectLanguage(file.name);

      const review: CodeReview = {
        id: crypto.randomUUID(),
        filename: file.name,
        fileContent: content,
        language,
        fileSize: file.size,
        status: 'pending',
        createdAt: new Date(),
      };

      setCurrentReview(review);
      setViewMode('upload');
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Failed to read file. Please try again.');
    }
  };

  const handleStartAnalysis = async () => {
    if (!currentReview) return;

    setIsAnalyzing(true);
    setViewMode('analyzing');

    try {
      currentReview.status = 'analyzing';

      const tempReview: CompleteReview = { ...currentReview };
      setReviews(prev => [tempReview, ...prev]);

      const { report, suggestions } = await analyzeCode(currentReview);

      currentReview.status = 'completed';
      const completeReview: CompleteReview = {
        ...currentReview,
        report,
        suggestions,
      };

      setReviews(prev => prev.map(r => r.id === completeReview.id ? completeReview : r));
      setSelectedReview(completeReview);
      setViewMode('results');
    } catch (error) {
      console.error('Analysis error:', error);
      currentReview.status = 'failed';
      setReviews(prev => prev.map(r => r.id === currentReview.id ? { ...currentReview } : r));
      alert('Failed to analyze code. Please try again.');
      setViewMode('upload');
    } finally {
      setIsAnalyzing(false);
      setCurrentReview(null);
    }
  };

  const handleReset = () => {
    setCurrentReview(null);
    setSelectedReview(null);
    setViewMode('upload');
  };

  const handleSelectReview = (review: CompleteReview) => {
    setSelectedReview(review);
    setViewMode('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg shadow-md">
                <FileCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Code Review Assistant</h1>
                <p className="text-sm text-gray-500">Automated code analysis powered by AI</p>
              </div>
            </div>

            {(viewMode === 'results' || reviews.length > 0) && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <FileCode className="w-4 h-4" />
                New Review
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {viewMode === 'upload' && !currentReview && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Upload Code for Review</h2>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Upload a source code file to receive automated analysis on readability, modularity,
                    potential bugs, and best practices adherence.
                  </p>
                  <FileUpload onFileSelect={handleFileSelect} />
                </div>

                {reviews.length > 0 && selectedReview && (
                  <ReviewReport review={selectedReview} />
                )}
              </div>
            )}

            {viewMode === 'upload' && currentReview && (
              <div className="space-y-6">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <CodePreview
                  filename={currentReview.filename}
                  content={currentReview.fileContent}
                  language={currentReview.language}
                  fileSize={currentReview.fileSize}
                  onRemove={handleReset}
                />

                <button
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Code Analysis
                </button>
              </div>
            )}

            {viewMode === 'analyzing' && (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-200">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <RefreshCw className="w-16 h-16 text-blue-600 animate-spin" />
                    <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Analyzing Your Code
                </h3>
                <p className="text-gray-600 mb-4">
                  Our AI is reviewing your code for readability, modularity, bugs, and best practices...
                </p>
                <div className="max-w-xs mx-auto">
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'results' && selectedReview && (
              <div className="space-y-6">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Upload
                </button>
                <ReviewReport review={selectedReview} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <ReviewHistory
              reviews={reviews}
              onSelectReview={handleSelectReview}
              selectedReviewId={selectedReview?.id}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            Code Review Assistant - Automated code analysis for better software quality
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
