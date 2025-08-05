"use client";

import { useState } from 'react';
import Modal from './Modal';

interface MfaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mfaCode: string) => void;
  isLoading: boolean;
  error?: string | null;
}

export default function MfaDialog({ isOpen, onClose, onSubmit, isLoading, error }: MfaDialogProps) {
  const [mfaCode, setMfaCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(mfaCode);
  };

  const labelClasses = "absolute left-4 top-3 text-black transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-indigo-600";
  const inputClasses = "block w-full px-4 py-3 bg-indigo-50 text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 peer";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-4">
            <h2 className="text-2xl font-bold text-center text-gray-900">Two-Factor Authentication</h2>
            <p className="mt-2 text-center text-gray-600">Please enter the code from your authenticator app.</p>
            <form onSubmit={handleSubmit} className="space-y-8 pt-6">
                <div className="relative">
                    <input
                        id="mfaCode"
                        name="mfaCode"
                        type="text"
                        required
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value)}
                        placeholder=" "
                        className={inputClasses}
                        autoComplete="one-time-code"
                    />
                    <label htmlFor="mfaCode" className={labelClasses}>6-Digit Code</label>
                </div>
                {error && <p className="text-sm text-center text-red-600">{error}</p>}
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                        Cancel
                    </button>
                    <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400">
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </button>
                </div>
            </form>
        </div>
    </Modal>
  );
}
