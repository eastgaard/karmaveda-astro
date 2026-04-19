import { defineCollection, z } from 'astro:content';
import { seoSchema } from '@jdevalk/astro-seo-graph';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    author: z.string().optional(),
    image: image().optional(),
    category: z.string(),
    seo: seoSchema(image).optional(),
  })
});

export const collections = { blog };
