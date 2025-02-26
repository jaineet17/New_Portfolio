
interface MissionBackgroundProps {
  id: string;
  category: 'academic' | 'professional';
  className?: string;
}

export default function MissionBackground({ id, category, className = '' }: MissionBackgroundProps) {
  const defaultBackground = `/images/projects/${id}.jpg`;
  const fallbackPattern = category === 'academic' 
    ? 'bg-gradient-to-br from-cyan-900/20 to-blue-900/20'
    : 'bg-gradient-to-br from-pink-900/20 to-purple-900/20';

  return (
    <div 
      className={`relative w-full h-full ${className}`}
      style={{
        backgroundImage: `url(${defaultBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Fallback Pattern */}
      <div className={`absolute inset-0 ${fallbackPattern} opacity-50`} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
    </div>
  );
} 
