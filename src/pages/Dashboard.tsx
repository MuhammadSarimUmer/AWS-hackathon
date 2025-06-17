import React, { useEffect } from 'react';
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

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } }
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
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div
        variants={fadeUp}
        className="flex justify-between items-center"
      >
        <div>
          <motion.h1
            className="text-2xl font-bold text-gray-900"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            SoulSync Dashboard
          </motion.h1>
          <motion.p
            className="text-sm text-gray-500"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            Syncing health with environment and community
          </motion.p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={stagger}
      >
        <motion.div variants={fadeUp}><StatCard 
          title="Recovery Progress" 
          value={`${patient?.recoveryMetrics.recoveryProgress}%`}
          icon={<Activity size={24} />}
          trend={{ value: 5, isPositive: true }}
        /></motion.div>
        <motion.div variants={fadeUp}><StatCard 
          title="Heart Rate Variability" 
          value={patient?.vitals[0].hrvScore}
          icon={<Heart size={24} />}
          trend={{ value: 3, isPositive: true }}
        /></motion.div>
        <motion.div variants={fadeUp}><StatCard 
          title="Community Support" 
          value={communityData[0]?.activityMetrics.dailyActiveMembers} 
          icon={<Users size={24} />}
          description="Active community members today"
        /></motion.div>
        <motion.div variants={fadeUp}><StatCard 
          title="Environmental Quality" 
          value={environmentalData[0]?.measurements[0].airQuality.aqi} 
          icon={<Leaf size={24} />}
          description="Current Air Quality Index"
        /></motion.div>
      </motion.div>

      {/* Progress Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={stagger}
      >
        <motion.div variants={fadeUp}><ProgressCard 
          title="Physical Recovery" 
          value={patient?.recoveryMetrics.mobilityScore} 
          color="primary"
          icon={<Activity size={20} />}
          description="Mobility and function restoration"
        /></motion.div>
        <motion.div variants={fadeUp}><ProgressCard 
          title="Environmental Harmony" 
          value={environmentalData[0]?.biophilicElements.naturalMaterialsPercentage} 
          color="secondary"
          icon={<Leaf size={20} />}
          description="Natural elements integration"
        /></motion.div>
        <motion.div variants={fadeUp}><ProgressCard 
          title="Mental Wellness" 
          value={patient?.recoveryMetrics.mentalWellnessScore} 
          color="accent"
          icon={<Brain size={20} />}
          description="Emotional and cognitive resilience"
        /></motion.div>
      </motion.div>

      {/* Charts Row */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
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
        </motion.div>
        <motion.div variants={fadeUp}>
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
        </motion.div>
      </motion.div>

      {/* Radar Chart for Recovery Metrics */}
      <motion.div className="mt-6" variants={fadeUp}>
        <RadarChart 
          title="Recovery Profile"
          data={recoveryRadarData}
          nameKey="metric"
          dataKeys={[
            { key: 'value', color: '#2A6592', name: 'Current Status' }
          ]}
          height={350}
        />
      </motion.div>

      {/* Interactive Widgets */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8" variants={stagger}>
        <motion.div whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(16, 185, 129, 0.15)' }} variants={fadeUp}><WindSculptureWidget /></motion.div>
        <motion.div whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(251, 146, 60, 0.15)' }} variants={fadeUp}><HealingEmberWidget /></motion.div>
        <motion.div whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(236, 72, 153, 0.15)' }} variants={fadeUp}><PetalVortexWidget /></motion.div>
      </motion.div>

      {/* Feature Highlights */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8" variants={stagger}>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(59, 130, 246, 0.12)' }}>
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Activity className="mr-2 text-primary-500" size={20} />
            Bio-Eco Sync Pulse
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Synchronizes your biometrics with environmental conditions for optimal healing.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(16, 185, 129, 0.12)' }}>
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Wind className="mr-2 text-secondary-500" size={20} />
            Healing Wave Visualizer
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Visualizes your recovery journey with 3D healing waves showing progress and impact.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(236, 72, 153, 0.12)' }}>
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Users className="mr-2 text-accent-500" size={20} />
            Global Healing Rituals
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Connect with global community through AI-designed, culturally-tailored healing practices.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(99, 102, 241, 0.12)' }} onClick={handleWellnessOracleClick} className="cursor-pointer">
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <MessageCircle className="mr-2 text-indigo-500" size={20} />
            Wellness Oracle
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Get personalized AI-powered insights about your health, environment, and community.
          </p>
        </motion.div>
      </motion.div>

      {/* Additional Feature Highlights */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4" variants={stagger}>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(147, 51, 234, 0.12)' }} onClick={handleVitalityAuroraClick} className="cursor-pointer">
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Sparkles className="mr-2 text-purple-500" size={20} />
            Vitality Aurora Veil
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Dynamic AR aurora projecting your recovery journey with community and environmental harmony.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(34, 197, 94, 0.12)' }} onClick={handleEcoSyncWindClick} className="cursor-pointer">
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Wind className="mr-2 text-green-500" size={20} />
            Eco-Sync Wind Sculpture
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Kinetic wind-driven elements synchronized with vitals and eco-conditions in public spaces.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(239, 68, 68, 0.12)' }} onClick={handleGlobalHealingEmberClick} className="cursor-pointer">
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Flame className="mr-2 text-orange-500" size={20} />
            Global Healing Ember
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Pulsating virtual ember visualizing recovery and eco-data with viral sharing impact.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(244, 114, 182, 0.12)' }} onClick={handleResiliencePetalVortexClick} className="cursor-pointer">
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Flower className="mr-2 text-pink-500" size={20} />
            Resilience Petal Vortex
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Swirling AR petal storm rendering recovery with community action patterns and dynamic beauty.
          </p>
        </motion.div>
      </motion.div>

      {/* Third Row Feature Highlights */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4" variants={stagger}>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(20, 184, 166, 0.12)' }} onClick={handleEcoRhythmCascadeClick} className="cursor-pointer">
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Droplets className="mr-2 text-cyan-500" size={20} />
            Eco-Rhythm Cascade
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            AR waterfalls syncing patient breathing with environmental rhythms for calming, shareable experiences.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(165, 243, 252, 0.12)' }} onClick={handleHarmonyPulseChimeClick} className="cursor-pointer">
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Bell className="mr-2 text-indigo-500" size={20} />
            Harmony Pulse Chime
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Therapeutic bell sounds tied to vitals and eco-data, creating serene spaces via edge devices.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(255, 215, 251, 0.12)' }} onClick={handleCommunityGlowSphereClick} className="cursor-pointer">
          <h3 className="flex items-center text-lg font-medium text-gray-800">
            <Globe className="mr-2 text-yellow-500" size={20} />
            Community Glow Sphere
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Radiant AR sphere pulsing with eco-milestones, fostering connection and community support.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;