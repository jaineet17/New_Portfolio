import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Import missions data
const missionsPath = path.join(projectRoot, 'src', 'data', 'missions.ts');
const { missions } = await import(missionsPath);

// Replace with your Unsplash API access key
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';

// Map project types to relevant Unsplash search queries
const PROJECT_IMAGES = {
  'speech-recognition': {
    query: 'artificial intelligence sound wave',
    fallback: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
  },
  'face-classification': {
    query: 'facial recognition technology',
    fallback: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9'
  },
  'needle-framework': {
    query: 'neural network visualization',
    fallback: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485'
  },
  'movie-recommender': {
    query: 'movie recommendation system',
    fallback: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1'
  },
  'equiem-rag': {
    query: 'artificial intelligence chat',
    fallback: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  },
  'cmu-research': {
    query: 'database server technology',
    fallback: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31'
  },
  'delemont-chatbot': {
    query: 'chatbot ai interface',
    fallback: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  },
  'dev-it-data': {
    query: 'data analytics dashboard',
    fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
  }
};

async function downloadImage(id: string, query: string, fallbackUrl: string) {
  try {
    // Try Unsplash API first
    const searchResponse = await axios.get(
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

    const imageUrl = searchResponse.data.results[0]?.urls.regular || fallbackUrl;
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    return sharp(response.data)
      .resize(1200, 675, { fit: 'cover' })
      .jpeg({ quality: 90 });
  } catch (error) {
    console.error(`Error downloading image for ${id}:`, error);
    throw error;
  }
}

async function downloadAllImages() {
  const projectsDir = path.join(projectRoot, 'public', 'images', 'projects');
  await fs.mkdir(projectsDir, { recursive: true });

  for (const mission of missions) {
    const imageConfig = PROJECT_IMAGES[mission.id];
    if (!imageConfig) {
      console.warn(`⚠️ No image configuration for: ${mission.id}`);
      continue;
    }

    const imagePath = path.join(projectsDir, `${mission.id}.jpg`);
    try {
      console.log(`📥 Downloading image for: ${mission.id}`);
      const image = await downloadImage(mission.id, imageConfig.query, imageConfig.fallback);
      await image.toFile(imagePath);
      console.log(`✅ Saved: ${mission.id}.jpg`);
    } catch (error) {
      console.error(`❌ Failed: ${mission.id}.jpg`);
    }
  }
}

// Run the download
downloadAllImages().catch(console.error); 