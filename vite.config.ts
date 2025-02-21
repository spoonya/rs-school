import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    APIKEY: process.env.VITE_OPENAPI_API_KEY,
    APIURL: process.env.VITE_API_URL,
  },
});
