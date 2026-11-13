import { createSchemaMap } from '@jdevalk/astro-seo-graph';
import { SITE_URL } from '../lib/seo-graph';

export const GET = createSchemaMap({
  siteUrl: SITE_URL,
  entries: [
    { path: '/schema/organization.json', lastModified: new Date() },
    { path: '/schema/post.json', lastModified: new Date() },
  ],
});
