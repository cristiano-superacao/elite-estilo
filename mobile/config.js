// API Configuration
const API_URL = __DEV__ 
  ? 'http://localhost:8888/.netlify/functions'  // Local development
  : 'https://elitestilo.netlify.app/.netlify/functions';  // Production

export default {
  API_URL,
  AUTH_ENDPOINTS: {
    LOGIN: `${API_URL}/auth-function/login`,
    REGISTER: `${API_URL}/auth-function/register`,
    VERIFY: `${API_URL}/auth-function/verify`,
    PROFILE: `${API_URL}/auth-function/profile`,
  },
  SALONS_ENDPOINTS: {
    LIST: `${API_URL}/salons-function/salons`,
    SEARCH: `${API_URL}/salons-function/salons/search`,
  },
  APPOINTMENTS_ENDPOINT: `${API_URL}/salons-function/appointments`,
};
