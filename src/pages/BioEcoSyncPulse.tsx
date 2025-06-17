import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Activity, Heart, Zap, Wind, Cloud, Leaf } from 'lucide-react';
import LineChart from '../components/visualizations/LineChart';
import StatCard from '../components/dashboard/StatCard';
import { motion } from 'framer-motion';

const BioEcoSyncPulse: React.FC = () => {
  const { patientData, environmentalData, isLoading } = useData();
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [displayedScore, setDisplayedScore] = useState(0);

  const selectedPatient = patientData[selectedPatientIndex];
  const selectedLocation = environmentalData[selectedLocationIndex];

  const formatVitalData = () => {
    if (!selectedPatient || !selectedLocation) return [];
    
    // Get vital readings and environmental measurements
    const vitals = selectedPatient.vitals;
    const envMeasurements = selectedLocation.measurements;
    
    // Combine them based on timestamps (simplified for demo)
    return vitals.map((vital, index) => {
      const envIndex = Math.min(index, envMeasurements.length - 1);
      const time = new Date(vital.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      return {
        time,
        heartRate: vital.heartRate,
        hrvScore: vital.hrvScore,
        airQuality: envMeasurements[envIndex].airQuality.aqi,
        negativeIons: envMeasurements[envIndex].bioactiveElements.negativeIonDensity / 100, // Scaled for visualization
      };
    });
  };

  const syncPulseData = formatVitalData();

  // Calculate correlation score (simplified)
  const calculateCorrelation = () => {
    if (syncPulseData.length === 0) return 0;
    
    // Simple calculation for demo purposes
    const hrvTrend = syncPulseData[syncPulseData.length - 1].hrvScore - syncPulseData[0].hrvScore;
    const airQualityTrend = syncPulseData[0].airQuality - syncPulseData[syncPulseData.length - 1].airQuality;
    
    // Positive correlation if HRV improves as air quality improves
    const correlation = (hrvTrend > 0 && airQualityTrend > 0) ? 0.7 : 
                        (hrvTrend < 0 && airQualityTrend < 0) ? 0.3 : 0.5;
    
    return Math.round(correlation * 100);
  };

  const syncPulseScore = calculateCorrelation();

  useEffect(() => {
    let start = 0;
    if (syncPulseScore > 0) {
      const step = Math.ceil(syncPulseScore / 30);
      const interval = setInterval(() => {
        start += step;
        if (start >= syncPulseScore) {
          setDisplayedScore(syncPulseScore);
          clearInterval(interval);
        } else {
          setDisplayedScore(start);
        }
      }, 20);
      return () => clearInterval(interval);
    } else {
      setDisplayedScore(0);
    }
  }, [syncPulseScore]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-36 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bio-Eco Sync Pulse</h1>
          <p className="text-gray-600">Synchronizing patient vitals with environmental conditions</p>
        </div>
        
        <div className="flex space-x-4 mt-4 md:mt-0">
          <select 
            className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={selectedPatientIndex}
            onChange={(e) => setSelectedPatientIndex(Number(e.target.value))}
          >
            {patientData.map((patient, index) => (
              <option key={patient.id} value={index}>
                {patient.name}
              </option>
            ))}
          </select>
          
          <select 
            className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={selectedLocationIndex}
            onChange={(e) => setSelectedLocationIndex(Number(e.target.value))}
          >
            {environmentalData.map((location, index) => (
              <option key={location.locationId} value={index}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Sync Pulse Score */}
      <motion.div 
        className="bg-white border rounded-xl shadow-lg p-6 text-center transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex justify-center items-center">
          <Zap className="mr-2 text-accent-500" /> 
          Bio-Eco Sync Pulse Score
        </h2>
        
        <div className="flex justify-center items-center">
          <div className="relative w-40 h-40">
            <motion.svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              animate={{ filter: [
                'drop-shadow(0 0 0px #2563eb)',
                'drop-shadow(0 0 16px #2563eb)',
                'drop-shadow(0 0 0px #2563eb)'
              ] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <circle cx="50" cy="50" r="45" fill="none" stroke="#E2E8F0" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#2A6592"
                strokeWidth="8"
                strokeDasharray={`${syncPulseScore * 2.83} 283`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-out"
              />
            </motion.svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <motion.span
                className="text-4xl font-bold text-primary-500"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {displayedScore}
              </motion.span>
              <span className="text-sm text-gray-500">Sync Score</span>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600">
          This score represents how well your vital metrics are synchronizing with beneficial environmental conditions.
        </p>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1, y: 0,
            transition: { staggerChildren: 0.15 }
          }
        }}
      >
        <StatCard 
          title="Heart Rate" 
          value={`${selectedPatient?.vitals[selectedPatient.vitals.length - 1].heartRate} bpm`}
          icon={<Heart size={24} />}
          description="Current heart rate measurement"
        />
        <StatCard 
          title="HRV Score" 
          value={selectedPatient?.vitals[selectedPatient.vitals.length - 1].hrvScore}
          icon={<Activity size={24} />}
          description="Heart rate variability indicator"
        />
        <StatCard 
          title="Air Quality" 
          value={selectedLocation?.measurements[selectedLocation.measurements.length - 1].airQuality.aqi}
          icon={<Wind size={24} />}
          description="Current Air Quality Index"
        />
        <StatCard 
          title="Bioactive Elements" 
          value={selectedLocation?.measurements[selectedLocation.measurements.length - 1].bioactiveElements.negativeIonDensity}
          icon={<Leaf size={24} />}
          description="Negative ion density (ions/cm³)"
        />
      </motion.div>

      {/* Sync Pulse Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <LineChart 
          title="Bio-Eco Synchronization Pattern"
          data={syncPulseData}
          xAxisKey="time"
          lines={[
            { key: 'heartRate', color: '#EF4444', name: 'Heart Rate' },
            { key: 'hrvScore', color: '#8A6BC1', name: 'HRV Score' },
            { key: 'airQuality', color: '#3A9678', name: 'Air Quality' },
            { key: 'negativeIons', color: '#2A6592', name: 'Negative Ions' }
          ]}
          height={400}
        />
      </motion.div>

      {/* Device Control Panel */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="bg-white border rounded-xl shadow-lg p-5 transition-colors duration-300">
          <h3 className="flex items-center text-lg font-medium text-gray-800 mb-4">
            <Zap className="mr-2 text-yellow-500" size={20} />
            Light Therapy Control
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Light Intensity
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="65"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color Temperature (K)
              </label>
              <select className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="2700">2700K - Warm</option>
                <option value="4000">4000K - Neutral</option>
                <option value="5500" selected>5500K - Daylight</option>
                <option value="6500">6500K - Cool</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Sync with HRV</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-xl shadow-lg p-5 transition-colors duration-300">
          <h3 className="flex items-center text-lg font-medium text-gray-800 mb-4">
            <Wind className="mr-2 text-blue-500" size={20} />
            Air Quality Control
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purifier Intensity
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="80"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mode
              </label>
              <select className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="auto" selected>Auto (Adaptive)</option>
                <option value="sleep">Sleep Mode</option>
                <option value="boost">Boost Mode</option>
                <option value="eco">Eco Mode</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Negative Ion Generator</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-xl shadow-lg p-5 transition-colors duration-300">
          <h3 className="flex items-center text-lg font-medium text-gray-800 mb-4">
            <Cloud className="mr-2 text-indigo-500" size={20} />
            Sound Environment
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Volume Level
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="40"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Soundscape
              </label>
              <select className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="forest" selected>Forest Ambience</option>
                <option value="ocean">Ocean Waves</option>
                <option value="rainfall">Gentle Rainfall</option>
                <option value="resonance">Healing Resonance</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Binaural Beats</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BioEcoSyncPulse;