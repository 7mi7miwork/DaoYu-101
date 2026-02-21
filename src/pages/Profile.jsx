import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import { useTheme } from '../context/ThemeContext';
import { useCertificate } from '../hooks/useCertificate';
import { supabase } from '../lib/supabase';
import LevelBadge from '../components/LevelBadge';
import XPBar from '../components/XPBar';
import StreakCounter from '../components/StreakCounter';

const Profile = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { xp, level, badges, streak } = useGamification();
  const { theme, setTheme } = useTheme();
  const { generateCertificate } = useCertificate();
  
  const [profile, setProfile] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [purchasedLessons, setPurchasedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  // Load user profile and completed lessons
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) return;

      try {
        // Load profile from Supabase
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error loading profile:', profileError);
        } else {
          setProfile(profileData);
          if (profileData?.language) {
            setSelectedLanguage(profileData.language);
            i18n.changeLanguage(profileData.language);
          }
          if (profileData?.theme) {
            setTheme(profileData.theme);
          }
        }

        // Load completed lessons
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('user_progress')
          .select('lesson_id, completed, score, xp_earned, completed_at')
          .eq('user_id', user.id)
          .eq('completed', true)
          .order('completed_at', { ascending: false });

        if (lessonsError) {
          console.error('Error loading lessons:', lessonsError);
        } else {
          setCompletedLessons(lessonsData || []);
        }

        // Load purchased lessons
        const { data: purchasesData, error: purchasesError } = await supabase
          .from('purchases')
          .select(`
            *,
            lessons (
              id,
              title,
              description,
              price
            )
          `)
          .eq('user_id', user.id)
          .order('date', { ascending: false });

        if (purchasesError) {
          console.error('Error loading purchases:', purchasesError);
        } else {
          setPurchasedLessons(purchasesData || []);
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [user, i18n, setTheme]);

  // Handle language change
  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);

    // Save to Supabase
    if (user) {
      try {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || profile?.name || 'User',
            language,
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error updating language:', error);
        }
      } catch (error) {
        console.error('Error updating language:', error);
      }
    }
  };

  // Handle theme change
  const handleThemeChange = async (newTheme) => {
    setTheme(newTheme);

    // Save to Supabase
    if (user) {
      try {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || profile?.name || 'User',
            theme: newTheme,
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error updating theme:', error);
        }
      } catch (error) {
        console.error('Error updating theme:', error);
      }
    }
  };

  // Generate certificate
  const handleGenerateCertificate = () => {
    const certId = `CERT-${user.id}-${Date.now()}`;
    const studentName = profile?.name || user.user_metadata?.name || 'Student';
    const courseName = t('profile.certificateCourseName');
    const date = new Date().toLocaleDateString();

    generateCertificate({
      studentName,
      courseName,
      date,
      certId
    });
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    const name = profile?.name || user.user_metadata?.name || user.email || 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p style={{ color: 'var(--color-text)' }}>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            {t('profile.title')}
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            {t('profile.subtitle')}
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-lg shadow-lg p-6 mb-6" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="flex items-center space-x-6 mb-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold" 
                 style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
              {getUserInitials()}
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                {profile?.name || user.user_metadata?.name || user.email}
              </h2>
              <p style={{ color: 'var(--color-text-muted)' }}>{user.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <LevelBadge level={level} />
                <StreakCounter streak={streak} />
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mb-6">
            <XPBar />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded" style={{ backgroundColor: 'var(--color-bg)' }}>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{xp}</div>
              <div style={{ color: 'var(--color-text-muted)' }}>{t('profile.totalXP')}</div>
            </div>
            <div className="text-center p-4 rounded" style={{ backgroundColor: 'var(--color-bg)' }}>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{completedLessons.length}</div>
              <div style={{ color: 'var(--color-text-muted)' }}>{t('profile.completedLessons')}</div>
            </div>
            <div className="text-center p-4 rounded" style={{ backgroundColor: 'var(--color-bg)' }}>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{badges.length}</div>
              <div style={{ color: 'var(--color-text-muted)' }}>{t('profile.badges')}</div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="rounded-lg shadow-lg p-6 mb-6" style={{ backgroundColor: 'var(--color-surface)' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            {t('profile.settings')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language Settings */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('profile.language')}
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full p-2 rounded border"
                style={{ 
                  backgroundColor: 'var(--color-bg)', 
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)'
                }}
              >
                <option value="en">🇬🇧 English</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="es">🇪🇸 Español</option>
                <option value="zh-TW">🇹🇼 繁體中文</option>
              </select>
            </div>

            {/* Theme Settings */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                {t('profile.theme')}
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleThemeChange('archipelago')}
                  className={`px-4 py-2 rounded ${theme === 'archipelago' ? 'ring-2 ring-indigo-500' : ''}`}
                  style={{ 
                    backgroundColor: theme === 'archipelago' ? 'var(--color-primary)' : 'var(--color-bg)',
                    color: theme === 'archipelago' ? 'white' : 'var(--color-text)'
                  }}
                >
                  {t('themes.archipelago')}
                </button>
                <button
                  onClick={() => handleThemeChange('modern')}
                  className={`px-4 py-2 rounded ${theme === 'modern' ? 'ring-2 ring-indigo-500' : ''}`}
                  style={{ 
                    backgroundColor: theme === 'modern' ? 'var(--color-primary)' : 'var(--color-bg)',
                    color: theme === 'modern' ? 'white' : 'var(--color-text)'
                  }}
                >
                  {t('themes.modern')}
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`px-4 py-2 rounded ${theme === 'dark' ? 'ring-2 ring-indigo-500' : ''}`}
                  style={{ 
                    backgroundColor: theme === 'dark' ? 'var(--color-primary)' : 'var(--color-bg)',
                    color: theme === 'dark' ? 'white' : 'var(--color-text)'
                  }}
                >
                  {t('themes.dark')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="rounded-lg shadow-lg p-6 mb-6" style={{ backgroundColor: 'var(--color-surface)' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            {t('profile.badges')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.length > 0 ? (
              badges.map((badge, index) => (
                <div key={index} className="text-center p-4 rounded" style={{ backgroundColor: 'var(--color-bg)' }}>
                  <div className="text-2xl mb-2">
                    {badge === 'First Steps' && '🎯'}
                    {badge === 'Quiz Master' && '🏆'}
                    {badge === 'On Fire' && '🔥'}
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                    {t(`badges.${badge.toLowerCase().replace(' ', '')}`)}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8" style={{ color: 'var(--color-text-muted)' }}>
                {t('profile.noBadges')}
              </div>
            )}
          </div>
        </div>

        {/* Purchased Lessons */}
        <div className="rounded-lg shadow-lg p-6 mb-6" style={{ backgroundColor: 'var(--color-surface)' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            {t('profile.purchasedLessons')}
          </h3>
          {purchasedLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {purchasedLessons.map((purchase) => (
                <div key={purchase.id} className="p-4 rounded border" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                    {purchase.lessons.title}
                  </h4>
                  <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    {purchase.lessons.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {t('profile.purchasedOn')} {new Date(purchase.date).toLocaleDateString()}
                    </span>
                    <span className="font-medium" style={{ color: 'var(--color-primary)' }}>
                      ${purchase.lessons.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8" style={{ color: 'var(--color-text-muted)' }}>
              {t('profile.noPurchasedLessons')}
            </div>
          )}
        </div>

        {/* Completed Lessons */}
        <div className="rounded-lg shadow-lg p-6 mb-6" style={{ backgroundColor: 'var(--color-surface)' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            {t('profile.completedLessons')}
          </h3>
          {completedLessons.length > 0 ? (
            <div className="space-y-2">
              {completedLessons.map((lesson, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: 'var(--color-bg)' }}>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--color-text)' }}>
                      {lesson.lesson_id}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {new Date(lesson.completed_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium" style={{ color: 'var(--color-primary)' }}>
                      {lesson.score}%
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      +{lesson.xp_earned} XP
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8" style={{ color: 'var(--color-text-muted)' }}>
              {t('profile.noCompletedLessons')}
            </div>
          )}
        </div>

        {/* Certificate */}
        <div className="rounded-lg shadow-lg p-6" style={{ backgroundColor: 'var(--color-surface)' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            {t('profile.certificate')}
          </h3>
          <p className="mb-4" style={{ color: 'var(--color-text-muted)' }}>
            {t('profile.certificateDescription')}
          </p>
          <button
            onClick={handleGenerateCertificate}
            className="px-6 py-3 rounded font-medium text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {t('profile.downloadCertificate')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
