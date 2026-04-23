import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { ExitPage } from './pages/ExitPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState<any>(null);

  // Persistence simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('aquaguard_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('aquaguard_user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('aquaguard_user');
    setCurrentPage('exit');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onStart={() => setCurrentPage(user ? 'dashboard' : 'auth')} />;
      case 'dashboard':
        return user ? <Dashboard /> : <Auth onLogin={handleLogin} />;
      case 'auth':
        return <Auth onLogin={handleLogin} />;
      case 'profile':
        return user ? <Profile user={user} /> : <Auth onLogin={handleLogin} />;
      case 'exit':
        return <ExitPage onReturn={() => setCurrentPage('landing')} />;
      default:
        return <LandingPage onStart={() => setCurrentPage('auth')} />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white overflow-x-hidden">
      <div className="atmosphere" />
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        user={user}
        onLogout={handleLogout}
      />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Toast for Alerts (Simulated for Leak) */}
      <footer className="py-12 px-6 text-center text-slate-400 text-sm">
        <p>&copy; 2026 AquaGuard Technologies. Built for a sustainable future.</p>
      </footer>
    </div>
  );
}
