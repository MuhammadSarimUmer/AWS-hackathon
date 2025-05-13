import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Activity, Waves, Globe, MapPin, MessageCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Bio-Eco Sync Pulse', path: '/bio-eco-sync', icon: <Activity size={20} /> },
    { name: 'Healing Wave', path: '/healing-wave', icon: <Waves size={20} /> },
    { name: 'Global Healing Rituals', path: '/global-rituals', icon: <Globe size={20} /> },
    { name: 'Recovery Resonance Map', path: '/resonance-map', icon: <MapPin size={20} /> },
    { name: 'Wellness Oracle', path: '/wellness-oracle', icon: <MessageCircle size={20} /> },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <motion.div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:hidden`}
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

      {/* Desktop Sidebar */}
      <motion.div 
        className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white overflow-y-auto"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center h-16 border-b">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
              <Waves size={18} />
            </div>
            <span className="text-xl font-semibold text-primary-500">SoulSync</span>
          </div>
        </div>
        
        <nav className="mt-8">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="px-4 py-2">
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600 font-medium' 
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
    </>
  );
};

export default Sidebar;