import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Camera, Share2, Play, Pause, Heart, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EcoRhythmCascadeWidget: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [breathingPhase, setBreathingPhase] = React.useState<'inhale' | 'exhale'>('inhale');

  // Simulate breathing cycle
  React.useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setBreathingPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleARMode = () => {
    navigate('/eco-rhythm-cascade?mode=ar');
  };

  const handleShare = () => {
    // In real implementation, this would share the experience
    console.log('Sharing Eco-Rhythm Cascade experience...');
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-neumorph-sm p-6 border-l-4 border-cyan-500"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center text-lg font-medium text-gray-800">
          <Droplets className="mr-2 text-cyan-500" size={20} />
          Eco-Rhythm Cascade
        </h3>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className={`p-2 rounded-lg transition-colors ${
              isPlaying 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            title={isPlaying ? 'Pause' : 'Start'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleARMode}
            className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition-colors"
            title="AR Mode"
          >
            <Camera size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
            title="Share"
          >
            <Share2 size={16} />
          </motion.button>
        </div>
      </div>

      {/* Breathing Visualization */}
      <div className="mb-4">
        <div className="flex items-center justify-center mb-3">
          <motion.div
            animate={{
              scale: breathingPhase === 'inhale' ? 1.2 : 0.8,
              opacity: breathingPhase === 'inhale' ? 1 : 0.7
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
          >
            <Droplets size={24} className="text-white" />
          </motion.div>
        </div>
        <div className="text-center">
          <span className={`text-sm font-medium ${
            breathingPhase === 'inhale' ? 'text-green-600' : 'text-blue-600'
          }`}>
            {breathingPhase.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Heart size={14} className="text-green-500" />
            <span className="text-xs font-medium text-gray-600">Heart Rate</span>
          </div>
          <span className="text-sm font-bold text-green-600">72 bpm</span>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Wind size={14} className="text-blue-500" />
            <span className="text-xs font-medium text-gray-600">Wind Speed</span>
          </div>
          <span className="text-sm font-bold text-blue-600">3.2 m/s</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Breathing Sync</span>
          <span>85%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '85%' }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/eco-rhythm-cascade')}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
        >
          Open Full View
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EcoRhythmCascadeWidget; 