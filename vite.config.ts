import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: './', // Relative base path for flexible deployment (root domain, subdirectories, or subdomains)
  plugins: [
    react(),
    tailwindcss(),
  ],
});
