import React, { useEffect, useState } from 'react';
import { Waves, HeartPulse, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const JET_COUNT = 11;
const JET_MAX_HEIGHT = 120;
const JET_MIN_HEIGHT = 30;
const JET_WIDTH = 18;
const JET_GAP = 28;

const ResilienceRippleJet: React.FC = () => {
  const [wavePhase, setWavePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWavePhase((prev) => prev + 0.15);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Calculate jet heights in a wave pattern
  const jets = Array.from({ length: JET_COUNT }).map((_, i) => {
    const phase = wavePhase + (i * 0.5);
    const height = JET_MIN_HEIGHT + (Math.sin(phase) + 1) / 2 * (JET_MAX_HEIGHT - JET_MIN_HEIGHT);
    return height;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white/80 rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-tr from-blue-500 to-cyan-400 text-white rounded-full p-3 mr-4 shadow-lg">
            <Waves size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Resilience Ripple Jet</h1>
            <div className="text-blue-600 font-medium text-lg">A fountain of hope, choreographing water jets to reflect recovery</div>
          </div>
        </div>
        {/* Animated Water Jet Visualization */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 flex items-center justify-center">
            <svg width={JET_COUNT * JET_GAP + 20} height={180} className="drop-shadow-xl">
              {/* Water jets */}
              {jets.map((height, i) => (
                <motion.rect
                  key={i}
                  x={10 + i * JET_GAP}
                  y={160 - height}
                  width={JET_WIDTH}
                  height={height}
                  rx={JET_WIDTH / 2}
                  fill="url(#jetGradient)"
                  initial={false}
                  animate={{
                    filter: [
                      'drop-shadow(0 0 0px #38bdf8)',
                      'drop-shadow(0 0 12px #38bdf8)',
                      'drop-shadow(0 0 0px #38bdf8)'
                    ],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.07 }}
                />
              ))}
              {/* Ripples */}
              {jets.map((height, i) => (
                <motion.ellipse
                  key={i + 'ripple'}
                  cx={10 + i * JET_GAP + JET_WIDTH / 2}
                  cy={165}
                  rx={JET_WIDTH * 1.2}
                  ry={6 + Math.max(0, (height - JET_MIN_HEIGHT) / 8)}
                  fill="#bae6fd"
                  opacity={0.5}
                  initial={false}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
              <defs>
                <linearGradient id="jetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="60%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* Neumorphic/Glassmorphic Stat Card */}
          <motion.div
            className="flex-1 bg-white/70 border rounded-2xl shadow-neumorph-sm border-l-4 border-blue-400 p-6 flex flex-col items-center justify-center transition-colors duration-300"
            whileHover={{ y: -5, scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse size={28} className="text-blue-500" />
              <span className="text-2xl font-bold text-gray-800">Recovery Rate</span>
            </div>
            <div className="text-4xl font-extrabold text-blue-600 mb-1">+21%</div>
            <div className="text-md text-gray-500">This Month</div>
          </motion.div>
        </div>
        {/* Animated Hope/Recovery Message */}
        <motion.div
          className="mt-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={28} className="text-cyan-400 animate-pulse" />
            <span className="text-2xl font-bold text-blue-700 animate-pulse">Hope Flows Here</span>
          </div>
          <div className="text-lg text-blue-500 text-center max-w-xl">
            Every ripple and jet is a symbol of resilience—together, we rise and recover, creating waves of hope in our communities.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResilienceRippleJet; 