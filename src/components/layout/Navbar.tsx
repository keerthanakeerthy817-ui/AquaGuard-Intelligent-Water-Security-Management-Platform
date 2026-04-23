import React, { useState } from 'react';
import { Droplets, User, LogOut, LayoutDashboard, Settings, Info, ShieldCheck, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  user: any;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, user, onLogout }) => {
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSafetyCheck = () => {
    console.log(" AquaGuard Safety Protocol: Full System Integrity Check Initiated.");
    setShowSafetyModal(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      {/* Safety Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className="bg-success/20 border border-success/50 backdrop-blur-xl px-6 py-3 rounded-2xl flex items-center gap-3 shadow-[0_0_30px_rgba(0,224,150,0.2)]">
              <ShieldCheck className="text-success" size={20} />
              <span className="text-white font-bold text-sm uppercase tracking-widest">Safety Check Initiated</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto glass-panel px-6 py-3 flex items-center justify-between !rounded-[20px]">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setCurrentPage('landing')}
        >
          <div className="bg-accent/20 p-2 rounded-lg text-accent group-hover:scale-110 transition-transform">
            <Droplets size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">AquaGuard</span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className={`flex items-center gap-2 transition-all hover:scale-105 active:scale-95 ${currentPage === 'dashboard' ? 'text-accent border-b-2 border-accent pb-1 mt-1' : 'text-white/60 hover:text-white'}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          
          {/* Safety Button */}
          <button 
            onClick={() => setShowSafetyModal(true)}
            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all font-black text-[10px] uppercase tracking-[2px] shadow-[0_0_20px_rgba(16,185,129,0.1)] group"
          >
            <ShieldCheck size={16} className="group-hover:rotate-12 transition-transform" />
            Safety Protocol
          </button>
        </div>

        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {user ? (
              <motion.div 
                key="user-actions"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-3"
              >
                <div 
                  onClick={() => setCurrentPage('profile')}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:ring-2 ring-accent transition-all overflow-hidden"
                >
                  <div className="w-full h-full bg-gradient-to-tr from-accent to-success opacity-80" />
                </div>
                <button 
                  onClick={onLogout}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white/60 hover:text-alert hover:bg-alert/10 transition-all font-bold text-xs uppercase tracking-widest"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="login-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setCurrentPage('auth')}
                className="bg-accent text-bg px-6 py-2 rounded-xl font-bold shadow-[0_0_20px_rgba(0,209,255,0.4)] hover:scale-105 transition-all"
              >
                Get Started
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Safety Confirmation Modal */}
      <AnimatePresence>
        {showSafetyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSafetyModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel p-8 max-w-md w-full relative z-10 !bg-[#050B1C]/90 !border-white/10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-emerald-500/10 p-5 rounded-3xl text-emerald-400 mb-6 border border-emerald-500/20">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Initiate Safety Check?</h3>
                <p className="text-white/40 text-sm mb-8 leading-relaxed">This will perform a full diagnostic of the AquaGuard network integrity, sensor calibration, and emergency shut-off systems.</p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <button 
                    onClick={() => setShowSafetyModal(false)}
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                  >
                    <X size={16} />
                    Abort
                  </button>
                  <button 
                    onClick={handleSafetyCheck}
                    className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-500 text-bg font-black text-[10px] uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Check size={16} />
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};
