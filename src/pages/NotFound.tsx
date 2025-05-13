import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        <AlertCircle size={48} />
      </motion.div>
      
      <motion.h1 
        className="text-4xl font-bold text-gray-800 mb-2"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        404
      </motion.h1>
      
      <motion.p 
        className="text-xl text-gray-600 mb-8"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4 }}
      >
        This healing path doesn't exist
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link 
          to="/" 
          className="px-6 py-3 bg-primary-500 text-white rounded-lg flex items-center hover:bg-primary-600 transition-colors"
        >
          <Home size={18} className="mr-2" />
          Return to Dashboard
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;