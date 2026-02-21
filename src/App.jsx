import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GamificationProvider } from './context/GamificationContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Island from './pages/Island';
import Lesson from './pages/Lesson';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </ThemeProvider>
    </GamificationProvider>
  );
}

export default App;
