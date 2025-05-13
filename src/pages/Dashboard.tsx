import React from 'react';
import { Activity, Heart, Users, Leaf, Wind, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import StatCard from '../components/dashboard/StatCard';
import ProgressCard from '../components/dashboard/ProgressCard';
import AreaChart from '../components/visualizations/AreaChart';
import LineChart from '../components/visualizations/LineChart';
import RadarChart from '../components/visualizations/RadarChart';

const Dashboard: React.FC = () => {
  const { patientData, environmentalData, communityData, isLoading } = useData();

  // Extract the first patient for demo
  const patient = patientData[0];
  
  // Prepare vital signs data for the chart
  const vitalSignsData = patient?.vitals.map(v => ({
    time: new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    heartRate: v.heartRate,
    hrvScore: v.hrvScore,
    oxygenSaturation: v.oxygenSaturation
  })) || [];

  // Environment data for the first location
  const environmentMetrics = environmentalData[0]?.measurements.map(m => ({
    time: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    airQuality: m.airQuality.aqi,
    temperature: m.temperature,
    humidity: m.humidity
  })) || [];

  // Recovery metrics for the radar chart
  const recoveryRadarData = patient ? [
    { metric: 'Energy', value: patient.recoveryMetrics.energyLevel },
    { metric: 'Mobility', value: patient.recoveryMetrics.mobilityScore },
    { metric: 'Mental', value: patient.recoveryMetrics.mentalWellnessScore },
    { metric: 'Pain', value: 100 - patient.recoveryMetrics.painLevel * 10 }, // Inverse scale
    { metric: 'Inflammation', value: 100 - patient.recoveryMetrics.inflammationMarkers }, // Inverse scale
  ] : [];

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">SoulSync Dashboard</h1>
        <p className="text-sm text-gray-500">Syncing health with environment and community</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Recovery Progress" 
          value={`${patient?.recoveryMetrics.recoveryProgress}%`}
          icon={<Activity size={24} />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Heart Rate Variability" 
          value={patient?.vitals[0].hrvScore}
          icon={<Heart size={24} />}
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard 
          title="Community Support" 
          value={communityData[0]?.activityMetrics.dailyActiveMembers} 
          icon={<Users size={24} />}
          description="Active community members today"
        />
        <StatCard 
          title="Environmental Quality" 
          value={environmentalData[0]?.measurements[0].airQuality.aqi} 
          icon={<Leaf size={24} />}
          description="Current Air Quality Index"
        />
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressCard 
          title="Physical Recovery" 
          value={patient?.recoveryMetrics.mobilityScore} 
          color="primary"
          icon={<Activity size={20} />}
          description="Mobility and function restoration"
        />
        <ProgressCard 
          title="Environmental Harmony" 
          value={environmentalData[0]?.biophilicElements.naturalMaterialsPercentage} 
          color="secondary"
          icon={<Leaf size={20} />}
          description="Natural elements integration"
        />
        <ProgressCard 
          title="Mental Wellness" 
          value={patient?.recoveryMetrics.mentalWellnessScore} 
          color="accent"
          icon={<Brain size={20} />}
          description="Emotional and cognitive resilience"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart 
          title="Vital Signs Monitoring"
          data={vitalSignsData}
          xAxisKey="time"
          lines={[
            { key: 'heartRate', color: '#EF4444', name: 'Heart Rate' },
            { key: 'hrvScore', color: '#8A6BC1', name: 'HRV Score' },
            { key: 'oxygenSaturation', color: '#3A9678', name: 'Oxygen Saturation' }
          ]}
        />
        <AreaChart 
          title="Environmental Conditions"
          data={environmentMetrics}
          xAxisKey="time"
          areas={[
            { key: 'airQuality', color: '#3A9678', name: 'Air Quality Index' },
            { key: 'temperature', color: '#F59E0B', name: 'Temperature' },
            { key: 'humidity', color: '#2A6592', name: 'Humidity' }
          ]}
        />
      </div>

      {/* Radar Chart for Recovery Metrics */}
      <div className="mt-6">
        <RadarChart 
          title="Recovery Profile"
          data={recoveryRadarData}
          nameKey="metric"
          dataKeys={[
            { key: 'value', color: '#2A6592', name: 'Current Status' }
          ]}
          height={350}
        />
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <motion.div 
          className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-primary-500"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Activity className="mr-2 text-primary-500" size={20} />
            Bio-Eco Sync Pulse
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Synchronizes your biometrics with environmental conditions for optimal healing.
          </p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-secondary-500"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Wind className="mr-2 text-secondary-500" size={20} />
            Healing Wave Visualizer
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Visualizes your recovery journey with 3D healing waves showing progress and impact.
          </p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-accent-500"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Users className="mr-2 text-accent-500" size={20} />
            Global Healing Rituals
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Connect with global community through AI-designed, culturally-tailored healing practices.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;