import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_APIKEY': JSON.stringify(process.env.REACT_APP_APIKEY),
    'process.env.REACT_APP_BASEURL': JSON.stringify(process.env.REACT_APP_BASEURL),
    'process.env.REACT_APP_BASEIMAGE': JSON.stringify(process.env.REACT_APP_BASEIMAGE),
    'process.env.REACT_APP_TOKEN': JSON.stringify(process.env.REACT_APP_TOKEN),
  },
});
