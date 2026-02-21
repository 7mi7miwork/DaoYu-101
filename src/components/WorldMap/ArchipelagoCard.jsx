import React from 'react';
import { useTranslation } from 'react-i18next';
import IslandNode from './IslandNode';

const ArchipelagoCard = ({ archipelago }) => {
  const { t } = useTranslation();
  const unlockedCount = archipelago.islands.filter(island => island.unlocked).length;
  const totalCount = archipelago.islands.length;
  const progressPercentage = (unlockedCount / totalCount) * 100;

  return (
    <div 
      className="p-6 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-lg"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: archipelago.color,
        borderWidth: '2px'
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{archipelago.icon}</span>
        <div>
          <h3 
            className="text-xl font-bold"
            style={{ color: archipelago.color }}
          >
            {t(archipelago.titleKey)}
          </h3>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t(archipelago.descriptionKey)}
          </p>
        </div>
      </div>

      {/* Islands */}
      <div className="space-y-2 mb-4">
        {archipelago.islands.map(island => (
          <IslandNode key={island.id} island={island} />
        ))}
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span 
            className="text-sm font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            {t('worldmap.progress')}
          </span>
          <span 
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {unlockedCount}/{totalCount}
          </span>
        </div>
        <div 
          className="w-full rounded-full h-2"
          style={{ backgroundColor: 'var(--color-border)' }}
        >
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: archipelago.color
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArchipelagoCard;
