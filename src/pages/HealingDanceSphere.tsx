import React, { useEffect, useState } from 'react';
import { Globe, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const DANCER_COUNT = 12;
const SPHERE_RADIUS = 80;

const HealingDanceSphere: React.FC = () => {
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
  const milestonesDanced = 1280;

  // Calculate dancer positions on a sphere
  const dancers = Array.from({ length: DANCER_COUNT }).map((_, i) => {
    const theta = ((2 * Math.PI) / DANCER_COUNT) * i + (angle * Math.PI) / 180;
    const x = 160 + SPHERE_RADIUS * Math.cos(theta);
    const y = 120 + SPHERE_RADIUS * Math.sin(theta) * 0.7;
    return { x, y };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-100 p-8">
      <div className="max-w-4xl mx-auto bg-white/80 rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-tr from-pink-500 to-orange-400 text-white rounded-full p-3 mr-4 shadow-lg">
            <Globe size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Healing Dance Sphere</h1>
            <div className="text-pink-600 font-medium text-lg">Global dance rituals unite communities via AR milestones</div>
          </div>
        </div>
        {/* Animated Dance Sphere Visualization */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 flex items-center justify-center">
            <svg width="320" height="240" className="drop-shadow-xl">
              {/* Sphere outline */}
              <ellipse
                cx="160"
                cy="120"
                rx={SPHERE_RADIUS}
                ry={SPHERE_RADIUS * 0.7}
                fill="url(#sphereGradient)"
                opacity={0.18}
              />
              {/* Animated dancers */}
              {dancers.map((d, i) => (
                <motion.circle
                  key={i}
                  cx={d.x}
                  cy={d.y}
                  r={pulse ? 18 : 14}
                  fill="url(#dancerGradient)"
                  stroke="#fff"
                  strokeWidth={2}
                  animate={{
                    filter: [
                      'drop-shadow(0 0 0px #f472b6)',
                      'drop-shadow(0 0 16px #f472b6)',
                      'drop-shadow(0 0 0px #f472b6)'
                    ],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.07 }}
                />
              ))}
              {/* Dancer highlight sparkles */}
              {dancers.map((d, i) => (
                <motion.circle
                  key={i + 'sparkle'}
                  cx={d.x}
                  cy={d.y - (pulse ? 24 : 18)}
                  r={pulse ? 4 : 2}
                  fill="#fbbf24"
                  opacity={0.7}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
              <defs>
                <radialGradient id="sphereGradient" cx="160" cy="120" r="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f472b6" stopOpacity="0.2" />
                  <stop offset="1" stopColor="#fbbf24" stopOpacity="0.1" />
                </radialGradient>
                <linearGradient id="dancerGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#f472b6" />
                  <stop offset="1" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* Neumorphic/Glassmorphic Stat Card */}
          <motion.div
            className="flex-1 bg-white/70 rounded-2xl shadow-neumorph-sm border-l-4 border-pink-400 p-6 flex flex-col items-center justify-center"
            whileHover={{ y: -5, scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={28} className="text-pink-500" />
              <span className="text-2xl font-bold text-gray-800">Milestones Danced</span>
            </div>
            <div className="text-4xl font-extrabold text-pink-600 mb-1">{milestonesDanced}</div>
            <div className="text-md text-gray-500">Global Rituals</div>
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
            <Sparkles size={28} className="text-orange-400 animate-pulse" />
            <span className="text-2xl font-bold text-pink-700 animate-pulse">Dancing for Healing</span>
          </div>
          <div className="text-lg text-pink-500 text-center max-w-xl">
            Every step and spin unites hearts worldwide—healing, celebrating, and connecting through the universal language of dance.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HealingDanceSphere; 