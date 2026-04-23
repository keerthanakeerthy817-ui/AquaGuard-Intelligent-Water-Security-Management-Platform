import React from 'react';
import { motion } from 'motion/react';
import { Droplets, Shield, Zap, BarChart3, ArrowRight } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="pt-24 min-h-screen overflow-hidden relative">
      {/* Hero Section */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-black text-[10px] uppercase tracking-[2px] mb-6 border border-accent/20">
              <Zap size={12} />
              Quantum Metering System
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-tight text-white mb-6 tracking-tighter">
              Liquid <br />
              <span className="text-accent underline decoration-accent/30 underline-offset-8">Intelligence</span>
            </h1>
            <p className="text-lg text-white/40 mb-10 max-w-lg leading-relaxed font-medium">
              Eradicate inefficiencies. Predict shortages. Protect the source. AquaGuard is the mission-critical OS for sustainable water management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStart}
                className="bg-accent text-bg px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_0_40px_rgba(0,209,255,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              >
                Launch Controller
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/5 backdrop-blur-xl text-white px-10 py-5 rounded-2xl font-black text-xs border border-white/10 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Tech Specs
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                <div className="absolute inset-0 bg-accent/5 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute inset-10 glass-panel flex items-center justify-center flex-col gap-6 p-8 border-accent/20">
                    <div className="relative">
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, 2, 0, -2, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="bg-accent/10 p-12 rounded-full border border-accent/20"
                        >
                            <Droplets size={120} className="text-accent animate-water opacity-80" />
                        </motion.div>
                    </div>
                    <div className="text-center">
                        <div className="usage-number">4.2 <span className="text-xl">L/min</span></div>
                        <div className="text-[10px] text-white/40 font-black uppercase tracking-[2px]">Real-time Telemetry</div>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 mt-12 bg-white/2 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black uppercase tracking-[4px] text-accent mb-4">Core Modules</h2>
            <p className="text-3xl md:text-5xl font-black text-white max-w-2xl mx-auto tracking-tighter">
              A smarter way to track every drop.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Intrusion Logic", desc: "Our anomaly detection module neutralizes leaks before they become disasters." },
              { icon: BarChart3, title: "Pulse Analytics", desc: "Visualize your usage patterns with high-frequency telemetry data." },
              { icon: Zap, title: "Neural Forecasts", desc: "AI models predict future demand with 99.2% accuracy based on historical trends." }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-panel p-10 hover:!bg-white/5"
              >
                <div className="bg-accent/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-accent border border-accent/20">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-black mb-3 italic tracking-tight">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
