// src/services/api.js
import axios from 'axios';

// Base URL – change this to your production URL later (e.g. https://your-backend.com/api)
const API_BASE_URL = 'http://localhost:5000/api';

// Create a reusable axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,                    // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add Authorization header later when you have login/JWT
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// ────────────────────────────────────────────────
// API functions – add more as needed
// ────────────────────────────────────────────────

/**
 * Get all properties (with optional filters)
 * Example: getProperties({ isFeatured: true, location: 'DHA' })
 */
export const getProperties = async (filters = {}) => {
  try {
    const response = await api.get('/properties', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error.message);
    throw error; // let the component handle the error
  }
};

/**
 * Get only featured properties (shortcut)
 */
export const getFeaturedProperties = async () => {
  return getProperties({ isFeatured: true });
};

/**
 * Get a single property by ID
 * Example: getPropertyById('6995b1d59a08827a07f61e00')
 */
export const getPropertyById = async (id) => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error.message);
    throw error;
  }
};

// You can add POST, PUT, DELETE later, e.g.:
// export const createProperty = async (propertyData) => {
//   const response = await api.post('/properties', propertyData);
//   return response.data;
// };

export default api;