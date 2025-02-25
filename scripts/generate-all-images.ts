import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { missions } from '../src/data/missions';
import { blogPosts } from '../src/data/intel';

interface ImageTheme {
  primary: string;
  secondary: string;
  accent: string;
  pattern: string;
}

const THEMES: Record<'academic' | 'professional' | 'blog', ImageTheme> = {
  academic: {
    primary: '#00FFEE',
    secondary: '#1a1a1a',
    accent: '#00FFEE40',
    pattern: `
      <pattern id="techGrid" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect width="50" height="50" fill="none" stroke="#00FFEE20" stroke-width="0.5"/>
        <circle cx="25" cy="25" r="1" fill="#00FFEE30"/>
      </pattern>
    `
  },
  professional: {
    primary: '#FF3366',
    secondary: '#1a1a1a',
    accent: '#FF336640',
    pattern: `
      <pattern id="circuitBoard" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 30 0 v 100 M 70 0 v 100 M 0 30 h 100 M 0 70 h 100" 
              stroke="#FF336620" stroke-width="0.5"/>
        <circle cx="30" cy="30" r="2" fill="#FF336630"/>
        <circle cx="70" cy="70" r="2" fill="#FF336630"/>
      </pattern>
    `
  },
  blog: {
    primary: '#FFB71B',
    secondary: '#1a1a1a',
    accent: '#FFB71B40',
    pattern: `
      <pattern id="hexGrid" width="60" height="104" patternUnits="userSpaceOnUse">
        <path d="M30 0 L60 17.3 L60 51.9 L30 69.2 L0 51.9 L0 17.3 Z" 
              fill="none" stroke="#FFB71B20" stroke-width="0.5"/>
      </pattern>
    `
  }
};

interface TechTheme {
  icon: string;
  color: string;
  pattern: string;
}

const TECH_THEMES: Record<string, TechTheme> = {
  'Deep Learning': {
    icon: `
      <!-- Neural Network Icon -->
      <g transform="translate(20,20) scale(0.6)">
        <!-- Layers -->
        ${[0, 1, 2].map(layer => `
          <g transform="translate(${layer * 40},0)">
            ${[0, 1, 2].map(node => `
              <circle cx="0" cy="${node * 40}" r="5" fill="#00FFEE"/>
              <!-- Connections to next layer -->
              ${layer < 2 ? [0, 1, 2].map(nextNode => `
                <path d="M 5 ${node * 40} L ${35} ${nextNode * 40}"
                      stroke="#00FFEE" stroke-width="1" opacity="0.3"/>
              `).join('') : ''}
            `).join('')}
          </g>
        `).join('')}
      </g>
    `,
    color: '#00FFEE',
    pattern: `
      <pattern id="neuralNet" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M10 10 L90 90 M90 10 L10 90" stroke="#00FFEE20" stroke-width="1"/>
        <circle cx="50" cy="50" r="2" fill="#00FFEE30"/>
      </pattern>
    `
  },
  'Computer Vision': {
    icon: `
      <!-- Camera/Eye Icon -->
      <g transform="translate(30,30)">
        <circle cx="20" cy="20" r="18" stroke="#FF3366" stroke-width="2" fill="none"/>
        <circle cx="20" cy="20" r="8" fill="#FF3366" opacity="0.5"/>
        <path d="M 2 2 L 38 38 M 38 2 L 2 38" stroke="#FF3366" stroke-width="1" opacity="0.5"/>
        <!-- Focus Lines -->
        <path d="M 0 20 L 40 20 M 20 0 L 20 40" stroke="#FF3366" stroke-width="0.5" opacity="0.3"/>
      </g>
    `,
    color: '#FF3366',
    pattern: `
      <pattern id="vision" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect x="10" y="10" width="80" height="80" stroke="#FF336620" fill="none"/>
        <circle cx="50" cy="50" r="2" fill="#FF336630"/>
      </pattern>
    `
  },
  'MLOps': {
    icon: `
      <!-- Pipeline/Workflow Icon -->
      <g transform="translate(25,25)">
        <rect x="0" y="0" width="50" height="50" fill="none" stroke="#FFB71B" stroke-width="2"/>
        <!-- Gears -->
        <path d="M 15 15 A 10 10 0 1 0 25 25" stroke="#FFB71B" fill="none"/>
        <path d="M 35 35 A 10 10 0 1 0 45 45" stroke="#FFB71B" fill="none"/>
        <!-- Flow Lines -->
        <path d="M 10 25 L 40 25 M 25 10 L 25 40" stroke="#FFB71B" stroke-width="1" opacity="0.5"/>
      </g>
    `,
    color: '#FFB71B',
    pattern: `
      <pattern id="pipeline" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M0 50 L100 50 M50 0 L50 100" stroke="#FFB71B20" stroke-width="1"/>
      </pattern>
    `
  },
  'Data Engineering': {
    icon: `
      <!-- Database/Pipeline Icon -->
      <g transform="translate(25,25)">
        <!-- Database Cylinders -->
        ${[0, 1, 2].map(i => `
          <g transform="translate(${i * 20},0)">
            <path d="M 0 10 A 10 5 0 0 0 20 10 A 10 5 0 0 0 0 10"
                  fill="none" stroke="#4CAF50" stroke-width="2"/>
            <path d="M 0 10 L 0 30 A 10 5 0 0 0 20 30 L 20 10"
                  fill="none" stroke="#4CAF50" stroke-width="2"/>
          </g>
        `).join('')}
        <!-- Connection Lines -->
        <path d="M 10 20 L 50 20" stroke="#4CAF50" stroke-width="1" opacity="0.5"/>
      </g>
    `,
    color: '#4CAF50',
    pattern: `
      <pattern id="dataflow" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 80 0 L 100 20 L 100 80 L 80 100 L 20 100 L 0 80 L 0 20 Z"
              fill="none" stroke="#4CAF5020" stroke-width="1"/>
      </pattern>
    `
  },
  'Web Development': {
    icon: `
      <!-- Browser/Code Icon -->
      <g transform="translate(20,20)">
        <rect x="0" y="0" width="60" height="40" rx="3" stroke="#61DAFB" stroke-width="2" fill="none"/>
        <!-- Browser Controls -->
        <circle cx="10" cy="10" r="3" fill="#61DAFB" opacity="0.5"/>
        <circle cx="20" cy="10" r="3" fill="#61DAFB" opacity="0.5"/>
        <circle cx="30" cy="10" r="3" fill="#61DAFB" opacity="0.5"/>
        <!-- Code Lines -->
        <path d="M 10 25 L 30 25 M 10 32 L 40 32" stroke="#61DAFB" stroke-width="2" opacity="0.3"/>
      </g>
    `,
    color: '#61DAFB',
    pattern: `
      <pattern id="webdev" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 0 0 L 100 100 M -25 75 L 25 -25 M 75 125 L 125 25"
              stroke="#61DAFB20" stroke-width="1"/>
      </pattern>
    `
  }
};

function getTechTheme(mission: typeof missions[0]): TechTheme {
  const title = mission.title.toLowerCase();
  const tools = mission.tools.map(t => t.name.toLowerCase());
  
  // Deep Learning
  if (tools.some(t => ['pytorch', 'tensorflow', 'cuda', 'keras'].includes(t)) ||
      title.includes('neural') || title.includes('deep learning')) {
    return TECH_THEMES['Deep Learning'];
  }
  
  // Computer Vision
  if (tools.some(t => ['opencv', 'pillow', 'yolo'].includes(t)) ||
      title.includes('vision') || title.includes('face') || title.includes('image')) {
    return TECH_THEMES['Computer Vision'];
  }
  
  // MLOps
  if (tools.some(t => ['docker', 'jenkins', 'kubernetes', 'mlflow'].includes(t)) ||
      title.includes('mlops') || title.includes('pipeline')) {
    return TECH_THEMES['MLOps'];
  }
  
  // Data Engineering
  if (tools.some(t => ['spark', 'kafka', 'airflow', 'redis'].includes(t)) ||
      title.includes('data') || title.includes('pipeline')) {
    return TECH_THEMES['Data Engineering'];
  }
  
  // Web Development
  if (tools.some(t => ['react', 'node', 'javascript', 'typescript'].includes(t)) ||
      title.includes('web') || title.includes('frontend')) {
    return TECH_THEMES['Web Development'];
  }

  // Default theme based on category
  return {
    icon: '',
    color: mission.category === 'academic' ? '#00FFEE' : '#FF3366',
    pattern: `
      <pattern id="default" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M0 0 L100 100 M100 0 L0 100" 
              stroke="${mission.category === 'academic' ? '#00FFEE20' : '#FF336620'}" 
              stroke-width="1"/>
      </pattern>
    `
  };
}

async function createBaseLayer(width: number, height: number, theme: ImageTheme) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${theme.pattern}
        <linearGradient id="backgroundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${theme.secondary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#backgroundGrad)"/>
      <rect width="100%" height="100%" fill="url(#pattern)" opacity="0.5"/>
    </svg>
  `;

  return sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}

async function addContentLayer(
  baseBuffer: Buffer,
  {
    title,
    subtitle,
    tools = [],
    theme
  }: {
    title: string;
    subtitle: string;
    tools?: string[];
    theme: ImageTheme;
  }
) {
  const width = 1200;
  const height = 675;
  const truncatedTitle = title.length > 50 ? title.substring(0, 47) + '...' : title;
  const toolsText = tools.slice(0, 3).join(' • ');

  const contentSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Corner Accents -->
      <path d="M 0 50 L 50 50 L 50 0" stroke="${theme.primary}" 
            stroke-width="2" fill="none" opacity="0.5" filter="url(#glow)"/>
      <path d="M ${width} ${height-50} L ${width-50} ${height-50} L ${width-50} ${height}" 
            stroke="${theme.primary}" stroke-width="2" fill="none" opacity="0.5" 
            filter="url(#glow)"/>

      <!-- Content Container -->
      <g transform="translate(60, ${height * 0.4})">
        <!-- Subtitle -->
        <rect x="-10" y="-60" width="${subtitle.length * 12 + 40}" height="30" 
              fill="${theme.accent}" rx="15"/>
        <text font-family="Arial" font-size="16" fill="${theme.primary}" y="-40" 
              filter="url(#glow)">${subtitle}</text>

        <!-- Title -->
        <text font-family="Arial" font-weight="bold" font-size="42" 
              fill="${theme.primary}" y="20" filter="url(#glow)">
          ${truncatedTitle}
        </text>

        <!-- Tools -->
        ${toolsText ? `
          <g transform="translate(0, 60)">
            <rect x="-10" y="-20" width="${toolsText.length * 12 + 40}" height="30" 
                  fill="${theme.accent}" rx="15"/>
            <text font-family="Arial" font-size="20" fill="#999999" 
                  dominant-baseline="middle">${toolsText}</text>
          </g>
        ` : ''}
      </g>

      <!-- Gradient Overlay -->
      <rect width="100%" height="100%" fill="url(#overlay)"/>
    </svg>
  `;

  return sharp(baseBuffer)
    .composite([{
      input: Buffer.from(contentSvg),
      blend: 'over'
    }])
    .jpeg({
      quality: 90,
      chromaSubsampling: '4:4:4'
    });
}

async function generateImage(
  title: string,
  subtitle: string,
  type: keyof typeof THEMES,
  tools: string[] = []
) {
  try {
    const theme = THEMES[type];
    const width = 1200;
    const height = 675;

    const baseLayer = await createBaseLayer(width, height, theme);
    return addContentLayer(baseLayer, {
      title,
      subtitle,
      tools,
      theme
    });
  } catch (error) {
    console.error(`Failed to generate image for: ${title}`, error);
    throw error;
  }
}

async function ensureDirectories() {
  const dirs = [
    'public/images',
    'public/images/projects',
    'public/images/blog'
  ];

  for (const dir of dirs) {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function generateAllImages() {
  try {
    await ensureDirectories();

    // Generate mission images
    for (const mission of missions) {
      const outputPath = path.join('public', 'images', 'projects', `${mission.id}.jpg`);
      const image = await generateMissionImage(mission);
      
      await image.toFile(outputPath);
      console.log(`✅ Generated: ${outputPath}`);
    }

    // Generate blog images
    for (const post of blogPosts) {
      const outputPath = path.join('public', 'images', 'blog', `${post.id}.jpg`);
      const image = await generateImage(
        post.title,
        'INTELLIGENCE REPORT',
        'blog',
        post.tags
      );
      
      await image.toFile(outputPath);
      console.log(`✅ Generated: ${outputPath}`);
    }

    // Generate placeholder
    const placeholderPath = path.join('public', 'images', 'placeholder.jpg');
    await generateImage(
      'Image Not Found',
      'PLACEHOLDER',
      'blog',
      []
    ).then(image => image.toFile(placeholderPath));
    
    console.log('✅ All images generated successfully');
  } catch (error) {
    console.error('❌ Failed to generate images:', error);
    process.exit(1);
  }
}

async function generateMissionImage(mission: typeof missions[0]) {
  const width = 1200;
  const height = 675;
  const theme = getTechTheme(mission);
  const toolIcons = mission.tools.slice(0, 3).map(t => t.name).join(' • ');

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
        </linearGradient>
        ${theme.pattern}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#pattern)" opacity="0.5"/>

      <!-- Tech Icon -->
      <g transform="translate(${width-150}, 50) scale(0.8)" opacity="0.8" filter="url(#glow)">
        ${theme.icon}
      </g>

      <!-- Content -->
      <g transform="translate(60, ${height * 0.4})">
        <text font-family="Arial" font-size="16" fill="#666666" y="-40">
          ${mission.category.toUpperCase()} MISSION
        </text>
        <text font-family="Arial" font-weight="bold" font-size="42" 
              fill="${theme.color}" y="20" filter="url(#glow)">
          ${mission.title}
        </text>
        <text font-family="Arial" font-size="24" fill="#999999" y="60">
          ${toolIcons}
        </text>
      </g>

      <!-- Decorative Elements -->
      <path d="M 0 ${height * 0.8} L ${width} ${height * 0.4}"
            stroke="${theme.color}" stroke-width="1" stroke-opacity="0.3"/>
      <path d="M 0 ${height * 0.2} L ${width} ${height * 0.6}"
            stroke="${theme.color}" stroke-width="1" stroke-opacity="0.3"/>

      <!-- Overlay -->
      <rect width="100%" height="100%" 
            fill="url(#overlay)" opacity="0.7"/>
    </svg>
  `;

  return sharp(Buffer.from(svg))
    .jpeg({
      quality: 90,
      chromaSubsampling: '4:4:4'
    });
}

generateAllImages(); 