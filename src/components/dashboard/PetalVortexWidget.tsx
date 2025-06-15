import React from 'react';
import { motion } from 'framer-motion';
import { Flower, Users, Eye, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const PetalVortexWidget: React.FC = () => {
  const navigate = useNavigate();
  const { patientData, communityData } = useData();
  
  const patient = patientData[0];

  const handleClick = () => {
    navigate('/resilience-petal-vortex');
  };

  const getVortexIntensity = () => {
    if (!patient) return 0;
    return Math.round(patient.recoveryMetrics.recoveryProgress * 0.7 + patient.recoveryMetrics.energyLevel * 0.3);
  };

  const getPetalCount = () => {
    if (!patient) return 0;
    const baseCount = 30;
    const recoveryBonus = Math.floor(patient.recoveryMetrics.recoveryProgress / 10);
    const communityBonus = Math.floor((communityData[0]?.activityMetrics.dailyActiveMembers || 0) / 20);
    return baseCount + recoveryBonus + communityBonus;
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-neumorph-sm p-5 border border-pink-200 cursor-pointer"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Flower className="text-pink-500" size={20} />
          <h3 className="font-medium text-pink-700">Resilience Petal Vortex</h3>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-2 w-2 bg-pink-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-pink-600">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Vortex Intensity</span>
          <span className="text-lg font-bold text-pink-600">{getVortexIntensity()}%</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <Flower className="mx-auto text-pink-500 mb-1" size={16} />
            <div className="text-gray-600">Petals</div>
            <div className="font-medium text-pink-600">{getPetalCount()}</div>
          </div>
          <div className="text-center">
            <Users className="mx-auto text-teal-500 mb-1" size={16} />
            <div className="text-gray-600">Community</div>
            <div className="font-medium text-teal-600">{communityData[0]?.activityMetrics.dailyActiveMembers || 0}</div>
          </div>
          <div className="text-center">
            <Eye className="mx-auto text-blue-500 mb-1" size={16} />
            <div className="text-gray-600">AR Ready</div>
            <div className="font-medium text-blue-600">Active</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3">
          <h4 className="font-medium text-gray-800 mb-1">Current Status</h4>
          <p className="text-sm text-gray-600">
            {patient?.recoveryMetrics.recoveryProgress > 70 ? 'Abundant petal flow' : 
             patient?.recoveryMetrics.recoveryProgress > 40 ? 'Steady vortex' : 
             'Gentle petal swirl'}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-pink-200">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Swirling AR petal storm with community patterns
          </div>
          <Zap className="text-pink-400" size={16} />
        </div>
      </div>
    </motion.div>
  );
};

export default PetalVortexWidget; 