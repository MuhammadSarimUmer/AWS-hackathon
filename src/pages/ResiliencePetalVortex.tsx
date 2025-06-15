import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Flower, Users, Heart, Sparkles, Play, Pause, RotateCcw, Share2, Eye, Zap } from 'lucide-react';

const ResiliencePetalVortex: React.FC = () => {
  const { patientData, environmentalData, communityData, isLoading } = useData();
  const [isPlaying, setIsPlaying] = useState(true);
  const [vortexSpeed, setVortexSpeed] = useState(0.8);
  const [petalCount, setPetalCount] = useState(50);
  const [communityMode, setCommunityMode] = useState(false);
  const [arMode, setArMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const patient = patientData[0];

  // Petal types and colors
  const petalTypes = [
    { name: 'Recovery Petals', color: '#FF6B9D', size: 1.0, speed: 1.0 },
    { name: 'Community Petals', color: '#4ECDC4', size: 0.8, speed: 1.2 },
    { name: 'Resilience Petals', color: '#45B7D1', size: 1.1, speed: 0.9 },
    { name: 'Healing Petals', color: '#96CEB4', size: 0.9, speed: 1.1 },
    { name: 'Energy Petals', color: '#FFEAA7', size: 1.2, speed: 0.8 }
  ];

  // Petal class for animation
  class Petal {
    x: number;
    y: number;
    size: number;
    speed: number;
    angle: number;
    rotation: number;
    color: string;
    type: string;
    opacity: number;
    life: number;

    constructor(canvas: HTMLCanvasElement, type: any) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = type.size * (20 + Math.random() * 30);
      this.speed = type.speed * (0.5 + Math.random() * 0.5);
      this.angle = Math.random() * Math.PI * 2;
      this.rotation = Math.random() * Math.PI * 2;
      this.color = type.color;
      this.type = type.name;
      this.opacity = 0.7 + Math.random() * 0.3;
      this.life = 1.0;
    }

    update(canvas: HTMLCanvasElement, time: number, vortexCenter: { x: number; y: number }) {
      // Vortex movement
      const dx = this.x - vortexCenter.x;
      const dy = this.y - vortexCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Angular velocity based on distance from center
      const angularVelocity = (vortexSpeed * 0.01) / (distance + 100);
      this.angle += angularVelocity;
      
      // Radial movement towards center
      const radialSpeed = this.speed * 0.5;
      const targetDistance = 50 + Math.sin(time + this.rotation) * 20;
      const currentDistance = Math.max(0, distance - radialSpeed);
      
      this.x = vortexCenter.x + Math.cos(this.angle) * currentDistance;
      this.y = vortexCenter.y + Math.sin(this.angle) * currentDistance;
      
      // Rotation
      this.rotation += 0.02 * this.speed;
      
      // Life cycle
      this.life -= 0.001;
      if (this.life <= 0) {
        this.life = 1.0;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity * this.life;

      // Draw petal shape
      ctx.beginPath();
      ctx.fillStyle = this.color;
      
      // Create petal shape
      const petalLength = this.size;
      const petalWidth = this.size * 0.3;
      
      ctx.ellipse(0, 0, petalLength, petalWidth, 0, 0, Math.PI * 2);
      ctx.fill();

      // Add petal details
      ctx.globalAlpha = this.opacity * this.life * 0.5;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Add glow effect
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();
    }
  }

  // Generate petal vortex
  const generatePetalVortex = () => {
    if (!patient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const time = Date.now() * 0.001 * vortexSpeed;
    const vortexCenter = { x: width / 2, y: height / 2 };

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Create gradient background
    const gradient = ctx.createRadialGradient(vortexCenter.x, vortexCenter.y, 0, vortexCenter.x, vortexCenter.y, Math.max(width, height) / 2);
    gradient.addColorStop(0, 'rgba(255, 107, 157, 0.1)');
    gradient.addColorStop(0.3, 'rgba(78, 205, 196, 0.05)');
    gradient.addColorStop(0.6, 'rgba(69, 183, 209, 0.05)');
    gradient.addColorStop(1, 'rgba(150, 206, 180, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Generate petals based on recovery data
    const petals: Petal[] = [];
    const recoveryProgress = patient.recoveryMetrics.recoveryProgress;
    const energyLevel = patient.recoveryMetrics.energyLevel;
    const communityMembers = communityData[0]?.activityMetrics.dailyActiveMembers || 0;

    // Calculate petal distribution based on data
    const recoveryPetals = Math.floor((recoveryProgress / 100) * petalCount * 0.3);
    const communityPetals = Math.floor((communityMembers / 200) * petalCount * 0.2);
    const resiliencePetals = Math.floor((energyLevel / 100) * petalCount * 0.2);
    const healingPetals = Math.floor((patient.recoveryMetrics.mentalWellnessScore / 100) * petalCount * 0.15);
    const energyPetals = Math.floor((patient.recoveryMetrics.mobilityScore / 100) * petalCount * 0.15);

    // Create petals
    for (let i = 0; i < recoveryPetals; i++) {
      petals.push(new Petal(canvas, petalTypes[0]));
    }
    for (let i = 0; i < communityPetals; i++) {
      petals.push(new Petal(canvas, petalTypes[1]));
    }
    for (let i = 0; i < resiliencePetals; i++) {
      petals.push(new Petal(canvas, petalTypes[2]));
    }
    for (let i = 0; i < healingPetals; i++) {
      petals.push(new Petal(canvas, petalTypes[3]));
    }
    for (let i = 0; i < energyPetals; i++) {
      petals.push(new Petal(canvas, petalTypes[4]));
    }

    // Update and draw petals
    petals.forEach(petal => {
      petal.update(canvas, time, vortexCenter);
      petal.draw(ctx);
    });

    // Draw vortex center
    const centerGradient = ctx.createRadialGradient(vortexCenter.x, vortexCenter.y, 0, vortexCenter.x, vortexCenter.y, 60);
    centerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    centerGradient.addColorStop(0.5, 'rgba(255, 107, 157, 0.4)');
    centerGradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.fillStyle = centerGradient;
    ctx.arc(vortexCenter.x, vortexCenter.y, 60, 0, Math.PI * 2);
    ctx.fill();

    // Add community action patterns
    if (communityMode) {
      const patternCount = Math.floor(communityMembers / 10);
      for (let i = 0; i < patternCount; i++) {
        const angle = (i / patternCount) * Math.PI * 2 + time;
        const radius = 100 + Math.sin(time + i) * 30;
        const x = vortexCenter.x + Math.cos(angle) * radius;
        const y = vortexCenter.y + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(78, 205, 196, 0.6)';
        ctx.globalAlpha = 0.8;
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  };

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const animate = () => {
      generatePetalVortex();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, vortexSpeed, petalCount, communityMode, patient, communityData]);

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

  const getVortexStats = () => {
    if (!patient) return null;

    return {
      title: 'Resilience Petal Vortex',
      value: `${patient.recoveryMetrics.recoveryProgress}%`,
      description: 'Recovery-driven petal storm intensity',
      color: '#FF6B9D'
    };
  };

  const stats = getVortexStats();

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
          <h1 className="text-2xl font-bold text-gray-900">Resilience Petal Vortex</h1>
          <p className="text-gray-600">Swirling AR petal storm rendering recovery with community action patterns</p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </motion.button>
          <motion.button
            onClick={() => setCommunityMode(!communityMode)}
            className={`px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 ${
              communityMode 
                ? 'bg-teal-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users size={20} />
            <span>{communityMode ? 'Community Active' : 'Community Mode'}</span>
          </motion.button>
          <motion.button
            onClick={() => setArMode(!arMode)}
            className={`px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 ${
              arMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={20} />
            <span>{arMode ? 'AR Active' : 'AR Mode'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Petal Vortex Canvas */}
      <motion.div 
        className="relative bg-black rounded-xl shadow-neumorph overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-[500px] block"
          style={{ background: 'linear-gradient(135deg, #1a0f1a 0%, #2e1a2e 50%, #3e1621 100%)' }}
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

        {/* Vortex Controls */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white">
          <label className="text-sm font-medium">Vortex Speed</label>
          <input
            type="range"
            min="0.1"
            max="2.0"
            step="0.1"
            value={vortexSpeed}
            onChange={(e) => setVortexSpeed(parseFloat(e.target.value))}
            className="w-32 mt-2"
          />
          <label className="text-sm font-medium block mt-3">Petal Count</label>
          <input
            type="range"
            min="20"
            max="100"
            step="10"
            value={petalCount}
            onChange={(e) => setPetalCount(parseInt(e.target.value))}
            className="w-32 mt-2"
          />
        </div>

        {/* Mode Indicators */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${communityMode ? 'bg-teal-400' : 'bg-gray-400'}`}></div>
            <span className="text-sm">Community</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <div className={`h-3 w-3 rounded-full ${arMode ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
            <span className="text-sm">AR Mode</span>
          </div>
        </div>
      </motion.div>

      {/* Petal Insights */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Flower className="text-pink-500 mr-2" size={20} />
            <h3 className="font-medium text-pink-700">Recovery Petals</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Petals representing your recovery progress and healing journey.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Current Flow</h4>
            <p className="text-sm text-gray-600">
              {patient?.recoveryMetrics.recoveryProgress > 70 ? 'Abundant recovery petals' : 
               patient?.recoveryMetrics.recoveryProgress > 40 ? 'Steady petal flow' : 
               'Gentle recovery petals'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Users className="text-teal-500 mr-2" size={20} />
            <h3 className="font-medium text-teal-700">Community Patterns</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Community actions create unique patterns in the petal vortex.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Community Impact</h4>
            <p className="text-sm text-gray-600">
              {communityData[0]?.activityMetrics.dailyActiveMembers} active members creating petal patterns
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Sparkles className="text-blue-500 mr-2" size={20} />
            <h3 className="font-medium text-blue-700">AR Experience</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Immersive AR petal storm for uplifting visual therapy.
          </p>
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">AR Status</h4>
            <p className="text-sm text-gray-600">
              {arMode ? 'AR mode active - immersive experience' : 'AR mode available - click to activate'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Unity & Amplify Integration */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
        <div className="flex items-start space-x-3">
          <Zap className="text-purple-500 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-medium text-purple-700 mb-1">Unity & Amplify Integration</h4>
            <p className="text-sm text-purple-600">
              This resilience petal vortex is designed for Unity AR development and AWS Amplify integration, 
              enabling immersive AR petal storms that uplift users with dynamic beauty and community-driven patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResiliencePetalVortex;
