import React from 'react';
import { useTranslation } from 'react-i18next';

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
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>💻 {t('courses.archipelagos.programming.title')}</h3>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>{t('courses.archipelagos.programming.description')}</p>
            <button className="px-4 py-2 rounded" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
              {t('courses.explore')}
            </button>
          </div>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>🌐 {t('courses.archipelagos.languages.title')}</h3>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>{t('courses.archipelagos.languages.description')}</p>
            <button className="px-4 py-2 rounded" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
              {t('courses.explore')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
