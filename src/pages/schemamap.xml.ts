import { createSchemaMap } from '@jdevalk/astro-seo-graph';

export const GET = createSchemaMap({
  siteUrl: 'https://www.karmaveda.dk',
  entries: [
    { path: '/schema/post.json', lastModified: new Date() }
  ]
});
