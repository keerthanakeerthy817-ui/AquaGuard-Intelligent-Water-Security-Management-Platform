import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, Shield, Bell, Award, Settings, ChevronRight, Droplets } from 'lucide-react';

interface ProfileProps {
  user: any;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="pt-28 px-6 pb-12 max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-[48px] bg-accent/10 flex items-center justify-center mb-6 ring-1 ring-accent/30 shadow-[0_0_50px_rgba(0,209,255,0.15)] relative">
            <div className="w-full h-full absolute inset-0 bg-gradient-to-tr from-accent/20 to-success/20 rounded-[48px]" />
            <User size={64} className="text-accent relative z-10" />
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-6 right-0 bg-success text-bg p-2 rounded-2xl border-4 border-bg shadow-lg shadow-success/20"
          >
            <Award size={20} />
          </motion.div>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter">{user?.name || 'Alex Rivers'}</h1>
        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mt-2">Operator Tier: Premium</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Account Settings */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[4px] px-2">Terminal Access</h3>
          <div className="glass-panel overflow-hidden !bg-white/2">
            <SettingItem icon={Mail} label="Network Identity" value={user?.email} />
            <SettingItem icon={Shield} label="Protocol Level" value="Level 4 Secure" />
            <SettingItem icon={Bell} label="Sync Alerts" value="Direct Pulse" last />
          </div>

          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[4px] px-2 mt-10">System Core</h3>
          <div className="glass-panel overflow-hidden !bg-white/2">
            <SettingItem icon={Settings} label="Alert Threshold" value="1.5 L/min" />
            <SettingItem icon={Settings} label="Metric Standard" value="Liters / Metric" last />
          </div>
        </div>

        {/* Gamification Stats */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[4px] px-2">Performance</h3>
          <div className="glass-panel p-8 !bg-white/2">
            <div className="bg-white/5 border border-white/5 p-6 rounded-3xl mb-6 shadow-inner">
               <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent text-bg p-3 rounded-2xl shadow-lg shadow-accent/20">
                    <Award size={24} />
                  </div>
                  <div>
                    <div className="font-black text-white text-lg">HydroHero Phase 4</div>
                    <div className="text-[9px] text-accent font-black uppercase tracking-widest">Global Rank: Top 5%</div>
                  </div>
               </div>
               <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} className="h-full bg-accent shadow-[0_0_10px_rgba(0,209,255,0.8)]" />
               </div>
               <div className="mt-3 text-right text-[10px] font-black text-white/40 tracking-widest">750 / 1000 KLD</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <AchievementBadge icon={Droplets} label="Leak Hunter" active />
               <AchievementBadge icon={Shield} label="Guardian" active />
               <AchievementBadge icon={Bell} label="First Responder" active />
               <AchievementBadge icon={Award} label="Eco-Pioneer" active />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingItem = ({ icon: Icon, label, value, last }: any) => (
  <div className={`p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group ${!last ? 'border-b border-white/5' : ''}`}>
    <div className="flex items-center gap-4">
      <div className="bg-white/5 text-white/30 p-3 rounded-2xl group-hover:bg-accent group-hover:text-bg transition-all">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">{label}</div>
        <div className="font-bold text-white text-sm tracking-tight">{value}</div>
      </div>
    </div>
    <ChevronRight size={18} className="text-white/10 group-hover:text-accent transition-all group-hover:translate-x-1" />
  </div>
);

const AchievementBadge = ({ icon: Icon, label, active }: any) => (
  <div className={`p-4 rounded-2xl border transition-all ${active ? 'bg-white/4 border-white/10 shadow-lg' : 'bg-transparent border-transparent opacity-30 shadow-none'}`}>
     <div className={`mx-auto w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${active ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-white/5 text-white/20'}`}>
        <Icon size={20} />
     </div>
     <div className="text-[9px] font-black uppercase tracking-widest text-white/40">{label}</div>
  </div>
);
