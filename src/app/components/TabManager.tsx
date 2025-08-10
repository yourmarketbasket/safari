"use client";

import { useEffect, useState, useCallback } from 'react';
import Modal from './Modal';

export default function TabManager() {
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleKeepThisTab = useCallback(() => {
    const channel = new BroadcastChannel('tab_manager');
    channel.postMessage('close_original_tab');
    setIsDuplicate(false);
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
        if (isOriginal) {
          channel.postMessage('original_tab_exists');
        }
      } else if (event.data === 'original_tab_exists') {
        isOriginal = false;
        setIsDuplicate(true);
      } else if (event.data === 'close_original_tab') {
        if (isOriginal) {
          window.close();
        }
      }
    };

    channel.addEventListener('message', handleMessage);
    channel.postMessage('new_tab_opened');

    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, []);

  return (
    <Modal
      isOpen={isDuplicate}
      onClose={() => {}}
      title="Multiple Tabs Detected"
      description="This application is already open in another tab. Please choose which tab to use."
      widthClass="max-w-md"
    >
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={handleKeepThisTab}
          className="px-6 py-2 text-sm font-medium text-pink-600 bg-transparent border-2 border-pink-600 rounded-full hover:bg-pink-50 transition-colors duration-200"
        >
          Use Here
        </button>
        <button
          onClick={handleCloseThisTab}
          className="px-6 py-2 text-sm font-medium text-pink-600 bg-transparent border-2 border-pink-600 rounded-full hover:bg-pink-50 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
