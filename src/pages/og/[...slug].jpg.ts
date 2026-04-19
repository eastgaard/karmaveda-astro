import satori from 'satori';
import sharp from 'sharp';
import type { APIRoute } from 'astro';

export const prerender = true;

export async function getStaticPaths() {
  return [
    { params: { slug: 'index' } },
  ];
}

// Sæt standard font (fx. Roboto eller Inter). Vi henter en standardfont asynkront.
async function loadFont() {
  const response = await fetch('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff');
  return await response.arrayBuffer();
}

export const GET: APIRoute = async ({ request }) => {
  // Prøv at hente titlen fra URL query parameter (?title=Dit+Title) ellers default
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || 'Karmaveda - Din vej til naturlig sundhed';
  
  const fontData = await loadFont();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fefae0', // Karmaveda baggrund
          backgroundImage: 'linear-gradient(135deg, #fefae0 0%, #e9edc9 100%)',
          padding: '40px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: 80,
                fontWeight: 700,
                color: '#606c38', // Karmaveda primær grøn
                textAlign: 'center',
                marginBottom: '20px',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: 40,
                fontWeight: 400,
                color: '#dda15e', // Karmaveda sekundær
              },
              children: 'www.karmaveda.dk',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const pngBuffer = await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toBuffer();

  return new Response(pngBuffer as any, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
