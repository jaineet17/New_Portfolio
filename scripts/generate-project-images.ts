import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Import missions data
const missionsPath = path.join(projectRoot, 'src', 'data', 'missions.ts');
const { missions } = await import(missionsPath);

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

const THEMES: Record<'academic' | 'professional', ThemeColors> = {
  academic: {
    primary: '#00FFEE',
    secondary: '#1a1a1a',
    accent: '#00FFEE40',
    background: '#0A192F'
  },
  professional: {
    primary: '#FF3366',
    secondary: '#1a1a1a',
    accent: '#FF336640',
    background: '#1A0F1F'
  }
};

async function generateProjectImage(mission: typeof missions[0]) {
  const width = 1200;
  const height = 675;
  const theme = THEMES[mission.category];
  const toolNames = mission.tools.map(t => t.name).join(' • ');

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${theme.background};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:1" />
        </linearGradient>
        
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" 
                fill="none" 
                stroke="${theme.accent}" 
                stroke-width="0.5"/>
        </pattern>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect width="100%" height="100%" fill="url(#grid)" opacity="0.1"/>

      <!-- Decorative Lines -->
      <path d="M 0 ${height * 0.8} L ${width} ${height * 0.4}"
            stroke="${theme.primary}" stroke-width="1" stroke-opacity="0.3"/>
      <path d="M 0 ${height * 0.2} L ${width} ${height * 0.6}"
            stroke="${theme.primary}" stroke-width="1" stroke-opacity="0.3"/>

      <!-- Content -->
      <g transform="translate(60, ${height * 0.4})">
        <text 
          font-family="Arial" 
          font-size="16" 
          fill="${theme.primary}80" 
          y="-40"
        >
          ${mission.category.toUpperCase()} MISSION
        </text>
        
        <text 
          font-family="Arial" 
          font-weight="bold" 
          font-size="42" 
          fill="${theme.primary}" 
          y="20"
          filter="url(#glow)"
        >
          ${mission.title}
        </text>
        
        <text 
          font-family="Arial" 
          font-size="24" 
          fill="${theme.primary}80" 
          y="60"
        >
          ${toolNames}
        </text>
      </g>

      <!-- Difficulty Indicator -->
      <g transform="translate(${width - 160}, 40)">
        ${[...Array(5)].map((_, i) => `
          <circle 
            cx="${i * 20}" 
            cy="0" 
            r="6" 
            fill="${i < mission.difficulty ? theme.primary : theme.accent}"
          />
        `).join('')}
      </g>
    </svg>
  `;

  return sharp(Buffer.from(svg))
    .jpeg({
      quality: 90,
      chromaSubsampling: '4:4:4'
    });
}

async function generateAllProjectImages() {
  const projectsDir = path.join(process.cwd(), 'public', 'images', 'projects');
  
  // Ensure directory exists
  await fs.mkdir(projectsDir, { recursive: true });

  console.log('Generating project images...\n');

  for (const mission of missions) {
    const imagePath = path.join(projectsDir, `${mission.id}.jpg`);
    try {
      const image = await generateProjectImage(mission);
      await image.toFile(imagePath);
      console.log(`✅ Generated: ${mission.id}.jpg`);
    } catch (error) {
      console.error(`❌ Failed to generate ${mission.id}.jpg:`, error);
    }
  }
}

generateAllProjectImages().catch(console.error); 