import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                {t('dashboard.welcome', 'Welcome')}, {user?.name}!
              </h1>
              <p style={{ color: 'var(--color-text-muted)' }}>
                {t('dashboard.studentSubtitle', 'Track your learning progress and explore new topics')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'white' 
                }}
              >
                {t('dashboard.roles.student', 'Student')}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: 'var(--color-error)' }}
              >
                {t('dashboard.logout', 'Logout')}
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-surface)', 
              borderColor: 'var(--color-border)' 
            }}
          >
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
              {t('dashboard.student.courses', 'My Courses')}
            </h3>
            <p style={{ color: 'var(--color-text-muted)' }}>
              {t('dashboard.student.coursesDesc', 'Continue learning from your enrolled courses')}
            </p>
          </div>

          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-surface)', 
              borderColor: 'var(--color-border)' 
            }}
          >
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
              {t('dashboard.student.progress', 'Progress')}
            </h3>
            <p style={{ color: 'var(--color-text-muted)' }}>
              {t('dashboard.student.progressDesc', 'View your learning statistics and achievements')}
            </p>
          </div>

          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-surface)', 
              borderColor: 'var(--color-border)' 
            }}
          >
            <div className="text-3xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
              {t('dashboard.student.achievements', 'Achievements')}
            </h3>
            <p style={{ color: 'var(--color-text-muted)' }}>
              {t('dashboard.student.achievementsDesc', 'Check your badges and rewards')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
