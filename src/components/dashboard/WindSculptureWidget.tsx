import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Activity, Leaf, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const WindSculptureWidget: React.FC = () => {
  const navigate = useNavigate();
  const { patientData, environmentalData, communityData } = useData();
  
  const patient = patientData[0];
  const env = environmentalData[0];

  const handleClick = () => {
    navigate('/eco-sync-wind');
  };

  const getWindIntensity = () => {
    if (!patient || !env) return 0;
    const vitalIntensity = patient.recoveryMetrics.recoveryProgress / 100;
    const ecoIntensity = (100 - env.measurements[0].airQuality.aqi) / 100;
    const communityIntensity = (communityData[0]?.activityMetrics.dailyActiveMembers || 0) / 200;
    
    return Math.round((vitalIntensity + ecoIntensity + communityIntensity) / 3 * 100);
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-neumorph-sm p-5 border border-green-200 cursor-pointer"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wind className="text-green-500" size={20} />
          <h3 className="font-medium text-green-700">Eco-Sync Wind Sculpture</h3>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Wind Intensity</span>
          <span className="text-lg font-bold text-green-600">{getWindIntensity()}%</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <Activity className="mx-auto text-green-500 mb-1" size={16} />
            <div className="text-gray-600">Vitals</div>
            <div className="font-medium text-green-600">{patient?.recoveryMetrics.recoveryProgress}%</div>
          </div>
          <div className="text-center">
            <Leaf className="mx-auto text-teal-500 mb-1" size={16} />
            <div className="text-gray-600">Eco</div>
            <div className="font-medium text-teal-600">{env?.measurements[0].airQuality.aqi} AQI</div>
          </div>
          <div className="text-center">
            <Cpu className="mx-auto text-blue-500 mb-1" size={16} />
            <div className="text-gray-600">Arduino</div>
            <div className="font-medium text-blue-600">Connected</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Current Mode</div>
          <div className="text-sm font-medium text-green-700">Vital Winds Active</div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-green-200">
        <div className="text-xs text-gray-500">
          Kinetic wind elements synchronized with your health and environment
        </div>
      </div>
    </motion.div>
  );
};

export default WindSculptureWidget; 