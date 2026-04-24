import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const blog = await getCollection('blog');
  
  return rss({
    title: 'Karmaveda Blog',
    description: 'Karmaveda - Din vej til naturlig sundhed og balance',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.seo?.title || post.data.title,
      description: post.data.seo?.description || post.data.description || '',
      pubDate: post.data.publishDate || new Date(),
      link: `/blog/${post.id}/`,
    })),
  });
}
