import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Music, 
  Heart, 
  Share2, 
  Play, 
  Pause, 
  Volume2,
  VolumeX,
  Download,
  Settings,
  Leaf,
  Wind,
  Droplets,
  Zap,
  Users
} from 'lucide-react';

interface VitalData {
  heartRate: number;
  bloodPressure: number;
  oxygenLevel: number;
  stressLevel: number;
  breathingRate: number;
}

interface EcoData {
  airQuality: number;
  humidity: number;
  temperature: number;
  windSpeed: number;
  noiseLevel: number;
  timeOfDay: number; // 0-24 hours
}

interface ChimeSound {
  frequency: number;
  volume: number;
  duration: number;
  type: 'crystal' | 'bronze' | 'silver' | 'gold';
  position: { x: number; y: number };
}

const HarmonyPulseChime: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentChime, setCurrentChime] = useState<ChimeSound | null>(null);
  const [vitalData, setVitalData] = useState<VitalData>({
    heartRate: 72,
    bloodPressure: 120,
    oxygenLevel: 98,
    stressLevel: 35,
    breathingRate: 16
  });
  const [ecoData, setEcoData] = useState<EcoData>({
    airQuality: 85,
    humidity: 65,
    temperature: 22,
    windSpeed: 3.2,
    noiseLevel: 45,
    timeOfDay: 14
  });
  const [isSharing, setIsSharing] = useState(false);
  const [edgeDevices, setEdgeDevices] = useState(3);
  const [communitySharing, setCommunitySharing] = useState(false);

  // Initialize Audio Context
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new AudioContext();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Generate chime sound
  const generateChime = (chimeData: ChimeSound) => {
    if (!audioContextRef.current || isMuted) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Set frequency based on chime type and vital data
    let baseFreq = chimeData.frequency;
    switch (chimeData.type) {
      case 'crystal':
        baseFreq = 440 + (vitalData.heartRate - 70) * 2;
        break;
      case 'bronze':
        baseFreq = 523 + (ecoData.airQuality - 80) * 1.5;
        break;
      case 'silver':
        baseFreq = 659 + (vitalData.oxygenLevel - 95) * 3;
        break;
      case 'gold':
        baseFreq = 880 + (ecoData.humidity - 60) * 2;
        break;
    }

    oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
    oscillator.type = 'sine';

    // Create envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(chimeData.volume, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + chimeData.duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + chimeData.duration);
  };

  // Simulate real-time data updates
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Update vital data
      setVitalData(prev => ({
        ...prev,
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 2)),
        bloodPressure: Math.max(110, Math.min(140, prev.bloodPressure + (Math.random() - 0.5) * 3)),
        oxygenLevel: Math.max(95, Math.min(100, prev.oxygenLevel + (Math.random() - 0.5) * 0.5)),
        stressLevel: Math.max(20, Math.min(80, prev.stressLevel + (Math.random() - 0.5) * 5)),
        breathingRate: Math.max(12, Math.min(20, prev.breathingRate + (Math.random() - 0.5) * 1))
      }));

      // Update eco data
      setEcoData(prev => ({
        ...prev,
        airQuality: Math.max(50, Math.min(100, prev.airQuality + (Math.random() - 0.5) * 3)),
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 2)),
        temperature: Math.max(15, Math.min(30, prev.temperature + (Math.random() - 0.5) * 0.5)),
        windSpeed: Math.max(0, Math.min(10, prev.windSpeed + (Math.random() - 0.5) * 0.5)),
        noiseLevel: Math.max(30, Math.min(70, prev.noiseLevel + (Math.random() - 0.5) * 3)),
        timeOfDay: (prev.timeOfDay + 0.1) % 24
      }));

      // Generate chime based on data
      const chimeTypes: Array<'crystal' | 'bronze' | 'silver' | 'gold'> = ['crystal', 'bronze', 'silver', 'gold'];
      const randomType = chimeTypes[Math.floor(Math.random() * chimeTypes.length)];
      
      const newChime: ChimeSound = {
        frequency: 440 + Math.random() * 440,
        volume: 0.3 + (vitalData.stressLevel / 100) * 0.4,
        duration: 2 + Math.random() * 3,
        type: randomType,
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        }
      };

      setCurrentChime(newChime);
      generateChime(newChime);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, vitalData.stressLevel, isMuted]);

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
      type: string;
    }> = [];

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 6 + 2,
          opacity: Math.random() * 0.6 + 0.2,
          color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`,
          type: ['crystal', 'bronze', 'silver', 'gold'][Math.floor(Math.random() * 4)]
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      
      const timeOfDay = ecoData.timeOfDay;
      if (timeOfDay >= 6 && timeOfDay <= 18) {
        // Day
        gradient.addColorStop(0, '#E8F4FD');
        gradient.addColorStop(0.5, '#B3E5FC');
        gradient.addColorStop(1, '#81D4FA');
      } else {
        // Night
        gradient.addColorStop(0, '#1A237E');
        gradient.addColorStop(0.5, '#283593');
        gradient.addColorStop(1, '#3949AB');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw chime visualization
      if (currentChime) {
        const { x, y } = currentChime.position;
        const size = 50 + (currentChime.volume * 100);
        
        ctx.save();
        ctx.globalAlpha = 0.8;
        
        // Chime glow effect
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
        switch (currentChime.type) {
          case 'crystal':
            glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            glowGradient.addColorStop(1, 'rgba(135, 206, 235, 0)');
            break;
          case 'bronze':
            glowGradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
            glowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            break;
          case 'silver':
            glowGradient.addColorStop(0, 'rgba(192, 192, 192, 0.8)');
            glowGradient.addColorStop(1, 'rgba(192, 192, 192, 0)');
            break;
          case 'gold':
            glowGradient.addColorStop(0, 'rgba(255, 193, 7, 0.8)');
            glowGradient.addColorStop(1, 'rgba(255, 193, 7, 0)');
            break;
        }
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Chime center
        ctx.fillStyle = currentChime.type === 'crystal' ? '#87CEEB' : 
                       currentChime.type === 'bronze' ? '#FFD700' :
                       currentChime.type === 'silver' ? '#C0C0C0' : '#FFC107';
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Sound waves
        for (let i = 1; i <= 3; i++) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - i * 0.1})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, size + i * 30, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ctx.restore();
      }

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Vital data influence
        particle.vx += (vitalData.heartRate - 70) * 0.001;
        particle.vy += (vitalData.stressLevel - 50) * 0.001;

        // Eco data influence
        particle.vx += (ecoData.windSpeed - 5) * 0.01;
        particle.size += Math.sin(Date.now() / 1000 + index) * 0.5;

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw edge device indicators
      const deviceSpacing = canvas.width / (edgeDevices + 1);
      for (let i = 1; i <= edgeDevices; i++) {
        const x = deviceSpacing * i;
        const y = canvas.height - 50;
        
        ctx.save();
        ctx.fillStyle = isPlaying ? '#4CAF50' : '#9E9E9E';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Device pulse effect
        if (isPlaying) {
          ctx.strokeStyle = 'rgba(76, 175, 80, 0.3)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 15 + Math.sin(Date.now() / 1000 + i) * 5, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [currentChime, vitalData, ecoData, edgeDevices, isPlaying]);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Sharing Harmony Pulse Chime experience...');
    } finally {
      setIsSharing(false);
    }
  };

  const toggleCommunitySharing = () => {
    setCommunitySharing(!communitySharing);
    // In real implementation, this would enable community sound sharing
    console.log('Community sharing:', !communitySharing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 relative overflow-hidden">
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
              Harmony Pulse Chime
            </h1>
            <p className="text-gray-600 text-lg">
              Therapeutic bell sounds synchronized with vitals and environmental data
            </p>
          </div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-colors ${
                isMuted 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              disabled={isSharing}
              className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
              title="Share Experience"
            >
              <Share2 size={24} />
            </motion.button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Chime Controls</h2>
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
              {isPlaying ? 'Stop' : 'Start'} Chimes
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vital Data */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Vital Synchronization</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart size={16} className="text-red-500" />
                    <span className="text-sm font-medium text-gray-600">Heart Rate</span>
                  </div>
                  <span className="text-lg font-bold text-red-600">{vitalData.heartRate} bpm</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={16} className="text-blue-500" />
                    <span className="text-sm font-medium text-gray-600">Oxygen</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{vitalData.oxygenLevel}%</span>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Bell size={16} className="text-orange-500" />
                    <span className="text-sm font-medium text-gray-600">Stress Level</span>
                  </div>
                  <span className="text-lg font-bold text-orange-600">{vitalData.stressLevel}%</span>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Wind size={16} className="text-purple-500" />
                    <span className="text-sm font-medium text-gray-600">Breathing</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">{vitalData.breathingRate}/min</span>
                </div>
              </div>
            </div>

            {/* Environmental Data */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Environmental Harmony</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Leaf size={16} className="text-green-500" />
                    <span className="text-sm font-medium text-gray-600">Air Quality</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{ecoData.airQuality}%</span>
                </div>
                <div className="bg-cyan-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets size={16} className="text-cyan-500" />
                    <span className="text-sm font-medium text-gray-600">Humidity</span>
                  </div>
                  <span className="text-lg font-bold text-cyan-600">{ecoData.humidity}%</span>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Music size={16} className="text-yellow-500" />
                    <span className="text-sm font-medium text-gray-600">Noise Level</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">{ecoData.noiseLevel} dB</span>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Wind size={16} className="text-indigo-500" />
                    <span className="text-sm font-medium text-gray-600">Wind Speed</span>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">{ecoData.windSpeed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Chime Display */}
        {currentChime && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Chime</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Bell size={20} className="text-blue-500" />
                  <span className="font-medium text-gray-700">Type</span>
                </div>
                <span className="text-lg font-bold text-blue-600 capitalize">{currentChime.type}</span>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Music size={20} className="text-green-500" />
                  <span className="font-medium text-gray-700">Frequency</span>
                </div>
                <span className="text-lg font-bold text-green-600">{Math.round(currentChime.frequency)} Hz</span>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 size={20} className="text-purple-500" />
                  <span className="font-medium text-gray-700">Volume</span>
                </div>
                <span className="text-lg font-bold text-purple-600">{Math.round(currentChime.volume * 100)}%</span>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={20} className="text-orange-500" />
                  <span className="font-medium text-gray-700">Duration</span>
                </div>
                <span className="text-lg font-bold text-orange-600">{currentChime.duration.toFixed(1)}s</span>
              </div>
            </div>
          </div>
        )}

        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="font-medium text-gray-700">
                {isPlaying ? 'Chimes Active' : 'Chimes Paused'}
              </span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className="font-medium text-gray-700">
                {isMuted ? 'Audio Muted' : 'Audio Active'}
              </span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <Zap size={20} className="text-blue-500" />
              <span className="font-medium text-gray-700">
                Edge Devices: {edgeDevices}
              </span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-purple-500" />
              <span className="font-medium text-gray-700">
                Community: {communitySharing ? 'Sharing' : 'Private'}
              </span>
            </div>
          </div>
        </div>

        {/* Community and Edge Integration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Sharing</h3>
            <p className="text-gray-600 mb-4">
              Share your therapeutic chime experiences with the community and discover calming sounds from others.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCommunitySharing}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                communitySharing 
                  ? 'bg-purple-500 text-white hover:bg-purple-600' 
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              <Users size={20} />
              {communitySharing ? 'Disable Sharing' : 'Enable Sharing'}
            </motion.button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edge Device Integration</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Connected Devices</span>
                <span className="font-bold text-blue-600">{edgeDevices}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Audio APIs</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Greengrass</span>
                <span className="text-green-500 font-medium">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarmonyPulseChime; 