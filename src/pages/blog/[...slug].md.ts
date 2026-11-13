import { getCollection } from 'astro:content';
import { createMarkdownEndpoint } from '@jdevalk/astro-seo-graph';
import { SITE_URL } from '../../lib/seo-graph';

export const prerender = true;

export const getStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.id } }));
};

export const GET = createMarkdownEndpoint({
  entries: () => getCollection('blog'),
  mapper: (post, slug) =>
    post.id !== slug
      ? null
      : {
          frontmatter: {
            title: post.data.title,
            canonical: `${SITE_URL}/blog/${post.id}/`,
            pubDate: post.data.publishDate,
            author: post.data.author,
            description: post.data.seo?.description || post.data.description || '',
            categories: post.data.category ? [post.data.category] : undefined,
          },
          body: post.body ?? '',
        },
});
