import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

//For aliasing to worth with Vite, we need to install @types/node to find '__dirname' (npm i -D @types/node). Also need to configure the alias in tsconfig.json
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [react()]
})