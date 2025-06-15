import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Share2, TrendingUp, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const HealingEmberWidget: React.FC = () => {
  const navigate = useNavigate();
  const { patientData, environmentalData, communityData } = useData();
  
  const patient = patientData[0];
  const env = environmentalData[0];

  const handleClick = () => {
    navigate('/global-healing-ember');
  };

  const getEmberIntensity = () => {
    if (!patient) return 0;
    return Math.round(patient.recoveryMetrics.recoveryProgress * 0.8 + patient.recoveryMetrics.energyLevel * 0.2);
  };

  const getViralScore = () => {
    // Simulate viral score based on community activity and recovery progress
    const baseScore = 75;
    const communityBonus = (communityData[0]?.activityMetrics.dailyActiveMembers || 0) / 10;
    const recoveryBonus = patient?.recoveryMetrics.recoveryProgress || 0;
    return Math.min(100, Math.round(baseScore + communityBonus + recoveryBonus / 10));
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-neumorph-sm p-5 border border-orange-200 cursor-pointer"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Flame className="text-orange-500" size={20} />
          <h3 className="font-medium text-orange-700">Global Healing Ember</h3>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-2 w-2 bg-orange-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-orange-600">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Ember Intensity</span>
          <span className="text-lg font-bold text-orange-600">{getEmberIntensity()}%</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <Flame className="mx-auto text-orange-500 mb-1" size={16} />
            <div className="text-gray-600">Recovery</div>
            <div className="font-medium text-orange-600">{patient?.recoveryMetrics.recoveryProgress}%</div>
          </div>
          <div className="text-center">
            <Share2 className="mx-auto text-red-500 mb-1" size={16} />
            <div className="text-gray-600">Shares</div>
            <div className="font-medium text-red-600">1.2K</div>
          </div>
          <div className="text-center">
            <TrendingUp className="mx-auto text-purple-500 mb-1" size={16} />
            <div className="text-gray-600">Viral</div>
            <div className="font-medium text-purple-600">{getViralScore()}%</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Current Status</div>
          <div className="text-sm font-medium text-orange-700">
            {patient?.recoveryMetrics.recoveryProgress > 70 ? 'Burning Bright' : 
             patient?.recoveryMetrics.recoveryProgress > 40 ? 'Steady Flame' : 
             'Gentle Glow'}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-orange-200">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Pulsating ember with viral sharing impact
          </div>
          <Globe className="text-orange-400" size={16} />
        </div>
      </div>
    </motion.div>
  );
};

export default HealingEmberWidget; 