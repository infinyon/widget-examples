import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig({
    base: './',
    plugins: [react(), cssInjectedByJsPlugin()],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `start.js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            }
        }
    }
})
