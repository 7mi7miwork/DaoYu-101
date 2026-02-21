import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import archipelagos from '../data/archipelagos';

const Island = () => {
  const { archipelagoId } = useParams();
  const { t } = useTranslation();
  
  const archipelago = archipelagos.find(a => a.id === archipelagoId);
  
  if (!archipelago) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
            Archipelago not found
          </h1>
          <Link to="/courses" className="text-blue-500 hover:underline">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-4 py-8">
        <Link to="/courses" className="text-blue-500 hover:underline mb-6 inline-block">
          ← Back to Courses
        </Link>
        
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          {archipelago.icon} {t(archipelago.titleKey)}
        </h1>
        
        <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
          {t(archipelago.descriptionKey)}
        </p>
        
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
          Islands
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archipelago.islands.map((island) => (
            <div
              key={island.id}
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--color-surface)', 
                borderColor: 'var(--color-border)',
                opacity: island.unlocked ? 1 : 0.6
              }}
            >
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                {island.unlocked ? '🏝️' : '🔒'} {t(island.titleKey)}
              </h3>
              
              {island.unlocked ? (
                <Link 
                  to={`/lesson/${archipelago.id}-${island.id}`}
                  className="inline-block px-4 py-2 rounded text-white"
                  style={{ backgroundColor: archipelago.color }}
                >
                  Start Learning
                </Link>
              ) : (
                <button 
                  disabled
                  className="px-4 py-2 rounded text-gray-500 cursor-not-allowed"
                  style={{ backgroundColor: 'var(--color-border)' }}
                >
                  Locked
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Island;
