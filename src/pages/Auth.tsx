import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, UserPlus, Droplets, Mail, Lock, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: (user: any) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('operator@aquaguard.io');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: isLogin ? 'Alex Rivers' : 'Global Hero', email });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-6 relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel w-full max-w-[440px] p-10 md:p-14 relative z-10 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
      >
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex bg-accent/10 p-5 rounded-3xl text-accent mb-6 border border-accent/20 shadow-[0_0_20px_rgba(0,209,255,0.1)]"
          >
            <Droplets size={40} className="animate-water" />
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-widest uppercase mb-2 text-[24px]">
            {isLogin ? 'Network Login' : 'New Node'}
          </h1>
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[4px]">
            Identity Verification Required
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
             <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[2px]">Terminal Email</label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-accent/40">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-5 py-5 bg-white/[0.02] border border-white/5 rounded-2xl focus:ring-1 focus:ring-accent/50 focus:border-accent/50 focus:bg-white/[0.04] outline-none transition-all font-bold text-white text-md placeholder:text-white/10"
                placeholder="operator@aquaguard.io"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[2px]">Auth Token</label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/20">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-5 py-5 bg-white/[0.02] border border-white/5 rounded-2xl focus:ring-1 focus:ring-accent/50 focus:border-accent/50 focus:bg-white/[0.04] outline-none transition-all font-bold text-white text-md placeholder:text-white/10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-accent text-bg py-5 rounded-2xl font-black text-xs uppercase tracking-[4px] shadow-[0_10px_40px_rgba(0,209,255,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10">{isLogin ? 'Establish Link' : 'Register Operator'}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform relative z-10" />
          </button>
        </form>

        <div className="mt-10 text-center pt-8 border-t border-white/5">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/20 font-black hover:text-accent transition-colors flex items-center justify-center gap-2 mx-auto text-[10px] uppercase tracking-[3px] group"
          >
            {isLogin ? (
              <span className="group-hover:tracking-[4px] transition-all">Request Deployment Access</span>
            ) : (
              <span className="group-hover:tracking-[4px] transition-all">Return to Command Grid</span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
