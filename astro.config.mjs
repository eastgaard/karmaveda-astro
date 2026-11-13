// @ts-check
import { defineConfig } from 'astro/config';
import { execSync } from 'node:child_process';

import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import seoGraph from '@jdevalk/astro-seo-graph/integration';

/**
 * @param {string} filePath
 */
function gitLastmod(filePath) {
  try {
    const log = execSync(`git log -1 --format="%cI" -- "${filePath}"`, { encoding: 'utf-8' }).trim();
    return log ? new Date(log) : null;
  } catch (e) {
    return null;
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.karmaveda.dk',

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },

  build: {
    inlineStylesheets: 'always'
  },

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['cloudflare:workers']
    }
  },

  integrations: [
    sitemap({
      entryLimit: 1000,
      filter: (page) => !page.includes('/test-blog') && !page.includes('/404'),

      serialize: (item) => {
        let filePath = '';
        const pathname = new URL(item.url).pathname.replace(/\/$/, '');

        if (pathname.startsWith('/blog/')) {
          const slug = pathname.replace('/blog/', '');
          filePath = `src/content/blog/${slug}.md`;
        } else if (pathname === '') {
          filePath = 'src/pages/index.astro';
        } else {
          filePath = `src/pages${pathname}.astro`;
        }

        const lastmod = gitLastmod(filePath);
        if (lastmod) {
          item.lastmod = lastmod.toISOString();
        }
        return item;
      }
    }),
    seoGraph({
      // Håndteres præcist per side i Layout.astro (så / peger på /index.md og /404 undgås)
      markdownAlternate: false,
      indexNow: {
        key: '82a9d8c7b6e5f4a3b2c1d0e9f8a7b6c5',
        host: 'www.karmaveda.dk',
        siteUrl: 'https://www.karmaveda.dk',
        filter: (url) => !url.includes('/test-blog'),
      },
      llmsTxt: {
        title: 'Karmaveda – Holistisk Ayurvedisk Velværeklinik ved Nina Riisager',
        siteUrl: 'https://www.karmaveda.dk',
        summary:
          'Karmaveda er en dansk holistisk velværeklinik i Stenløse (Nordsjælland) drevet af Nina Riisager med fokus på Ayurvedisk livsstilskonsultation, balancerende energibehandling, mindfulness, NADA øreakupunktur og skræddersyede lydmeditationer.',
        details:
          'Klinikadresse: Dam Holme 14, 3660 Stenløse, Danmark. Telefon: +45 29 72 59 04. E-mail: nina@karmaveda.dk. CVR: DK34226679. Alle hovedsider og blogartikler findes også i maskinlæsbar Markdown-udgave ved at tilføje .md til sidens URL (og /index.md for forsiden).',
        filter: (url) => !url.includes('/test-blog') && !url.includes('/404'),
      },
    })
  ],

  adapter: cloudflare({
    prerenderEnvironment: 'node',
    imageService: process.env.NODE_ENV === 'production' ? 'compile' : 'passthrough'
  })
});
