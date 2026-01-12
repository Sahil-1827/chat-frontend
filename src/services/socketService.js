import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
    socket = null;
    sentMessageListeners = [];
    messageListeners = [];
    readListeners = [];
    connectionRequestListeners = [];
    requestResponseListeners = [];
    messageErrorListeners = [];
    requestSentListeners = [];
    userStatusListeners = [];
    typingListeners = [];
    stopTypingListeners = [];

    connect() {
        if (!this.socket) {
            this.socket = io(SOCKET_URL, {
                transports: ['polling'],
                withCredentials: true
            });

            this.socket.on('connect', () => {
                console.log('Socket connected via polling:', this.socket.id);
                // Re-attach listeners upon connection/reconnection
                this.messageListeners.forEach(cb => this.socket.on('receive_message', cb));
                this.readListeners.forEach(cb => this.socket.on('messages_read', cb));
                this.connectionRequestListeners.forEach(cb => this.socket.on('connection_request', cb));
                this.requestResponseListeners.forEach(cb => this.socket.on('request_response', cb));
                this.messageErrorListeners.forEach(cb => this.socket.on('message_error', cb));
                this.requestSentListeners.forEach(cb => this.socket.on('request_sent', cb));
                this.userStatusListeners.forEach(cb => this.socket.on('user_status_change', cb));
                this.typingListeners.forEach(cb => this.socket.on('typing', cb));
                this.stopTypingListeners.forEach(cb => this.socket.on('stop_typing', cb));
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

    respondToRequest(to, status, from) {
        if (this.socket) {
            this.socket.emit('respond_to_request', { to, status, from });
        }
    }

    onConnectionRequest(callback) {
        this.connectionRequestListeners.push(callback);
        if (this.socket) this.socket.on('connection_request', callback);
    }
    offConnectionRequest(callback) {
        this.connectionRequestListeners = this.connectionRequestListeners.filter(cb => cb !== callback);
        if (this.socket) this.socket.off('connection_request', callback);
    }

    onRequestResponse(callback) {
        this.requestResponseListeners.push(callback);
        if (this.socket) this.socket.on('request_response', callback);
    }
    offRequestResponse(callback) {
        this.requestResponseListeners = this.requestResponseListeners.filter(cb => cb !== callback);
        if (this.socket) this.socket.off('request_response', callback);
    }

    onMessageError(callback) {
        this.messageErrorListeners.push(callback);
        if (this.socket) this.socket.on('message_error', callback);
    }
    offMessageError(callback) {
        this.messageErrorListeners = this.messageErrorListeners.filter(cb => cb !== callback);
        if (this.socket) this.socket.off('message_error', callback);
    }

    onRequestSent(callback) {
        this.requestSentListeners.push(callback);
        if (this.socket) this.socket.on('request_sent', callback);
    }
    offRequestSent(callback) {
        this.requestSentListeners = this.requestSentListeners.filter(cb => cb !== callback);
        if (this.socket) this.socket.off('request_sent', callback);
    }

    onUserStatusChange(callback) {
        this.userStatusListeners.push(callback);
        if (this.socket) this.socket.on('user_status_change', callback);
    }

    offUserStatusChange(callback) {
        this.userStatusListeners = this.userStatusListeners.filter(cb => cb !== callback);
        if (this.socket) this.socket.off('user_status_change', callback);
    }

    sendTyping(to, from) {
        if (this.socket) {
            this.socket.emit('typing', { to, from });
        }
    }

    sendStopTyping(to, from) {
        if (this.socket) {
            this.socket.emit('stop_typing', { to, from });
        }
    }

    onTyping(callback) {
        this.typingListeners.push(callback);
        if (this.socket) this.socket.on('typing', callback);
    }

    offTyping(callback) {
        this.typingListeners = this.typingListeners.filter(cb => cb !== callback);
        if (this.socket) this.socket.off('typing', callback);
    }

    onStopTyping(callback) {
        this.stopTypingListeners.push(callback);
        if (this.socket) this.socket.on('stop_typing', callback);
    }

    offStopTyping(callback) {
        this.stopTypingListeners = this.stopTypingListeners.filter(cb => cb !== callback);
        if (this.socket) this.socket.off('stop_typing', callback);
    }
}

const socketService = new SocketService();
export default socketService;
