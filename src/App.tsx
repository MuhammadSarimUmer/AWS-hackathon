import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import BioEcoSyncPulse from './pages/BioEcoSyncPulse';
import HealingWave from './pages/HealingWave';
import GlobalHealingRituals from './pages/GlobalHealingRituals';
import RecoveryResonanceMap from './pages/RecoveryResonanceMap';
import GlobalWellnessOracle from './pages/GlobalWellnessOracle';
import NotFound from './pages/NotFound';

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;