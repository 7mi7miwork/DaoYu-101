import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import XPBar from './XPBar';
import StreakCounter from './StreakCounter';

const Navbar = () => {
  const { theme, changeTheme } = useTheme();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="border-b" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
          >
            🏝️ Dao-Yu-101
          </Link>

          {/* Gamification Elements */}
          <div className="hidden md:flex items-center space-x-4">
            <XPBar />
            <StreakCounter size="small" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${isActive('/') ? 'text-primary' : ''}`}
              style={{ 
                color: isActive('/') ? 'var(--color-primary)' : 'var(--color-text)',
                fontFamily: 'var(--font-primary)'
              }}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/courses"
              className={`font-medium transition-colors ${isActive('/courses') ? 'text-primary' : ''}`}
              style={{ 
                color: isActive('/courses') ? 'var(--color-primary)' : 'var(--color-text)',
                fontFamily: 'var(--font-primary)'
              }}
            >
              {t('nav.courses')}
            </Link>
            {user ? (
              <>
                <Link
                  to="/store"
                  className={`font-medium transition-colors ${isActive('/store') ? 'text-primary' : ''}`}
                  style={{ 
                    color: isActive('/store') ? 'var(--color-primary)' : 'var(--color-text)',
                    fontFamily: 'var(--font-primary)'
                  }}
                >
                  {t('nav.store')}
                </Link>
                <Link
                  to="/profile"
                  className={`font-medium transition-colors ${isActive('/profile') ? 'text-primary' : ''}`}
                  style={{ 
                    color: isActive('/profile') ? 'var(--color-primary)' : 'var(--color-text)',
                    fontFamily: 'var(--font-primary)'
                  }}
                >
                  {t('nav.profile')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-medium transition-colors"
                  style={{ 
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-primary)'
                  }}
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/store"
                  className={`font-medium transition-colors ${isActive('/store') ? 'text-primary' : ''}`}
                  style={{ 
                    color: isActive('/store') ? 'var(--color-primary)' : 'var(--color-text)',
                    fontFamily: 'var(--font-primary)'
                  }}
                >
                  {t('nav.store')}
                </Link>
                <Link
                  to="/login"
                  className={`font-medium transition-colors ${isActive('/login') ? 'text-primary' : ''}`}
                  style={{ 
                    color: isActive('/login') ? 'var(--color-primary)' : 'var(--color-text)',
                    fontFamily: 'var(--font-primary)'
                  }}
                >
                  {t('nav.login')}
                </Link>
              </>
            )}
          </div>

          {/* Theme Switcher and Language Placeholder */}
          <div className="flex items-center space-x-4">
            {/* Theme Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => changeTheme('archipelago')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  theme === 'archipelago' ? 'ring-2' : ''
                }`}
                style={{ 
                  backgroundColor: theme === 'archipelago' ? '#2d5a1b' : 'transparent',
                  color: theme === 'archipelago' ? 'white' : 'var(--color-text)',
                  ringColor: theme === 'archipelago' ? '#2d5a1b' : 'transparent'
                }}
                title="Archipelago Theme"
              >
                🌿
              </button>
              <button
                onClick={() => changeTheme('modern')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  theme === 'modern' ? 'ring-2' : ''
                }`}
                style={{ 
                  backgroundColor: theme === 'modern' ? '#4f46e5' : 'transparent',
                  color: theme === 'modern' ? 'white' : 'var(--color-text)',
                  ringColor: theme === 'modern' ? '#4f46e5' : 'transparent'
                }}
                title="Modern Theme"
              >
                ⚡
              </button>
              <button
                onClick={() => changeTheme('dark')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  theme === 'dark' ? 'ring-2' : ''
                }`}
                style={{ 
                  backgroundColor: theme === 'dark' ? '#7c3aed' : 'transparent',
                  color: theme === 'dark' ? 'white' : 'var(--color-text)',
                  ringColor: theme === 'dark' ? '#7c3aed' : 'transparent'
                }}
                title="Dark Theme"
              >
                🌙
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  i18n.language === 'en' ? 'ring-2' : ''
                }`}
                style={{ 
                  backgroundColor: i18n.language === 'en' ? 'var(--color-primary)' : 'transparent',
                  color: i18n.language === 'en' ? 'white' : 'var(--color-text)',
                  ringColor: i18n.language === 'en' ? 'var(--color-primary)' : 'transparent'
                }}
                title="English"
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => i18n.changeLanguage('de')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  i18n.language === 'de' ? 'ring-2' : ''
                }`}
                style={{ 
                  backgroundColor: i18n.language === 'de' ? 'var(--color-primary)' : 'transparent',
                  color: i18n.language === 'de' ? 'white' : 'var(--color-text)',
                  ringColor: i18n.language === 'de' ? 'var(--color-primary)' : 'transparent'
                }}
                title="Deutsch"
              >
                🇩� DE
              </button>
              <button
                onClick={() => i18n.changeLanguage('es')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  i18n.language === 'es' ? 'ring-2' : ''
                }`}
                style={{ 
                  backgroundColor: i18n.language === 'es' ? 'var(--color-primary)' : 'transparent',
                  color: i18n.language === 'es' ? 'white' : 'var(--color-text)',
                  ringColor: i18n.language === 'es' ? 'var(--color-primary)' : 'transparent'
                }}
                title="Español"
              >
                🇪🇸 ES
              </button>
              <button
                onClick={() => i18n.changeLanguage('zh-TW')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  i18n.language === 'zh-TW' ? 'ring-2' : ''
                }`}
                style={{ 
                  backgroundColor: i18n.language === 'zh-TW' ? 'var(--color-primary)' : 'transparent',
                  color: i18n.language === 'zh-TW' ? 'white' : 'var(--color-text)',
                  ringColor: i18n.language === 'zh-TW' ? 'var(--color-primary)' : 'transparent'
                }}
                title="繁體中文"
              >
                🇹🇼 ZH
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
