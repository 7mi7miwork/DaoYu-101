import React, { createContext, useContext, useState, useEffect } from 'react';

export const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
  const [state, setState] = useState({
    xp: 0,
    level: 1,
    badges: [],
    streak: 0,
    lastActive: null,
    history: []
  });

  // Level thresholds
  const levelThresholds = {
    1: 0,
    2: 100,
    3: 250,
    4: 500,
    5: 900
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dao-yu-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (error) {
        console.error('Failed to load gamification data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('dao-yu-progress', JSON.stringify(state));
  }, [state]);

  // Calculate level based on XP
  const calculateLevel = (xp) => {
    let level = 1;
    for (const [lvl, threshold] of Object.entries(levelThresholds)) {
      if (xp >= threshold) {
        level = parseInt(lvl);
      }
    }
    return level;
  };

  // Check and update streak
  const updateStreak = () => {
    const now = new Date();
    const lastActive = state.lastActive ? new Date(state.lastActive) : null;
    
    if (!lastActive) {
      return 1; // First time active
    }

    const hoursDiff = (now - lastActive) / (1000 * 60 * 60);
    
    if (hoursDiff <= 24) {
      return state.streak + 1; // Continue streak
    } else if (hoursDiff <= 48) {
      return 1; // Reset to 1 (missed one day)
    } else {
      return 0; // Reset streak (missed multiple days)
    }
  };

  // Add XP and handle level ups
  const addXP = (amount, lessonId = null) => {
    setState(prev => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      const newStreak = updateStreak();
      const now = new Date().toISOString();
      
      let newBadges = [...prev.badges];
      
      // Check for "First Steps" badge
      if (!newBadges.includes('First Steps') && lessonId) {
        newBadges.push('First Steps');
      }
      
      // Check for "Quiz Master" badge (5 quizzes with 100% score)
      const perfectQuizzes = prev.history.filter(h => h.score === 100).length;
      if (perfectQuizzes >= 4 && !newBadges.includes('Quiz Master')) {
        newBadges.push('Quiz Master');
      }
      
      // Check for "On Fire" badge
      if (newStreak >= 7 && !newBadges.includes('On Fire')) {
        newBadges.push('On Fire');
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        badges: newBadges,
        streak: newStreak,
        lastActive: now,
        history: lessonId ? [...prev.history, { lessonId, timestamp: now, xp: amount }] : prev.history
      };
    });
  };

  // Add quiz result to history
  const addQuizResult = (lessonId, score, totalQuestions) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const xpEarned = percentage >= 80 ? 50 : Math.round(50 * percentage / 100);
    
    setState(prev => {
      const newXP = prev.xp + xpEarned;
      const newLevel = calculateLevel(newXP);
      const newStreak = updateStreak();
      const now = new Date().toISOString();
      
      let newBadges = [...prev.badges];
      
      // Check for "First Steps" badge
      if (!newBadges.includes('First Steps')) {
        newBadges.push('First Steps');
      }
      
      // Check for "Quiz Master" badge (5 quizzes with 100% score)
      const perfectQuizzes = [...prev.history, { lessonId, score: percentage, timestamp: now }]
        .filter(h => h.score === 100).length;
      if (perfectQuizzes >= 5 && !newBadges.includes('Quiz Master')) {
        newBadges.push('Quiz Master');
      }
      
      // Check for "On Fire" badge
      if (newStreak >= 7 && !newBadges.includes('On Fire')) {
        newBadges.push('On Fire');
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        badges: newBadges,
        streak: newStreak,
        lastActive: now,
        history: [...prev.history, { lessonId, score: percentage, timestamp: now, xp: xpEarned }]
      };
    });
  };

  // Get XP progress to next level
  const getProgressToNextLevel = () => {
    const currentThreshold = levelThresholds[state.level] || 0;
    const nextThreshold = levelThresholds[state.level + 1] || currentThreshold + 1000;
    const progress = state.xp - currentThreshold;
    const needed = nextThreshold - currentThreshold;
    return Math.min((progress / needed) * 100, 100);
  };

  // Get XP needed for next level
  const getXPToNextLevel = () => {
    const nextThreshold = levelThresholds[state.level + 1];
    if (!nextThreshold) return 0;
    return nextThreshold - state.xp;
  };

  const value = {
    ...state,
    addXP,
    addQuizResult,
    getProgressToNextLevel,
    getXPToNextLevel,
    levelThresholds
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
