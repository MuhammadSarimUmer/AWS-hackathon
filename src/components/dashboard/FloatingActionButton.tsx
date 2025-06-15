import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FloatingActionButtonProps {
  className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/wellness-oracle');
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-500 to-accent-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: [
          "0 10px 30px rgba(139, 92, 246, 0.3)",
          "0 15px 40px rgba(139, 92, 246, 0.5)",
          "0 10px 30px rgba(139, 92, 246, 0.3)"
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      title="Ask Wellness Oracle"
    >
      <MessageCircle size={24} />
    </motion.button>
  );
};

export default FloatingActionButton; 