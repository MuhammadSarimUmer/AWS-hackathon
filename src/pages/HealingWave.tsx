import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import { Waves, Activity, Zap, Leaf, Users } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';

const HealingWave: React.FC = () => {
  const { patientData, environmentalData, communityData, isLoading } = useData();
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  
  const selectedPatient = patientData[selectedPatientIndex];
  
  // Calculate wave properties based on patient data
  const calculateWaveProperties = () => {
    if (!selectedPatient) return null;
    
    const recovery = selectedPatient.recoveryMetrics.recoveryProgress;
    const mentalWellness = selectedPatient.recoveryMetrics.mentalWellnessScore;
    const mobility = selectedPatient.recoveryMetrics.mobilityScore;
    const communityConnections = selectedPatient.communityConnections * 10; // Scale up for visualization
    
    return {
      amplitude: recovery / 20, // Scale down for visualization
      frequency: mentalWellness / 20,
      speed: mobility / 20,
      density: communityConnections / 15,
      color: `hsl(${recovery * 1.5}, 70%, 50%)`, // Color shifts as recovery progresses
    };
  };
  
  const waveProperties = calculateWaveProperties();
  
  if (isLoading || !waveProperties) {
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

  // Create a canvas-style visualization (simplified version)
  const renderWaves = () => {
    const rows = 20;
    const waveElements = [];
    
    for (let i = 0; i < rows; i++) {
      // Adjust properties for each row to create 3D effect
      const rowAmplitude = waveProperties.amplitude * (1 - i / (rows * 1.5));
      const rowFrequency = waveProperties.frequency * (1 - i / (rows * 2));
      const rowSpeed = waveProperties.speed * (1 - i / (rows * 3));
      const rowOpacity = 1 - (i / rows) * 0.8;
      
      // Create wave animation with dynamic properties
      waveElements.push(
        <motion.div
          key={i}
          className="h-2 mx-auto rounded-full"
          style={{
            background: waveProperties.color,
            opacity: rowOpacity,
            width: `${100 - i * 3}%`,
            marginTop: i === 0 ? 0 : '-5px', // Overlap waves
          }}
          animate={{
            y: [
              -rowAmplitude * Math.sin(0),
              -rowAmplitude * Math.sin(Math.PI / 2),
              -rowAmplitude * Math.sin(Math.PI),
              -rowAmplitude * Math.sin(Math.PI * 3 / 2),
              -rowAmplitude * Math.sin(Math.PI * 2)
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 3 / rowSpeed,
            ease: "easeInOut",
            delay: i * 0.05, // Stagger the waves
          }}
        />
      );
    }
    
    return waveElements;
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Healing Wave Visualizer</h1>
          <p className="text-gray-600">Visualizing your recovery journey as dynamic 3D waves</p>
        </div>
        
        <select 
          className="mt-4 md:mt-0 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={selectedPatientIndex}
          onChange={(e) => setSelectedPatientIndex(Number(e.target.value))}
        >
          {patientData.map((patient, index) => (
            <option key={patient.id} value={index}>
              {patient.name}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Patient Info */}
      <motion.div 
        className="bg-white border rounded-xl shadow-lg p-6 transition-colors duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{selectedPatient.name}</h2>
            <p className="text-gray-600">{selectedPatient.condition}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-sm text-gray-500">Treatment Start Date:</span>
            <p className="font-medium">{new Date(selectedPatient.treatmentStart).toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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
          title="Recovery Progress" 
          value={`${selectedPatient.recoveryMetrics.recoveryProgress}%`}
          icon={<Activity size={24} />}
          description="Overall healing journey"
        />
        <StatCard 
          title="Energy Level" 
          value={selectedPatient.recoveryMetrics.energyLevel}
          icon={<Zap size={24} />}
          description="Current vitality score"
        />
        <StatCard 
          title="Environmental Impact" 
          value={environmentalData[0].ecologicalFootprint.biodiversityIndexLocal}
          icon={<Leaf size={24} />}
          description="Local biodiversity index"
        />
        <StatCard 
          title="Community Connections" 
          value={selectedPatient.communityConnections}
          icon={<Users size={24} />}
          description="Active support relationships"
        />
      </motion.div>

      {/* Wave Visualization */}
      <motion.div 
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-neumorph p-6 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Waves className="mr-2 text-primary-500" size={24} />
          Healing Wave Visualization
        </h2>
        
        <div className="relative h-80 flex items-center justify-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {renderWaves()}
          </div>
          
          <div className="relative z-10 text-center p-4 bg-white bg-opacity-80 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-primary-600">Recovery Intensity</h3>
            <p className="text-3xl font-bold" style={{ color: waveProperties.color }}>
              {selectedPatient.recoveryMetrics.recoveryProgress}%
            </p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border rounded-lg shadow-sm p-3">
            <h4 className="text-sm font-medium text-gray-700">Wave Amplitude</h4>
            <p className="text-lg font-semibold">{waveProperties.amplitude.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Based on recovery progress</p>
          </div>
          
          <div className="bg-white border rounded-lg shadow-sm p-3">
            <h4 className="text-sm font-medium text-gray-700">Wave Frequency</h4>
            <p className="text-lg font-semibold">{waveProperties.frequency.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Based on mental wellness</p>
          </div>
          
          <div className="bg-white border rounded-lg shadow-sm p-3">
            <h4 className="text-sm font-medium text-gray-700">Wave Speed</h4>
            <p className="text-lg font-semibold">{waveProperties.speed.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Based on mobility score</p>
          </div>
          
          <div className="bg-white border rounded-lg shadow-sm p-3">
            <h4 className="text-sm font-medium text-gray-700">Wave Density</h4>
            <p className="text-lg font-semibold">{waveProperties.density.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Based on community connections</p>
          </div>
        </div>
      </motion.div>

      {/* Impact Section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="bg-white border rounded-xl shadow-lg p-5">
          <h3 className="flex items-center text-lg font-medium text-gray-800 mb-4">
            <Users className="mr-2 text-accent-500" size={20} />
            Community Impact
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Support Network Growth</span>
              <span className="font-medium text-accent-500">+{selectedPatient.communityConnections * 3}%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Knowledge Sharing</span>
              <span className="font-medium text-accent-500">+{selectedPatient.healingRituals.length * 8}%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Collective Resilience</span>
              <span className="font-medium text-accent-500">+{Math.round(selectedPatient.recoveryMetrics.mentalWellnessScore / 2)}%</span>
            </div>
            
            <div className="mt-4 p-3 bg-accent-50 rounded-lg border border-accent-100">
              <p className="text-sm text-accent-700">
                Your recovery journey has inspired 7 other community members in similar situations.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-xl shadow-lg p-5">
          <h3 className="flex items-center text-lg font-medium text-gray-800 mb-4">
            <Leaf className="mr-2 text-secondary-500" size={20} />
            Environmental Impact
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Carbon Reduction</span>
              <span className="font-medium text-secondary-500">{environmentalData[0].energyBalance.carbonOffset} tons</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Biodiversity Support</span>
              <span className="font-medium text-secondary-500">+{environmentalData[0].ecologicalFootprint.biodiversityIndexLocal / 2}%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Water Conservation</span>
              <span className="font-medium text-secondary-500">{(1000 - environmentalData[0].ecologicalFootprint.waterUsage).toFixed(0)} gal</span>
            </div>
            
            <div className="mt-4 p-3 bg-secondary-50 rounded-lg border border-secondary-100">
              <p className="text-sm text-secondary-700">
                Your healing journey has contributed to sustainability initiatives in your local ecosystem.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.08, boxShadow: '0 0 0 8px #bae6fd44' }}
        whileTap={{ scale: 0.95 }}
        className="..."
      >
        {/* Button content */}
      </motion.button>
    </div>
  );
};

export default HealingWave;