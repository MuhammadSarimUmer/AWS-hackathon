import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WindSculptureFloatingButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      navigate('/eco-sync-wind');
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 w-48"
          >
            <div className="text-sm text-gray-600 mb-2">Eco-Sync Wind Sculpture</div>
            <div className="text-xs text-gray-500">
              Kinetic wind-driven elements synchronized with vitals and eco-conditions
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <Wind size={24} />
      </motion.button>
    </div>
  );
};

export default WindSculptureFloatingButton; 