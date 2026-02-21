import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GamificationProvider } from './context/GamificationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Island from './pages/Island';
import Lesson from './pages/Lesson';
import Login from './pages/Login';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import ParentDashboard from './pages/dashboards/ParentDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import SchoolDashboard from './pages/dashboards/SchoolDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Certificate from './pages/Certificate';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <GamificationProvider>
        <ThemeProvider>
          <HashRouter>
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:archipelagoId" element={<Island />} />
                  <Route path="/lesson/:lessonId" element={<Lesson />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Profile and public routes */}
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/certificate/:id" element={<Certificate />} />
                  
                  {/* Dashboard redirect based on user role */}
                  <Route path="/dashboard" element={<DashboardRedirect />} />
                  
                  {/* Protected dashboard routes */}
                  <Route path="/dashboard/student" element={
                    <ProtectedRoute>
                      <StudentDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/parent" element={
                    <ProtectedRoute>
                      <ParentDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/teacher" element={
                    <ProtectedRoute>
                      <TeacherDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/school" element={
                    <ProtectedRoute>
                      <SchoolDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard/admin" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </HashRouter>
        </ThemeProvider>
      </GamificationProvider>
    </AuthProvider>
  );
}

// Dashboard redirect component
function DashboardRedirect() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Navigate to={`/dashboard/${user.role}`} replace />;
}

export default App;
