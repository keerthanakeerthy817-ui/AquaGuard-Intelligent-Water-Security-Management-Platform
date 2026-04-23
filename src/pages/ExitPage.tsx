import React from 'react';
import { motion } from 'motion/react';
import { Power, ArrowLeft, Droplets } from 'lucide-react';

interface ExitPageProps {
  onReturn: () => void;
}

export const ExitPage: React.FC<ExitPageProps> = ({ onReturn }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] animate-pulse" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel max-w-md w-full p-12 text-center relative z-10 border-white/5"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-16 -left-16 w-32 h-32 border border-accent/10 rounded-full border-dashed"
        />

        <div className="inline-flex bg-red-500/10 p-6 rounded-full text-red-500 mb-8 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <Power size={48} />
        </div>

        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">
          Session <span className="text-accent">Closed</span>
        </h1>
        
        <div className="space-y-2 mb-10">
          <p className="text-white/40 text-xs font-black uppercase tracking-[3px]">Security Protocol: Offline</p>
          <p className="text-white/60 font-medium leading-relaxed">
            Your connection to the AquaGuard network has been safely terminated. All telemetry ports are now closed.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={onReturn}
            className="w-full bg-accent text-bg py-5 rounded-2xl font-black text-xs uppercase tracking-[3px] shadow-[0_0_30px_rgba(0,209,255,0.2)] hover:scale-105 transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Re-Authorize Link
          </button>
          
          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center justify-center gap-2 text-white/20">
              <Droplets size={16} />
              <span className="text-[10px] font-black uppercase tracking-[2px]">AquaGuard OS v4.2.0</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
