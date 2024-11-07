import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        id: 'alarmu.ru',
        name: 'Alarmu',
        short_name: 'Alarmu',
        start_url: '/alarms',
        display: 'standalone',
        description: 'Будильник, который разбудит тебя звонком',
        background_color: '#333231',
        icons: [
          {
            'src': 'pwa-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          },
        ],
      }
    }),
    svgLoader()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
