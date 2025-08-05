"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

export default function FileUpload({ onFileChange }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileChange(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:border-gray-600 transition-colors">
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="Avatar preview" className="w-32 h-32 rounded-full mx-auto" />
      ) : (
        <div className="flex flex-col items-center">
          <FiUploadCloud className="w-16 h-16 text-gray-500 mb-4" />
          {isDragActive ? (
            <p className="text-gray-700">Drop the files here ...</p>
          ) : (
            <p className="text-gray-700">Drag &apos;n&apos; drop some files here, or click to select files</p>
          )}
        </div>
      )}
    </div>
  );
}
