import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Users, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommunityGlowSphereFloatingButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      navigate('/community-glow-sphere');
    }
  };

  const handleARClick = () => {
    navigate('/community-glow-sphere?mode=ar');
  };

  const handleCommunityClick = () => {
    navigate('/community-glow-sphere?mode=community');
  };

  return (
    <div className="fixed bottom-60 right-6 z-50">
      <AnimatePresence>
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
              <Globe size={20} />
            </motion.button>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleCommunityClick}
              className="absolute bottom-28 right-0 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors mb-2"
              title="Community Support"
            >
              <Users size={20} />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        animate={{
          boxShadow: [
            "0 10px 30px rgba(251, 191, 36, 0.3)",
            "0 15px 40px rgba(251, 191, 36, 0.5)",
            "0 10px 30px rgba(251, 191, 36, 0.3)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Globe size={24} />
      </motion.button>
    </div>
  );
};

export default CommunityGlowSphereFloatingButton; 