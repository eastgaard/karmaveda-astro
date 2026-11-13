import { createSchemaEndpoint } from '@jdevalk/astro-seo-graph';
import { buildSiteEntities } from '../../lib/seo-graph';

export const GET = createSchemaEndpoint({
  entries: async () => [1],
  mapper: () => buildSiteEntities(),
});
