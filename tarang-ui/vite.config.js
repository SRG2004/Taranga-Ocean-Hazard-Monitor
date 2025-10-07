  import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.REACT_APP_SUPABASE_URL': JSON.stringify(process.env.REACT_APP_SUPABASE_URL || ''),
    'import.meta.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.REACT_APP_SUPABASE_ANON_KEY || ''),
    'import.meta.env.REACT_APP_API_BASE_URL': JSON.stringify(process.env.REACT_APP_API_BASE_URL || ''),
    'import.meta.env.REACT_APP_OPENWEATHER_API_KEY': JSON.stringify(process.env.REACT_APP_OPENWEATHER_API_KEY || ''),
  },
  build: {
    outDir: 'dist'
  },
  publicDir: 'public'
});
