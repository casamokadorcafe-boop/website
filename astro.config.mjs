// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: set canonical production URL once the domain is confirmed
  site: 'https://casamokador.cy',

  integrations: [sitemap()],

  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },

  vite: {
    // @ts-expect-error — Astro and @tailwindcss/vite ship slightly different vite type
    // versions; the plugin shape is compatible at runtime.
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: false,
    },
  },

  compressHTML: true,

  prefetch: false,
});
