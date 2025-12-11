import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3636/api';

// Create axios instance
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // Server responded with error
            const { status, data } = error.response;

            if (status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if (status === 403) {
                // Forbidden
                console.error('Access denied:', data.message);
            } else if (status === 404) {
                // Not found
                console.error('Resource not found:', data.message);
            } else if (status >= 500) {
                // Server error
                console.error('Server error:', data.message);
            }

            return Promise.reject(data);
        } else if (error.request) {
            // Request made but no response
            console.error('Network error:', error.message);
            return Promise.reject({ message: 'ネットワークエラーが発生しました' });
        } else {
            // Something else happened
            console.error('Error:', error.message);
            return Promise.reject({ message: 'エラーが発生しました' });
        }
    }
);

export default apiClient;
