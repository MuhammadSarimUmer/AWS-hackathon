import React, { useState, useEffect } from 'react';
import { Share2, Info, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const VIEWS = ['Health', 'Eco', 'Combined'];

const NODES = [
  { id: 1, x: 60, y: 60 },
  { id: 2, x: 180, y: 40 },
  { id: 3, x: 300, y: 80 },
  { id: 4, x: 100, y: 160 },
  { id: 5, x: 220, y: 180 },
  { id: 6, x: 320, y: 160 },
  { id: 7, x: 60, y: 220 },
  { id: 8, x: 180, y: 260 },
  { id: 9, x: 300, y: 240 },
];
const LINKS = [
  [1,2],[2,3],[1,4],[2,5],[3,6],[4,5],[5,6],[4,7],[5,8],[6,9],[7,8],[8,9]
];

const getRandomPulse = () => 0.9 + Math.random() * 0.3;

const GlobalWellnessWeave: React.FC = () => {
  const [view, setView] = useState('Combined');
  const [pulses, setPulses] = useState(Array(NODES.length).fill(1));
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulses(Array(NODES.length).fill(0).map(getRandomPulse));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Simulated trending stat
  const trendingStat = view === 'Health' ? '+8% Recovery' : view === 'Eco' ? '+12% Air Quality' : '+15% Wellness Index';
  const trendingColor = view === 'Health' ? 'bg-pink-400' : view === 'Eco' ? 'bg-green-400' : 'bg-teal-400';

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white/80 rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-tr from-teal-500 to-cyan-400 text-white rounded-full p-3 mr-4 shadow-lg">
            <Share2 size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Global Wellness Weave</h1>
            <div className="text-teal-600 font-medium text-lg">A tapestry of health & eco data, trending for its intricate visuals</div>
          </div>
        </div>
        {/* Toggle */}
        <div className="flex space-x-2 mb-4">
          {VIEWS.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                view === v
                  ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {v}
            </button>
          ))}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="ml-2 p-2 rounded-full bg-cyan-100 text-cyan-600 hover:bg-cyan-200 transition"
            title="Info"
          >
            <Info size={20} />
          </button>
        </div>
        {/* Info Tooltip */}
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-cyan-50 border border-cyan-200 rounded-lg text-cyan-800 shadow"
          >
            <b>Wellness Weave:</b> This animated tapestry visualizes the interconnectedness of health and environmental data. Each node and thread represents a data point or relationship, pulsing with real-time trends.
          </motion.div>
        )}
        {/* Animated Weave Visualization */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 flex items-center justify-center">
            <svg width="380" height="320" className="drop-shadow-xl">
              {/* Links */}
              {LINKS.map(([from, to], i) => {
                const n1 = NODES.find(n => n.id === from)!;
                const n2 = NODES.find(n => n.id === to)!;
                return (
                  <motion.line
                    key={i}
                    x1={n1.x}
                    y1={n1.y}
                    x2={n2.x}
                    y2={n2.y}
                    stroke={view === 'Health' ? '#ec4899' : view === 'Eco' ? '#22c55e' : '#14b8a6'}
                    strokeWidth={3}
                    initial={false}
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  />
                );
              })}
              {/* Nodes */}
              {NODES.map((n, i) => (
                <motion.circle
                  key={n.id}
                  cx={n.x}
                  cy={n.y}
                  r={18 * pulses[i]}
                  fill={view === 'Health' ? '#ec4899' : view === 'Eco' ? '#22c55e' : '#06b6d4'}
                  stroke="#fff"
                  strokeWidth={3}
                  initial={false}
                  animate={{
                    filter: [
                      'drop-shadow(0 0 0px #06b6d4)',
                      'drop-shadow(0 0 12px #06b6d4)',
                      'drop-shadow(0 0 0px #06b6d4)'
                    ],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.07 }}
                />
              ))}
            </svg>
          </div>
          {/* Neumorphic/Glassmorphic Trending Card */}
          <motion.div
            className={`flex-1 bg-white/70 rounded-2xl shadow-neumorph-sm border-l-4 ${trendingColor} p-6 flex flex-col items-center justify-center`}
            whileHover={{ y: -5, scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={28} className="text-gray-700" />
              <span className="text-2xl font-bold text-gray-800">Trending Now</span>
            </div>
            <div className="text-4xl font-extrabold text-gray-900 mb-1">{trendingStat}</div>
            <div className="text-md text-gray-500">{view} Data</div>
          </motion.div>
        </div>
        {/* Community Highlight Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="bg-gradient-to-tr from-cyan-100 to-teal-100 rounded-xl p-6 shadow-lg border-l-4 border-cyan-400"
            whileHover={{ y: -4 }}
          >
            <div className="font-semibold text-teal-700 mb-2">Community Highlight</div>
            <div className="text-gray-700">“Over 2,000 users contributed to the latest eco-health trend, weaving a stronger global tapestry!”</div>
          </motion.div>
          <motion.div
            className="bg-gradient-to-tr from-pink-100 to-pink-50 rounded-xl p-6 shadow-lg border-l-4 border-pink-400"
            whileHover={{ y: -4 }}
          >
            <div className="font-semibold text-pink-700 mb-2">Trending Insight</div>
            <div className="text-gray-700">“Wellness Weave is trending in 18 countries for its real-time, interactive data art.”</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GlobalWellnessWeave; 