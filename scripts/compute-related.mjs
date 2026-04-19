import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import removeMd from 'remove-markdown';
import natural from 'natural';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogDir = path.join(__dirname, '../src/content/blog');
const dataDir = path.join(__dirname, '../src/data');

const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

// Danske stop-ord for at undgå at almindelige ord forvrænger resultatet
const stopWords = new Set([
  'og', 'i', 'jeg', 'det', 'at', 'en', 'den', 'til', 'er', 'som', 'på', 'de', 'med', 'han', 'af', 'for', 'ikke', 'der', 'var', 'mig', 'sig', 'men', 'et', 'har', 'om', 'vi', 'min', 'havde', 'ham', 'hun', 'nu', 'over', 'da', 'fra', 'du', 'ud', 'sin', 'dem', 'os', 'op', 'man', 'hans', 'hvor', 'eller', 'hvad', 'skal', 'selv', 'her', 'alle', 'vil', 'blev', 'kunne', 'ind', 'når', 'være', 'dog', 'noget', 'ville', 'jo', 'deres', 'efter', 'ned', 'skulle', 'denne', 'end', 'dette', 'mit', 'også', 'under', 'have', 'dig', 'anden', 'hende', 'mine', 'alt', 'meget', 'sit', 'sine', 'vor', 'mod', 'disse', 'hvis', 'din', 'nogle', 'hos', 'blive', 'mange', 'ad', 'bliver', 'hendes', 'været', 'thi', 'jer', 'sådan', 'kan', 'så', 'får'
]);

// Rens teksten for speciel karakterer og returner tokens, ekskluder stopord
function tokenizeAndClean(text) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());
  return tokens.filter(token => !stopWords.has(token) && token.length > 2);
}

async function computeRelatedPosts() {
  // Undersøg om mappen findes
  if (!fs.existsSync(blogDir)) {
    console.error(`Kunne ikke finde blog mappen: ${blogDir}`);
    return;
  }

  const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
  const documents = [];

  // Læs og pre-processer alle filer
  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, '');
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Brug gray-matter til at udtrække metadata og brødtekst
    const parsed = matter(content);
    const title = parsed.data.seo?.title || parsed.data.title || '';
    const description = parsed.data.seo?.description || parsed.data.description || '';
    
    // Fjern markdown formatting for at få ren tekst
    const plainText = removeMd(parsed.content);
    
    // Som specificeret: Titler og beskrivelser vægtes 3x (vi gentager dem 3 gange)
    const weightedMetadata = Array(3).fill(`${title} ${description}`).join(' ');
    
    // Samlet tekst for TF-IDF
    const combinedText = `${weightedMetadata} ${plainText}`;
    const tokens = tokenizeAndClean(combinedText);
    
    documents.push({
      slug,
      title,
      text: tokens.join(' ')
    });
  }

  // Tilføj til TF-IDF index
  documents.forEach(doc => {
    tfidf.addDocument(doc.text);
  });

  const relatedPosts = {};

  // Find lighed mellem artikler
  documents.forEach((doc, index) => {
    const scores = [];
    
    // natural's tfidfs returnerer similarity "measure" mellem doc.text og de andre dokumenter
    tfidf.tfidfs(doc.text, function(i, measure) {
      // Ignorer sig selv
      if (i !== index) {
        scores.push({
          slug: documents[i].slug,
          score: measure
        });
      }
    });

    // Sortér faldende efter score og vælg top 3
    scores.sort((a, b) => b.score - a.score);
    const top3Slugs = scores.slice(0, 3).map(s => s.slug);
    
    relatedPosts[doc.slug] = top3Slugs;
  });

  // Opret data-mappen hvis den ikke eksisterer
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Gem som JSON fil
  const outputPath = path.join(dataDir, 'related-posts.json');
  fs.writeFileSync(outputPath, JSON.stringify(relatedPosts, null, 2), 'utf-8');
  
  console.log('✅ TF-IDF "Relaterede Artikler" Matrix bygget:', outputPath);
}

computeRelatedPosts().catch(console.error);
