import * as THREE from 'three';

// Common types
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

// Form types
export interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormStatus {
  type: 'success' | 'error' | 'info';
  messages: string[];
}

// Project/Mission types
export interface Tool {
  name: string;
  icon: string;
  color: string;
}

export interface Mission {
  id: string;
  title: string;
  objective: string;
  tools: {
    name: string;
    icon: string;
    color: string;
  }[];
  status: 'completed' | 'in-progress';
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: 'academic' | 'professional';
  date?: string;
  company?: string;
  githubUrl?: string;
  liveUrl?: string;
  backgroundImage?: string;
}

// Profile types
export interface Link {
  name: string;
  url: string;
}

export interface Education {
  school: string;
  location: string;
  degree: string;
  date: string;
  courses: string[];
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  dataTools: string[];
  technologies: string[];
}

export interface Contact {
  email: string;
  phone: string;
  links: Link[];
}

export interface Profile {
  name: string;
  title: string;
  contact: Contact;
  education: Education[];
  skills: Skills;
}

// Experience types
export interface Experience {
  title: string;
  company: string;
  type?: string;
  date: string;
  achievements: string[];
  technologies: string[];
}

// Blog types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
  imageUrl: string;
}

// 3D Types
export interface Point3D {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  age: number;
}

export interface FloatingText {
  position: [number, number, number];
  text: string;
  color: string;
}

// Sound types
export type SoundType = 'hover' | 'click' | 'error' | 'success' | 'transition';

export interface SoundOptions {
  volume?: number;
  loop?: boolean;
}

// Theme types
export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export interface ProjectTool {
  name: string;
  icon: string;
  color: string;
}

export type Category = 'all' | 'academic' | 'professional'; 