// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import seoGraph from '@jdevalk/astro-seo-graph/integration';



// https://astro.build/config
export default defineConfig({
  site: 'https://karmaveda.dk',
  
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['cloudflare:workers']
    }
  },

  integrations: [
    sitemap({
      serialize: (item) => {
        // If it's a file, we could try to get the real path, but since item.url is a URL string, 
        // a simple approach for astro.config is to just return item for now unless we do complex URL to file mapping.
        // For standard Astro sites, mapping URL to file path can be tricky in the sitemap hook without extra context.
        // Let's just return the item for now, or assume pages are in src/pages or src/content/pages.
        return item;
      }
    }),
    seoGraph({
      markdownAlternate: true,
      indexNow: {
        key: '82a9d8c7b6e5f4a3b2c1d0e9f8a7b6c5',
        host: 'karmaveda.dk',
        siteUrl: 'https://karmaveda.dk',
      },
      llmsTxt: {
        title: 'Karmaveda',
        siteUrl: 'https://karmaveda.dk',
        summary: 'Karmaveda er en holistisk velværeklinik fokuseret på Ayurvediske behandlinger, herunder Ayurvedisk massage, Shirodhara og sundhedskonsultationer.',
      },
    })
  ],

  adapter: cloudflare({
    prerenderEnvironment: 'node',
    platformProxy: {
      enabled: true
    },
    imageService: 'compile'
  })
});