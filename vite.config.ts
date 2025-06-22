import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Habilita o plugin do React
  server: {
    proxy: {
      '/api': 'http://localhost:3001', // Redireciona todas as requisições que começam com /api para o backend
    },
    
  },
});
