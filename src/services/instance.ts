import axios from 'axios';

import { API_URL } from './constants';

export const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    'X-API-KEY': import.meta.env.VITE_OPENAPI_API_KEY,
  },
});
