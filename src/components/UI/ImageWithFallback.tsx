import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  fallbackSrc = '/images/placeholder.jpg',
  className,
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={(e) => {
          console.error(`Failed to load image: ${src}`);
          setError(true);
        }}
        onLoad={() => setLoading(false)}
        {...props}
      />
    </div>
  );
} 
