"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiFileText, FiVideo, FiMusic, FiFile } from 'react-icons/fi';
import Image from 'next/image';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileSelect(file);
      setFileType(file.type);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        setPreview(URL.createObjectURL(file));
      } else if (file.type.startsWith('text/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target?.result as string);
        };
        reader.readAsText(file);
      } else {
        setPreview(null);
      }
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const renderPreview = () => {
    if (!fileType) {
      return (
        <div className="flex flex-col items-center">
          <FiUploadCloud className="w-16 h-16 text-gray-500 mb-4" />
          {isDragActive ? (
            <p className="text-gray-700">Drop the files here ...</p>
          ) : (
            <p className="text-gray-700">Drag &apos;n&apos; drop some files here, or click to select files</p>
          )}
        </div>
      );
    }

    if (fileType.startsWith('image/')) {
      return <Image src={preview!} alt="File preview" width={128} height={128} className="rounded-lg mx-auto" />;
    }

    if (fileType === 'application/pdf') {
      return <embed src={preview!} type="application/pdf" width="100%" height="200px" />;
    }

    if (fileType.startsWith('text/')) {
      return <pre className="text-left text-xs bg-gray-100 p-2 rounded-lg overflow-auto max-h-48">{preview}</pre>;
    }

    if (fileType.startsWith('video/')) {
        return <FiVideo className="w-16 h-16 text-gray-500 mx-auto" />;
    }

    if (fileType.startsWith('audio/')) {
        return <FiMusic className="w-16 h-16 text-gray-500 mx-auto" />;
    }

    return <FiFile className="w-16 h-16 text-gray-500 mx-auto" />;
  };

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:border-gray-600 transition-colors">
      <input {...getInputProps()} />
      {renderPreview()}
    </div>
  );
}
