import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import { Globe, Users, Clock, Calendar, ArrowRight, Check, X } from 'lucide-react';

const GlobalHealingRituals: React.FC = () => {
  const { patientData, communityData, isLoading } = useData();
  const [selectedCommIndex, setSelectedCommIndex] = useState(0);
  const [selectedRitualIndex, setSelectedRitualIndex] = useState(0);
  const [joinedRituals, setJoinedRituals] = useState<string[]>([]);
  
  const selectedComm = communityData[selectedCommIndex];
  const selectedRitual = selectedComm?.groupRituals[selectedRitualIndex];
  
  const toggleJoinRitual = (ritualName: string) => {
    if (joinedRituals.includes(ritualName)) {
      setJoinedRituals(joinedRituals.filter(r => r !== ritualName));
    } else {
      setJoinedRituals([...joinedRituals, ritualName]);
    }
  };
  
  // Generate ritual recommendations based on patient data
  const generateRecommendations = () => {
    if (!patientData.length) return [];
    
    const patient = patientData[0]; // Use first patient for demo
    const recommendations = [];
    
    // Base recommendations on patient condition
    if (patient.condition.includes('Surgery')) {
      recommendations.push({
        name: 'Gentle Movement Meditation',
        focus: 'Physical Recovery',
        duration: 15,
        participants: 42,
        culturalOrigin: 'Contemporary',
        benefitScore: 85
      });
    }
    
    if (patient.recoveryMetrics.painLevel > 3) {
      recommendations.push({
        name: 'Sound Bath Healing',
        focus: 'Pain Reduction',
        duration: 25,
        participants: 68,
        culturalOrigin: 'Tibetan',
        benefitScore: 78
      });
    }
    
    if (patient.recoveryMetrics.mentalWellnessScore < 75) {
      recommendations.push({
        name: 'Gratitude Circle',
        focus: 'Emotional Well-being',
        duration: 20,
        participants: 95,
        culturalOrigin: 'Global',
        benefitScore: 92
      });
    }
    
    // Add general recommendations
    recommendations.push({
      name: 'Earth Connection Ritual',
      focus: 'Grounding & Stability',
      duration: 30,
      participants: 124,
      culturalOrigin: 'Indigenous',
      benefitScore: 88
    });
    
    recommendations.push({
      name: 'Breath Synchronization',
      focus: 'Stress Reduction',
      duration: 10,
      participants: 215,
      culturalOrigin: 'Pranayama',
      benefitScore: 90
    });
    
    return recommendations;
  };
  
  const recommendedRituals = generateRecommendations();
  
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
          <h1 className="text-2xl font-bold text-gray-900">Global Healing Rituals</h1>
          <p className="text-gray-600">AI-designed, culturally tailored rituals synchronized globally</p>
        </div>
        
        <select 
          className="mt-4 md:mt-0 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={selectedCommIndex}
          onChange={(e) => setSelectedCommIndex(Number(e.target.value))}
        >
          {communityData.map((comm, index) => (
            <option key={comm.communityId} value={index}>
              {comm.name}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Community Info */}
      <motion.div 
        className="bg-white rounded-xl shadow-neumorph p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center mr-4">
              <Globe className="text-accent-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{selectedComm.name}</h2>
              <p className="text-gray-600">{selectedComm.location}</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center bg-accent-50 px-4 py-2 rounded-lg">
            <Users className="text-accent-500 mr-2" size={18} />
            <span className="font-medium text-accent-700">{selectedComm.members} Members</span>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-2">
          {selectedComm.focusAreas.map((area, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-accent-50 text-accent-600 rounded-full text-sm font-medium"
            >
              {area}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Active Rituals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Community Rituals</h2>
        
        <div className="bg-white rounded-xl shadow-neumorph-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {selectedComm.groupRituals.map((ritual, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRitualIndex(index)}
                  className={`py-4 px-6 text-center text-sm font-medium ${
                    selectedRitualIndex === index
                      ? 'border-b-2 border-accent-500 text-accent-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {ritual.name}
                </button>
              ))}
            </nav>
          </div>
          
          {selectedRitual && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{selectedRitual.name}</h3>
                  <p className="text-gray-600 mt-1">Focus: {selectedRitual.focusElement}</p>
                  
                  <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center">
                      <Clock className="text-gray-400 mr-2" size={18} />
                      <span>{selectedRitual.duration} minutes</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="text-gray-400 mr-2" size={18} />
                      <span>{selectedRitual.schedule}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="text-gray-400 mr-2" size={18} />
                      <span>{selectedRitual.participants} participants</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <button 
                    className={`px-4 py-2 rounded-lg font-medium ${
                      joinedRituals.includes(selectedRitual.name)
                        ? 'bg-success-100 text-success-700 flex items-center'
                        : 'bg-accent-500 text-white hover:bg-accent-600'
                    }`}
                    onClick={() => toggleJoinRitual(selectedRitual.name)}
                  >
                    {joinedRituals.includes(selectedRitual.name) ? (
                      <>
                        <Check size={18} className="mr-2" />
                        Joined
                      </>
                    ) : 'Join Ritual'}
                  </button>
                  
                  {joinedRituals.includes(selectedRitual.name) && (
                    <p className="mt-2 text-sm text-gray-600">
                      Next session: Today at {selectedRitual.schedule.split(' at ')[1]}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700">Ritual Impact</h4>
                <p className="mt-1 text-gray-600">
                  This ritual has facilitated {selectedRitual.cumulativeHealingScore} healing 
                  experiences across the community, with participants reporting improved 
                  {selectedRitual.focusElement.toLowerCase().includes('mental') ? ' mental clarity' : 
                    selectedRitual.focusElement.toLowerCase().includes('heart') ? ' cardiovascular function' : 
                    ' overall wellbeing'}.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Personalized Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personalized Ritual Recommendations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedRituals.map((ritual, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-primary-500"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">{ritual.name}</h3>
                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                  {ritual.benefitScore}% Match
                </span>
              </div>
              
              <div className="mt-3 text-sm text-gray-600">
                <p>Focus: {ritual.focus}</p>
                <p>Duration: {ritual.duration} minutes</p>
                <p>Cultural Origin: {ritual.culturalOrigin}</p>
                <p>Global Participants: {ritual.participants}</p>
              </div>
              
              <button 
                className="mt-4 flex items-center text-primary-600 font-medium text-sm"
                onClick={() => toggleJoinRitual(ritual.name)}
              >
                {joinedRituals.includes(ritual.name) ? (
                  <>
                    <Check size={16} className="mr-1" />
                    Joined
                  </>
                ) : (
                  <>
                    Join Ritual
                    <ArrowRight size={16} className="ml-1" />
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Global Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Global Healing Network</h2>
        
        <div className="bg-white rounded-xl shadow-neumorph p-6 overflow-hidden">
          <div className="relative aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="absolute inset-0">
              {/* This would be a real map in production */}
              <div className="w-full h-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-lg"></div>
              
              {/* Simulated "pulse" points on the map */}
              <div className="absolute h-4 w-4 rounded-full bg-primary-500 animate-pulse-slow" style={{ top: '30%', left: '20%' }}></div>
              <div className="absolute h-4 w-4 rounded-full bg-primary-500 animate-pulse-slow" style={{ top: '45%', left: '40%' }}></div>
              <div className="absolute h-4 w-4 rounded-full bg-primary-500 animate-pulse-slow" style={{ top: '35%', left: '70%' }}></div>
              <div className="absolute h-4 w-4 rounded-full bg-primary-500 animate-pulse-slow" style={{ top: '60%', left: '55%' }}></div>
              <div className="absolute h-4 w-4 rounded-full bg-primary-500 animate-pulse-slow" style={{ top: '50%', left: '85%' }}></div>
              
              {/* Active ritual with larger pulse */}
              <div className="absolute h-6 w-6 rounded-full bg-accent-500 animate-pulse-slow" style={{ top: '65%', left: '30%' }}>
                <span className="absolute top-8 left-0 text-xs font-medium text-accent-700">Active Ritual</span>
              </div>
            </div>
            
            <div className="relative z-10 text-center p-4 bg-white bg-opacity-90 rounded-lg shadow-sm max-w-md">
              <h3 className="font-semibold text-primary-600">Global Healing Network</h3>
              <p className="text-gray-600 mt-1">
                Join 2,847 people in 64 countries currently participating in synchronized healing rituals.
              </p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-gray-500 text-sm">Active Rituals</p>
              <p className="text-2xl font-bold text-primary-600">24</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-gray-500 text-sm">Regions Connected</p>
              <p className="text-2xl font-bold text-primary-600">64</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <p className="text-gray-500 text-sm">Current Participants</p>
              <p className="text-2xl font-bold text-primary-600">2,847</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GlobalHealingRituals;