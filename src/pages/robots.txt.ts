import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('Astro.site is not defined in astro.config.mjs');
  }

  const sitemapUrl = new URL('sitemap-index.xml', site).href;
  const schemaMapUrl = new URL('schemamap.xml', site).href;
  const llmsTxtUrl = new URL('llms.txt', site).href;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /test-blog

# AI & LLM Crawlers
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# LLM Context: ${llmsTxtUrl}
# Sitemaps
Sitemap: ${sitemapUrl}
Sitemap: ${schemaMapUrl}
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
