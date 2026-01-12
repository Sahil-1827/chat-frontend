import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
    socket = null;
    sentMessageListeners = [];
    messageListeners = [];
    readListeners = [];

    connect() {
        if (!this.socket) {
            this.socket = io(SOCKET_URL, {
                transports: ['polling'], // Force polling as per user request
                withCredentials: true
            });

            this.socket.on('connect', () => {
                console.log('Socket connected via polling:', this.socket.id);
                // Re-attach listeners upon connection/reconnection
                this.messageListeners.forEach(cb => this.socket.on('receive_message', cb));
                this.readListeners.forEach(cb => this.socket.on('messages_read', cb));
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

    register(phone) {
        if (this.socket) {
            this.socket.emit('register', phone);
            console.log('Registered with phone:', phone);
        }
    }

    sendMessage(to, message, from) {
        if (this.socket) {
            this.socket.emit('private_message', { to, message, from });
            // Notify local listeners
            const msgData = {
                to,
                message,
                from,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()
            };
            this.sentMessageListeners.forEach(cb => cb(msgData));
        }
    }

    // Local Listeners for Sent Messages
    onMessageSent(callback) {
        this.sentMessageListeners.push(callback);
    }

    offMessageSent(callback) {
        this.sentMessageListeners = this.sentMessageListeners.filter(cb => cb !== callback);
    }

    markMessagesAsRead(to, from) {
        if (this.socket) {
            this.socket.emit('mark_as_read', { to, from });
        }
    }

    onMessagesRead(callback) {
        this.readListeners.push(callback);
        if (this.socket) {
            this.socket.on('messages_read', callback);
        }
    }

    offMessagesRead(callback) {
        this.readListeners = this.readListeners.filter(cb => cb !== callback);
        if (this.socket) {
            this.socket.off('messages_read', callback);
        }
    }

    onMessageReceived(callback) {
        this.messageListeners.push(callback);
        if (this.socket) {
            this.socket.on('receive_message', callback);
        }
    }

    offMessageReceived(callback) {
        this.messageListeners = this.messageListeners.filter(cb => cb !== callback);
        if (this.socket) {
            this.socket.off('receive_message', callback);
        }
    }
}

const socketService = new SocketService();
export default socketService;
