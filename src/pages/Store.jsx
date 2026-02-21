import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const Store = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [purchasedLessons, setPurchasedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLessons = async () => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLessons(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchasedLessons = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('lesson_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setPurchasedLessons(data?.map(p => p.lesson_id) || []);
    } catch (error) {
      console.error('Error fetching purchased lessons:', error);
    }
  }, [user.id]);

  useEffect(() => {
    fetchLessons();
    if (user) {
      fetchPurchasedLessons();
    }
  }, [user, fetchPurchasedLessons]);

  const handlePurchase = async (lessonId) => {
    if (!user) {
      return;
    }

    try {
      const { error } = await supabase
        .from('purchases')
        .insert([
          {
            user_id: user.id,
            lesson_id: lessonId,
            date: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      // Update local state
      setPurchasedLessons(prev => [...prev, lessonId]);
    } catch (error) {
      setError(error.message);
    }
  };

  const isPurchased = (lessonId) => {
    return purchasedLessons.includes(lessonId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--color-primary)' }}></div>
          <p className="mt-4" style={{ color: 'var(--color-text)' }}>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          {t('store.title')}
        </h1>

        {!user && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-8">
            <p>{t('store.loginRequired')}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-8">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="rounded-lg border p-6 hover:shadow-lg transition-shadow"
              style={{ 
                backgroundColor: 'var(--color-surface)', 
                borderColor: 'var(--color-border)' 
              }}
            >
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                {lesson.title}
              </h3>
              <p className="mb-4" style={{ color: 'var(--color-text-muted)' }}>
                {lesson.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  ${lesson.price || '0.00'}
                </span>
                {isPurchased(lesson.id) && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {t('store.purchased')}
                  </span>
                )}
              </div>
              <button
                onClick={() => handlePurchase(lesson.id)}
                disabled={!user || isPurchased(lesson.id)}
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  !user || isPurchased(lesson.id)
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90'
                }`}
                style={{ 
                  backgroundColor: !user || isPurchased(lesson.id) 
                    ? 'var(--color-text-muted)' 
                    : 'var(--color-primary)', 
                  color: 'white' 
                }}
              >
                {!user 
                  ? t('store.loginToPurchase')
                  : isPurchased(lesson.id) 
                    ? t('store.purchased') 
                    : t('store.purchase')
                }
              </button>
            </div>
          ))}
        </div>

        {lessons.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p style={{ color: 'var(--color-text-muted)' }}>
              {t('store.noLessons')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
