import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Volume2, VolumeX, Users, Play, Pause, Heart, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HarmonyPulseChimeWidget: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [currentChime, setCurrentChime] = React.useState<'crystal' | 'bronze' | 'silver' | 'gold'>('crystal');

  // Simulate chime changes
  React.useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const chimes: Array<'crystal' | 'bronze' | 'silver' | 'gold'> = ['crystal', 'bronze', 'silver', 'gold'];
      setCurrentChime(chimes[Math.floor(Math.random() * chimes.length)]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleCommunity = () => {
    navigate('/harmony-pulse-chime?mode=community');
  };

  const getChimeColor = (chime: string) => {
    switch (chime) {
      case 'crystal': return 'from-blue-400 to-cyan-500';
      case 'bronze': return 'from-yellow-500 to-orange-500';
      case 'silver': return 'from-gray-400 to-slate-500';
      case 'gold': return 'from-yellow-400 to-amber-500';
      default: return 'from-blue-400 to-cyan-500';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-neumorph-sm p-6 border-l-4 border-indigo-500"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center text-lg font-medium text-gray-800">
          <Bell className="mr-2 text-indigo-500" size={20} />
          Harmony Pulse Chime
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
            onClick={handleToggleMute}
            className={`p-2 rounded-lg transition-colors ${
              isMuted 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCommunity}
            className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition-colors"
            title="Community"
          >
            <Users size={16} />
          </motion.button>
        </div>
      </div>

      {/* Chime Visualization */}
      <div className="mb-4">
        <div className="flex items-center justify-center mb-3">
          <motion.div
            animate={{
              scale: isPlaying ? [1, 1.2, 1] : 1,
              rotate: isPlaying ? [0, 5, -5, 0] : 0
            }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut",
              repeat: isPlaying ? Infinity : 0
            }}
            className={`w-16 h-16 bg-gradient-to-r ${getChimeColor(currentChime)} rounded-full flex items-center justify-center shadow-lg`}
          >
            <Bell size={24} className="text-white" />
          </motion.div>
        </div>
        <div className="text-center">
          <span className="text-sm font-medium text-indigo-600 capitalize">
            {currentChime} Chime
          </span>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Heart size={14} className="text-red-500" />
            <span className="text-xs font-medium text-gray-600">Heart Rate</span>
          </div>
          <span className="text-sm font-bold text-red-600">72 bpm</span>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Music size={14} className="text-purple-500" />
            <span className="text-xs font-medium text-gray-600">Frequency</span>
          </div>
          <span className="text-sm font-bold text-purple-600">440 Hz</span>
        </div>
      </div>

      {/* Audio Level Indicator */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Audio Level</span>
          <span>{isMuted ? '0%' : '75%'}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${
              isMuted ? 'bg-gray-400' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: isMuted ? '0%' : '75%' }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Edge Device Status */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <span>Edge Devices</span>
          <span className="text-green-600 font-medium">3 Connected</span>
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3].map((device) => (
            <motion.div
              key={device}
              animate={{
                opacity: isPlaying ? [0.5, 1, 0.5] : 0.5
              }}
              transition={{ 
                duration: 2, 
                repeat: isPlaying ? Infinity : 0,
                delay: device * 0.2
              }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/harmony-pulse-chime')}
          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
        >
          Open Full View
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HarmonyPulseChimeWidget; 