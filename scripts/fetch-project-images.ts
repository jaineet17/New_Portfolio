import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { missions } from '../src/data/missions';

// Replace with your Unsplash API access key
const UNSPLASH_ACCESS_KEY = 'your_unsplash_access_key';

// Mapping of project types to relevant Unsplash search queries
const PROJECT_IMAGE_QUERIES = {
  'speech-recognition': 'artificial intelligence sound wave',
  'face-classification': 'facial recognition technology',
  'needle-framework': 'deep learning neural network',
  'movie-recommender': 'movie recommendation algorithm',
  'equiem-rag': 'artificial intelligence chat',
  'cmu-research': 'database server technology',
  'delemont-chatbot': 'chatbot artificial intelligence',
  'dev-it-data': 'data analytics dashboard',
  'deep-learning-framework': 'deep learning code'
};

// Fallback queries for project categories
const CATEGORY_FALLBACKS = {
  'academic': 'machine learning code screen',
  'professional': 'technology office modern'
};

async function fetchUnsplashImage(query: string): Promise<Buffer> {
  try {
    const response = await axios.get(
      'https://api.unsplash.com/search/photos',
      {
        params: {
          query,
          orientation: 'landscape',
          per_page: 1
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    const imageUrl = response.data.results[0]?.urls.regular;
    if (!imageUrl) throw new Error('No image found');

    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });

    return Buffer.from(imageResponse.data);
  } catch (error) {
    console.error(`Failed to fetch image for query: ${query}`, error);
    throw error;
  }
}

async function processImage(buffer: Buffer, outputPath: string) {
  try {
    await sharp(buffer)
      // Resize to maintain consistent dimensions
      .resize(1200, 675, {
        fit: 'cover',
        position: 'center'
      })
      // Add cyberpunk-style effects
      .modulate({
        brightness: 1.1,
        saturation: 1.2
      })
      .gamma(0.9)
      // Add subtle grain
      .linear(1.1, -0.1)
      // Enhance details
      .sharpen({
        sigma: 0.5,
        m1: 0.2,
        m2: 0.4
      })
      // Save with high quality
      .jpeg({
        quality: 90,
        chromaSubsampling: '4:4:4'
      })
      .toFile(outputPath);

    console.log(`✅ Processed and saved: ${outputPath}`);
  } catch (error) {
    console.error(`Failed to process image: ${outputPath}`, error);
    throw error;
  }
}

async function ensureDirectories() {
  const dirs = [
    'public/images/projects/deep-learning',
    'public/images/projects/computer-vision',
    'public/images/projects/mlops',
    'public/images/projects/data',
    'public/images/projects/web'
  ];

  for (const dir of dirs) {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function fetchAllProjectImages() {
  await ensureDirectories();

  for (const mission of missions) {
    const query = PROJECT_IMAGE_QUERIES[mission.id] || 
                 CATEGORY_FALLBACKS[mission.category];
    
    try {
      console.log(`📥 Fetching image for: ${mission.id}`);
      const imageBuffer = await fetchUnsplashImage(query);

      const outputPath = path.join(
        'public',
        'images',
        'projects',
        mission.id.includes('deep-learning') ? 'deep-learning' :
        mission.id.includes('vision') ? 'computer-vision' :
        mission.id.includes('mlops') ? 'mlops' :
        mission.id.includes('data') ? 'data' : 'web',
        `${mission.id}.jpg`
      );

      await processImage(imageBuffer, outputPath);
    } catch (error) {
      console.error(`❌ Failed to fetch/process image for: ${mission.id}`);
    }
  }
}

// Create a placeholder image for fallback
async function createPlaceholder() {
  const width = 1200;
  const height = 675;
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" font-family="Arial" font-size="24" 
            fill="#666666" text-anchor="middle">Image Not Found</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .jpeg()
    .toFile('public/images/placeholder.jpg');
}

// Run everything
Promise.all([
  fetchAllProjectImages(),
  createPlaceholder()
]).catch(console.error); 