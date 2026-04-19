// @ts-check
import { defineConfig } from 'astro/config';
import { execSync } from 'node:child_process';

import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import seoGraph from '@jdevalk/astro-seo-graph/integration';



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
  site: 'https://karmaveda.dk',
  
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['cloudflare:workers']
    }
  },

  integrations: [
    sitemap({
      entryLimit: 1000,
      chunks: {
        'posts': (item) => {
          if (new URL(item.url).pathname.startsWith('/blog/')) return item;
        },
        'pages': (item) => {
          if (!new URL(item.url).pathname.startsWith('/blog/')) return item;
        }
      },
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