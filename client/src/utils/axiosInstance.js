import axios from 'axios';

// Create an axios instance with the base URL set to localhost and enabling credentials
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api'
});

// Export the axios instance for making HTTP requests
export default axiosInstance;
