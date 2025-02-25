import fs from 'fs/promises';
import path from 'path';
import { missions } from '../src/data/missions';

async function checkProjectImages() {
  const projectsDir = path.join(process.cwd(), 'public', 'images', 'projects');
  
  console.log('Checking project images...\n');
  
  try {
    await fs.access(projectsDir);
  } catch {
    console.log('❌ Missing directory: /public/images/projects');
    await fs.mkdir(projectsDir, { recursive: true });
    console.log('✅ Created directory: /public/images/projects');
  }

  for (const mission of missions) {
    const imagePath = path.join(projectsDir, `${mission.id}.jpg`);
    try {
      await fs.access(imagePath);
      const stats = await fs.stat(imagePath);
      console.log(`✅ Found: ${mission.id}.jpg (${stats.size} bytes)`);
    } catch {
      console.log(`❌ Missing: ${mission.id}.jpg`);
    }
  }
}

checkProjectImages().catch(console.error); 