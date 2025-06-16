import React from 'react';
import { Activity, Heart, Users, Leaf, Wind, Brain, MessageCircle, Sparkles, Flame, MapPin, Flower, Droplets, Bell, Globe, Grid, Share2, Waves, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import ProgressCard from '../components/dashboard/ProgressCard';
import AreaChart from '../components/visualizations/AreaChart';
import LineChart from '../components/visualizations/LineChart';
import RadarChart from '../components/visualizations/RadarChart';
import WindSculptureWidget from '../components/dashboard/WindSculptureWidget';
import HealingEmberWidget from '../components/dashboard/HealingEmberWidget';
import PetalVortexWidget from '../components/dashboard/PetalVortexWidget';
import EcoRhythmCascadeWidget from '../components/dashboard/EcoRhythmCascadeWidget';
import HarmonyPulseChimeWidget from '../components/dashboard/HarmonyPulseChimeWidget';

const Dashboard: React.FC = () => {
  const { patientData, environmentalData, communityData, isLoading } = useData();
  const navigate = useNavigate();

  // Extract the first patient for demo
  const patient = patientData[0];
  
  // Prepare vital signs data for the chart
  const vitalSignsData = patient?.vitals.map((v: any) => ({
    time: new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    heartRate: v.heartRate,
    hrvScore: v.hrvScore,
    oxygenSaturation: v.oxygenSaturation
  })) || [];

  // Environment data for the first location
  const environmentMetrics = environmentalData[0]?.measurements.map((m: any) => ({
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

  const handleWellnessOracleClick = () => {
    navigate('/wellness-oracle');
  };

  const handleVitalityAuroraClick = () => {
    navigate('/vitality-aurora');
  };

  const handleEcoSyncWindClick = () => {
    navigate('/eco-sync-wind');
  };

  const handleGlobalHealingEmberClick = () => {
    navigate('/global-healing-ember');
  };

  const handleResiliencePetalVortexClick = () => {
    navigate('/resilience-petal-vortex');
  };

  const handleEcoRhythmCascadeClick = () => {
    navigate('/eco-rhythm-cascade');
  };

  const handleHarmonyPulseChimeClick = () => {
    navigate('/harmony-pulse-chime');
  };

  const handleCommunityGlowSphereClick = () => {
    navigate('/community-glow-sphere');
  };

  const handleVitalitySkyMosaicClick = () => {
    navigate('/vitality-sky-mosaic');
  };

  const handleGlobalWellnessWeaveClick = () => {
    navigate('/global-wellness-weave');
  };

  const handleResilienceRippleJetClick = () => {
    navigate('/resilience-ripple-jet');
  };

  const handleEcoVitalityPrismClick = () => {
    navigate('/eco-vitality-prism');
  };

  const handleHealingDanceSphereClick = () => {
    navigate('/healing-dance-sphere');
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SoulSync Dashboard</h1>
          <p className="text-sm text-gray-500">Syncing health with environment and community</p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            onClick={handleWellnessOracleClick}
            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} />
            <span>Ask Oracle</span>
          </motion.button>
          <motion.button
            onClick={handleVitalityAuroraClick}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={20} />
            <span>View Aurora</span>
          </motion.button>
          <motion.button
            onClick={handleEcoSyncWindClick}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Wind size={20} />
            <span>Wind Sculpture</span>
          </motion.button>
          <motion.button
            onClick={handleGlobalHealingEmberClick}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flame size={20} />
            <span>Healing Ember</span>
          </motion.button>
          <motion.button
            onClick={handleResiliencePetalVortexClick}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flower size={20} />
            <span>Petal Vortex</span>
          </motion.button>
          <motion.button
            onClick={handleEcoRhythmCascadeClick}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Droplets size={20} />
            <span>Eco Cascade</span>
          </motion.button>
          <motion.button
            onClick={handleHarmonyPulseChimeClick}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
            <span>Pulse Chime</span>
          </motion.button>
          <motion.button
            onClick={handleCommunityGlowSphereClick}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe size={20} />
            <span>Glow Sphere</span>
          </motion.button>
          <motion.button
            onClick={handleVitalitySkyMosaicClick}
            className="bg-gradient-to-r from-sky-400 to-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Grid size={20} />
            <span>Sky Mosaic</span>
          </motion.button>
          <motion.button
            onClick={handleGlobalWellnessWeaveClick}
            className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={20} />
            <span>Wellness Weave</span>
          </motion.button>
          <motion.button
            onClick={handleResilienceRippleJetClick}
            className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Waves size={20} />
            <span>Ripple Jet</span>
          </motion.button>
          <motion.button
            onClick={handleEcoVitalityPrismClick}
            className="bg-gradient-to-r from-purple-500 to-green-400 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Layers size={20} />
            <span>Vitality Prism</span>
          </motion.button>
          <motion.button
            onClick={handleHealingDanceSphereClick}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe size={20} />
            <span>Dance Sphere</span>
          </motion.button>
        </div>
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

      {/* Interactive Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <WindSculptureWidget />
        <HealingEmberWidget />
        <PetalVortexWidget />
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
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
        <motion.div 
          className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-indigo-500 cursor-pointer"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          onClick={handleWellnessOracleClick}
        >
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <MessageCircle className="mr-2 text-indigo-500" size={20} />
            Wellness Oracle
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Get personalized AI-powered insights about your health, environment, and community.
          </p>
        </motion.div>
      </div>

      {/* Additional Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <motion.div 
          className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-purple-500 cursor-pointer"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          onClick={handleVitalityAuroraClick}
        >
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Sparkles className="mr-2 text-purple-500" size={20} />
            Vitality Aurora Veil
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Dynamic AR aurora projecting your recovery journey with community and environmental harmony.
          </p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-green-500 cursor-pointer"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          onClick={handleEcoSyncWindClick}
        >
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Wind className="mr-2 text-green-500" size={20} />
            Eco-Sync Wind Sculpture
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Kinetic wind-driven elements synchronized with vitals and eco-conditions in public spaces.
          </p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-orange-500 cursor-pointer"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          onClick={handleGlobalHealingEmberClick}
        >
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Flame className="mr-2 text-orange-500" size={20} />
            Global Healing Ember
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Pulsating virtual ember visualizing recovery and eco-data with viral sharing impact.
          </p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-pink-500 cursor-pointer"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          onClick={handleResiliencePetalVortexClick}
        >
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Flower className="mr-2 text-pink-500" size={20} />
            Resilience Petal Vortex
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Swirling AR petal storm rendering recovery with community action patterns and dynamic beauty.
          </p>
        </motion.div>
      </div>

      {/* Third Row Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <motion.div 
          className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-cyan-500 cursor-pointer"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          onClick={handleEcoRhythmCascadeClick}
        >
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Droplets className="mr-2 text-cyan-500" size={20} />
            Eco-Rhythm Cascade
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            AR waterfalls syncing patient breathing with environmental rhythms for calming, shareable experiences.
          </p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-indigo-500 cursor-pointer"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          onClick={handleHarmonyPulseChimeClick}
        >
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Bell className="mr-2 text-indigo-500" size={20} />
            Harmony Pulse Chime
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Therapeutic bell sounds tied to vitals and eco-data, creating serene spaces via edge devices.
          </p>
        </motion.div>
        <motion.div 
          className="bg-white rounded-xl shadow-neumorph-sm p-5 border-l-4 border-yellow-500 cursor-pointer"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          onClick={handleCommunityGlowSphereClick}
        >
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Globe className="mr-2 text-yellow-500" size={20} />
            Community Glow Sphere
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Radiant AR sphere pulsing with eco-milestones, fostering connection and community support.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;