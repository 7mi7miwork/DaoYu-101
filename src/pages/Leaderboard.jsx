import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import LevelBadge from '../components/LevelBadge';

const Leaderboard = () => {
  const { t } = useTranslation();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        
        // Query to get top 10 users by total XP with their profile information
        const { data, error } = await supabase
          .from('user_gamification')
          .select(`
            user_id,
            total_xp,
            level,
            streak_days,
            badges,
            profiles!inner(
              name,
              email
            )
          `)
          .order('total_xp', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error loading leaderboard:', error);
          setError(error.message);
        } else {
          // Transform the data for easier rendering
          const transformedData = data.map((entry, index) => ({
            rank: index + 1,
            userId: entry.user_id,
            name: entry.profiles.name || entry.profiles.email.split('@')[0] || 'Anonymous',
            email: entry.profiles.email,
            totalXP: entry.total_xp || 0,
            level: entry.level || 1,
            streak: entry.streak_days || 0,
            badges: entry.badges || []
          }));
          
          setLeaderboardData(transformedData);
        }
      } catch (err) {
        console.error('Unexpected error loading leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  // Get medal emoji for top 3
  const getMedalEmoji = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  // Get rank styling
  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return {
          backgroundColor: 'var(--color-warning)',
          color: 'white'
        };
      case 2:
        return {
          backgroundColor: 'var(--color-text-muted)',
          color: 'white'
        };
      case 3:
        return {
          backgroundColor: '#CD7F32',
          color: 'white'
        };
      default:
        return {
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)'
        };
    }
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            {t('common.error')}
          </h2>
          <p style={{ color: 'var(--color-text-muted)' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            🏆 {t('leaderboard.title')}
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
            {t('leaderboard.subtitle')}
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <div className="col-span-1 font-bold text-center" style={{ color: 'var(--color-text)' }}>
              {t('leaderboard.rank')}
            </div>
            <div className="col-span-4 font-bold" style={{ color: 'var(--color-text)' }}>
              {t('leaderboard.name')}
            </div>
            <div className="col-span-2 font-bold text-center" style={{ color: 'var(--color-text)' }}>
              {t('leaderboard.level')}
            </div>
            <div className="col-span-2 font-bold text-center" style={{ color: 'var(--color-text)' }}>
              {t('leaderboard.xp')}
            </div>
            <div className="col-span-2 font-bold text-center" style={{ color: 'var(--color-text)' }}>
              {t('leaderboard.streak')}
            </div>
            <div className="col-span-1 font-bold text-center" style={{ color: 'var(--color-text)' }}>
              {t('leaderboard.badges')}
            </div>
          </div>

          {/* Table Body */}
          {leaderboardData.length > 0 ? (
            leaderboardData.map((user) => (
              <div
                key={user.userId}
                className="grid grid-cols-12 gap-4 p-4 border-b hover:opacity-80 transition-opacity"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: user.rank <= 3 ? 'var(--color-bg)' : 'transparent'
                }}
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center justify-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    style={getRankStyle(user.rank)}
                  >
                    {getMedalEmoji(user.rank) || user.rank}
                  </div>
                </div>

                {/* Name */}
                <div className="col-span-4 flex items-center">
                  <div>
                    <div className="font-medium" style={{ color: 'var(--color-text)' }}>
                      {user.name}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {user.email}
                    </div>
                  </div>
                </div>

                {/* Level */}
                <div className="col-span-2 flex items-center justify-center">
                  <LevelBadge level={user.level} />
                </div>

                {/* XP */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-bold" style={{ color: 'var(--color-primary)' }}>
                      {user.totalXP.toLocaleString()}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {t('leaderboard.xp')}
                    </div>
                  </div>
                </div>

                {/* Streak */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-bold flex items-center justify-center" style={{ color: 'var(--color-warning)' }}>
                      🔥 {user.streak}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {t('leaderboard.days')}
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="col-span-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-bold" style={{ color: 'var(--color-secondary)' }}>
                      {user.badges.length}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {t('leaderboard.badges')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                {t('leaderboard.noData')}
              </h3>
              <p style={{ color: 'var(--color-text-muted)' }}>
                {t('leaderboard.noDataDescription')}
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p style={{ color: 'var(--color-text-muted)' }}>
            {t('leaderboard.updateInfo')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
