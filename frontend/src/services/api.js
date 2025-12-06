import axios from 'axios';

const API_BASE_URL = 'https://truestate-bau8.vercel.app/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Fetch sales data with search, filters, sorting, and pagination
 */
export const getSales = async (params = {}) => {
    try {
        const response = await api.get('/sales', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching sales:', error);
        throw error;
    }
};

/**
 * Fetch filter options for dropdowns
 */
export const getFilterOptions = async () => {
    try {
        const response = await api.get('/sales/filters');
        return response.data;
    } catch (error) {
        console.error('Error fetching filter options:', error);
        throw error;
    }
};

export default api;
