import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Volume2, VolumeX, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HarmonyPulseChimeFloatingButton: React.FC = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  const handleMainClick = () => {
    navigate('/harmony-pulse-chime');
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // In real implementation, this would toggle audio
    console.log('Audio muted:', !isMuted);
  };

  const handleCommunityClick = () => {
    navigate('/harmony-pulse-chime?mode=community');
  };

  return (
    <div className="fixed bottom-6 right-24 z-50">
      {/* Secondary buttons */}
      {isExpanded && (
        <>
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.1 }}
            onClick={handleToggleMute}
            className={`absolute bottom-16 right-0 p-3 rounded-full shadow-lg transition-colors mb-2 ${
              isMuted 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleCommunityClick}
            className="absolute bottom-28 right-0 bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors mb-2"
            title="Community Sharing"
          >
            <Users size={20} />
          </motion.button>
        </>
      )}

      {/* Main button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Harmony Pulse Chime"
      >
        <Bell size={24} />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : 20 }}
        className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
      >
        <div className="text-sm text-gray-600 mb-2">Harmony Pulse Chime</div>
        <div className="text-xs text-gray-400">Therapeutic sounds synced with vitals</div>
      </motion.div>
    </div>
  );
};

export default HarmonyPulseChimeFloatingButton; 