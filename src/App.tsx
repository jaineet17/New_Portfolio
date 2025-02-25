import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GameProvider } from './context/GameContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/UI/LoadingScreen';
import Background3D from './components/3D/Background3D';
import SoundToggle from './components/UI/SoundToggle';
import MainLayout from './components/Layout/MainLayout';

// Lazy load pages
const MainMenu = React.lazy(() => import('./components/MainMenu/MainMenu'));
const About = React.lazy(() => import('./pages/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const BlogPost = React.lazy(() => import('./components/Blog/BlogPost'));
const Blog = React.lazy(() => import('./pages/Blog'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <MainLayout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainMenu />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <GameProvider>
        <Router>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <>
                <Background3D />
                <AnimatedRoutes />
                <SoundToggle />
              </>
            )}
          </AnimatePresence>
        </Router>
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App; 