"use client";

import { useAuth } from '../lib/AuthContext';
import { useState } from 'react';
import LoadingOverlay from '../components/LoadingOverlay';
import Modal from '../components/Modal';
import { FiCheck, FiClock, FiHelpCircle, FiLogOut, FiUser, FiMail } from 'react-icons/fi';
import { Button } from '../components/ui/Button';

export default function PendingApprovalPage() {
  const { user, logout } = useAuth();
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  if (!user) {
    return <LoadingOverlay />;
  }

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support message:', supportMessage);
    setSupportMessage('');
    setIsSupportModalOpen(false);
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
  };

  const steps = [
    { name: 'Signed Up', status: 'complete', icon: FiUser },
    { name: 'Email Verification', status: 'complete', icon: FiMail },
    { name: 'Logged In', status: 'complete', icon: FiCheck },
    { name: 'Waiting Approval', status: 'current', icon: FiClock },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Welcome, {user.name}!</h1>
          <p className="text-gray-500 mt-2">Your account is almost ready.</p>

          <div className="my-12">
            <nav aria-label="Progress">
              <ol role="list" className="flex items-center">
                {steps.map((step, stepIdx) => (
                  <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                    {step.status === 'complete' ? (
                      <>
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="h-0.5 w-full bg-indigo-600" />
                        </div>
                        <div className="relative w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full">
                          <step.icon className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                      </>
                    ) : step.status === 'current' ? (
                      <>
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="h-0.5 w-full bg-gray-200" />
                        </div>
                        <div className="relative w-10 h-10 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                          <step.icon className="w-6 h-6 text-indigo-600" aria-hidden="true" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="h-0.5 w-full bg-gray-200" />
                        </div>
                        <div className="relative w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full">
                          <step.icon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                        </div>
                      </>
                    )}
                    <div className="absolute top-12 w-20 text-center">
                      <p className="text-sm font-medium text-gray-600">{step.name}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <div className="p-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-2xl">
            <h2 className="font-semibold">Your account is pending administrator approval.</h2>
            <p className="text-sm mt-1">You will be notified via email once approved. You will not have access to the dashboard until then.</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-6">
            <Button onClick={() => setIsSupportModalOpen(true)} variant="ghost">
                <FiHelpCircle className="w-8 h-8" />
                <span className="sr-only">Contact Support</span>
            </Button>
            <Button onClick={logout} variant="ghost">
                <FiLogOut className="w-8 h-8" />
                <span className="sr-only">Logout</span>
            </Button>
        </div>
        {messageSent && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg shadow-sm text-center">
            <p>Your message has been sent to support.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        title="Contact Support"
        description="Please describe your issue below. Our support team will get back to you as soon as possible."
      >
        <form onSubmit={handleSupportSubmit}>
          <textarea
            value={supportMessage}
            onChange={(e) => setSupportMessage(e.target.value)}
            className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your message here..."
            required
          />
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
            >
              Send Message
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
