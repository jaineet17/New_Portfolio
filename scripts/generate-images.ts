import sharp from 'sharp';
import { missions } from '../src/data/missions';

const COLORS = {
  background: '#1a1a1a',
  accent: '#00FFEE',
  overlay: 'rgba(0, 0, 0, 0.5)'
};

interface ImageConfig {
  width: number;
  height: number;
  text: string;
  icon?: string;
  gradient?: boolean;
}

async function generateProjectImage({ width, height, text, icon, gradient = true }: ImageConfig) {
  const svg = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${COLORS.background};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
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
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1"/>
      <text x="50%" y="50%" font-family="Arial" font-size="48" fill="${COLORS.accent}"
            text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;

  return sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}

async function generateImages() {
  // Generate project images
  for (const mission of missions) {
    const { id, title } = mission;
    await generateProjectImage({
      width: 1200,
      height: 800,
      text: title,
    }).then(buffer => {
      sharp(buffer).toFile(`public/images/projects/${id}.jpg`);
    });
  }

  // Generate blog post images
  const blogPosts = [
    'needle', 'speech', 'face', 'recommender', 'rag'
  ];

  for (const post of blogPosts) {
    await generateProjectImage({
      width: 1200,
      height: 630,
      text: post,
    }).then(buffer => {
      sharp(buffer).toFile(`public/images/blog/${post}.jpg`);
    });
  }
}

generateImages().catch(console.error); 