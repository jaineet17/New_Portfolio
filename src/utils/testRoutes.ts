const routes = [
  '/',
  '/about',
  '/projects',
  '/blog',
  '/blog/deep-learning-framework',
  '/blog/speech-recognition',
  '/blog/face-verification',
  '/blog/scalable-recommendation',
  '/blog/rag-optimization',
  '/contact'
];

export const testRoutes = () => {
  routes.forEach(route => {
    console.log(`Testing route: ${route}`);
    // Add your test logic here
  });
}; 