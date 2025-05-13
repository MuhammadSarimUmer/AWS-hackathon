import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend,
  className = ''
}) => {
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-neumorph-sm p-5 ${className}`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-primary-50 text-primary-500">
          {icon}
        </div>
      </div>
      
      {(description || trend) && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          {trend && (
            <div className={`flex items-center text-sm ${trend.isPositive ? 'text-success-500' : 'text-error-500'}`}>
              <span className="font-medium">
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="ml-2 text-gray-500">from last period</span>
            </div>
          )}
          
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;