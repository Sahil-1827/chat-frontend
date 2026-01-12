import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
    socket = null;

    connect() {
        if (!this.socket) {
            this.socket = io(SOCKET_URL, {
                transports: ['polling'], // Force polling as per user request
                withCredentials: true
            });

            this.socket.on('connect', () => {
                console.log('Socket connected via polling:', this.socket.id);
            });

            this.socket.on('connect_error', (err) => {
                console.error('Socket connection error:', err);
            });
        }
        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    getSocket() {
        return this.socket;
    }
}

const socketService = new SocketService();
export default socketService;
