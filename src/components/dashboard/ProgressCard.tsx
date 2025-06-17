import React from 'react';
import { motion } from 'framer-motion';

interface ProgressCardProps {
  title: string;
  value: number;
  target?: number;
  color?: string;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ 
  title, 
  value, 
  target = 100, 
  color = 'primary', 
  icon,
  description,
  className = '' 
}) => {
  const percentage = Math.min(Math.max(Math.round((value / target) * 100), 0), 100);
  
  // Dynamic color classes based on the color prop
  const colorClasses = {
    primary: {
      text: 'text-primary-500',
      ring: 'ring-primary-200',
      bg: 'bg-primary-500'
    },
    secondary: {
      text: 'text-secondary-500',
      ring: 'ring-secondary-200',
      bg: 'bg-secondary-500'
    },
    accent: {
      text: 'text-accent-500',
      ring: 'ring-accent-200',
      bg: 'bg-accent-500'
    },
    success: {
      text: 'text-success-500',
      ring: 'ring-success-200',
      bg: 'bg-success-500'
    },
    warning: {
      text: 'text-warning-500',
      ring: 'ring-warning-200',
      bg: 'bg-warning-500'
    },
    error: {
      text: 'text-error-500',
      ring: 'ring-error-200',
      bg: 'bg-error-500'
    }
  };
  
  const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.primary;

  return (
    <motion.div 
      className={`bg-white border rounded-xl shadow-lg p-5 transition-colors duration-300 ${className}`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {icon && (
          <div className={`p-2 rounded-full ${selectedColor.text} bg-opacity-10`}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-center">
        <div className="relative w-full mr-4">
          <div className={`h-2 rounded-full ${selectedColor.ring} transition-colors duration-300`}>
            <motion.div 
              className={`h-2 rounded-full ${selectedColor.bg}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        <span className={`text-lg font-semibold ${selectedColor.text}`}>{percentage}%</span>
      </div>
      
      {description && (
        <p className="mt-3 text-sm text-gray-500">{description}</p>
      )}
    </motion.div>
  );
};

export default ProgressCard;