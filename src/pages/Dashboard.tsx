import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { io } from 'socket.io-client';
import { 
  Droplets, 
  AlertTriangle, 
  TrendingUp, 
  Zap, 
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Trophy,
  Users,
  ShieldAlert,
  Framer
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { getWaterInsights, WaterInsight } from '../services/aiService';

const socket = io();

export const Dashboard: React.FC = () => {
  const [telemetry, setTelemetry] = useState({ 
    usage: 0, 
    leakDetected: false, 
    timestamp: '', 
    emergencyMode: false, 
    shortageLevel: 0 
  });
  const [usageHistory, setUsageHistory] = useState<any[]>([]);
  const [insights, setInsights] = useState<WaterInsight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [leaderboardType, setLeaderboardType] = useState<'house' | 'campus'>('house');
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  useEffect(() => {
    socket.on('water-telemetry', (data) => {
      setTelemetry(data);
      setUsageHistory(prev => {
        const newHistory = [...prev, {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            usage: data.usage
        }].slice(-20);
        return newHistory;
      });
    });

    socket.on('leaderboard_data', (data) => {
        setLeaderboardData(data);
    });

    // Request initial leaderboard
    socket.emit('get_leaderboard', leaderboardType);

    return () => {
      socket.off('water-telemetry');
      socket.off('leaderboard_data');
    };
  }, [leaderboardType]);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const mockWeeklyData = [45, 52, 48, 70, 65, 50, 42]; 
      const res = await getWaterInsights(mockWeeklyData, telemetry.emergencyMode);
      setInsights(res);
      setLoadingInsights(false);
    };

    fetchInsights();
  }, [telemetry.emergencyMode]);

  return (
    <div className="pt-28 px-6 pb-12 max-w-7xl mx-auto relative">
      {/* Red Alert Overlay for Leaks */}
      <AnimatePresence>
        {telemetry.leakDetected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[60] border-[12px] border-alert/20 shadow-[inset_0_0_100px_rgba(255,61,113,0.15)] pulse-slow"
          />
        )}
      </AnimatePresence>

      {/* Emergency Mode Banner */}
      <AnimatePresence>
        {telemetry.emergencyMode && (
          <motion.div 
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-alert/10 border border-alert/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative shadow-[0_0_50px_rgba(255,61,113,0.1)]">
              <div className="flex items-center gap-4">
                <div className="bg-alert text-white p-4 rounded-2xl animate-pulse">
                  <ShieldAlert size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-alert uppercase tracking-tighter">Emergency Water Management Mode</h2>
                  <p className="text-alert/60 text-sm font-medium">Critical Shortage Detected (Level {telemetry.shortageLevel}%) | Usage restrictions in effect</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="glass-panel px-4 py-2 !border-alert/20">
                  <span className="text-[10px] font-black text-white/40 uppercase block mb-1">Mandatory Cap</span>
                  <span className="text-lg font-black text-white tracking-tight">2.5 L/min</span>
                </div>
                <button className="bg-alert text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">
                  View Strategy
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 text-white/40 font-medium mb-1 uppercase tracking-widest text-[10px]">
            <Calendar size={14} />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            {telemetry.emergencyMode ? 'Crisis Command' : 'Main Controller'}
          </h1>
        </motion.div>
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
        >
            <div className={`glass-panel px-6 py-3 rounded-2xl flex items-center gap-3 transition-colors ${telemetry.emergencyMode ? '!bg-alert/5 !border-alert/20' : '!bg-emerald-500/5 !border-emerald-500/20'}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${telemetry.emergencyMode ? 'bg-alert shadow-[0_0_10px_rgba(255,61,113,0.5)]' : 'bg-success shadow-[0_0_10px_rgba(0,224,150,0.5)]'}`} />
                <span className={`font-bold text-sm uppercase tracking-wider ${telemetry.emergencyMode ? 'text-alert' : 'text-success'}`}>
                    {telemetry.emergencyMode ? 'Critical Alert' : 'System Active'}
                </span>
            </div>
        </motion.div>
      </header>

      {/* Hero Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 glass-panel p-8 relative overflow-hidden group"
        >
            <div className="text-[11px] uppercase tracking-[1px] text-white/40 mb-4 font-bold">Current Live Flow Rate</div>
            <div className="flex justify-between items-end relative z-10">
                <div className={`usage-number transition-colors duration-500 ${telemetry.emergencyMode && telemetry.usage > 2.5 ? '!text-alert' : ''}`}>
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={telemetry.usage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="inline-block"
                        >
                            {telemetry.usage}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-2xl opacity-40 ml-2">L/min</span>
                </div>
                <div className="text-right">
                    <p className={`font-bold text-xs ${telemetry.emergencyMode ? 'text-alert' : 'text-success'}`}>
                        {telemetry.emergencyMode ? `+${(telemetry.usage/2.5 * 100 - 100).toFixed(0)}% Over Cap` : '-12% Efficiency'}
                    </p>
                    <p className="text-[9px] text-white/30 uppercase font-bold tracking-wider">{telemetry.emergencyMode ? 'Emergency Target: 2.5' : 'vs yesterday'}</p>
                </div>
            </div>
            {/* Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <motion.path 
                        animate={{ d: telemetry.usage > 1.5 ? "M0,50 C150,0 350,100 500,50 C650,0 850,100 1000,50 L1000,100 L0,100 Z" : "M0,50 C150,20 350,80 500,50 C650,20 850,80 1000,50 L1000,100 L0,100 Z" }}
                        fill={telemetry.emergencyMode ? 'var(--color-alert)' : 'var(--color-accent)'} 
                    />
                </svg>
            </div>
        </motion.div>

        {/* New Gamification Card */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="glass-panel p-8 relative overflow-hidden flex flex-col justify-between group"
        >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy size={80} />
            </div>
            <div className="text-[11px] uppercase tracking-[1px] text-white/40 mb-4 font-bold">Guardian Progress</div>
            <div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">4,850</span>
                    <span className="text-xs font-bold text-success uppercase tracking-widest">XP</span>
                </div>
                <div className="text-[10px] text-white/30 uppercase font-black tracking-widest mt-1">Level 12 Master Guardian</div>
            </div>
            
            <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-white/40">Next Rank Progress</span>
                    <span className="text-success">85%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-success/50 to-success shadow-[0_0_10px_rgba(0,224,150,0.5)]"
                    />
                </div>
            </div>
        </motion.div>

        <AnimatePresence mode="wait">
            {telemetry.leakDetected ? (
                <motion.div 
                    key="leak-card"
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    className="glass-panel p-8 !bg-alert/5 !border-alert/30 !text-alert shadow-[0_0_30px_rgba(255,61,113,0.15)] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-alert/10 blur-[50px] -mr-16 -mt-16 rounded-full" />
                    <div className="text-[11px] uppercase tracking-[1px] font-bold mb-4 relative z-10">Anomaly Detected</div>
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div>
                            <div className="text-2xl font-black mb-1">Possible Pipe Leak</div>
                            <div className="text-sm opacity-70">Main Sector 4 | Internal</div>
                        </div>
                        <button 
                            onClick={() => {
                                socket.emit('shut_off_valve');
                            }}
                            className="bg-alert text-white w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest mt-6 shadow-lg shadow-alert/20 active:scale-105 transition-all animate-bounce-subtle"
                        >
                            Shut Off Valve
                        </button>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    key="normal-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass-panel p-8 flex flex-col justify-between"
                >
                    <div className="text-[11px] uppercase tracking-[1px] text-white/40 mb-4 font-bold">Conservation Ranking</div>
                    <div>
                        <div className="text-4xl font-black text-white mb-2">Top 5%</div>
                        <div className="text-xs text-white/40 font-bold uppercase tracking-wider">Neighborhood Leaderboard</div>
                    </div>
                    <div className="mt-6 p-4 bg-accent/5 rounded-2xl border border-accent/20">
                        <p className="text-[11px] italic text-accent opacity-80 leading-relaxed font-medium">"You are consuming 28% less than neighbors. Great work!"</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Usage Graph */}
        <div className="lg:col-span-2 space-y-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-8"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Consumption History</h3>
                    </div>
                    <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
                        <button className="text-white/40 px-3 py-1 rounded-md text-[10px] font-black uppercase">1H</button>
                        <button className="bg-accent/10 text-accent px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">Live</button>
                    </div>
                </div>
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={usageHistory}>
                            <defs>
                                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={telemetry.emergencyMode ? "#FF3D71" : "#00D1FF"} stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor={telemetry.emergencyMode ? "#FF3D71" : "#00D1FF"} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis 
                                dataKey="time" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                                minTickGap={40}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#030816', 
                                    borderRadius: '12px', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                    color: '#fff' 
                                }}
                            />
                            <Area 
                                isAnimationActive={true}
                                animationEasing="ease-in-out"
                                animationDuration={800}
                                type="step" 
                                dataKey="usage" 
                                stroke={telemetry.emergencyMode ? "#FF3D71" : "#00D1FF"} 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorUsage)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Leaderboards Component */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-panel p-8"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-accent/10 p-2 rounded-lg text-accent">
                            <Trophy size={20} />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Community Rankings</h3>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setLeaderboardType('house')}
                            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${leaderboardType === 'house' ? 'bg-accent text-bg shadow-lg shadow-accent/20' : 'text-white/40 hover:text-white'}`}
                        >
                            Household
                        </button>
                        <button 
                            onClick={() => setLeaderboardType('campus')}
                            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${leaderboardType === 'campus' ? 'bg-accent text-bg shadow-lg shadow-accent/20' : 'text-white/40 hover:text-white'}`}
                        >
                            Campus
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {leaderboardData.map((item, idx) => (
                            <motion.div 
                                key={item.id} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`p-4 rounded-2xl flex items-center justify-between border ${item.name.includes('You') ? 'bg-accent/10 border-accent/30' : 'bg-white/2 border-white/5'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-black text-[10px] text-white/60">
                                        #{item.rank}
                                    </div>
                                    <div>
                                        <div className="text-xs font-black text-white">{item.name}</div>
                                        <div className="text-[10px] text-white/40 uppercase font-bold">Sector Primary</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-black text-white">{item.usage} <span className="text-[10px] opacity-40">Gal/D</span></div>
                                    <div className="text-[9px] text-success font-black uppercase tracking-widest">Efficient</div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="flex flex-col gap-6">
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-panel p-8"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${telemetry.emergencyMode ? 'bg-alert/10 text-alert' : 'bg-accent/10 text-accent'}`}>
                        <Lightbulb size={20} />
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">
                        {telemetry.emergencyMode ? 'Survival Protocols' : 'AI Forecasts'}
                    </h3>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-white/2 rounded-2xl border border-white/5">
                        <div className="text-[10px] uppercase font-bold text-white/40 mb-1">
                            {telemetry.emergencyMode ? 'Target Savings' : 'Estimated Next Month'}
                        </div>
                        <div className={`text-2xl font-black tracking-tight ${telemetry.emergencyMode ? 'text-alert' : 'text-accent'}`}>
                            {telemetry.emergencyMode ? '35%' : '1,240'} <span className="text-xs opacity-50">{telemetry.emergencyMode ? 'Required' : 'Gal'}</span>
                        </div>
                    </div>

                    <div className="p-4 bg-white/2 rounded-2xl border border-white/5">
                        <div className="text-[10px] uppercase font-bold text-white/40 mb-1">Global Impact Score</div>
                        <div className={`text-2xl font-black tracking-tight ${telemetry.emergencyMode ? 'text-alert' : 'text-success'}`}>
                            {telemetry.emergencyMode ? 'CRITICAL' : '4,850'} <span className="text-xs opacity-50">{telemetry.emergencyMode ? 'MODE' : 'PTS'}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h4 className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-4">
                        {telemetry.emergencyMode ? 'Enforced Guidelines' : 'Latest Insights'}
                    </h4>
                    {loadingInsights ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-16 animate-pulse bg-white/5 rounded-2xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <AnimatePresence mode="popLayout">
                                {insights.slice(0, 3).map((insight, idx) => (
                                    <motion.div 
                                        key={insight.title} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`p-4 rounded-2xl border transition-colors cursor-default ${telemetry.emergencyMode ? 'bg-alert/5 border-alert/20' : 'bg-white/2 border-white/5 hover:border-accent/30'}`}
                                    >
                                        <div className={`text-xs font-bold mb-1 ${telemetry.emergencyMode ? 'text-alert' : 'text-white'}`}>{insight.title}</div>
                                        <div className="text-[10px] text-white/40">{insight.recommendation}</div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

