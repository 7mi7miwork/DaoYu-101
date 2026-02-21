import React from 'react';
import { useTranslation } from 'react-i18next';

const IslandNode = ({ island }) => {
  const { t } = useTranslation();

  return (
    <div 
      className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all hover:scale-105"
      style={{
        backgroundColor: island.unlocked 
          ? 'var(--color-surface)' 
          : 'var(--color-bg)',
        borderColor: island.unlocked 
          ? 'var(--color-primary)' 
          : 'var(--color-border)',
        opacity: island.unlocked ? 1 : 0.6
      }}
    >
      <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
        {t(island.titleKey)}
      </span>
      {!island.unlocked && <span>🔒</span>}
    </div>
  );
};

export default IslandNode;
