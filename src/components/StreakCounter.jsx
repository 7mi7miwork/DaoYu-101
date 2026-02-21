import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGamification } from '../hooks/useGamification';

const StreakCounter = ({ size = 'medium' }) => {
  const { t } = useTranslation();
  const { streak } = useGamification();
  
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-2'
  };
  
  const getStreakColor = (streak) => {
    if (streak === 0) return '#6b7280'; // gray
    if (streak <= 3) return '#10b981'; // green
    if (streak <= 7) return '#f59e0b'; // amber
    return '#ef4444'; // red (on fire!)
  };

  const getStreakText = (streak) => {
    if (streak === 0) return t('gamification.streak.none', 'No streak');
    if (streak === 1) return t('gamification.streak.one', '1 day');
    return t('gamification.streak.many', '{{count}} days', { count: streak });
  };

  if (streak === 0) {
    return (
      <div 
        className={`${sizeClasses[size]} rounded-full flex items-center space-x-1`}
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: `1px solid var(--color-border)`,
          color: 'var(--color-text-muted)'
        }}
      >
        <span>🔥</span>
        <span>{getStreakText(streak)}</span>
      </div>
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full flex items-center space-x-1 text-white font-medium`}
      style={{ backgroundColor: getStreakColor(streak) }}
    >
      <span>{streak >= 7 ? '🔥' : '⭐'}</span>
      <span>{getStreakText(streak)}</span>
    </div>
  );
};

export default StreakCounter;
