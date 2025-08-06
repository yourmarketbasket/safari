"use client";

import { useState, useEffect } from 'react';
import socketService from '../services/socket.service';

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleStatusChange = (status: boolean) => {
      setIsConnected(status);
    };

    socketService.on('statusChanged', handleStatusChange);

    return () => {
      socketService.off('statusChanged', handleStatusChange);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <span className="mr-2 text-sm">System Status</span>
      <span
        className={`w-3 h-3 rounded-full ${
          isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        }`}
      ></span>
    </div>
  );
};

export default ConnectionStatus;
