"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

interface SocketStatusContextType {
  isConnected: boolean;
}

const SocketStatusContext = createContext<SocketStatusContextType | undefined>(undefined);

export const SocketStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket: Socket = io(URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setIsConnected(false);
    });

    socket.on('userConnected', () => {
      console.log('userConnected event received');
      setIsConnected(true);
    });

    socket.on('userDisconnected', () => {
      console.log('userDisconnected event received');
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const value = {
    isConnected,
  };

  return (
    <SocketStatusContext.Provider value={value}>
      {children}
    </SocketStatusContext.Provider>
  );
};

export const useSocketStatus = () => {
  const context = useContext(SocketStatusContext);
  if (context === undefined) {
    throw new Error('useSocketStatus must be used within a SocketStatusProvider');
  }
  return context;
};
