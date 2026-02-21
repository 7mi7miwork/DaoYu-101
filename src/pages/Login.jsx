import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md p-8 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h1 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          {activeTab === 'login' ? t('login.signIn') : t('login.signUp')}
        </h1>
        
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 px-4 ${activeTab === 'login' ? 'border-b-2' : ''}`}
            style={{ 
              borderColor: activeTab === 'login' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'login' ? 'var(--color-primary)' : 'var(--color-text-muted)'
            }}
            onClick={() => setActiveTab('login')}
          >
            {t('login.loginTab')}
          </button>
          <button
            className={`flex-1 py-2 px-4 ${activeTab === 'register' ? 'border-b-2' : ''}`}
            style={{ 
              borderColor: activeTab === 'register' ? 'var(--color-primary)' : 'transparent',
              color: activeTab === 'register' ? 'var(--color-primary)' : 'var(--color-text-muted)'
            }}
            onClick={() => setActiveTab('register')}
          >
            {t('login.registerTab')}
          </button>
        </div>

        {activeTab === 'login' ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.email')}
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder={t('login.emailPlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.password')}
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder={t('login.passwordPlaceholder')}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md font-medium"
              style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
            >
              {t('login.signIn')}
            </button>
          </form>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.name')}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder={t('login.namePlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.email')}
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder={t('login.emailPlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.password')}
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder={t('login.passwordPlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.role')}
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
              >
                <option value="student">{t('login.roles.student')}</option>
                <option value="parent">{t('login.roles.parent')}</option>
                <option value="teacher">{t('login.roles.teacher')}</option>
                <option value="school">{t('login.roles.school')}</option>
                <option value="admin">{t('login.roles.admin')}</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md font-medium"
              style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
            >
              {t('login.signUp')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
