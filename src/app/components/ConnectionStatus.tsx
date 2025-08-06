"use client";

import { useSocketStatus } from '../lib/SocketStatusContext';

const ConnectionStatus = () => {
  const { isConnected } = useSocketStatus();

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
