import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Wind, Activity, Leaf, Zap, Settings, Play, Pause, RotateCcw, Wifi, Cpu } from 'lucide-react';

const EcoSyncWindSculpture: React.FC = () => {
  const { patientData, environmentalData, communityData, isLoading } = useData();
  const [isPlaying, setIsPlaying] = useState(true);
  const [arduinoConnected, setArduinoConnected] = useState(true);
  const [greengrassStatus, setGreengrassStatus] = useState('active');
  const [windIntensity, setWindIntensity] = useState(0.7);
  const [sculptureMode, setSculptureMode] = useState<'vitals' | 'environment' | 'community'>('vitals');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const patient = patientData[0];
  const env = environmentalData[0];

  // Wind sculpture elements
  const windElements = [
    { id: 1, name: 'Vital Winds', color: '#00ff88', baseSpeed: 1.0 },
    { id: 2, name: 'Eco Breeze', color: '#4ecdc4', baseSpeed: 0.8 },
    { id: 3, name: 'Community Gusts', color: '#ff6b6b', baseSpeed: 1.2 },
    { id: 4, name: 'Recovery Flow', color: '#8a6bc1', baseSpeed: 0.9 },
    { id: 5, name: 'Healing Drafts', color: '#feca57', baseSpeed: 1.1 }
  ];

  // Generate wind patterns based on data
  const generateWindPattern = () => {
    if (!patient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const time = Date.now() * 0.001 * windIntensity;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(0, 255, 136, 0.1)');
    gradient.addColorStop(0.5, 'rgba(78, 205, 196, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 107, 107, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw wind elements based on current mode
    windElements.forEach((element, index) => {
      const elementSpeed = element.baseSpeed * windIntensity;
      const amplitude = getElementAmplitude(element.name);
      const frequency = 0.02 + (index * 0.005);
      const phase = time * elementSpeed;

      ctx.beginPath();
      ctx.strokeStyle = element.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8;

      // Create flowing wind pattern
      for (let x = 0; x < width; x += 3) {
        const y = (height * 0.3) + (index * 80) + 
                  Math.sin(x * frequency + phase) * amplitude +
                  Math.sin(x * frequency * 0.5 + phase * 0.7) * amplitude * 0.5;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Add glow effect
      ctx.shadowColor = element.color;
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Add floating particles
      const particleCount = Math.floor(amplitude / 10);
      for (let i = 0; i < particleCount; i++) {
        const x = (Math.sin(time + i + index) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.7 + i * 0.5 + index) * 0.5 + 0.5) * height;
        const size = Math.sin(time + i) * 2 + 3;

        ctx.beginPath();
        ctx.fillStyle = element.color;
        ctx.globalAlpha = 0.6;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.globalAlpha = 1;
  };

  const getElementAmplitude = (elementName: string) => {
    switch (elementName) {
      case 'Vital Winds':
        return (patient?.recoveryMetrics.recoveryProgress / 100) * 100;
      case 'Eco Breeze':
        return (100 - env?.measurements[0].airQuality.aqi) * 0.8;
      case 'Community Gusts':
        return (communityData[0]?.activityMetrics.dailyActiveMembers / 200) * 100;
      case 'Recovery Flow':
        return patient?.recoveryMetrics.energyLevel * 0.8;
      case 'Healing Drafts':
        return patient?.recoveryMetrics.mentalWellnessScore * 0.8;
      default:
        return 50;
    }
  };

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const animate = () => {
      generateWindPattern();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, windIntensity, sculptureMode, patient, env, communityData]);

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

  const getSculptureStats = () => {
    if (!patient) return null;

    switch (sculptureMode) {
      case 'vitals':
        return {
          title: 'Vital Winds',
          value: `${patient.recoveryMetrics.recoveryProgress}%`,
          description: 'Recovery-driven wind patterns',
          color: '#00ff88'
        };
      case 'environment':
        return {
          title: 'Eco Breeze',
          value: `${Math.round((100 - env?.measurements[0].airQuality.aqi) * 0.8)}%`,
          description: 'Environmental wind intensity',
          color: '#4ecdc4'
        };
      case 'community':
        return {
          title: 'Community Gusts',
          value: `${communityData[0]?.activityMetrics.dailyActiveMembers || 0}`,
          description: 'Community-driven wind flow',
          color: '#ff6b6b'
        };
    }
  };

  const stats = getSculptureStats();

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
          <h1 className="text-2xl font-bold text-gray-900">Eco-Sync Wind Sculpture</h1>
          <p className="text-gray-600">Kinetic wind-driven elements synchronized with vitals and eco-conditions</p>
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
            onClick={() => setArduinoConnected(!arduinoConnected)}
            className={`px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 ${
              arduinoConnected 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Cpu size={20} />
            <span>{arduinoConnected ? 'Arduino Connected' : 'Arduino Disconnected'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Mode Selector */}
      <motion.div 
        className="flex space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <button
          onClick={() => setSculptureMode('vitals')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
            sculptureMode === 'vitals'
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Activity size={16} />
          <span>Vitals</span>
        </button>
        <button
          onClick={() => setSculptureMode('environment')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
            sculptureMode === 'environment'
              ? 'bg-secondary-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Leaf size={16} />
          <span>Environment</span>
        </button>
        <button
          onClick={() => setSculptureMode('community')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
            sculptureMode === 'community'
              ? 'bg-accent-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Wind size={16} />
          <span>Community</span>
        </button>
      </motion.div>

      {/* Wind Sculpture Canvas */}
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

        {/* Wind Intensity Control */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white">
          <label className="text-sm font-medium">Wind Intensity</label>
          <input
            type="range"
            min="0.1"
            max="1.5"
            step="0.1"
            value={windIntensity}
            onChange={(e) => setWindIntensity(parseFloat(e.target.value))}
            className="w-32 mt-2"
          />
        </div>

        {/* Arduino Status */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${arduinoConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-sm">Arduino</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <div className={`h-3 w-3 rounded-full ${greengrassStatus === 'active' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
            <span className="text-sm">Greengrass</span>
          </div>
        </div>
      </motion.div>

      {/* Wind Elements Info */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Activity className="text-primary-500 mr-2" size={20} />
            <h3 className="font-medium text-primary-700">Vital Winds</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Wind patterns driven by your recovery metrics and vital signs.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Current Flow</h4>
            <p className="text-sm text-gray-600">
              {patient?.recoveryMetrics.recoveryProgress > 70 ? 'Strong vital winds' : 
               patient?.recoveryMetrics.recoveryProgress > 40 ? 'Moderate wind flow' : 
               'Gentle vital breezes'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Leaf className="text-secondary-500 mr-2" size={20} />
            <h3 className="font-medium text-secondary-700">Eco Breeze</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Environmental conditions influence wind intensity and direction.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Environmental Impact</h4>
            <p className="text-sm text-gray-600">
              Air Quality: {env?.measurements[0].airQuality.aqi} AQI - {env?.measurements[0].airQuality.aqi < 50 ? 'Optimal' : 'Moderate'} wind conditions
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Wind className="text-accent-500 mr-2" size={20} />
            <h3 className="font-medium text-accent-700">Community Gusts</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Community activity creates synchronized wind patterns.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Community Flow</h4>
            <p className="text-sm text-gray-600">
              {communityData[0]?.activityMetrics.dailyActiveMembers} active members contributing to wind patterns
            </p>
          </div>
        </div>
      </motion.div>

      {/* Hardware Integration */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <Cpu className="text-blue-500 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-medium text-blue-700 mb-1">Arduino & Greengrass Integration</h4>
            <p className="text-sm text-blue-600">
              This wind sculpture visualization is designed for Arduino and AWS Greengrass integration, 
              enabling real-time kinetic wind elements in public spaces based on your health and environmental data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoSyncWindSculpture;
