import fs from 'fs/promises';
import path from 'path';
import { missions } from '../src/data/missions';
import { generateImage } from './generate-all-images';

async function ensureMissionImages() {
  const projectsDir = path.join(process.cwd(), 'public', 'images', 'projects');
  
  // Ensure directory exists
  await fs.mkdir(projectsDir, { recursive: true });

  // Check and generate missing images
  for (const mission of missions) {
    const imagePath = path.join(projectsDir, `${mission.id}.jpg`);
    
    try {
      await fs.access(imagePath);
      console.log(`✅ Image exists: ${mission.id}.jpg`);
    } catch {
      console.log(`⚙️ Generating image: ${mission.id}.jpg`);
      const image = await generateImage(
        mission.title,
        `${mission.category.toUpperCase()} MISSION`,
        mission.category,
        mission.tools.map(t => t.name)
      );
      await image.toFile(imagePath);
      console.log(`✅ Generated: ${mission.id}.jpg`);
    }
  }
}

ensureMissionImages().catch(console.error); 