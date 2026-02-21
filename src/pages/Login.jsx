import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError(t('login.errors.fillAllFields'));
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || t('login.errors.loginFailed'));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError(t('login.errors.fillAllFields'));
      return;
    }

    try {
      await register(formData.email, formData.password, {
        name: formData.name,
        role: formData.role
      });
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || t('login.errors.registrationFailed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md p-8 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h1 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          {activeTab === 'login' ? t('login.signIn') : t('login.signUp')}
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg text-red-700 bg-red-100 border border-red-300">
            {error}
          </div>
        )}
        
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
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder={t('login.emailPlaceholder')}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.password')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder={t('login.passwordPlaceholder')}
                required
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
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.name')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder={t('login.namePlaceholder')}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder={t('login.emailPlaceholder')}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.password')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                placeholder={t('login.passwordPlaceholder')}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('login.role')}
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  focusRingColor: 'var(--color-primary)'
                }}
                required
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
