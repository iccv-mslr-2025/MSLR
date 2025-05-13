// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Only use Fast Refresh in development
      fastRefresh: process.env.NODE_ENV !== 'production',
      
      // Don't bundle React in development for faster rebuilds
      jsxRuntime: process.env.NODE_ENV === 'production' ? 'automatic' : 'classic',
    }),
  ],

  base: "/MSLR/",
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  
  // Production build optimizations
  build: {
    target: 'es2015',
    // assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    assetsInlineLimit: 0, // Or a very large number
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          ui: ['lucide-react', 'react-intersection-observer'],
        },
      },
    },
  },
});