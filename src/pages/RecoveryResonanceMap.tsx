import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import { MapPin, BarChart2, Users, Leaf, ArrowRight, ArrowLeft } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RadarChart from '../components/visualizations/RadarChart';

const RecoveryResonanceMap: React.FC = () => {
  const { patientData, environmentalData, communityData, isLoading } = useData();
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  
  const selectedPatient = patientData[selectedPatientIndex];
  
  // Generate correlation data for visualization
  const generateCorrelationData = () => {
    if (!selectedPatient) return [];
    
    // Normalize values to 0-100 scale for comparison
    const patientData = [
      {
        category: 'Physical',
        dimension: 'Recovery Progress',
        value: selectedPatient.recoveryMetrics.recoveryProgress,
      },
      {
        category: 'Physical',
        dimension: 'Mobility Score',
        value: selectedPatient.recoveryMetrics.mobilityScore,
      },
      {
        category: 'Physical',
        dimension: 'Energy Level',
        value: selectedPatient.recoveryMetrics.energyLevel,
      },
      {
        category: 'Mental',
        dimension: 'Mental Wellness',
        value: selectedPatient.recoveryMetrics.mentalWellnessScore,
      },
      {
        category: 'Environmental',
        dimension: 'Natural Light Exposure',
        value: selectedPatient.environmentalExposure.naturalLightHours * 10, // Scale up for comparison
      },
      {
        category: 'Environmental',
        dimension: 'Outdoor Time',
        value: selectedPatient.environmentalExposure.outdoorTimeHours * 20, // Scale up for comparison
      },
      {
        category: 'Community',
        dimension: 'Support Connections',
        value: selectedPatient.communityConnections * 10, // Scale up for comparison
      },
      {
        category: 'Community',
        dimension: 'Ritual Engagement',
        value: selectedPatient.healingRituals.reduce((sum, ritual) => sum + ritual.compliance, 0) / selectedPatient.healingRituals.length,
      }
    ];
    
    return patientData;
  };
  
  // Data for radar charts
  const generateRadarData = () => {
    if (!selectedPatient) return [];
    
    return [
      { metric: 'Physical', value: selectedPatient.recoveryMetrics.recoveryProgress },
      { metric: 'Mental', value: selectedPatient.recoveryMetrics.mentalWellnessScore },
      { metric: 'Environmental', value: environmentalData[0].measurements[0].airQuality.aqi },
      { metric: 'Community', value: selectedPatient.communityConnections * 15 },
      { metric: 'Ritual', value: selectedPatient.healingRituals.reduce((sum, ritual) => sum + ritual.effectivenessScore, 0) / selectedPatient.healingRituals.length }
    ];
  };
  
  // Visualize resonance patterns
  const patternData = [
    { day: 'Mon', physical: 65, mental: 70, environmental: 55, community: 60 },
    { day: 'Tue', physical: 68, mental: 72, environmental: 58, community: 62 },
    { day: 'Wed', physical: 72, mental: 75, environmental: 62, community: 68 },
    { day: 'Thu', physical: 75, mental: 73, environmental: 68, community: 70 },
    { day: 'Fri', physical: 78, mental: 76, environmental: 72, community: 75 },
    { day: 'Sat', physical: 82, mental: 80, environmental: 75, community: 78 },
    { day: 'Sun', physical: 80, mental: 82, environmental: 78, community: 76 },
  ];
  
  // Detected correlations
  const correlations = [
    {
      id: 1,
      title: 'Physical-Environmental Link',
      description: 'Strong correlation between outdoor time and mobility improvement',
      strength: 78,
      impact: 'High'
    },
    {
      id: 2,
      title: 'Mental-Community Connection',
      description: 'Mental wellness scores rise with community engagement',
      strength: 82,
      impact: 'High'
    },
    {
      id: 3,
      title: 'Ritual-Recovery Pattern',
      description: 'Healing rituals correlate with faster recovery progress',
      strength: 75,
      impact: 'Medium'
    },
    {
      id: 4,
      title: 'Environmental-Sleep Quality',
      description: 'Better air quality correlates with improved sleep depth',
      strength: 68,
      impact: 'Medium'
    }
  ];
  
  // Insights generation based on correlations
  const insights = [
    'Increasing outdoor time by 30 minutes could improve mobility score by 8-12%',
    'Community connections appear to boost mental wellness metrics more significantly than solo activities',
    'Morning ritual practice shows 15% stronger correlation with recovery than evening practice',
    'Air quality improvements correlate with reduced inflammation markers'
  ];
  
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const nextInsight = () => setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
  const prevInsight = () => setCurrentInsightIndex((prev) => (prev - 1 + insights.length) % insights.length);
  
  const correlationData = generateCorrelationData();
  const radarData = generateRadarData();
  
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
          <h1 className="text-2xl font-bold text-gray-900">Recovery Resonance Map</h1>
          <p className="text-gray-600">Visualizing correlations between patient, community, and environmental metrics</p>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{selectedPatient.name}</h2>
            <p className="text-gray-600">{selectedPatient.condition}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-sm text-gray-500">Resonance Analysis Period:</span>
            <p className="font-medium">Last 7 Days</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Recovery Progress" 
          value={`${selectedPatient.recoveryMetrics.recoveryProgress}%`}
          icon={<BarChart2 size={24} />}
          description="Overall healing journey"
        />
        <StatCard 
          title="Environmental Quality" 
          value={environmentalData[0].measurements[0].airQuality.aqi}
          icon={<Leaf size={24} />}
          description="Current air quality index"
        />
        <StatCard 
          title="Community Support" 
          value={selectedPatient.communityConnections}
          icon={<Users size={24} />}
          description="Active support connections"
        />
        <StatCard 
          title="Resonance Score" 
          value="78%"
          icon={<MapPin size={24} />}
          description="Multi-factor harmony index"
        />
      </div>

      {/* Resonance Visualization */}
      <motion.div 
        className="bg-white border rounded-xl shadow-lg p-6 transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <MapPin className="mr-2 text-primary-500" size={24} />
          Recovery Resonance Patterns
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Dimension Balance</h3>
            <RadarChart 
              data={radarData}
              nameKey="metric"
              dataKeys={[
                { key: 'value', color: '#2A6592', name: 'Current Status' }
              ]}
              height={300}
            />
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Correlation Strength</h3>
            <div className="space-y-4">
              {correlations.map((correlation) => (
                <div key={correlation.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-800">{correlation.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      correlation.impact === 'High' ? 'bg-success-100 text-success-700' :
                      correlation.impact === 'Medium' ? 'bg-warning-100 text-warning-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {correlation.impact}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{correlation.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${correlation.strength}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Weak</span>
                    <span>Strong</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Insights Carousel */}
      <motion.div 
        className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl shadow-neumorph-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">AI-Generated Insights</h2>
        
        <div className="relative">
          <div className="flex items-center">
            <button 
              onClick={prevInsight}
              className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="mx-12 bg-white p-5 rounded-lg shadow-sm min-h-[100px] flex items-center justify-center">
              <p className="text-center text-gray-700 font-medium">
                {insights[currentInsightIndex]}
              </p>
            </div>
            
            <button 
              onClick={nextInsight}
              className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="flex justify-center mt-4">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentInsightIndex(index)}
                className={`h-2 w-2 mx-1 rounded-full ${
                  currentInsightIndex === index ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pattern Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Pattern Analysis</h2>
        
        <div className="bg-white border rounded-xl shadow-lg p-6 transition-colors duration-300">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Physical
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mental
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Environmental
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Community
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resonance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patternData.map((day, index) => {
                  // Calculate simple resonance score based on balance of all factors
                  const resonance = Math.round((day.physical + day.mental + day.environmental + day.community) / 4);
                  const highlightDay = index === patternData.length - 2; // Highlight Saturday as best day
                  
                  return (
                    <tr key={day.day} className={highlightDay ? 'bg-primary-50' : undefined}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {day.day}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full" 
                              style={{ width: `${day.physical}%` }}
                            ></div>
                          </div>
                          <span>{day.physical}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-accent-500 h-2 rounded-full" 
                              style={{ width: `${day.mental}%` }}
                            ></div>
                          </div>
                          <span>{day.mental}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-secondary-500 h-2 rounded-full" 
                              style={{ width: `${day.environmental}%` }}
                            ></div>
                          </div>
                          <span>{day.environmental}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-warning-500 h-2 rounded-full" 
                              style={{ width: `${day.community}%` }}
                            ></div>
                          </div>
                          <span>{day.community}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full ${
                          resonance >= 80 ? 'bg-success-100 text-success-700' :
                          resonance >= 70 ? 'bg-warning-100 text-warning-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {resonance}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-3 bg-primary-50 rounded-lg">
            <h3 className="font-medium text-primary-700">Key Pattern Insight</h3>
            <p className="mt-1 text-sm text-gray-700">
              Saturday shows the highest resonance score (79%), coinciding with peak outdoor activity time (2.3 hours) 
              and community engagement (2 ritual sessions). Consider replicating these conditions on other days for 
              optimal recovery resonance.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RecoveryResonanceMap;