"use client";

import { useEffect, useState, useCallback } from 'react';
import Modal from './Modal';

export default function TabManager() {
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleKeepThisTab = useCallback(() => {
    const channel = new BroadcastChannel('tab_manager');
    channel.postMessage('close_original_tab');
    setIsDuplicate(false);
    // This tab will now become the "original" implicitly
    // because the real original will close.
    channel.close();
  }, []);

  const handleCloseThisTab = useCallback(() => {
    window.close();
  }, []);

  useEffect(() => {
    if (!('BroadcastChannel' in window)) {
      console.warn('BroadcastChannel is not supported in this browser.');
      return;
    }

    const channel = new BroadcastChannel('tab_manager');
    let isOriginal = true;

    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'new_tab_opened') {
        // Another tab opened after this one. This is the original.
        // It tells the new one that an original already exists.
        if (isOriginal) {
          channel.postMessage('original_tab_exists');
        }
      } else if (event.data === 'original_tab_exists') {
        // This is a new tab, and it has been informed that an original exists.
        isOriginal = false;
        setIsDuplicate(true); // Show the modal in this new tab.
      } else if (event.data === 'close_original_tab') {
        // This message is sent by a new tab that wants to take over.
        if (isOriginal) {
          window.close(); // The original tab closes itself.
        }
      }
    };

    channel.addEventListener('message', handleMessage);

    // Announce that a new tab has opened.
    channel.postMessage('new_tab_opened');

    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, []);

  return (
    <Modal
      isOpen={isDuplicate}
      onClose={() => {}} // Prevent closing by clicking outside
      title="Multiple Tabs Detected"
      description="This application is already open in another tab. What would you like to do?"
    >
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={handleKeepThisTab}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Use This Tab
        </button>
        <button
          onClick={handleCloseThisTab}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Close This Tab
        </button>
      </div>
    </Modal>
  );
}
