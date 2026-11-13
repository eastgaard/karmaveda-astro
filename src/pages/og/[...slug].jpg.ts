import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import satori from 'satori';
import sharp from 'sharp';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const prerender = true;

interface OgCardProps {
  title: string;
  description: string;
  badge: string;
  footerLeft?: string;
  bgImagePath?: string;
}

const LOGO_PATH_1 =
  'M384 310a193 193 0 0 1 9 9c3.655-1.513 5.72-3.667 8.375-6.562 17.49-17.851 42.621-26.463 67.188-26.813 26.527.059 50.692 10.05 69.69 28.566 19.04 19.472 28.615 43.755 28.864 70.938-.742 56.767-34.766 104.542-73.242 143.246l-1.53 1.547C485.564 536.755 478.53 542.99 471 549a280 280 0 0 0-3.285 2.828c-6.124 5.34-12.44 10.289-19.027 15.047l-2.245 1.622c-9.94 7.098-16.797 11.628-29.443 10.503-6.216-1.711-10.457-5.716-14-11-2.1-6.299-2.21-14.322.563-20.437 4.036-6.681 10.728-10.47 17.046-14.76 6.8-4.677 13.13-9.918 19.464-15.2a574 574 0 0 1 5.282-4.33c7.726-6.355 14.868-13.286 21.957-20.336 1.38-1.364 1.38-1.364 2.786-2.757 6.057-6.085 11.597-12.433 16.902-19.18l1.432-1.813c5.3-6.795 10.057-13.852 14.568-21.187l1.484-2.242c13.222-20.544 22.602-49.559 17.389-73.941-1.778-7.38-4.257-13.732-8.873-19.817l-1.93-2.547c-8.804-10.643-21.398-18.308-35.3-19.672-10.239-.669-19.296-.043-28.77 4.219l-2.117.84C429.92 341.36 421.787 354.39 416 369q-.739 2.37-1.437 4.75c-1.829 5.763-5.318 9.646-10.188 13.125-5.92 2.805-12.194 3.039-18.437 1.063-5.32-2.322-9.361-5.329-11.743-10.78-1.384-3.649-2.592-7.353-3.808-11.06-4.618-13.98-14.801-24.571-27.774-31.344-13.425-6.223-28.768-7.092-42.761-2.008-14.771 6.495-25.57 16.948-31.977 31.875-8.596 24.507 1.098 51.302 11.625 73.567 9.547 19.638 21.123 37.4 34.67 54.497a740 740 0 0 1 5.447 6.999 261 261 0 0 0 9.07 11.003l2.762 3.2 1.612 1.854c1.494 1.74 2.97 3.496 4.437 5.258 7.446 8.9 15.4 17.178 23.64 25.345 2.129 2.11 4.25 4.23 6.37 6.35l4.133 4.115 1.882 1.878c3.77 3.73 7.652 7.281 11.67 10.742 2.773 2.41 5.44 4.932 8.12 7.446 8.154 7.582 16.76 14.477 25.687 21.125l1.794-1.187c25.268-16.68 51.006-33.274 79.06-44.92a352 352 0 0 0 4.233-1.793c40.007-17.239 90.25-24.943 131.913-9.1 27.342 11.463 48.559 31.274 60.684 58.465 9.354 25.121 8.567 53.077-2.567 77.47-12.064 24.434-33.833 43.674-59.472 52.914C611.976 737.477 587.367 740.57 564 734l-3.758-1.031c-49.172-14.152-93.831-43.893-134.61-73.934l-2.077-1.523-1.798-1.33c-2.06-1.44-2.06-1.44-5.757-3.182l-9 6c4.087 4.387 8.608 7.742 13.5 11.188q2.412 1.724 4.82 3.453l2.396 1.716a583 583 0 0 1 9.659 7.08l3.023 2.247c4.43 3.944 7.34 8.185 7.84 14.171.155 6.94.061 12.473-4.238 18.145-5.81 5.81-11.954 6.23-19.805 6.46-7.918-1.141-14.155-6.383-20.382-11.085l-2.518-1.88A1646 1646 0 0 1 394 705l-1.963-1.482c-9.786-7.4-9.786-7.4-14.1-11.166l-2.937-2.54-2.562-2.292c-2.303-1.785-2.303-1.785-4.83-1.254-2.562.721-4.48 1.601-6.76 2.957l-2.33 1.369-2.455 1.47-2.58 1.514q-5.52 3.239-10.999 6.545c-45.773 27.115-110.274 47.056-163.8 34.785A151 151 0 0 1 172 733l-2.433-.748C142.153 723.52 118.947 706.43 105 681c-11.94-23.454-14.079-49.471-6.969-74.652C102.578 592.69 109.255 580.616 119 570l2.559-2.805c20.446-21.425 50.345-33.598 79.851-34.363 44.35-.44 79.486 19.278 112.59 47.168l1.9 1.6a748 748 0 0 1 19.873 17.388A450 450 0 0 0 342 604.5a683 683 0 0 1 9 8c6.812 6.135 13.575 12.109 21 17.5l1.46-1.094 1.915-1.406 1.898-1.406C379 625 379 625 381 625c-3.68-3.729-7.458-7.327-11.312-10.875l-1.608-1.488a416 416 0 0 0-9.017-8.074c-11.154-9.726-21.713-20.118-32.188-30.563l-2.655-2.641c-4.396-4.407-8.649-8.877-12.705-13.599-2.074-2.41-4.233-4.737-6.39-7.072a296 296 0 0 1-11.66-13.633 623 623 0 0 0-5.461-6.672C271.21 510.077 256.264 488.35 244 465l-1.21-2.3c-11.43-22.06-20.63-46.674-21.79-71.7l-.16-3.156c-.71-26.898 8.776-51.838 26.828-71.793C261.454 301.798 277.977 292.988 297 288l2.68-.746c29.715-6.883 61.483 3.62 84.32 22.746M154.031 594.887c-12.093 14.221-18.131 27.122-17.201 46.132 1.191 13.853 8.596 26.55 18.639 35.922 20.454 16.636 44.746 19.663 70.088 17.239 37.74-3.953 75.752-17.052 107.443-38.18-1.605-4.256-4.822-6.859-8.125-9.812l-1.782-1.619a641 641 0 0 0-11.148-9.87c-2.282-1.993-4.517-4.034-6.757-6.074-4.322-3.9-8.77-7.605-13.301-11.258-2.486-2.038-4.908-4.134-7.323-6.255-15.427-13.434-33.73-26.33-53.564-32.112l-3.086-.902c-24.926-6.304-54.824-1.476-73.883 16.789m344.93 5.088c-1.99 1.04-3.99 2.057-5.992 3.072-8.304 4.25-16.333 8.882-24.281 13.765l-2.734 1.671-2.567 1.599-2.275 1.413c-2.295 1.636-4.174 3.464-6.112 5.505 20.248 16.814 44.038 30.294 67 43l2.47 1.368c28.138 15.476 57.762 29.174 90.092 19.882C631.62 685.66 646.67 675.285 655 659c6.341-14.967 6.934-29.722 1-45-7.054-15.506-19.715-26.36-35.312-32.75-40.248-14.23-85.39-.356-121.727 18.725';

const LOGO_PATH_2 =
  'm400 82 3.39.242C431.956 85.03 455.95 97.686 475 119c2.542 3.217 4.809 6.536 7 10l1.547 2.32c13.897 21.705 17.94 49.5 13.328 74.68-4.514 18.624-11.916 34.667-24.875 49l-2.488 2.773c-18.822 19.91-44.445 29.696-71.399 31.41-25.452.647-49.602-7.994-69.113-24.183l-2.574-2.078C306.24 245.812 294.636 221.139 292 195c-2.251-31.139 8.144-57.552 28.25-81.125C328.41 105.032 338.208 98.262 349 93l2.637-1.332C366.284 84.59 383.66 80.772 400 82m-51.738 64.93C337.31 160.57 333.334 176.84 335 194c2.344 16.253 11.097 29.967 23.75 40.25 13.201 9.246 29.225 13.818 45.237 11.457 17.064-3.044 31.117-12.191 41.42-26.21 9.018-14.126 12.038-29.1 9.593-45.497-3.561-15.474-12.528-29.461-25.687-38.5A126 126 0 0 0 425 133l-2.02-1.137c-25.877-13.73-55.547-6.216-74.718 15.067';

function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'oe')
    .replace(/å/g, 'aa')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function truncateText(text: string, maxLen: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const sliced = clean.slice(0, maxLen);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${(lastSpace > 50 ? sliced.slice(0, lastSpace) : sliced).replace(/[.,;:\-–]+$/, '')}…`;
}

async function resolveBlogImagePath(postId: string): Promise<string | undefined> {
  const mdPath = path.resolve(process.cwd(), 'src/content/blog', `${postId}.md`);
  try {
    const raw = await fs.readFile(mdPath, 'utf-8');
    const parsed = matter(raw);
    const relImage = typeof parsed.data?.image === 'string' ? parsed.data.image : undefined;
    if (!relImage) return undefined;
    const fullImagePath = path.resolve(path.dirname(mdPath), relImage);
    await fs.access(fullImagePath);
    return fullImagePath;
  } catch {
    return undefined;
  }
}

export async function getStaticPaths() {
  const coreRoutes: Array<{ slug: string; props: OgCardProps }> = [
    {
      slug: 'index',
      props: {
        title: 'Find din indre balance med Ayurveda & Meditation',
        description:
          'Holistiske behandlinger, ayurvedisk livsstilskonsultation og guidede meditationer i Stenløse.',
        badge: 'HOLISTISK VELVÆREKLINIK',
      },
    },
    {
      slug: 'behandlinger',
      props: {
        title: 'Behandlinger og Konsultationer',
        description:
          'Balancerende energibehandling, 1-1 mindfulness sessioner og NADA øreakupunktur i trygge rammer.',
        badge: 'BEHANDLINGER & PRISER',
      },
    },
    {
      slug: 'livsstilskonsultation',
      props: {
        title: 'Ayurvedisk Livsstilskonsultation',
        description:
          'Et skræddersyet forløb med fokus på fordøjelse, søvn, stressreduktion og varig daglig balance.',
        badge: 'LIVSSTILSKONSULTATION',
      },
    },
    {
      slug: 'meditation',
      props: {
        title: 'Mindfulness & Guidet Meditation',
        description:
          'Skab ro i nervesystemet, mentalt overskud og nærvær i hverdagen med gratis og personlige meditationer.',
        badge: 'INDRE RO & NÆRVÆR',
      },
    },
    {
      slug: 'skraeddersyede-meditationer',
      props: {
        title: 'Personlige Meditationer for Behandlere',
        description:
          'Unikke lydmeditationer i professionel kvalitet skræddersyet til terapeuter, behandlere og klientforløb.',
        badge: 'FOR PROFESSIONELLE',
      },
    },
    {
      slug: 'om-os',
      props: {
        title: 'Velkommen til Karmaveda',
        description:
          'Holistisk velværeklinik i Stenløse med fokus på ayurvedisk visdom, nærvær og naturlig sundhed.',
        badge: 'OM KLINIKKEN',
      },
    },
    {
      slug: 'om-nina-riisager',
      props: {
        title: 'Om Nina Riisager',
        description:
          'Stifter af Karmaveda • Uddannet ayurvedisk sundheds- og livsstilskonsulent, mindfulness- og meditationslærer.',
        badge: 'STIFTER AF KARMAVEDA',
      },
    },
    {
      slug: 'blog',
      props: {
        title: 'Blog & Artikler om Ayurveda & Ro',
        description:
          'Viden, forskning og praktisk inspiration til bedre søvn, mindfulness, meditation og holistisk velvære.',
        badge: 'INSPIRATION & VIDEN',
      },
    },
  ];

  const dedicatedSlugs = new Set(coreRoutes.map((r) => r.slug));

  const cmsPages = await getCollection('pages');
  const extraPageRoutes = cmsPages
    .filter((p) => !dedicatedSlugs.has(p.id))
    .map((p) => ({
      slug: p.id,
      props: {
        title: p.data.title,
        description:
          p.data.seo?.description ||
          p.data.description ||
          'Karmaveda – Din vej til naturlig sundhed og indre balance.',
        badge: 'KARMAVEDA',
      } satisfies OgCardProps,
    }));

  const blogPosts = await getCollection('blog');
  const uniqueCategories = [...new Set(blogPosts.map((post) => post.data.category))].filter(Boolean);

  const categoryRoutes = uniqueCategories.map((category) => ({
    slug: `kategori/${slugifyCategory(category)}`,
    props: {
      title: `Artikler om ${category}`,
      description: `Udforsk udvalgte artikler, øvelser og holistisk viden om ${category.toLowerCase()} fra Karmaveda.`,
      badge: 'BLOGKATEGORI',
    } satisfies OgCardProps,
  }));

  const postRoutes = await Promise.all(
    blogPosts.map(async (post) => {
      const bgImagePath = await resolveBlogImagePath(post.id);
      return {
        slug: `blog/${post.id}`,
        props: {
          title: post.data.title,
          description: post.data.description || post.data.seo?.description || '',
          badge: post.data.category.toUpperCase(),
          footerLeft: `Af ${post.data.author || 'Nina Riisager'} • Karmaveda Blog`,
          bgImagePath,
        } satisfies OgCardProps,
      };
    })
  );

  return [...coreRoutes, ...extraPageRoutes, ...categoryRoutes, ...postRoutes].map((route) => ({
    params: { slug: route.slug },
    props: route.props,
  }));
}

let cachedFontsPromise: Promise<
  Array<{ name: string; data: Buffer; weight: 400 | 600 | 700; style: 'normal' }>
> | null = null;

function loadFonts() {
  if (!cachedFontsPromise) {
    cachedFontsPromise = (async () => {
      const nm = path.resolve(process.cwd(), 'node_modules');
      const [playfairLatin, playfairExt, inter400Latin, inter400Ext, inter600Latin, inter600Ext] =
        await Promise.all([
          fs.readFile(
            path.join(nm, '@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff')
          ),
          fs.readFile(
            path.join(
              nm,
              '@fontsource/playfair-display/files/playfair-display-latin-ext-700-normal.woff'
            )
          ),
          fs.readFile(path.join(nm, '@fontsource/inter/files/inter-latin-400-normal.woff')),
          fs.readFile(path.join(nm, '@fontsource/inter/files/inter-latin-ext-400-normal.woff')),
          fs.readFile(path.join(nm, '@fontsource/inter/files/inter-latin-600-normal.woff')),
          fs.readFile(path.join(nm, '@fontsource/inter/files/inter-latin-ext-600-normal.woff')),
        ]);

      return [
        { name: 'Playfair Display', data: playfairLatin, weight: 700, style: 'normal' },
        { name: 'Playfair Display', data: playfairExt, weight: 700, style: 'normal' },
        { name: 'Inter', data: inter400Latin, weight: 400, style: 'normal' },
        { name: 'Inter', data: inter400Ext, weight: 400, style: 'normal' },
        { name: 'Inter', data: inter600Latin, weight: 600, style: 'normal' },
        { name: 'Inter', data: inter600Ext, weight: 600, style: 'normal' },
      ];
    })();
  }
  return cachedFontsPromise;
}

function getTitleFontSize(title: string, isPhotoCard: boolean): number {
  const len = title.length;
  if (isPhotoCard) {
    if (len <= 34) return 54;
    if (len <= 56) return 46;
    return 38;
  }
  if (len <= 32) return 60;
  if (len <= 52) return 52;
  return 44;
}

function buildPhotoOverlayTree(props: OgCardProps) {
  const titleSize = getTitleFontSize(props.title, true);
  const shortDesc = truncateText(props.description, 125);
  const footerLeft = props.footerLeft || 'Nina Riisager • Holistisk Velværeklinik';

  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '54px 64px',
        backgroundImage:
          'linear-gradient(90deg, #263829 0%, #263829 50%, rgba(38, 56, 41, 0.90) 61%, rgba(38, 56, 41, 0.25) 78%, rgba(38, 56, 41, 0.05) 100%)',
      },
      children: [
        // Top brand + category row
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  },
                  children: [
                    {
                      type: 'svg',
                      props: {
                        width: 42,
                        height: 42,
                        viewBox: '0 0 800 800',
                        children: [
                          { type: 'path', props: { d: LOGO_PATH_1, fill: '#cdb292' } },
                          { type: 'path', props: { d: LOGO_PATH_2, fill: '#cdb292' } },
                        ],
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Playfair Display',
                          fontSize: '28px',
                          fontWeight: 700,
                          color: '#fbf9f6',
                          letterSpacing: '0.5px',
                        },
                        children: 'Karmaveda',
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(205, 178, 146, 0.22)',
                    border: '1px solid rgba(205, 178, 146, 0.5)',
                    borderRadius: '999px',
                    padding: '6px 16px',
                    fontFamily: 'Inter',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    color: '#e8e0d1',
                  },
                  children: props.badge,
                },
              },
            ],
          },
        },

        // Center editorial headline & description
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '660px',
              gap: '20px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Playfair Display',
                    fontSize: `${titleSize}px`,
                    fontWeight: 700,
                    lineHeight: 1.15,
                    color: '#fbf9f6',
                  },
                  children: props.title,
                },
              },
              ...(shortDesc
                ? [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Inter',
                          fontSize: '20px',
                          fontWeight: 400,
                          lineHeight: 1.5,
                          color: '#e8e0d1',
                          maxWidth: '610px',
                        },
                        children: shortDesc,
                      },
                    },
                  ]
                : []),
            ],
          },
        },

        // Bottom bar
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '640px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(205, 178, 146, 0.35)',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#cdb292',
                  },
                  children: footerLeft,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#fbf9f6',
                    opacity: 0.85,
                  },
                  children: 'karmaveda.dk',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

function buildBrandCardTree(props: OgCardProps) {
  const titleSize = getTitleFontSize(props.title, false);
  const shortDesc = truncateText(props.description, 140);
  const footerLeft = props.footerLeft || 'Nina Riisager • Stenløse & Online';

  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        position: 'relative',
        backgroundColor: '#fbf9f6',
        backgroundImage: 'linear-gradient(135deg, #fbf9f6 0%, #f4f1ea 55%, #e8e0d1 100%)',
        padding: '28px',
        overflow: 'hidden',
      },
      children: [
        // Decorative botanical lotus watermark on right
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              right: '-45px',
              bottom: '-55px',
              display: 'flex',
              opacity: 0.07,
            },
            children: [
              {
                type: 'svg',
                props: {
                  width: 490,
                  height: 490,
                  viewBox: '0 0 800 800',
                  children: [
                    { type: 'path', props: { d: LOGO_PATH_1, fill: '#3a5a40' } },
                    { type: 'path', props: { d: LOGO_PATH_2, fill: '#3a5a40' } },
                  ],
                },
              },
            ],
          },
        },

        // Inner framed content box
        {
          type: 'div',
          props: {
            style: {
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1.5px solid rgba(188, 155, 118, 0.45)',
              borderRadius: '24px',
              padding: '46px 56px',
            },
            children: [
              // Header row
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                        },
                        children: [
                          {
                            type: 'svg',
                            props: {
                              width: 48,
                              height: 48,
                              viewBox: '0 0 800 800',
                              children: [
                                { type: 'path', props: { d: LOGO_PATH_1, fill: '#3a5a40' } },
                                { type: 'path', props: { d: LOGO_PATH_2, fill: '#3a5a40' } },
                              ],
                            },
                          },
                          {
                            type: 'div',
                            props: {
                              style: {
                                fontFamily: 'Playfair Display',
                                fontSize: '32px',
                                fontWeight: 700,
                                color: '#263829',
                                letterSpacing: '0.4px',
                              },
                              children: 'Karmaveda',
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#3a5a40',
                          borderRadius: '999px',
                          padding: '8px 20px',
                          fontFamily: 'Inter',
                          fontSize: '13px',
                          fontWeight: 600,
                          letterSpacing: '2.2px',
                          color: '#fbf9f6',
                        },
                        children: props.badge,
                      },
                    },
                  ],
                },
              },

              // Main title + description
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '880px',
                    gap: '20px',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Playfair Display',
                          fontSize: `${titleSize}px`,
                          fontWeight: 700,
                          lineHeight: 1.14,
                          color: '#263829',
                        },
                        children: props.title,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Inter',
                          fontSize: '23px',
                          fontWeight: 400,
                          lineHeight: 1.5,
                          color: '#425746',
                          maxWidth: '800px',
                        },
                        children: shortDesc,
                      },
                    },
                  ],
                },
              },

              // Footer bar
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingTop: '22px',
                    borderTop: '1px solid rgba(58, 90, 64, 0.16)',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Inter',
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#3a5a40',
                        },
                        children: footerLeft,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'Inter',
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#bc6c25',
                          letterSpacing: '0.5px',
                        },
                        children: 'www.karmaveda.dk',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

export const GET: APIRoute = async ({ props }) => {
  const cardProps: OgCardProps = {
    title: props?.title || 'Karmaveda – Din vej til naturlig sundhed',
    description:
      props?.description ||
      'Holistisk velværeklinik med fokus på Ayurveda, energibehandling, mindfulness og meditation.',
    badge: props?.badge || 'KARMAVEDA',
    footerLeft: props?.footerLeft,
    bgImagePath: props?.bgImagePath,
  };

  const fonts = await loadFonts();
  const isPhotoCard = Boolean(cardProps.bgImagePath);

  const elementTree = isPhotoCard
    ? buildPhotoOverlayTree(cardProps)
    : buildBrandCardTree(cardProps);

  const svg = await satori(elementTree as any, {
    width: 1200,
    height: 630,
    fonts,
  });

  let jpegBuffer: Buffer;

  if (isPhotoCard && cardProps.bgImagePath) {
    const [artworkBuffer, overlayPng] = await Promise.all([
      sharp(cardProps.bgImagePath)
        .resize(600, 630, { fit: 'cover', position: 'center' })
        .png()
        .toBuffer(),
      sharp(Buffer.from(svg)).png().toBuffer(),
    ]);

    jpegBuffer = await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 38, g: 56, b: 41, alpha: 1 },
      },
    })
      .composite([
        { input: artworkBuffer, left: 600, top: 0 },
        { input: overlayPng, left: 0, top: 0 },
      ])
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();
  } else {
    jpegBuffer = await sharp(Buffer.from(svg))
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();
  }

  return new Response(new Uint8Array(jpegBuffer), {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
