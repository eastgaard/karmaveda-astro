import { getCollection } from 'astro:content';
import { createSchemaEndpoint } from '@jdevalk/astro-seo-graph';

export const GET = createSchemaEndpoint({
  entries: () => getCollection('blog'),
  mapper: (post) => {
    const url = `https://karmaveda.dk/blog/${post.id}/`;
    return [
      {
        '@type': 'BlogPosting',
        '@id': url,
        url: url,
        headline: post.data.title,
        description: post.data.description,
        datePublished: post.data.publishDate ? new Date(post.data.publishDate).toISOString() : undefined,
        author: {
          '@type': 'Person',
          name: post.data.author || 'Nina Riisager',
        }
      }
    ];
  }
});
