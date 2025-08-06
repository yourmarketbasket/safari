import { io, Socket } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

import { EventEmitter } from 'events';

class SocketService extends EventEmitter {
  private socket: Socket | null = null;

  connect(): void {
    if (!this.socket) {
      this.socket = io(URL, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      this.socket.on('connect', () => {
        console.log('Connected to socket server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
        this.emit('statusChanged', false);
      });

      this.socket.on('userConnected', () => {
        console.log('userConnected event received');
        this.emit('statusChanged', true);
      });

      this.socket.on('userDisconnected', () => {
        console.log('userDisconnected event received');
        this.emit('statusChanged', false);
      });
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, ...args: any[]): void {
    if (this.socket) {
      this.socket.emit(event, ...args);
    }
  }
}

const socketService = new SocketService();
export default socketService;
