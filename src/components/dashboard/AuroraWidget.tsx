import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Users, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const AuroraWidget: React.FC = () => {
  const navigate = useNavigate();
  const { patientData, environmentalData, communityData } = useData();
  const [isHovered, setIsHovered] = useState(false);

  const patient = patientData[0];
  const env = environmentalData[0];

  const handleAuroraClick = () => {
    navigate('/vitality-aurora');
  };

  const getAuroraIntensity = () => {
    if (!patient) return 0;
    
    const recoveryProgress = patient.recoveryMetrics.recoveryProgress;
    const communitySupport = communityData[0]?.activityMetrics.dailyActiveMembers || 0;
    const environmentalQuality = 100 - (env?.measurements[0].airQuality.aqi || 0);
    
    return Math.round((recoveryProgress + communitySupport * 0.1 + environmentalQuality * 0.2) / 3);
  };

  const auroraIntensity = getAuroraIntensity();

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-neumorph-sm p-6 border border-purple-100 cursor-pointer"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleAuroraClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full flex items-center justify-center text-white">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Vitality Aurora</h3>
            <p className="text-sm text-gray-600">AR Recovery Visualization</p>
          </div>
        </div>
        <motion.div
          animate={{ 
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles size={20} className="text-purple-500" />
        </motion.div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Aurora Intensity</span>
          <span className="text-sm font-medium text-purple-600">
            {auroraIntensity}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Recovery Waves</span>
          <span className="text-sm font-medium text-green-600">
            {patient?.recoveryMetrics.recoveryProgress}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Community Resonance</span>
          <span className="text-sm font-medium text-blue-600">
            {communityData[0]?.activityMetrics.dailyActiveMembers} active
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Environmental Harmony</span>
          <span className="text-sm font-medium text-teal-600">
            {Math.round((100 - env?.measurements[0].airQuality.aqi) * 0.8)}%
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-purple-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Heart size={12} />
            <span>Recovery</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={12} />
            <span>Community</span>
          </div>
          <div className="flex items-center space-x-1">
            <Leaf size={12} />
            <span>Environment</span>
          </div>
        </div>
      </div>

      <motion.div
        className="mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white text-center py-2 rounded-lg font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Aurora
      </motion.div>
    </motion.div>
  );
};

export default AuroraWidget; 