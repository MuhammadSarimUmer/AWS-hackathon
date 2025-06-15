import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Flame, Share2, Activity, Leaf, Users, Zap, TrendingUp, Heart, Globe } from 'lucide-react';

const GlobalHealingEmber: React.FC = () => {
  const { patientData, environmentalData, communityData, isLoading } = useData();
  const [emberIntensity, setEmberIntensity] = useState(0.8);
  const [shareCount, setShareCount] = useState(1247);
  const [viralScore, setViralScore] = useState(85);
  const [isSharing, setIsSharing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const patient = patientData[0];
  const env = environmentalData[0];

  // Ember color schemes
  const emberColors = {
    primary: '#ff6b35',
    secondary: '#f7931e',
    accent: '#ffd23f',
    glow: '#ff8c42'
  };

  // Generate pulsating ember
  const generateEmber = () => {
    if (!patient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001 * emberIntensity;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Create gradient background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) / 2);
    gradient.addColorStop(0, 'rgba(255, 107, 53, 0.1)');
    gradient.addColorStop(0.5, 'rgba(247, 147, 30, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Calculate ember size based on recovery data
    const baseSize = 80 + (patient.recoveryMetrics.recoveryProgress / 100) * 40;
    const pulseSize = Math.sin(time * 2) * 20;
    const emberSize = baseSize + pulseSize;

    // Draw main ember
    const emberGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, emberSize);
    emberGradient.addColorStop(0, emberColors.primary);
    emberGradient.addColorStop(0.3, emberColors.secondary);
    emberGradient.addColorStop(0.7, emberColors.accent);
    emberGradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.fillStyle = emberGradient;
    ctx.arc(centerX, centerY, emberSize, 0, Math.PI * 2);
    ctx.fill();

    // Add glow effect
    ctx.shadowColor = emberColors.glow;
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw ember core
    const coreSize = emberSize * 0.3;
    const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize);
    coreGradient.addColorStop(0, '#ffffff');
    coreGradient.addColorStop(0.5, emberColors.primary);
    coreGradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.fillStyle = coreGradient;
    ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
    ctx.fill();

    // Draw floating sparks
    const sparkCount = Math.floor(patient.recoveryMetrics.energyLevel / 10) || 15;
    for (let i = 0; i < sparkCount; i++) {
      const angle = (i / sparkCount) * Math.PI * 2 + time;
      const distance = emberSize + 30 + Math.sin(time + i) * 20;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const size = Math.sin(time + i) * 3 + 4;

      ctx.beginPath();
      ctx.fillStyle = emberColors.accent;
      ctx.globalAlpha = 0.8;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      // Add spark trail
      const trailLength = 5;
      for (let j = 1; j <= trailLength; j++) {
        const trailX = x - Math.cos(angle) * j * 2;
        const trailY = y - Math.sin(angle) * j * 2;
        const trailSize = size * (1 - j / trailLength);
        const trailAlpha = 0.8 * (1 - j / trailLength);

        ctx.beginPath();
        ctx.fillStyle = emberColors.accent;
        ctx.globalAlpha = trailAlpha;
        ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;

    // Draw data rings
    const rings = [
      { data: patient.recoveryMetrics.recoveryProgress, color: emberColors.primary, radius: emberSize + 60 },
      { data: 100 - env?.measurements[0].airQuality.aqi, color: emberColors.secondary, radius: emberSize + 100 },
      { data: communityData[0]?.activityMetrics.dailyActiveMembers / 2, color: emberColors.accent, radius: emberSize + 140 }
    ];

    rings.forEach((ring, index) => {
      const progress = Math.min(ring.data, 100) / 100;
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + (Math.PI * 2 * progress);

      ctx.beginPath();
      ctx.strokeStyle = ring.color;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.6;
      ctx.arc(centerX, centerY, ring.radius, startAngle, endAngle);
      ctx.stroke();

      // Add pulsing effect
      ctx.shadowColor = ring.color;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    ctx.globalAlpha = 1;
  };

  // Animation loop
  useEffect(() => {
    const animate = () => {
      generateEmber();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [emberIntensity, patient, env, communityData]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const handleShare = () => {
    setIsSharing(true);
    setShareCount(prev => prev + 1);
    setViralScore(prev => Math.min(prev + 2, 100));
    
    setTimeout(() => {
      setIsSharing(false);
    }, 2000);
  };

  const getEmberStats = () => {
    if (!patient) return null;

    return {
      title: 'Healing Ember',
      value: `${patient.recoveryMetrics.recoveryProgress}%`,
      description: 'Recovery-driven ember intensity',
      color: emberColors.primary
    };
  };

  const stats = getEmberStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-36 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Healing Ember</h1>
          <p className="text-gray-600">Pulsating virtual ember visualizing recovery and eco-data with viral sharing</p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            onClick={handleShare}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={20} />
            <span>Share Ember</span>
          </motion.button>
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp size={20} />
            <span>Viral Score: {viralScore}%</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Ember Canvas */}
      <motion.div 
        className="relative bg-black rounded-xl shadow-neumorph overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-[500px] block"
          style={{ background: 'linear-gradient(135deg, #1a0f0f 0%, #2e1a1a 50%, #3e1621 100%)' }}
        />
        
        {/* Overlay Stats */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white">
          {stats && (
            <div>
              <h3 className="text-lg font-semibold">{stats.title}</h3>
              <p className="text-3xl font-bold" style={{ color: stats.color }}>
                {stats.value}
              </p>
              <p className="text-sm text-gray-300">{stats.description}</p>
            </div>
          )}
        </div>

        {/* Ember Intensity Control */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white">
          <label className="text-sm font-medium">Ember Intensity</label>
          <input
            type="range"
            min="0.1"
            max="1.5"
            step="0.1"
            value={emberIntensity}
            onChange={(e) => setEmberIntensity(parseFloat(e.target.value))}
            className="w-32 mt-2"
          />
        </div>

        {/* Share Count */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2">
            <Share2 size={16} />
            <span className="text-sm font-medium">{shareCount.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-300">Shares</p>
        </div>

        {/* Share Mode Overlay */}
        <AnimatePresence>
          {isSharing && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center text-white">
                <Share2 size={48} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sharing Ember...</h3>
                <p className="text-gray-300">Your healing ember has been shared globally!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ember Insights */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Flame className="text-orange-500 mr-2" size={20} />
            <h3 className="font-medium text-orange-700">Recovery Flame</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Your recovery progress fuels the ember's intensity and brightness.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Current Intensity</h4>
            <p className="text-sm text-gray-600">
              {patient?.recoveryMetrics.recoveryProgress > 70 ? 'Burning bright' : 
               patient?.recoveryMetrics.recoveryProgress > 40 ? 'Steady flame' : 
               'Gentle glow'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Leaf className="text-green-500 mr-2" size={20} />
            <h3 className="font-medium text-green-700">Eco Resonance</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Environmental data influences the ember's color and pulsation patterns.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Environmental Impact</h4>
            <p className="text-sm text-gray-600">
              Air Quality: {env?.measurements[0].airQuality.aqi} AQI - {env?.measurements[0].airQuality.aqi < 50 ? 'Optimal' : 'Moderate'} resonance
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Globe className="text-purple-500 mr-2" size={20} />
            <h3 className="font-medium text-purple-700">Viral Impact</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Share your ember to amplify healing energy across the global community.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Global Reach</h4>
            <p className="text-sm text-gray-600">
              {shareCount.toLocaleString()} shares with {viralScore}% viral score
            </p>
          </div>
        </div>
      </motion.div>

      {/* D3.js & API Integration */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <Zap className="text-blue-500 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-medium text-blue-700 mb-1">D3.js & API Gateway Integration</h4>
            <p className="text-sm text-blue-600">
              This healing ember visualization is powered by D3.js for dynamic data visualization 
              and AWS API Gateway for real-time data sharing and viral impact tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalHealingEmber;
