import create from 'zustand';
import { io, Socket } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

interface SocketState {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const useSocketStore = create<SocketState>((set) => ({
  isConnected: false,
  connect: () => {
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
      set({ isConnected: false });
    });

    socket.on('userConnected', () => {
      console.log('userConnected event received');
      set({ isConnected: true });
    });

    socket.on('userDisconnected', () => {
      console.log('userDisconnected event received');
      set({ isConnected: false });
    });
  },
  disconnect: () => {
    // This is a bit tricky with zustand, as we don't have a single socket instance to disconnect.
    // For now, we'll just set the state to disconnected.
    set({ isConnected: false });
  },
}));

export default useSocketStore;
