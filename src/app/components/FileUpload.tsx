"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';
import Image from 'next/image';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null); // No preview for non-image files, just show file info
      }
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: !!selectedFile
  });

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the dropzone from opening
    setSelectedFile(null);
    setPreview(null);
    onFileSelect(null);
  };

  const renderFilePreview = () => {
    if (!selectedFile) return null;

    return (
      <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {preview ? (
            <Image src={preview} alt="Preview" width={40} height={40} className="rounded" />
          ) : (
            <FiFile className="w-8 h-8 text-gray-500" />
          )}
          <div className="text-left">
            <p className="text-sm font-medium text-gray-800 truncate">{selectedFile.name}</p>
            <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRemoveFile}
          className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-100 transition-colors"
          aria-label="Remove file"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div>
        <div
            {...getRootProps()}
            className={`border-2 border-dashed border-gray-400 rounded-lg p-8 text-center transition-colors
            ${!!selectedFile ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer hover:border-gray-600'}
            ${isDragActive ? 'border-indigo-600' : ''}`}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
                <FiUploadCloud className={`w-12 h-12 mb-4 ${!!selectedFile ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`${!!selectedFile ? 'text-gray-500' : 'text-gray-700'}`}>
                    {isDragActive ? 'Drop the file here...' : 'Drag & drop a file here, or click to select'}
                </p>
                {!!selectedFile && <p className="text-sm text-gray-500 mt-2">A file is already selected.</p>}
            </div>
        </div>
        {renderFilePreview()}
    </div>
  );
}
