import { Upload, FileCode } from 'lucide-react';
import { useState, useRef } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
        transition-all duration-200
        ${isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50'
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.rb,.go,.rs,.php,.swift,.kt,.scala,.html,.css,.sql,.sh,.json,.xml,.yaml,.yml"
      />

      <div className="flex flex-col items-center gap-4">
        {isDragging ? (
          <FileCode className="w-16 h-16 text-blue-500" />
        ) : (
          <Upload className="w-16 h-16 text-gray-400" />
        )}

        <div>
          <p className="text-lg font-medium text-gray-700 mb-1">
            {isDragging ? 'Drop your file here' : 'Upload a code file'}
          </p>
          <p className="text-sm text-gray-500">
            Drag and drop or click to browse
          </p>
        </div>

        <p className="text-xs text-gray-400">
          Supports JavaScript, TypeScript, Python, Java, and more
        </p>
      </div>
    </div>
  );
}
