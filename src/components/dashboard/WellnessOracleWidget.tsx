import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Zap, Brain, Leaf, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const WellnessOracleWidget: React.FC = () => {
  const navigate = useNavigate();
  const { patientData, environmentalData, communityData } = useData();
  const [isHovered, setIsHovered] = useState(false);

  const patient = patientData[0];
  const env = environmentalData[0];

  const handleOracleClick = () => {
    navigate('/wellness-oracle');
  };

  const getHealthStatus = () => {
    if (!patient) return { status: 'Loading...', color: 'text-gray-500' };
    
    const progress = patient.recoveryMetrics.recoveryProgress;
    if (progress >= 80) return { status: 'Excellent', color: 'text-green-600' };
    if (progress >= 60) return { status: 'Good', color: 'text-blue-600' };
    if (progress >= 40) return { status: 'Fair', color: 'text-yellow-600' };
    return { status: 'Needs Attention', color: 'text-red-600' };
  };

  const healthStatus = getHealthStatus();

  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-neumorph-sm p-6 border border-indigo-100 cursor-pointer"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleOracleClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white">
            <MessageCircle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Wellness Oracle</h3>
            <p className="text-sm text-gray-600">AI Health Advisor</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Zap size={20} className="text-indigo-500" />
        </motion.div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Health Status</span>
          <span className={`text-sm font-medium ${healthStatus.color}`}>
            {healthStatus.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Recovery Progress</span>
          <span className="text-sm font-medium text-indigo-600">
            {patient?.recoveryMetrics.recoveryProgress}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Air Quality</span>
          <span className="text-sm font-medium text-green-600">
            {env?.measurements[0].airQuality.aqi} AQI
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Community Support</span>
          <span className="text-sm font-medium text-blue-600">
            {communityData[0]?.activityMetrics.dailyActiveMembers} active
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-indigo-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Brain size={12} />
            <span>AI Insights</span>
          </div>
          <div className="flex items-center space-x-1">
            <Leaf size={12} />
            <span>Environmental</span>
          </div>
          <div className="flex items-center space-x-1">
            <Activity size={12} />
            <span>Health Data</span>
          </div>
        </div>
      </div>

      <motion.div
        className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-2 rounded-lg font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Ask Oracle
      </motion.div>
    </motion.div>
  );
};

export default WellnessOracleWidget; 