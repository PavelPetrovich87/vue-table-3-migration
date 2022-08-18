import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: 'vue-table-migation',
      filename: (format) => `${format}.js`
    },
    rollupOptions: {
      external: ["vue", "axios"],
      output: {
        globals: {
          vue: "Vue",
          axios: 'axios'
        }
      }
    }
  },
  plugins: [vue()]
})
