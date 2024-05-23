import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'https://full-stack-project-entertainment-app.onrender.com/api'
});

// Export the axios instance for making HTTP requests
export default axiosInstance;

