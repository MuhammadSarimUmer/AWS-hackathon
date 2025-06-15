import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Sparkles, Users, Leaf, Heart, Zap, Share2, Camera, Play, Pause, RotateCcw } from 'lucide-react';

const VitalityAuroraVeil: React.FC = () => {
  const { patientData, environmentalData, communityData, isLoading } = useData();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentView, setCurrentView] = useState<'recovery' | 'community' | 'environment'>('recovery');
  const [auroraIntensity, setAuroraIntensity] = useState(0.7);
  const [shareMode, setShareMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const patient = patientData[0];
  const env = environmentalData[0];

  // Aurora color schemes based on different data types
  const auroraSchemes = {
    recovery: {
      primary: '#00ff88',
      secondary: '#0088ff',
      accent: '#ff0088',
      background: 'rgba(0, 255, 136, 0.1)'
    },
    community: {
      primary: '#ff6b6b',
      secondary: '#4ecdc4',
      accent: '#45b7d1',
      background: 'rgba(255, 107, 107, 0.1)'
    },
    environment: {
      primary: '#96ceb4',
      secondary: '#feca57',
      accent: '#ff9ff3',
      background: 'rgba(150, 206, 180, 0.1)'
    }
  };

  const currentScheme = auroraSchemes[currentView];

  // Generate aurora waves based on patient data
  const generateAuroraWaves = () => {
    if (!patient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, currentScheme.background);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Generate multiple aurora waves
    const time = Date.now() * 0.001 * auroraIntensity;
    const waves = [];

    // Recovery wave
    if (currentView === 'recovery') {
      waves.push({
        amplitude: (patient.recoveryMetrics.recoveryProgress / 100) * 100,
        frequency: 0.02,
        phase: time,
        color: currentScheme.primary,
        yOffset: height * 0.3
      });
    }

    // Community wave
    if (currentView === 'community') {
      waves.push({
        amplitude: (communityData[0]?.activityMetrics.dailyActiveMembers / 200) * 100,
        frequency: 0.015,
        phase: time * 0.8,
        color: currentScheme.secondary,
        yOffset: height * 0.4
      });
    }

    // Environment wave
    if (currentView === 'environment') {
      waves.push({
        amplitude: (100 - env?.measurements[0].airQuality.aqi) * 0.8,
        frequency: 0.025,
        phase: time * 1.2,
        color: currentScheme.accent,
        yOffset: height * 0.5
      });
    }

    // Draw aurora waves
    waves.forEach((wave, index) => {
      ctx.beginPath();
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.8;

      for (let x = 0; x < width; x += 2) {
        const y = wave.yOffset + 
                  Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
                  Math.sin(x * wave.frequency * 0.5 + wave.phase * 0.7) * wave.amplitude * 0.5;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Add glow effect
      ctx.shadowColor = wave.color;
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    // Add floating particles
    const particleCount = Math.floor(patient?.recoveryMetrics.energyLevel / 10) || 10;
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.sin(time + i) * 0.5 + 0.5) * width;
      const y = (Math.cos(time * 0.7 + i * 0.5) * 0.5 + 0.5) * height;
      const size = Math.sin(time + i) * 3 + 4;

      ctx.beginPath();
      ctx.fillStyle = currentScheme.primary;
      ctx.globalAlpha = 0.6;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  };

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const animate = () => {
      generateAuroraWaves();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentView, auroraIntensity, patient, env, communityData]);

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
    setShareMode(true);
    // Simulate sharing functionality
    setTimeout(() => {
      setShareMode(false);
    }, 2000);
  };

  const getAuroraStats = () => {
    if (!patient) return null;

    switch (currentView) {
      case 'recovery':
        return {
          title: 'Recovery Aurora',
          value: `${patient.recoveryMetrics.recoveryProgress}%`,
          description: 'Your healing journey visualized',
          color: currentScheme.primary
        };
      case 'community':
        return {
          title: 'Community Support',
          value: `${communityData[0]?.activityMetrics.dailyActiveMembers || 0}`,
          description: 'Active community members',
          color: currentScheme.secondary
        };
      case 'environment':
        return {
          title: 'Environmental Harmony',
          value: `${Math.round((100 - env?.measurements[0].airQuality.aqi) * 0.8)}%`,
          description: 'Air quality impact score',
          color: currentScheme.accent
        };
    }
  };

  const stats = getAuroraStats();

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
          <h1 className="text-2xl font-bold text-gray-900">Vitality Aurora Veil</h1>
          <p className="text-gray-600">Dynamic AR aurora projecting your recovery journey with community and environmental harmony</p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </motion.button>
          <motion.button
            onClick={handleShare}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={20} />
            <span>Share</span>
          </motion.button>
        </div>
      </motion.div>

      {/* View Selector */}
      <motion.div 
        className="flex space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <button
          onClick={() => setCurrentView('recovery')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
            currentView === 'recovery'
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Heart size={16} />
          <span>Recovery</span>
        </button>
        <button
          onClick={() => setCurrentView('community')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
            currentView === 'community'
              ? 'bg-accent-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Users size={16} />
          <span>Community</span>
        </button>
        <button
          onClick={() => setCurrentView('environment')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
            currentView === 'environment'
              ? 'bg-secondary-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Leaf size={16} />
          <span>Environment</span>
        </button>
      </motion.div>

      {/* Aurora Canvas */}
      <motion.div 
        className="relative bg-black rounded-xl shadow-neumorph overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-[500px] block"
          style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)' }}
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

        {/* Intensity Control */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white">
          <label className="text-sm font-medium">Aurora Intensity</label>
          <input
            type="range"
            min="0.1"
            max="1.5"
            step="0.1"
            value={auroraIntensity}
            onChange={(e) => setAuroraIntensity(parseFloat(e.target.value))}
            className="w-32 mt-2"
          />
        </div>

        {/* Share Mode Overlay */}
        <AnimatePresence>
          {shareMode && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center text-white">
                <Share2 size={48} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sharing Aurora...</h3>
                <p className="text-gray-300">Your vitality aurora has been shared with the community!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Aurora Insights */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Sparkles className="text-primary-500 mr-2" size={20} />
            <h3 className="font-medium text-primary-700">Recovery Waves</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Your recovery progress creates dynamic aurora patterns that reflect your healing journey.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Current Pattern</h4>
            <p className="text-sm text-gray-600">
              {patient?.recoveryMetrics.recoveryProgress > 70 ? 'Strong healing waves' : 
               patient?.recoveryMetrics.recoveryProgress > 40 ? 'Steady progress waves' : 
               'Gentle recovery waves'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Users className="text-accent-500 mr-2" size={20} />
            <h3 className="font-medium text-accent-700">Community Resonance</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Community support and eco-actions add vibrant color waves to your aurora.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Community Impact</h4>
            <p className="text-sm text-gray-600">
              {communityData[0]?.activityMetrics.dailyActiveMembers} active members contributing to your aurora
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Leaf className="text-secondary-500 mr-2" size={20} />
            <h3 className="font-medium text-secondary-700">Environmental Harmony</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Environmental factors influence the aurora's color palette and intensity.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Air Quality Impact</h4>
            <p className="text-sm text-gray-600">
              Current AQI: {env?.measurements[0].airQuality.aqi} - {env?.measurements[0].airQuality.aqi < 50 ? 'Optimal' : 'Moderate'} aurora conditions
            </p>
          </div>
        </div>
      </motion.div>

      {/* AR Integration Note */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
        <div className="flex items-start space-x-3">
          <Zap className="text-purple-500 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-medium text-purple-700 mb-1">AR Integration Ready</h4>
            <p className="text-sm text-purple-600">
              This aurora visualization is designed for Unity and AWS Bedrock integration, 
              enabling real-time AR projection of your vitality patterns in physical space.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalityAuroraVeil; 