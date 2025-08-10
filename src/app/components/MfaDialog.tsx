"use client";

import { useState } from 'react';
import Modal from './Modal';
import { Button } from './ui/Button';

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
                    <Button type="button" onClick={onClose} variant="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </Button>
                </div>
            </form>
        </div>
    </Modal>
  );
}
