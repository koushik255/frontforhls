import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      // Proxy MPEG‑DASH manifest & segments
      '/dash': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // Proxy subtitles
      '/subs': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});

