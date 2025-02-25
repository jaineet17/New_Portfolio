const axios = require('axios');
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const IMAGES = {
  // Project Images
  'speech-recognition': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', // Sound waves
  'face-classification': 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9', // Face recognition
  'needle-framework': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485', // Neural network
  'movie-recommender': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1', // Movie theater
  'equiem-rag': 'https://chatgen.ai/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-02-14.56.08-Create-a-minimalistic-image-that-features-the-acronym-RAG-in-large-bold-letters-at-the-center.-Surround-the-letters-with-simplistic-flat-icons-of-d.png', // Modern document system
  'cmu-research': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31', // Server room
  'delemont-chatbot': 'https://news.cornell.edu/sites/default/files/styles/story_thumbnail_xlarge/public/2024-07/robot-1280x720_0.jpg?itok=AF6MakCq', // Chat interface
  'dev-it-data': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', // Data analytics
  
  // Intel/Blog Images (Updated with unique images)
  'deep-learning-basics': 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', // Code/Neural Network
  'ml-deployment': 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a', // Server/Deployment
  'computer-vision': 'https://images.unsplash.com/photo-1561736778-92e52a7769ef', // Computer Vision/Eye
  'nlp-transformers': 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1' // Language/Text Processing
};

async function downloadAndProcessImage(id, url, type = 'projects') {
  try {
    console.log(`📥 Downloading: ${id}`);
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    
    console.log(`🔄 Processing: ${id}`);
    const image = sharp(response.data);

    // Add tech-themed processing based on type
    if (type === 'intel') {
      await image
        .resize(1200, 675, { fit: 'cover' })
        .modulate({
          brightness: 1.1,
          saturation: 1.2
        })
        .tint({ r: 0, g: 70, b: 100 }) // Slight tech-blue tint
        .jpeg({ quality: 90 })
        .toFile(path.join('public', 'images', type, `${id}.jpg`));
    } else {
      await image
        .resize(1200, 675, { fit: 'cover' })
        .jpeg({ quality: 90 })
        .toFile(path.join('public', 'images', type, `${id}.jpg`));
    }
    
    console.log(`✅ Completed: ${id}`);
  } catch (error) {
    console.error(`❌ Failed: ${id}`, error);
  }
}

async function downloadAllImages() {
  // Create directories if they don't exist
  const dirs = [
    path.join('public', 'images', 'projects'),
    path.join('public', 'images', 'intel')
  ];
  
  for (const dir of dirs) {
    await fs.mkdir(dir, { recursive: true });
    console.log(`📁 Ensured directory exists: ${dir}`);
  }
  
  // Download project images
  console.log('\n📥 Downloading project images...');
  const projectImages = Object.entries(IMAGES)
    .filter(([id]) => !id.includes('deep-learning') && !id.includes('ml-') && !id.includes('computer-') && !id.includes('nlp-'))
    .map(([id, url]) => downloadAndProcessImage(id, url, 'projects'));

  // Download intel images
  console.log('\n📥 Downloading intel images...');
  const intelImages = Object.entries(IMAGES)
    .filter(([id]) => id.includes('deep-learning') || id.includes('ml-') || id.includes('computer-') || id.includes('nlp-'))
    .map(([id, url]) => downloadAndProcessImage(id, url, 'intel'));

  await Promise.all([...projectImages, ...intelImages]);
  console.log('\n✅ All images downloaded and processed!');
}

downloadAllImages().catch(console.error); 