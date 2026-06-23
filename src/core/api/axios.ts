import axios from 'axios';
import toast from 'react-hot-toast';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  timeout: 10000,
});

// Request Interceptor: Attach Clerk Token if window is defined
apiClient.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined' && window.Clerk && window.Clerk.session) {
      const token = await window.Clerk.session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling & Retries
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Network timeout or 503 Service Unavailable -> Automatic Retry
    if (!originalRequest._retry && (!error.response || error.response.status === 503)) {
      originalRequest._retry = true;
      // Exponential backoff logic could go here
      return apiClient(originalRequest);
    }

    // Global UI Error handling
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        toast.error('Session expired. Please log in again.');
        if (typeof window !== 'undefined') window.location.href = '/sign-in';
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action.');
      } else if (status >= 500) {
        toast.error('Server encountered an error. Please try again later.');
      } else {
        toast.error(error.response.data?.message || 'An unexpected error occurred.');
      }
    } else {
      toast.error('Network Error. Check your connection.');
    }

    return Promise.reject(error);
  }
);
