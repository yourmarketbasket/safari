"use client";

import { useAuth } from '../lib/AuthContext';
import { useState } from 'react';
import Image from 'next/image';
import LoadingOverlay from '../components/LoadingOverlay';
import Modal from '../components/Modal';

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
    // In a real app, this would send the message to a support service
    console.log('Support message:', supportMessage);
    setSupportMessage('');
    setIsSupportModalOpen(false);
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-2xl shadow-xl text-center">
        <div className="flex flex-col items-center">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={128}
              height={128}
              className="rounded-full mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <span className="text-4xl text-gray-500">{user.name.charAt(0)}</span>
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-lg">
          <h2 className="font-bold">Account Pending Approval</h2>
          <p>Your account has been created successfully, but it is currently pending approval from an administrator. You will be notified once your account is approved. You will not have access to the dashboard until your account is approved.</p>
        </div>
        {messageSent && (
          <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg">
            <p>Your message has been sent to support. We will get back to you shortly.</p>
          </div>
        )}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Contact Support
          </button>
          <button
            onClick={logout}
            className="w-full px-4 py-3 font-bold text-indigo-600 bg-transparent border border-indigo-600 rounded-lg hover:bg-indigo-50"
          >
            Logout
          </button>
        </div>
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
            className="w-full h-32 p-2 border border-gray-300 rounded-md"
            placeholder="Type your message here..."
            required
          />
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Send Message
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
