import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { extend } from '@react-three/fiber';

// Extend Three.js with TextGeometry
extend({ TextGeometry });

// Create font loader singleton
const fontLoader = new FontLoader();

// Load font and return promise
export const loadFont = (url: string) => {
  return new Promise((resolve, reject) => {
    fontLoader.load(url, resolve, undefined, reject);
  });
}; 