import fs from 'fs/promises';
import path from 'path';
import { missions } from '../src/data/missions';
import { blogPosts } from '../src/data/intel';

async function debugImages() {
  const publicDir = path.join(process.cwd(), 'public');
  
  console.log('\nChecking directories...');
  try {
    await fs.access(path.join(publicDir, 'images'));
    await fs.access(path.join(publicDir, 'images/projects'));
    await fs.access(path.join(publicDir, 'images/blog'));
    console.log('✅ Image directories exist');
  } catch (e) {
    console.error('❌ Image directories missing');
  }

  console.log('\nChecking mission images...');
  for (const mission of missions) {
    const imagePath = path.join(publicDir, 'images', 'projects', `${mission.id}.jpg`);
    try {
      const stats = await fs.stat(imagePath);
      console.log(`✅ ${mission.id}.jpg (${stats.size} bytes)`);
    } catch (e) {
      console.error(`❌ Missing: ${mission.id}.jpg`);
    }
  }

  console.log('\nChecking blog images...');
  for (const post of blogPosts) {
    const imagePath = path.join(publicDir, 'images', 'blog', `${post.id}.jpg`);
    try {
      const stats = await fs.stat(imagePath);
      console.log(`✅ ${post.id}.jpg (${stats.size} bytes)`);
    } catch (e) {
      console.error(`❌ Missing: ${post.id}.jpg`);
    }
  }
}

debugImages().catch(console.error); 