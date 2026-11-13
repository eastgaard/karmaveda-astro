import { getCollection } from 'astro:content';
import { createMarkdownEndpoint } from '@jdevalk/astro-seo-graph';
import { SITE_URL } from '../lib/seo-graph';

export const prerender = true;

interface StaticMarkdownPage {
  id: string;
  title: string;
  canonical: string;
  description: string;
  body: string;
}

async function getAllMarkdownPages(): Promise<StaticMarkdownPage[]> {
  const blogPosts = await getCollection('blog');
  const sortedPosts = [...blogPosts].sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  const staticPages: StaticMarkdownPage[] = [
    {
      id: 'index',
      title: 'Karmaveda | Din Lokale Ayurvediske Velværeklinik',
      canonical: `${SITE_URL}/`,
      description:
        'Oplev ægte velvære hos Karmaveda med Ayurvediske livsstilskonsultationer, balancerende energibehandling og meditation. Find din indre balance og ro.',
      body: `# Find din indre balance med Ayurveda & Meditation

Velkommen til **Karmaveda** – holistisk velværeklinik i Stenløse stiftet af **Nina Riisager**. Jeg skaber ro i sindet og sundhed i kroppen gennem ældgammel ayurvedisk visdom kombineret med moderne teknikker inden for mindfulness og energibehandling.

## Mine Ydelser

### Ayurvedisk Livsstilskonsultation
Få et skræddersyet forløb baseret på din unikke konstitution. Jeg arbejder med fordøjelse, søvn, stress og skaber varig balance gennem små, men betydningsfulde ændringer i hverdagen.
- Læs mere: ${SITE_URL}/livsstilskonsultation

### Balancerende Energibehandling
Slap fuldstændig af mens energibanerne i din krop stimuleres via blide tryk, akupressur og healing. Behandlingen hjælper dig til at give slip på stress og stagneret energi.
- Læs mere: ${SITE_URL}/behandlinger

### Mindfulness & Meditation
Få et liv med ro, nærvær og glæde. Deltag i 1-1 sessioner, opdag mine gratis guidede meditationer, eller få indtalt personlige meditationer skræddersyet til dine behov.
- Læs mere: ${SITE_URL}/meditation
- Personlige meditationer for behandlere: ${SITE_URL}/skraeddersyede-meditationer

## Mød Nina Riisager
Som uddannet Ayurvedisk sundheds- og livsstilskonsulent kombinerer jeg Ayurveda med mindfulness, NADA-akupunktur, akupressur og følelseshealing.

## Karmaveda Filosofien
- **Karma** stammer fra sanskrit og betyder at handle – loven om årsag og virkning.
- **Veda** betyder viden eller visdom.

## Kontakt & Klinik
- **Adresse:** Dam Holme 14, 3660 Stenløse, Danmark
- **Telefon:** +45 29 72 59 04
- **E-mail:** nina@karmaveda.dk
- **CVR:** DK34226679`,
    },
    {
      id: 'behandlinger',
      title: 'Behandlinger og konsultationer | Karmaveda',
      canonical: `${SITE_URL}/behandlinger/`,
      description:
        'Læs om Karmavedas behandlinger og konsultationer: Livsstilskonsultation (Ayurveda), balancerende energibehandling og mindfulness/meditation.',
      body: `# Behandlinger og Konsultationer

Skab balance i krop og sind med skræddersyede forløb hos Karmaveda i Stenløse.

## Ayurvedisk Livsstilskonsultation
Ayurveda er en mere end 5000 år gammel holistisk sundhedsvidenskab, som ser på det hele menneske. Jeg tilrettelægger et skræddersyet forløb for dig med udgangspunkt i den ayurvediske tilgang til krop og sind.
- Læs mere og se pakkepris: ${SITE_URL}/livsstilskonsultation

## Balancerende Energibehandling
Du ligger fuldt påklædt på en briks og slapper af, mens forskellige punkter fra toppen af hovedet og ned til tæerne aktiveres ved blide tryk, akupressur og healing.

### Priser – Balancerende Energibehandling
- **1 behandling fra 15 år (60 min):** 750 DKK
- **1 behandling op til 14 år (30-45 min):** 395 DKK

## Mindfulness & Meditation
En 1-1 mindfulness session handler om at finde indre ro via guidet siddende eller liggende meditation, åndedrætsøvelser samt inspiration til små daglige øvelser og yoga.

### Priser – Mindfulness & Meditation
- **1-1 Mindfulness session (60 min):** 850 DKK
- **NADA øreakupunktur inden session (+45 min):** 150 DKK
- Par eller familier kan kontakte Nina Riisager for en samlet pris på nina@karmaveda.dk.`,
    },
    {
      id: 'livsstilskonsultation',
      title: 'Ayurvedisk Livsstilskonsultation | Karmaveda',
      canonical: `${SITE_URL}/livsstilskonsultation/`,
      description:
        'Er du klar til forandring? Et skræddersyet ayurvedisk forløb der hjælper dig med fordøjelse, søvn, stress og skaber daglig balance og velvære.',
      body: `# Ayurvedisk Livsstilskonsultation

Skab balance i krop og sind med et forløb skræddersyet til dig (fysisk i Stenløse eller online).

## Hvornår er et forløb relevant?
- Ved udfordringer med fordøjelse, søvn, stress, vægt, hovedpine, allergi, hormonelle ubalancer eller manglende overskud og livsglæde.
- Når du ønsker en dybere forståelse af dit helbred og vil skabe varige, sunde daglige rutiner.

## Du kan forvente
- Et skræddersyet personligt forløb.
- En helhedsorienteret tilgang med fokus på din samlede livsstil.
- Styrkelse af fysisk og psykisk sundhed.
- Kontinuerlig støtte og hjemmearbejde mellem konsultationerne.

## Processen (4 trin)
1. **Første konsultation:** Grundig samtale ud fra specifikke spørgsmål og dine mål.
2. **Personlig analyse:** Udarbejdelse af personlig ayurvedisk analyse.
3. **Opfølgende forløb:** Konkrete forslag til daglige rutiner i dit eget tempo.
4. **Nå dine mål:** Løbende tilpasning og fastholdelse af nye vaner.

## Pakkepris
- **Forløb med 4 live konsultationer (fysisk eller online) + 4 mailkonsultationer:** 4.444 DKK
- Kontakt for booking: nina@karmaveda.dk / +45 29 72 59 04`,
    },
    {
      id: 'meditation',
      title: 'Meditation | Karmaveda',
      canonical: `${SITE_URL}/meditation/`,
      description:
        'Meditation er et vigtigt værktøj til at skabe balance i livet. Lyt til gratis guidede meditationer og få ro, nærvær og glæde i hverdagen.',
      body: `# Meditation – Et vigtigt værktøj til balance i livet

Drømmer du om mere indre ro, nærvær, glæde og overskud i hverdagen? Hos Karmaveda kan du lytte til gratis guidede meditationer eller booke 1-1 sessioner.

## Lyt gratis til Karmaveda
- Spotify: https://open.spotify.com/show/0yu5c87AO9NpwojUYgPYQu
- YouTube: https://www.youtube.com/channel/UCvlMZBLi94LgFxLFb-ume4A
- InsightTimer: https://insighttimer.com/karmaveda
- Apple Podcasts / iTunes: https://podcasts.apple.com/us/podcast/karmaveda/id1504017633

## Dokumenterede effekter ved meditation
- **Øget mental velvære og livsglæde:** Reducerer symptomer på stress, angst og depression.
- **Bedre fysisk helbred:** Mindsker risikoen for hjertesygdomme, forhøjet blodtryk og sænker inflammation.
- **Stærkere kognitive evner:** Styrker fokus, koncentrationsevne, hukommelse og kreativitet – selv ved få minutter dagligt.

## Ofte stillede spørgsmål (FAQ)

### Hvad betyder Karmaveda?
Karma stammer fra sanskrit og betyder at handle (loven om årsag og virkning). Veda betyder viden eller visdom. Med Ayurveda, yoga, meditation og mindfulness får du indsigt i, hvad der er bedst for dig, så du kan handle derefter.

### Hvor længe skal jeg meditere ad gangen?
Til at starte med anbefales blot 4-5 minutter ad gangen. Det afgørende er konsistens.

### Hvornår ser jeg resultater?
Nogle mærker effekt efter blot få dage, mens studier ofte måler effekten efter 8 uger.

### Hvad sker der, hvis jeg misser en dag?
Sig pyt, og kom op på hesten igen dagen efter ("Don't miss twice").`,
    },
    {
      id: 'skraeddersyede-meditationer',
      title: 'Personlige Meditationer | Karmaveda',
      canonical: `${SITE_URL}/skraeddersyede-meditationer/`,
      description:
        'Unikke og skræddersyede meditationer designet specifikt for behandlere, terapeuter, psykologer og til deres klienters unikke forløb.',
      body: `# Personlige meditationer for behandlere, terapeuter og psykologer

Tilbyd unikke, skræddersyede lydmeditationer i høj lydkvalitet designet specifikt til dine klienters behov og de temaer, du arbejder med i din praksis (f.eks. angst, stress, spiseforstyrrelser, selvværd og mindfulness).

## Meditationspakker & Priser

### Basic – 500 DKK
- 1x Intro til meditation
- 1x personlig meditation

### Standard (Mest populære) – 1.500 DKK
- 1x Intro til meditation
- 4x personlige meditationer

### Professionel (Kampagne) – 2.500 DKK (normalpris 4.500 DKK)
- 1x Intro til meditation
- 10x personlige meditationer

Kontakt Nina Riisager direkte på nina@karmaveda.dk for bestilling.`,
    },
    {
      id: 'om-os',
      title: 'Om Karmaveda | Holistisk Velværeklinik',
      canonical: `${SITE_URL}/om-os/`,
      description:
        'Karmaveda er en holistisk velværeklinik fokuseret på Ayurvediske behandlinger. Læs om min filosofi og kontakt mig.',
      body: `# Om Karmaveda

Karmaveda er en holistisk velværeklinik i Stenløse drevet af Nina Riisager med fokus på Ayurvediske livsstilskonsultationer, balancerende energibehandlinger, mindfulness og meditation.

## Praktisk Information & Kontakt
- **Klinik:** Karmaveda.dk
- **Adresse:** Dam Holme 14, 3660 Stenløse, Danmark
- **Telefon:** +45 29 72 59 04
- **E-mail:** nina@karmaveda.dk

## Virksomhedsoplysninger
- **CVR:** DK34226679
- **Bank:** Reg: 8117 / Konto: 0002909248
- **IBAN:** DK3181170002909248
- **SWIFT/BIC:** NYKBDKKK`,
    },
    {
      id: 'blog',
      title: 'Blog | Karmaveda',
      canonical: `${SITE_URL}/blog/`,
      description:
        'Læs spændende artikler og få inspiration om Ayurveda, meditation, velvære og balance i hverdagen.',
      body: `# Karmaveda Blog & Artikler\n\nFå viden og inspiration til et liv i balance:\n\n${sortedPosts
        .map(
          (p) =>
            `- [${p.data.title}](${SITE_URL}/blog/${p.id}): ${p.data.description ?? ''}`
        )
        .join('\n')}`,
    },
  ];

  const collectionPages = await getCollection('pages');
  const existingIds = new Set(staticPages.map((p) => p.id));

  for (const p of collectionPages) {
    if (!existingIds.has(p.id)) {
      staticPages.push({
        id: p.id,
        title: p.data.seo?.title || p.data.title,
        canonical: `${SITE_URL}/${p.id}/`,
        description: p.data.seo?.description || p.data.description || '',
        body: p.body ?? '',
      });
    }
  }

  const uniqueCategories = [...new Set(sortedPosts.map((post) => post.data.category))].filter(
    Boolean
  );
  for (const category of uniqueCategories) {
    const categorySlug = category
      .toLowerCase()
      .replace(/æ/g, 'ae')
      .replace(/ø/g, 'oe')
      .replace(/å/g, 'aa')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const catPosts = sortedPosts.filter((p) => p.data.category === category);
    staticPages.push({
      id: `kategori/${categorySlug}`,
      title: `Artikler om ${category} – Blog | Karmaveda`,
      canonical: `${SITE_URL}/kategori/${categorySlug}/`,
      description: `Læs alle mine artikler om ${category} hos Karmaveda. Få viden og inspiration til indre ro, naturlig balance og holistisk velvære.`,
      body: `# Artikler om ${category}\n\nHer finder du alle artikler i kategorien **${category}** på Karmaveda:\n\n${catPosts
        .map((p) => `- [${p.data.title}](${SITE_URL}/blog/${p.id}/): ${p.data.description ?? ''}`)
        .join('\n')}`,
    });
  }

  return staticPages;
}

export const getStaticPaths = async () => {
  const pages = await getAllMarkdownPages();
  return pages.map((p) => ({ params: { slug: p.id } }));
};

export const GET = createMarkdownEndpoint({
  entries: getAllMarkdownPages,
  mapper: (page, slug) =>
    page.id !== slug
      ? null
      : {
          frontmatter: {
            title: page.title,
            canonical: page.canonical,
            author: 'Nina Riisager',
            description: page.description,
          },
          body: page.body,
        },
});
