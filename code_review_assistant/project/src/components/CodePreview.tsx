import { X, FileCode } from 'lucide-react';
import { formatFileSize } from '../utils/fileUtils';

interface CodePreviewProps {
  filename: string;
  content: string;
  language: string;
  fileSize: number;
  onRemove: () => void;
}

export function CodePreview({ filename, content, language, fileSize, onRemove }: CodePreviewProps) {
  const lines = content.split('\n');
  const displayLines = lines.slice(0, 20);
  const hasMore = lines.length > 20;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <FileCode className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">{filename}</p>
            <p className="text-xs text-gray-500">
              {language} • {formatFileSize(fileSize)} • {lines.length} lines
            </p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
          aria-label="Remove file"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="bg-gray-900 text-gray-100 p-4 overflow-x-auto max-h-96 overflow-y-auto">
        <pre className="text-sm font-mono">
          {displayLines.map((line, index) => (
            <div key={index} className="flex">
              <span className="text-gray-500 select-none mr-4 text-right w-8">
                {index + 1}
              </span>
              <span className="flex-1">{line || ' '}</span>
            </div>
          ))}
          {hasMore && (
            <div className="text-gray-500 italic mt-2">
              ... {lines.length - 20} more lines
            </div>
          )}
        </pre>
      </div>
    </div>
  );
}
