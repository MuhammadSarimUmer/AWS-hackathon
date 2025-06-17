import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Activity, Waves, Globe, MapPin, MessageCircle, X, Sparkles, Wind, Flame, Flower, Droplets, Bell, ChevronLeft, ChevronRight, Grid, Share2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, className = '' }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Bio-Eco Sync Pulse', path: '/bio-eco-sync', icon: <Activity size={20} /> },
    { name: 'Healing Wave', path: '/healing-wave', icon: <Waves size={20} /> },
    { name: 'Global Healing Rituals', path: '/global-rituals', icon: <Globe size={20} /> },
    { name: 'Recovery Resonance Map', path: '/resonance-map', icon: <MapPin size={20} /> },
    { name: 'Wellness Oracle', path: '/wellness-oracle', icon: <MessageCircle size={20} /> },
    { name: 'Vitality Aurora Veil', path: '/vitality-aurora', icon: <Sparkles size={20} /> },
    { name: 'Eco-Sync Wind Sculpture', path: '/eco-sync-wind', icon: <Wind size={20} /> },
    { name: 'Global Healing Ember', path: '/global-healing-ember', icon: <Flame size={20} /> },
    { name: 'Resilience Petal Vortex', path: '/resilience-petal-vortex', icon: <Flower size={20} /> },
    { name: 'Eco-Rhythm Cascade', path: '/eco-rhythm-cascade', icon: <Droplets size={20} /> },
    { name: 'Harmony Pulse Chime', path: '/harmony-pulse-chime', icon: <Bell size={20} /> },
    { name: 'Community Glow Sphere', path: '/community-glow-sphere', icon: <Globe size={20} className="text-yellow-500" /> },
    { name: 'Vitality Sky Mosaic', path: '/vitality-sky-mosaic', icon: <Grid size={20} className="text-sky-500" /> },
    { name: 'Global Wellness Weave', path: '/global-wellness-weave', icon: <Share2 size={20} className="text-teal-500" /> },
    { name: 'Resilience Ripple Jet', path: '/resilience-ripple-jet', icon: <Waves size={20} className="text-blue-500" /> },
    { name: 'Eco-Vitality Prism', path: '/eco-vitality-prism', icon: <Layers size={20} className="text-purple-500" /> },
    { name: 'Healing Dance Sphere', path: '/healing-dance-sphere', icon: <Globe size={20} className="text-pink-500" /> },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <motion.div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:hidden border-r border-gray-200 transition-colors duration-300 ${className}`}
        initial={false}
        animate={isOpen ? { x: 0 } : { x: '-100%' }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
              <Waves size={18} />
            </div>
            <span className="text-xl font-semibold text-primary-500">SoulSync</span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="px-4 py-2">
                <NavLink 
                  to={item.path}
                  onClick={toggleSidebar}
                  className={({ isActive }) => 
                    `flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Desktop Sidebar - Collapsible */}
      <motion.div 
        className={`hidden lg:flex flex-col h-screen border-r border-gray-200 bg-white overflow-y-auto transition-all duration-300 transition-colors ${collapsed ? 'w-20' : 'w-64'} ${className}`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`flex items-center justify-between h-16 border-b px-4 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
              <Waves size={18} />
            </div>
            {!collapsed && <span className="text-xl font-semibold text-primary-500">SoulSync</span>}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-primary-500 focus:outline-none"
          >
            {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>
        
        <nav className="mt-8">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="px-4 py-2">
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    } ${collapsed ? 'justify-center' : 'space-x-2'}`
                  }
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;