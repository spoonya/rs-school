import axios from 'axios';

import { API_URL } from './constants';

export const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': import.meta.env.VITE_GECKO_API_KEY,
  },
});
