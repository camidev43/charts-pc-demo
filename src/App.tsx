import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingCard from './components/LandingCard';
import Dashboard from './components/Dashboard';

export default function App() {
  const [view, setView] = useState<'card' | 'dashboard'>('card');

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#080410' }}>
      <AnimatePresence mode="wait">
        {view === 'card' ? (
          <LandingCard key="card" onExplore={() => setView('dashboard')} />
        ) : (
          <Dashboard key="dashboard" onBack={() => setView('card')} />
        )}
      </AnimatePresence>
    </div>
  );
}
