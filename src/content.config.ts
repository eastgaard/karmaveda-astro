import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { seoSchema, imageSchema } from '@jdevalk/astro-seo-graph';

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      publishDate: z.coerce.date().optional(),
      seo: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }).optional(),
    }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      publishDate: z.coerce.date(),
      author: z.string().default('Nina Riisager'),
      category: z.string().default('Inspiration'),
      image: image().optional(),
      seo: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }).optional(),
    }),
});

export const collections = {
  'pages': pagesCollection,
  'blog': blogCollection,
};
