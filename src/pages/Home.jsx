import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          🏝️ {t('home.title')}
        </h1>
        <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
          {t('home.subtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>{t('home.archipelagos.programming.title')}</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>{t('home.archipelagos.programming.description')}</p>
          </div>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>{t('home.archipelagos.languages.title')}</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>{t('home.archipelagos.languages.description')}</p>
          </div>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>{t('home.archipelagos.finance.title')}</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>{t('home.archipelagos.finance.description')}</p>
          </div>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>{t('home.archipelagos.schoolSubjects.title')}</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>{t('home.archipelagos.schoolSubjects.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
