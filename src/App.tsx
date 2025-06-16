import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import BioEcoSyncPulse from './pages/BioEcoSyncPulse';
import HealingWave from './pages/HealingWave';
import GlobalHealingRituals from './pages/GlobalHealingRituals';
import RecoveryResonanceMap from './pages/RecoveryResonanceMap';
import GlobalWellnessOracle from './pages/GlobalWellnessOracle';
import VitalityAuroraVeil from './pages/VitalityAuroraVeil';
import EcoSyncWindSculpture from './pages/EcoSyncWindSculpture';
import GlobalHealingEmber from './pages/GlobalHealingEmber';
import ResiliencePetalVortex from './pages/ResiliencePetalVortex';
import EcoRhythmCascade from './pages/EcoRhythmCascade';
import HarmonyPulseChime from './pages/HarmonyPulseChime';
import CommunityGlowSphere from './pages/CommunityGlowSphere';
import NotFound from './pages/NotFound';
import VitalitySkyMosaic from './pages/VitalitySkyMosaic';
import GlobalWellnessWeave from './pages/GlobalWellnessWeave';
import ResilienceRippleJet from './pages/ResilienceRippleJet';
import EcoVitalityPrism from './pages/EcoVitalityPrism';
import HealingDanceSphere from './pages/HealingDanceSphere';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/bio-eco-sync" element={<BioEcoSyncPulse />} />
        <Route path="/healing-wave" element={<HealingWave />} />
        <Route path="/global-rituals" element={<GlobalHealingRituals />} />
        <Route path="/resonance-map" element={<RecoveryResonanceMap />} />
        <Route path="/wellness-oracle" element={<GlobalWellnessOracle />} />
        <Route path="/vitality-aurora" element={<VitalityAuroraVeil />} />
        <Route path="/eco-sync-wind" element={<EcoSyncWindSculpture />} />
        <Route path="/global-healing-ember" element={<GlobalHealingEmber />} />
        <Route path="/resilience-petal-vortex" element={<ResiliencePetalVortex />} />
        <Route path="/eco-rhythm-cascade" element={<EcoRhythmCascade />} />
        <Route path="/harmony-pulse-chime" element={<HarmonyPulseChime />} />
        <Route path="/community-glow-sphere" element={<CommunityGlowSphere />} />
        <Route path="/vitality-sky-mosaic" element={<VitalitySkyMosaic />} />
        <Route path="/global-wellness-weave" element={<GlobalWellnessWeave />} />
        <Route path="/resilience-ripple-jet" element={<ResilienceRippleJet />} />
        <Route path="/eco-vitality-prism" element={<EcoVitalityPrism />} />
        <Route path="/healing-dance-sphere" element={<HealingDanceSphere />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;