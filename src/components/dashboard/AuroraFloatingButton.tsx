import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuroraFloatingButtonProps {
  className?: string;
}

const AuroraFloatingButton: React.FC<AuroraFloatingButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate('/vitality-aurora');
  };

  return (
    <motion.button
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`fixed bottom-6 left-6 z-50 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: [
          "0 10px 30px rgba(147, 51, 234, 0.3)",
          "0 15px 40px rgba(147, 51, 234, 0.5)",
          "0 10px 30px rgba(147, 51, 234, 0.3)"
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      title="View Vitality Aurora Veil"
    >
      <motion.div
        animate={{ 
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles size={24} />
      </motion.div>
    </motion.button>
  );
};

export default AuroraFloatingButton; 