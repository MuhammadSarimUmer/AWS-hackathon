import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Users, 
  Share2, 
  Heart, 
  Leaf, 
  TrendingUp, 
  MessageCircle, 
  Camera,
  ArrowLeft,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';

const CommunityGlowSphere: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { patientData, environmentalData, communityData } = useData();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isARMode, setIsARMode] = useState(searchParams.get('mode') === 'ar');
  const [isCommunityMode, setIsCommunityMode] = useState(searchParams.get('mode') === 'community');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [sphereIntensity, setSphereIntensity] = useState(0.7);
  const [communitySupport, setCommunitySupport] = useState(0);
  const [ecoMilestones, setEcoMilestones] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'sphere' | 'community' | 'milestones'>('sphere');

  // Extract data
  const patient = patientData[0];
  const environment = environmentalData[0];
  const community = communityData[0];

  useEffect(() => {
    // Initialize sphere visualization
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;

      // Draw pulsing sphere
      const pulseIntensity = Math.sin(time * 2) * 0.3 + 0.7;
      const sphereRadius = radius * pulseIntensity * sphereIntensity;

      // Create gradient for sphere
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, sphereRadius
      );
      gradient.addColorStop(0, `rgba(251, 191, 36, ${pulseIntensity * 0.8})`);
      gradient.addColorStop(0.5, `rgba(249, 115, 22, ${pulseIntensity * 0.6})`);
      gradient.addColorStop(1, `rgba(251, 191, 36, ${pulseIntensity * 0.2})`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw eco-milestone particles
      ecoMilestones.forEach((milestone, index) => {
        const angle = (index / ecoMilestones.length) * Math.PI * 2 + time;
        const particleX = centerX + Math.cos(angle) * (sphereRadius + 50);
        const particleY = centerY + Math.sin(angle) * (sphereRadius + 50);
        
        ctx.fillStyle = `rgba(34, 197, 94, ${0.6 + Math.sin(time * 3 + index) * 0.4})`;
        ctx.beginPath();
        ctx.arc(particleX, particleY, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw community support waves
      for (let i = 0; i < 3; i++) {
        const waveRadius = sphereRadius + 30 + i * 20 + Math.sin(time + i) * 10;
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 - i * 0.1})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [sphereIntensity, ecoMilestones, communitySupport]);

  useEffect(() => {
    // Simulate eco-milestones data
    const milestones = [
      { id: 1, name: 'Air Quality Improved', value: 85, icon: '🌬️' },
      { id: 2, name: 'Community Engagement', value: 92, icon: '🤝' },
      { id: 3, name: 'Energy Conservation', value: 78, icon: '⚡' },
      { id: 4, name: 'Waste Reduction', value: 88, icon: '♻️' },
      { id: 5, name: 'Green Spaces', value: 95, icon: '🌿' }
    ];
    setEcoMilestones(milestones);
    setCommunitySupport(community?.activityMetrics.dailyActiveMembers || 150);
  }, [community]);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      // Simulate sharing functionality
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Community Glow Sphere experience shared!');
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleToggleAR = () => {
    setIsARMode(!isARMode);
    if (!isARMode) {
      // Simulate AR camera access
      console.log('AR mode activated - accessing camera...');
    }
  };

  const handleToggleCommunity = () => {
    setIsCommunityMode(!isCommunityMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => navigate('/')}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </motion.button>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Community Glow Sphere
              </h1>
              <p className="text-gray-600 text-lg">
                Radiant AR sphere pulsing with eco-milestones, fostering connection and community support
              </p>
            </div>
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

        {/* View Controls */}
        <div className="flex space-x-2 mb-6">
          <motion.button
            onClick={() => setCurrentView('sphere')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
              currentView === 'sphere'
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe size={16} />
            <span>Glow Sphere</span>
          </motion.button>
          <motion.button
            onClick={() => setCurrentView('community')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
              currentView === 'community'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users size={16} />
            <span>Community</span>
          </motion.button>
          <motion.button
            onClick={() => setCurrentView('milestones')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
              currentView === 'milestones'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp size={16} />
            <span>Eco Milestones</span>
          </motion.button>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {currentView === 'sphere' && (
            <motion.div
              key="sphere"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Sphere Controls */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Sphere Controls</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sphere Intensity
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={sphereIntensity}
                      onChange={(e) => setSphereIntensity(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Subtle</span>
                      <span>Intense</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleToggleAR}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isARMode 
                        ? 'bg-purple-500 text-white hover:bg-purple-600' 
                        : 'bg-gray-500 text-white hover:bg-gray-600'
                    }`}
                  >
                    <Camera size={20} />
                    {isARMode ? 'AR Active' : 'Enable AR'}
                  </motion.button>
                </div>
              </div>

              {/* Community Support */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Support</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {communitySupport}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">Active Community Members</div>
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <TrendingUp size={16} />
                    <span className="text-sm">+12% this week</span>
                  </div>
                </div>
              </div>

              {/* Real-time Stats */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Real-time Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sphere Pulse Rate</span>
                    <span className="font-semibold text-yellow-600">2.3 Hz</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Community Energy</span>
                    <span className="font-semibold text-blue-600">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Eco Impact</span>
                    <span className="font-semibold text-green-600">+23%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">New Members</div>
                        <div className="text-sm text-gray-600">+15 today</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">+12%</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Heart size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Support Messages</div>
                        <div className="text-sm text-gray-600">47 shared</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">+8%</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Global Connection</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
                    <div className="text-sm text-gray-600">Connected Communities</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-semibold text-yellow-600">23</div>
                      <div className="text-xs text-gray-600">Countries</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-semibold text-purple-600">156</div>
                      <div className="text-xs text-gray-600">Cities</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'milestones' && (
            <motion.div
              key="milestones"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {ecoMilestones.map((milestone) => (
                <motion.div
                  key={milestone.id}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">{milestone.icon}</div>
                    <div className="text-2xl font-bold text-green-600">
                      {milestone.value}%
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {milestone.name}
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${milestone.value}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommunityGlowSphere; 