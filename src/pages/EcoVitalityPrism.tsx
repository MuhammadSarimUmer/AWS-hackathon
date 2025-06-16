import React, { useEffect, useState } from 'react';
import { Layers, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const EcoVitalityPrism: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 2) % 360);
      setPulse((prev) => !prev);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // For the stat card
  const synergyIndex = 92;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-green-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white/80 rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-tr from-purple-500 to-green-400 text-white rounded-full p-3 mr-4 shadow-lg">
            <Layers size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Eco-Vitality Prism</h1>
            <div className="text-purple-600 font-medium text-lg">3D holographic health-eco patterns, engaging with futuristic visuals</div>
          </div>
        </div>
        {/* Animated Prism Visualization */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 flex items-center justify-center">
            <svg width="320" height="260" viewBox="0 0 320 260" className="drop-shadow-xl">
              {/* Animated beams */}
              {[...Array(6)].map((_, i) => (
                <motion.polygon
                  key={i}
                  points="160,130 160,30 80,210"
                  fill={`url(#beamGradient${i})`}
                  opacity={0.18 + 0.08 * i}
                  style={{ transformOrigin: '160px 130px' }}
                  animate={{
                    rotate: angle + i * 60,
                    scale: pulse ? 1.05 : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
              {/* Prism body */}
              <motion.polygon
                points="160,50 60,210 260,210"
                fill="url(#prismGradient)"
                stroke="#a21caf"
                strokeWidth={pulse ? 6 : 3}
                animate={{
                  filter: [
                    'drop-shadow(0 0 0px #a21caf)',
                    'drop-shadow(0 0 24px #a21caf)',
                    'drop-shadow(0 0 0px #a21caf)'
                  ],
                  scale: pulse ? 1.04 : 1,
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              {/* Prism highlight */}
              <motion.polygon
                points="160,50 110,210 210,210"
                fill="url(#highlightGradient)"
                opacity={0.5}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Holographic base */}
              <ellipse
                cx="160"
                cy="220"
                rx="90"
                ry="18"
                fill="url(#baseGradient)"
                opacity={0.4}
              />
              <defs>
                <linearGradient id="prismGradient" x1="60" y1="210" x2="160" y2="50" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a21caf" />
                  <stop offset="0.5" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#22c55e" />
                </linearGradient>
                <linearGradient id="highlightGradient" x1="110" y1="210" x2="160" y2="50" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff" stopOpacity="0.7" />
                  <stop offset="1" stopColor="#a21caf" stopOpacity="0.1" />
                </linearGradient>
                <radialGradient id="baseGradient" cx="160" cy="220" r="90" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a21caf" stopOpacity="0.2" />
                  <stop offset="1" stopColor="#22d3ee" stopOpacity="0.1" />
                </radialGradient>
                {[...Array(6)].map((_, i) => (
                  <linearGradient key={i} id={`beamGradient${i}`} x1="160" y1="130" x2={160 + 100 * Math.cos((i * Math.PI) / 3)} y2={130 + 100 * Math.sin((i * Math.PI) / 3)} gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a21caf" stopOpacity="0.2" />
                    <stop offset="1" stopColor="#22d3ee" stopOpacity="0.1" />
                  </linearGradient>
                ))}
              </defs>
            </svg>
          </div>
          {/* Neumorphic/Glassmorphic Stat Card */}
          <motion.div
            className="flex-1 bg-white/70 rounded-2xl shadow-neumorph-sm border-l-4 border-purple-400 p-6 flex flex-col items-center justify-center"
            whileHover={{ y: -5, scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={28} className="text-purple-500" />
              <span className="text-2xl font-bold text-gray-800">Synergy Index</span>
            </div>
            <div className="text-4xl font-extrabold text-purple-600 mb-1">{synergyIndex}%</div>
            <div className="text-md text-gray-500">Eco-Health Synergy</div>
          </motion.div>
        </div>
        {/* Animated Message */}
        <motion.div
          className="mt-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={28} className="text-green-400 animate-pulse" />
            <span className="text-2xl font-bold text-purple-700 animate-pulse">The Future is Holographic</span>
          </div>
          <div className="text-lg text-purple-500 text-center max-w-xl">
            Eco-Vitality Prism projects a new era—where health and environment unite in dazzling, interactive patterns. Step into the future of well-being!
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EcoVitalityPrism; 