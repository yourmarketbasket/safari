"use client";

import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string;
  title?: string;
  description?: string;
}

export default function Modal({ isOpen, onClose, children, widthClass = 'max-w-lg', title, description }: ModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }
  // force //

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className={`relative w-full ${widthClass} p-6 mx-auto bg-white rounded-lg shadow-xl`}>
        {title && <h2 id="modal-title" className="text-lg font-bold text-gray-900">{title}</h2>}
        {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

// force