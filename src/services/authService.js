import api from '../api/axiosInstance';

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
    }
};

export default authService;
