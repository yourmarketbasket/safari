"use client";

import { useState, useEffect } from 'react';
import socketService from '../services/socket.service';

interface ConnectionStatusProps {
  isCollapsed: boolean;
}

const ConnectionStatus = ({ isCollapsed }: ConnectionStatusProps) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socketService.on('connect', onConnect);
    socketService.on('disconnect', onDisconnect);

    return () => {
      // No need to remove listeners on 'disconnect' as the socket instance is destroyed
    };
  }, []);

  return (
    <div className={`absolute ${isCollapsed ? 'top-0 right-0' : ''}`}>
      <span
        className={`w-3 h-3 rounded-full ${
          isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        } ${isCollapsed ? 'w-2 h-2' : ''}`}
      ></span>
    </div>
  );
};

export default ConnectionStatus;
