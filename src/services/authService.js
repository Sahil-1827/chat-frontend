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
    }
};

export default authService;
