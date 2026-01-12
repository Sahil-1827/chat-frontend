import api from '../api/axiosInstance';
import socketService from './socketService';

const authService = {
    signup: async (userData) => {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    verifyPhone: async (phone) => {
        const response = await api.post('/auth/verify-phone', { phone });
        return response.data;
    },

    resetPassword: async (data) => {
        const response = await api.post('/auth/reset-password', data);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('authToken');
        socketService.disconnect();
    },

    updateProfile: async (formData) => {
        const response = await api.put('/auth/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },

    getAllUsers: async () => {
        const response = await api.get('/auth/users');
        return response.data;
    },

    getMessages: async (contactPhone) => {
        const response = await api.get(`/messages/${contactPhone}`);
        return response.data;
    },

    getConnectionStatus: async (phone) => {
        const token = localStorage.getItem('token');
        const response = await api.get(`/connections/${phone}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    clearChat: async (contactPhone) => {
        const token = localStorage.getItem('token');
        const response = await api.post(`/messages/clear/${contactPhone}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    deleteChat: async (contactPhone) => {
        const token = localStorage.getItem('token');
        const response = await api.delete(`/connections/${contactPhone}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
};

export default authService;
