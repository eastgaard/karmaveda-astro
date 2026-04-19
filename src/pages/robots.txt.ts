import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('Astro.site is not defined in astro.config.mjs');
  }

  const sitemapUrl = new URL('sitemap-index.xml', site).href;
  const schemaMapUrl = new URL('schemamap.xml', site).href;

  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${sitemapUrl}
Sitemap: ${schemaMapUrl}
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
