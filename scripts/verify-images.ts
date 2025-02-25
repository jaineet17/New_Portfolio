import fs from 'fs/promises';
import path from 'path';
import { missions } from '../src/data/missions';

async function verifyImages() {
  const projectsDir = path.join(process.cwd(), 'public', 'images', 'projects');
  
  console.log('\nChecking image directory...');
  try {
    const stats = await fs.stat(projectsDir);
    console.log(`✅ Directory exists: ${projectsDir}`);
  } catch (error) {
    console.error(`❌ Directory missing: ${projectsDir}`);
    return;
  }

  console.log('\nChecking images:');
  for (const mission of missions) {
    const imagePath = path.join(projectsDir, `${mission.id}.jpg`);
    try {
      const stats = await fs.stat(imagePath);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`✅ ${mission.id}.jpg (${sizeInMB} MB)`);
    } catch (error) {
      console.error(`❌ Missing: ${mission.id}.jpg`);
    }
  }
}

verifyImages().catch(console.error); 