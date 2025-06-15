import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Camera, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EcoRhythmCascadeFloatingButton: React.FC = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleMainClick = () => {
    navigate('/eco-rhythm-cascade');
  };

  const handleARClick = () => {
    navigate('/eco-rhythm-cascade?mode=ar');
  };

  const handleShareClick = () => {
    // In real implementation, this would share the experience
    console.log('Sharing Eco-Rhythm Cascade experience...');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Secondary buttons */}
      {isExpanded && (
        <>
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.1 }}
            onClick={handleARClick}
            className="absolute bottom-16 right-0 bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors mb-2"
            title="AR Mode"
          >
            <Camera size={20} />
          </motion.button>
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleShareClick}
            className="absolute bottom-28 right-0 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors mb-2"
            title="Share Experience"
          >
            <Share2 size={20} />
          </motion.button>
        </>
      )}

      {/* Main button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Eco-Rhythm Cascade"
      >
        <Droplets size={24} />
      </motion.button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : 20 }}
        className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
      >
        <div className="text-sm text-gray-600 mb-2">Eco-Rhythm Cascade</div>
        <div className="text-xs text-gray-400">AR waterfalls syncing breath with environment</div>
      </motion.div>
    </div>
  );
};

export default EcoRhythmCascadeFloatingButton; 