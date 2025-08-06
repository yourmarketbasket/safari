import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

// Request interceptor for encrypting data
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Only encrypt data for POST, PUT, PATCH requests
    // if (config.data && (config.method === 'post' || config.method === 'put' || config.method === 'patch')) {
    //   console.log('Encrypting outgoing data...');
    //   config.data = {
    //     payload: encryptData(config.data),
    //   };
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for decrypting data
api.interceptors.response.use(
  (response) => {
    // Check if the response data contains an encrypted payload
    // if (response.data && response.data.payload) {
    //     try {
    //         console.log('Decrypting incoming data...');
    //         const decryptedData = decryptData(response.data.payload);
    //         response.data = decryptedData;
    //     } catch (error) {
    //         console.error('Failed to decrypt response payload:', error);
    //         // Reject the promise to trigger the .catch() block in the service call
    //         return Promise.reject(new Error('Failed to process server response.'));
    //     }
    // }
    return response;
  },
  (error) => {
    // Also check for encrypted error responses
    // if (error.response && error.response.data && error.response.data.payload) {
    //   try {
    //     const decryptedError = decryptData(error.response.data.payload);
    //     error.response.data = decryptedError;
    //   } catch (decryptionError) {
    //     console.error('Failed to decrypt error payload:', decryptionError);
    //   }
    // }
    return Promise.reject(error);
  }
);

export default api;
