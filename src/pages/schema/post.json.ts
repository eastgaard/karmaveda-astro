import { getCollection } from 'astro:content';
import { createSchemaEndpoint } from '@jdevalk/astro-seo-graph';
import { buildArticle, buildImageObject, type GraphEntity } from '@jdevalk/seo-graph-core';
import { SITE_URL, ids, ORG_ID } from '../../lib/seo-graph';

export const GET = createSchemaEndpoint({
  entries: () => getCollection('blog'),
  mapper: (post) => {
    const url = `${SITE_URL}/blog/${post.id}/`;
    const ogImageUrl = `${SITE_URL}/og/blog/${post.id}.jpg`;
    const wordCount = post.body ? post.body.split(/\s+/).length : undefined;
    return [
      buildImageObject(
        {
          pageUrl: url,
          url: ogImageUrl,
          width: 1200,
          height: 630,
          inLanguage: 'da-DK',
          caption: post.data.title,
        },
        ids
      ) as GraphEntity,
      buildArticle(
        {
          url,
          isPartOf: { '@id': ids.webPage(url) },
          author: { '@id': ids.person, name: 'Nina Riisager' },
          publisher: { '@id': ORG_ID },
          headline: post.data.title,
          description: post.data.seo?.description || post.data.description || '',
          inLanguage: 'da-DK',
          datePublished: post.data.publishDate ? new Date(post.data.publishDate) : new Date(),
          image: { '@id': ids.primaryImage(url) },
          articleSection: post.data.category,
          wordCount,
        },
        ids,
        'BlogPosting'
      ) as GraphEntity,
    ];
  },
});
