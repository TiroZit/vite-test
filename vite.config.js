// vite.config.js
import fs from 'fs';
import { defineConfig } from 'vite'
import { resolve, join } from "path";
import imagemin from 'unplugin-imagemin/vite';

const pagesDir = resolve(process.cwd(), `src/views`)
const pages = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));

export default defineConfig({
  root: resolve(process.cwd(), `./src`),
  base: "",
  server: {
    open: '/views/index.html',
  },
  build: {
    outDir: resolve(process.cwd(), `./dist`),
    rollupOptions: {
      input: pages.reduce((acc, page) => {
        const name = page.replace('.html', '');
        acc[name] = join(pagesDir, page);
        return acc;
      }, {}),
    }
  },
  plugins: [
    imagemin({
      // Default mode squoosh. support squoosh and sharp
      mode: 'sharp',
      // Default configuration options for compressing different pictures
      compress: {
        jpg: {
          quality: 10,
        },
        jpeg: {
          quality: 70,
        },
        png: {
          quality: 70,
        },
        webp: {
          quality: 70,
        },
      },
      // The type of picture converted after the build
      conversion: [
        { from: 'png', to: 'jpeg' },
        { from: 'jpg', to: 'webp' },
      ]
    }),
  ],
})
