import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const IMAGES = {
  'speech-recognition': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
  'face-classification': 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9',
  'needle-framework': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
  'movie-recommender': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
  'equiem-rag': 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
  'cmu-research': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
  'delemont-chatbot': 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
  'dev-it-data': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
};

async function downloadAndProcessImage(id: string, url: string) {
  try {
    console.log(`📥 Downloading: ${id}`);
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    
    console.log(`🔄 Processing: ${id}`);
    await sharp(response.data)
      .resize(1200, 675, { fit: 'cover' })
      .jpeg({ quality: 90 })
      .toFile(path.join('public', 'images', 'projects', `${id}.jpg`));
    
    console.log(`✅ Completed: ${id}`);
  } catch (error) {
    console.error(`❌ Failed: ${id}`, error);
  }
}

async function downloadAllImages() {
  // Create directory if it doesn't exist
  await fs.mkdir(path.join('public', 'images', 'projects'), { recursive: true });
  
  // Download all images
  await Promise.all(
    Object.entries(IMAGES).map(([id, url]) => downloadAndProcessImage(id, url))
  );
}

downloadAllImages().catch(console.error); 