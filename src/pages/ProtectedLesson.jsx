import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';

const ProtectedLesson = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const checkAccessAndFetchLesson = useCallback(async () => {
    try {
      // Check if user has purchased this lesson
      const { data: purchaseData, error: purchaseError } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('lesson_id', id)
        .single();

      if (purchaseError && purchaseError.code !== 'PGRST116') {
        throw purchaseError;
      }

      if (!purchaseData) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      // Fetch lesson details
      const { data: lessonData, error: lessonError } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', id)
        .single();

      if (lessonError) throw lessonError;

      setLesson(lessonData);
      setHasAccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [user.id, id]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    checkAccessAndFetchLesson();
  }, [user, navigate, checkAccessAndFetchLesson]);

  const handleGoToStore = () => {
    navigate('/store');
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

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-md w-full p-8 rounded-lg border text-center" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            {t('protectedLesson.accessRequired')}
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
            {t('protectedLesson.purchaseRequired')}
          </p>
          <button
            onClick={handleGoToStore}
            className="w-full py-2 px-4 rounded-md font-medium"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            {t('protectedLesson.goToStore')}
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-md w-full p-8 rounded-lg border text-center" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            {t('common.error')}
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
            {error}
          </p>
          <button
            onClick={() => navigate('/store')}
            className="w-full py-2 px-4 rounded-md font-medium"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/store')}
          className="mb-6 px-4 py-2 rounded-md font-medium"
          style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', border: `1px solid var(--color-border)` }}
        >
          ← {t('common.back')}
        </button>

        <div className="rounded-lg border p-8" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
            {lesson?.title}
          </h1>
          
          {lesson?.description && (
            <p className="text-lg mb-6" style={{ color: 'var(--color-text-muted)' }}>
              {lesson.description}
            </p>
          )}

          {lesson?.content && (
            <div className="prose max-w-none" style={{ color: 'var(--color-text)' }}>
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>
          )}

          {!lesson?.content && (
            <div className="text-center py-8">
              <p style={{ color: 'var(--color-text-muted)' }}>
                {t('protectedLesson.noContent')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtectedLesson;
