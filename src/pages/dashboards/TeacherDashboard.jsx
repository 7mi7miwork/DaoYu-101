import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

const TeacherDashboard = () => {
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
                {t('dashboard.teacherSubtitle', 'Manage your classes and track student progress')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'var(--color-success)', 
                  color: 'white' 
                }}
              >
                {t('dashboard.roles.teacher', 'Teacher')}
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
            <div className="text-3xl mb-4">🏫</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
              {t('dashboard.teacher.classes', 'My Classes')}
            </h3>
            <p style={{ color: 'var(--color-text-muted)' }}>
              {t('dashboard.teacher.classesDesc', 'Create and manage your classroom activities')}
            </p>
          </div>

          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-surface)', 
              borderColor: 'var(--color-border)' 
            }}
          >
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
              {t('dashboard.teacher.students', 'Students')}
            </h3>
            <p style={{ color: 'var(--color-text-muted)' }}>
              {t('dashboard.teacher.studentsDesc', 'Monitor individual student progress')}
            </p>
          </div>

          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-surface)', 
              borderColor: 'var(--color-border)' 
            }}
          >
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
              {t('dashboard.teacher.assignments', 'Assignments')}
            </h3>
            <p style={{ color: 'var(--color-text-muted)' }}>
              {t('dashboard.teacher.assignmentsDesc', 'Create and grade student assignments')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
