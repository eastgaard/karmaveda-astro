import { getCollection } from 'astro:content';
import { createMarkdownEndpoint } from '@jdevalk/astro-seo-graph';

export const getStaticPaths = async () => {
    const pages = await getCollection('pages');
    return pages.map((p) => ({ params: { slug: p.id } }));
};

export const GET = createMarkdownEndpoint({
    entries: () => getCollection('pages'),
    mapper: (page, slug) =>
        page.id !== slug
            ? null
            : {
                  frontmatter: {
                      title: page.data.seo?.title || page.data.title,
                      canonical: `https://karmaveda.dk/${page.id}/`,
                      description: page.data.seo?.description || '',
                  },
                  body: page.body ?? '',
              },
});
