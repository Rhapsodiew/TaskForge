import axios from 'axios';
import { config } from 'process';

const api = axios.create({
 baseURL: 'http://localhost:3000', // Assurez-vous que l'URL correspond à l'API NestJS
//  withCredentials: true, // Utilisez cette option pour inclure les cookies dans les requêtes
timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            window.location.href = '/login';
        }
        if (error.response && error.response.status === 500 && 400) {
            alert("Une erreur est survenue");
        }
        return Promise.reject(error);
    }
);
export default api
