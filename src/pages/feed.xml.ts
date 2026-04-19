import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const pages = await getCollection('pages');
  
  return rss({
    title: 'Karmaveda',
    description: 'Karmaveda - Din vej til naturlig sundhed',
    site: context.site,
    items: pages.map((page) => ({
      title: page.data.seo?.title || page.data.title,
      description: page.data.seo?.description || page.data.description || '',
      pubDate: page.data.publishDate || new Date(),
      link: `/${page.id}/`,
    })),
  });
}
