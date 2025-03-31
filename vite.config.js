import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('localhost+1-key.pem'),  // Certificate key file
      cert: fs.readFileSync('localhost+1.pem'),    // cerificate file
    },
    host: '0.0.0.0',  //  Allows access from other devices
    port: 5173,       //  Default Vite port
    strictPort: true  //  Prevents auto-changing ports
  },
  plugins: [react()]
});