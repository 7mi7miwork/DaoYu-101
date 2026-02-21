import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGamification } from '../hooks/useGamification';

const XPBar = () => {
  const { t } = useTranslation();
  const { xp, level, getProgressToNextLevel, getXPToNextLevel } = useGamification();
  
  const progress = getProgressToNextLevel();
  const xpToNext = getXPToNextLevel();

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <span 
          className="text-sm font-medium"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {t('gamification.level', 'Level')} {level}
        </span>
        <span 
          className="text-sm font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          {xp} XP
        </span>
      </div>
      
      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-500 ease-out"
          style={{ 
            width: `${progress}%`,
            backgroundColor: 'var(--color-primary)'
          }}
        />
      </div>
      
      {xpToNext > 0 && (
        <span 
          className="text-xs"
          style={{ color: 'var(--color-text-muted)' }}
        >
          +{xpToNext}
        </span>
      )}
    </div>
  );
};

export default XPBar;
