import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import archipelagos from '../data/archipelagos';

const Courses = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          📚 {t('courses.title')}
        </h1>
        <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
          {t('courses.description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {archipelagos.map((archipelago) => (
            <div 
              key={archipelago.id}
              className="p-6 rounded-lg border hover:shadow-lg transition-shadow"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>
                {archipelago.icon} {t(archipelago.titleKey)}
              </h3>
              <p className="mb-4" style={{ color: 'var(--color-text)' }}>
                {t(archipelago.descriptionKey)}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {archipelago.islands.length} islands
                </span>
                <Link 
                  to={`/courses/${archipelago.id}`}
                  className="px-4 py-2 rounded text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: archipelago.color }}
                >
                  {t('courses.explore')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
