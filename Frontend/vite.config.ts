import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path'; // Import path with proper TypeScript support

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Define alias for the src directory
    },
  },
});
