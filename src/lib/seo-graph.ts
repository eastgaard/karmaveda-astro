import {
  makeIds,
  buildWebSite,
  buildWebPage,
  buildArticle,
  buildBreadcrumbList,
  buildImageObject,
  buildSiteNavigationElement,
  buildPiece,
  assembleGraph,
  type GraphEntity,
} from '@jdevalk/seo-graph-core';

export const SITE_URL = 'https://www.karmaveda.dk';

export const ids = makeIds({
  siteUrl: SITE_URL,
  personUrl: `${SITE_URL}/om-nina-riisager/`,
});

export const ORG_ID = ids.organization('karmaveda');
export const BLOG_ID = `${SITE_URL}/blog/#blog`;

function asEntity(piece: Record<string, unknown>): GraphEntity {
  return piece as GraphEntity;
}

export interface PageGraphOptions {
  url: string;
  title: string;
  description?: string;
  pageType?: 'WebPage' | 'ProfilePage' | 'CollectionPage';
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  breadcrumbs?: Array<{ name: string; url: string }>;
  article?: {
    headline: string;
    description: string;
    datePublished?: Date;
    dateModified?: Date;
    category?: string;
    wordCount?: number;
  };
  faq?: Array<{ question: string; answer: string }>;
  services?: Array<{
    id: string;
    name: string;
    description: string;
    offers: Array<{
      name: string;
      price: number;
      priceCurrency?: string;
      description?: string;
    }>;
  }>;
  noindex?: boolean;
}

export function buildSiteEntities(): GraphEntity[] {
  const organization = asEntity(
    buildPiece({
      '@type': 'HealthAndBeautyBusiness',
      '@id': ORG_ID,
      name: 'Karmaveda',
      alternateName: 'Karmaveda ved Nina Riisager',
      url: `${SITE_URL}/`,
      description:
        'Holistisk velværeklinik i Stenløse med fokus på Ayurvedisk livsstilskonsultation, balancerende energibehandling, mindfulness og skræddersyede meditationer.',
      logo: `${SITE_URL}/images/logo.svg`,
      image: `${SITE_URL}/og/index.jpg`,
      telephone: '+4529725904',
      email: 'nina@karmaveda.dk',
      vatID: 'DK34226679',
      iso6523Code: '0088:DK34226679',
      priceRange: 'DKK 150 - 4.444',
      currenciesAccepted: 'DKK',
      areaServed: {
        '@type': 'Country',
        name: 'Danmark',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Dam Holme 14',
        postalCode: '3660',
        addressLocality: 'Stenløse',
        addressCountry: 'DK',
      },
      founder: { '@id': ids.person },
      sameAs: [
        'https://www.facebook.com/Karmavedadk',
        'https://www.instagram.com/karmaveda.ved.ninariisager/',
        'https://www.youtube.com/channel/UCvlMZBLi94LgFxLFb-ume4A',
        'https://open.spotify.com/show/0yu5c87AO9NpwojUYgPYQu',
        'https://insighttimer.com/karmaveda',
        'https://podcasts.apple.com/us/podcast/karmaveda/id1504017633',
        'https://anchor.fm/karmaveda',
      ],
    })
  );

  const person = asEntity(
    buildPiece({
      '@type': 'Person',
      '@id': ids.person,
      name: 'Nina Riisager',
      url: `${SITE_URL}/om-nina-riisager/`,
      jobTitle: 'Ayurvedisk sundheds- og livsstilskonsulent',
      description:
        'Stifter af Karmaveda. Uddannet Ayurvedisk sundheds- og livsstilskonsulent samt certificeret i mindfulness, meditation, yoga, NADA øreakupunktur, akupressur og følelseshealing.',
      worksFor: { '@id': ORG_ID },
      knowsAbout: [
        'Ayurveda',
        'Ayurvedisk livsstilskonsultation',
        'Mindfulness',
        'Meditation',
        'Yoga',
        'NADA øreakupunktur',
        'Akupressur',
        'Balancerende energibehandling',
      ],
      sameAs: [
        'https://www.facebook.com/Karmavedadk',
        'https://www.instagram.com/karmaveda.ved.ninariisager/',
      ],
    })
  );

  const website = asEntity(
    buildWebSite(
      {
        url: `${SITE_URL}/`,
        name: 'Karmaveda',
        description:
          'Karmaveda - Din vej til naturlig sundhed, indre ro og balance med Ayurveda og meditation.',
        inLanguage: 'da-DK',
        publisher: { '@id': ORG_ID },
        about: { '@id': ORG_ID },
        hasPart: { '@id': ids.navigation },
      },
      ids
    )
  );

  const navigation = asEntity(
    buildSiteNavigationElement(
      {
        name: 'Hovednavigation',
        isPartOf: { '@id': ids.website },
        items: [
          { name: 'Forside', url: `${SITE_URL}/` },
          { name: 'Behandlinger & Priser', url: `${SITE_URL}/behandlinger/` },
          { name: 'Ayurvedisk Livsstilskonsultation', url: `${SITE_URL}/livsstilskonsultation/` },
          { name: 'Personlige Meditationer', url: `${SITE_URL}/skraeddersyede-meditationer/` },
          { name: 'Meditation', url: `${SITE_URL}/meditation/` },
          { name: 'Om Karmaveda', url: `${SITE_URL}/om-os/` },
          { name: 'Om Nina Riisager', url: `${SITE_URL}/om-nina-riisager/` },
          { name: 'Blog', url: `${SITE_URL}/blog/` },
        ],
      },
      ids
    )
  );

  return [organization, person, website, navigation];
}

export function buildPageSchemaGraph(options: PageGraphOptions): Record<string, unknown> | null {
  if (options.noindex) {
    return null;
  }

  const pieces: GraphEntity[] = [...buildSiteEntities()];
  const {
    url,
    title,
    description,
    pageType = 'WebPage',
    imageUrl,
    imageWidth = 1200,
    imageHeight = 630,
  } = options;

  const hasImage = Boolean(imageUrl);
  if (hasImage && imageUrl) {
    pieces.push(
      asEntity(
        buildImageObject(
          {
            pageUrl: url,
            url: imageUrl,
            width: imageWidth,
            height: imageHeight,
            inLanguage: 'da-DK',
            caption: title,
          },
          ids
        )
      )
    );
  }

  const breadcrumbItems =
    options.breadcrumbs && options.breadcrumbs.length > 1 ? options.breadcrumbs : undefined;

  if (breadcrumbItems) {
    pieces.push(
      asEntity(
        buildBreadcrumbList(
          {
            url,
            items: breadcrumbItems,
          },
          ids
        )
      )
    );
  }

  const isBlogContext =
    Boolean(options.article) || url.includes('/blog') || url.includes('/kategori/');
  if (isBlogContext) {
    pieces.push(
      asEntity(
        buildPiece({
          '@type': 'Blog',
          '@id': BLOG_ID,
          name: 'Karmaveda Blog',
          description:
            'Artikler og viden om Ayurveda, mindfulness, søvn, meditation og holistisk velvære.',
          url: `${SITE_URL}/blog/`,
          inLanguage: 'da-DK',
          publisher: { '@id': ORG_ID },
        })
      )
    );
  }

  const webPageExtra: Record<string, unknown> = {};
  if (description) {
    webPageExtra.description = description;
  }
  if (options.faq && options.faq.length > 0) {
    webPageExtra['@type'] = ['WebPage', 'FAQPage'];
    webPageExtra.mainEntity = options.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }));
  }

  pieces.push(
    asEntity(
      buildWebPage(
        {
          url,
          name: title,
          isPartOf: { '@id': ids.website },
          inLanguage: 'da-DK',
          breadcrumb: breadcrumbItems ? { '@id': ids.breadcrumb(url) } : undefined,
          primaryImage: hasImage ? { '@id': ids.primaryImage(url) } : undefined,
          datePublished: options.article?.datePublished,
          dateModified: options.article?.dateModified,
          about:
            pageType === 'ProfilePage'
              ? { '@id': url.includes('om-nina-riisager') ? ids.person : ORG_ID }
              : url === `${SITE_URL}/`
                ? { '@id': ORG_ID }
                : undefined,
          ...webPageExtra,
        },
        ids,
        pageType
      )
    )
  );

  if (options.article) {
    pieces.push(
      asEntity(
        buildArticle(
          {
            url,
            isPartOf: { '@id': ids.webPage(url) },
            author: { '@id': ids.person, name: 'Nina Riisager' },
            publisher: { '@id': ORG_ID },
            headline: options.article.headline,
            description: options.article.description,
            inLanguage: 'da-DK',
            datePublished: options.article.datePublished ?? new Date(),
            dateModified: options.article.dateModified,
            image: hasImage ? { '@id': ids.primaryImage(url) } : undefined,
            articleSection: options.article.category,
            wordCount: options.article.wordCount,
          },
          ids,
          'BlogPosting'
        )
      )
    );
  }

  if (options.services && options.services.length > 0) {
    for (const svc of options.services) {
      pieces.push(
        asEntity(
          buildPiece({
            '@type': 'Service',
            '@id': `${url}#service-${svc.id}`,
            name: svc.name,
            description: svc.description,
            provider: { '@id': ORG_ID },
            areaServed: {
              '@type': 'Country',
              name: 'Danmark',
            },
            offers: svc.offers.map((offer) => ({
              '@type': 'Offer',
              name: offer.name,
              price: offer.price,
              priceCurrency: offer.priceCurrency ?? 'DKK',
              availability: 'https://schema.org/InStock',
              url,
              ...(offer.description ? { description: offer.description } : {}),
            })),
          })
        )
      );
    }
  }

  return assembleGraph(pieces) as unknown as Record<string, unknown>;
}
