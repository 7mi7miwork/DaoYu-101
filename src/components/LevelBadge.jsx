import React from 'react';
import { useGamification } from '../hooks/useGamification';

const LevelBadge = ({ size = 'medium' }) => {
  const { level } = useGamification();
  
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  };
  
  const getLevelColor = (level) => {
    if (level <= 2) return '#10b981'; // green
    if (level <= 3) return '#3b82f6'; // blue
    if (level <= 4) return '#8b5cf6'; // purple
    return '#f59e0b'; // amber
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full text-white font-bold flex items-center justify-center`}
      style={{ backgroundColor: getLevelColor(level) }}
    >
      L{level}
    </div>
  );
};

export default LevelBadge;
