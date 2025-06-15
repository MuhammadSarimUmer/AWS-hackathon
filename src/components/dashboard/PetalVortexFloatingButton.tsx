import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PetalVortexFloatingButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      navigate('/resilience-petal-vortex');
    }
  };

  return (
    <div className="fixed bottom-48 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 w-48"
          >
            <div className="text-sm text-gray-600 mb-2">Resilience Petal Vortex</div>
            <div className="text-xs text-gray-500">
              Swirling AR petal storm with community action patterns
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <Flower size={24} />
      </motion.button>
    </div>
  );
};

export default PetalVortexFloatingButton; 