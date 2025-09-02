import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, join } from 'path'
import { copyFileSync, readdirSync, statSync, mkdirSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-images',
      writeBundle() {
        const copyImages = (srcDir, destDir) => {
          try {
            const items = readdirSync(srcDir)
            items.forEach(item => {
              const srcPath = join(srcDir, item)
              const destPath = join(destDir, item)
              const stat = statSync(srcPath)
              
              if (stat.isDirectory()) {
                // Create directory if it doesn't exist
                if (!statSync(destDir).isDirectory()) {
                  mkdirSync(destDir, { recursive: true })
                }
                copyImages(srcPath, destPath)
              } else if (item.match(/\.(png|svg|jpg|jpeg|gif|webp)$/)) {
                // Create destination directory if it doesn't exist
                mkdirSync(destDir, { recursive: true })
                copyFileSync(srcPath, destPath)
                console.log(`Copied: ${srcPath} -> ${destPath}`)
              }
            })
          } catch (error) {
            console.log(`Skipping ${srcDir}: ${error.message}`)
          }
        }
        
        // Copy images from src directory to dist
        copyImages('./src', './dist')
      }
    }
  ],
  root: '.',
  publicDir: 'public',
  base: "./",
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'index.css'
          }
          return assetInfo.name
        }
      }
    }
  },
  server: {
    port: 3001,
    host: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './')
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx'
      }
    }
  }
})
