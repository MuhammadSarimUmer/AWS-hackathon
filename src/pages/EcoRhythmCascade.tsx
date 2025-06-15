import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Waves, 
  Heart, 
  Share2, 
  Play, 
  Pause, 
  Volume2,
  Camera,
  Download,
  Settings,
  Leaf,
  Wind
} from 'lucide-react';

interface BreathingData {
  inhale: number;
  exhale: number;
  heartRate: number;
  oxygenLevel: number;
}

interface EnvironmentalData {
  humidity: number;
  temperature: number;
  airQuality: number;
  windSpeed: number;
  timeOfDay: number; // 0-24 hours
}

const EcoRhythmCascade: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [breathingData, setBreathingData] = useState<BreathingData>({
    inhale: 4,
    exhale: 6,
    heartRate: 72,
    oxygenLevel: 98
  });
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData>({
    humidity: 65,
    temperature: 22,
    airQuality: 85,
    windSpeed: 3.2,
    timeOfDay: 14
  });
  const [isSharing, setIsSharing] = useState(false);
  const [arMode, setArMode] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Simulate breathing cycle
      setBreathingPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');
      
      // Update environmental data
      setEnvironmentalData(prev => ({
        ...prev,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 2)),
        temperature: Math.max(15, Math.min(30, prev.temperature + (Math.random() - 0.5) * 0.5)),
        airQuality: Math.max(50, Math.min(100, prev.airQuality + (Math.random() - 0.5) * 3)),
        windSpeed: Math.max(0, Math.min(10, prev.windSpeed + (Math.random() - 0.5) * 0.5)),
        timeOfDay: (prev.timeOfDay + 0.1) % 24
      }));

      // Update breathing data
      setBreathingData(prev => ({
        ...prev,
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 2)),
        oxygenLevel: Math.max(95, Math.min(100, prev.oxygenLevel + (Math.random() - 0.5) * 0.5))
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2 + 1,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      const timeOfDay = environmentalData.timeOfDay;
      if (timeOfDay >= 6 && timeOfDay <= 18) {
        // Day
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F6FF');
      } else {
        // Night
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waterfall streams
      const streamCount = 5;
      for (let i = 0; i < streamCount; i++) {
        const x = (canvas.width / (streamCount + 1)) * (i + 1);
        const streamWidth = 20 + environmentalData.humidity / 5;
        const flowSpeed = environmentalData.windSpeed * 2 + (breathingPhase === 'inhale' ? 1 : 0.5);

        ctx.save();
        ctx.globalAlpha = 0.7;
        
        // Stream gradient
        const streamGradient = ctx.createLinearGradient(x - streamWidth/2, 0, x + streamWidth/2, 0);
        streamGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        streamGradient.addColorStop(0.5, `rgba(135, 206, 235, ${0.8 + environmentalData.airQuality / 200})`);
        streamGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = streamGradient;
        ctx.fillRect(x - streamWidth/2, 0, streamWidth, canvas.height);

        // Animated water drops
        for (let j = 0; j < 10; j++) {
          const dropY = (Date.now() * flowSpeed / 1000 + j * 50) % canvas.height;
          const dropSize = 3 + Math.sin(Date.now() / 1000 + j) * 2;
          
          ctx.beginPath();
          ctx.arc(x + (Math.random() - 0.5) * streamWidth, dropY, dropSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + environmentalData.humidity / 200})`;
          ctx.fill();
        }
        
        ctx.restore();
      }

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Reset particle if it goes off screen
        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }

        // Breathing influence on particles
        if (breathingPhase === 'inhale') {
          particle.vy *= 0.98; // Slow down during inhale
        } else {
          particle.vy *= 1.02; // Speed up during exhale
        }

        // Environmental influence
        particle.vx += (environmentalData.windSpeed - 5) * 0.01;

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw breathing indicator
      const centerX = canvas.width / 2;
      const centerY = canvas.height - 100;
      const breathSize = breathingPhase === 'inhale' ? 60 : 40;
      
      ctx.save();
      ctx.globalAlpha = 0.8;
      ctx.strokeStyle = breathingPhase === 'inhale' ? '#4CAF50' : '#2196F3';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, breathSize, 0, Math.PI * 2);
      ctx.stroke();
      
      // Breathing text
      ctx.fillStyle = breathingPhase === 'inhale' ? '#4CAF50' : '#2196F3';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(breathingPhase.toUpperCase(), centerX, centerY + 50);
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [breathingPhase, environmentalData, breathingData]);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      // Simulate sharing functionality
      await new Promise(resolve => setTimeout(resolve, 2000));
      // In real implementation, this would share the AR experience
      console.log('Sharing Eco-Rhythm Cascade experience...');
    } finally {
      setIsSharing(false);
    }
  };

  const toggleARMode = () => {
    setArMode(!arMode);
    // In real implementation, this would activate Unity AR integration
    console.log('AR Mode:', !arMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 relative overflow-hidden">
      {/* AR Mode Overlay */}
      {arMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">AR Mode Active</h3>
            <p className="text-gray-600 mb-4">
              Unity AR integration would be active here, displaying the waterfall in your environment.
            </p>
            <button
              onClick={toggleARMode}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Exit AR Mode
            </button>
          </div>
        </div>
      )}

      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Eco-Rhythm Cascade
            </h1>
            <p className="text-gray-600 text-lg">
              Synchronizing breath with environmental rhythms through AR waterfalls
            </p>
          </div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleARMode}
              className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600 transition-colors"
              title="Toggle AR Mode"
            >
              <Camera size={24} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              disabled={isSharing}
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors disabled:opacity-50"
              title="Share Experience"
            >
              <Share2 size={24} />
            </motion.button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Breathing Controls</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isPlaying 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? 'Pause' : 'Start'} Breathing
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Breathing Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Breathing Pattern</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Inhale Duration (seconds)
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    value={breathingData.inhale}
                    onChange={(e) => setBreathingData(prev => ({ ...prev, inhale: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{breathingData.inhale}s</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Exhale Duration (seconds)
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={breathingData.exhale}
                    onChange={(e) => setBreathingData(prev => ({ ...prev, exhale: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{breathingData.exhale}s</span>
                </div>
              </div>
            </div>

            {/* Environmental Data */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Environmental Sync</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets size={16} className="text-blue-500" />
                    <span className="text-sm font-medium text-gray-600">Humidity</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{environmentalData.humidity}%</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Leaf size={16} className="text-green-500" />
                    <span className="text-sm font-medium text-gray-600">Air Quality</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{environmentalData.airQuality}%</span>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Wind size={16} className="text-yellow-500" />
                    <span className="text-sm font-medium text-gray-600">Wind Speed</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">{environmentalData.windSpeed} m/s</span>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart size={16} className="text-purple-500" />
                    <span className="text-sm font-medium text-gray-600">Heart Rate</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">{breathingData.heartRate} bpm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="font-medium text-gray-700">
                {isPlaying ? 'Breathing Active' : 'Breathing Paused'}
              </span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${arMode ? 'bg-purple-500' : 'bg-gray-400'}`}></div>
              <span className="font-medium text-gray-700">
                {arMode ? 'AR Mode Active' : 'AR Mode Inactive'}
              </span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <Volume2 size={20} className="text-blue-500" />
              <span className="font-medium text-gray-700">
                Ambient Sounds: {isPlaying ? 'On' : 'Off'}
              </span>
            </div>
          </div>
        </div>

        {/* IoT Integration Info */}
        <div className="mt-8 bg-blue-50/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">IoT Core Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Unity AR:</strong> Real-time waterfall visualization in your environment
            </div>
            <div>
              <strong>IoT Sensors:</strong> Environmental data from connected devices
            </div>
            <div>
              <strong>Breathing Sync:</strong> Patient vitals synchronized with water flow
            </div>
            <div>
              <strong>Community Sharing:</strong> Share calming experiences with others
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoRhythmCascade; 