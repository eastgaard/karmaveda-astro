import { createSchemaMap } from '@jdevalk/astro-seo-graph';

export const GET = createSchemaMap({
  siteUrl: 'https://karmaveda.dk',
  entries: [
    { path: '/schema/post.json', lastModified: new Date() }
  ]
});
