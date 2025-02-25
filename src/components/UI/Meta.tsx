import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaProps {
  title?: string;
  description?: string;
}

export default function Meta({ 
  title = 'FPS Portfolio',
  description = 'Welcome to my FPS-themed portfolio showcasing my development projects and skills.'
}: MetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
} 