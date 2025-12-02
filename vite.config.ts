import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { ElectronBuildPlugin } from './plugins/vite.electron.build'
import { ElectronDevPlugin } from './plugins/vite.electron.dev'
import vuetify from 'vite-plugin-vuetify'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    ElectronBuildPlugin(),
    ElectronDevPlugin(),
    vuetify({ autoImport: true }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
