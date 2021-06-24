import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    })
  ],
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
      },
      '^/map': {
        target: 'https://apis.map.qq.com/ws/location/v1/ip',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/map/, '')
      },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },
})
