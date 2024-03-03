import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve('./src/packages/react'),
      'react-dom': path.resolve('./src/packages/react-dom'),
      'react-dom-bindings': path.resolve('src/packages/react-dom-bindings'),
      'react-reconciler': path.resolve('src/packages/react-reconciler'),
      shared: path.resolve('src/packages/shared'),
      scheduler: path.resolve('src/packages/scheduler'),
      '@': path.resolve('src')
    },
  },
  build: {
    sourcemap: true,
  },
  define: {
    __DEV__: true,
    __EXPERIMENTAL__: true,
    __PROFILE__: true,
  },
});
