import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { missions } from '../src/data/missions';

const COLORS = {
  academic: '#00FFEE',
  professional: '#FF3366'
};

const PATTERNS = {
  academic: `
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,255,238,0.1)" stroke-width="1"/>
    </pattern>
  `,
  professional: `
    <pattern id="circuit" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 30 60 M 0 30 L 60 30" stroke="rgba(255,51,102,0.1)" stroke-width="1"/>
      <circle cx="30" cy="30" r="4" fill="rgba(255,51,102,0.2)"/>
    </pattern>
  `
};

async function generateMissionImage(mission: typeof missions[0]) {
  const width = 1200;
  const height = 800;
  const color = COLORS[mission.category];
  const pattern = PATTERNS[mission.category];
  const toolIcons = mission.tools.slice(0, 3).map(tool => tool.name).join(' • ');

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0)" />
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.7)" />
        </linearGradient>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.1"/>
            <feFuncG type="linear" slope="0.1"/>
            <feFuncB type="linear" slope="0.1"/>
          </feComponentTransfer>
        </filter>
        ${pattern}
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1"/>
      
      <!-- Glowing lines -->
      <path d="M 0 ${height * 0.7} L ${width} ${height * 0.3}"
            stroke="${color}" stroke-width="1" stroke-opacity="0.3"/>
      <path d="M 0 ${height * 0.3} L ${width} ${height * 0.6}"
            stroke="${color}" stroke-width="1" stroke-opacity="0.3"/>

      <!-- Content -->
      <g transform="translate(60, ${height * 0.4})">
        <text font-family="Arial" font-size="16" fill="#666666" y="-40">
          ${mission.category.toUpperCase()} MISSION
        </text>
        <text font-family="Arial" font-size="48" fill="${color}" y="20">
          ${mission.title}
        </text>
        <text font-family="Arial" font-size="24" fill="#999999" y="60">
          ${toolIcons}
        </text>
      </g>

      <!-- Overlay gradient -->
      <rect width="100%" height="100%" fill="url(#overlay)"/>
    </svg>
  `;

  return sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}

async function generateAllImages() {
  const imagesDir = path.join(process.cwd(), 'public/images/projects');
  
  // Ensure directory exists
  await fs.mkdir(imagesDir, { recursive: true });

  // Generate images for each mission
  for (const mission of missions) {
    const buffer = await generateMissionImage(mission);
    await fs.writeFile(
      path.join(imagesDir, `${mission.id}.jpg`),
      buffer
    );
    console.log(`Generated image for ${mission.id}`);
  }
}

generateAllImages().catch(console.error); 