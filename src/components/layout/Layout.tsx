import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import FloatingActionButton from '../dashboard/FloatingActionButton';
import WindSculptureFloatingButton from '../dashboard/WindSculptureFloatingButton';
import HealingEmberFloatingButton from '../dashboard/HealingEmberFloatingButton';
import PetalVortexFloatingButton from '../dashboard/PetalVortexFloatingButton';
import CommunityGlowSphereFloatingButton from '../../pages/CommunityGlowSphereFloatingButton';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 transition-colors duration-300">
      {/* Sidebar - hidden on mobile, visible on desktop */}
      <div className={`fixed inset-0 z-20 transition-opacity ${sidebarOpen ? 'block' : 'hidden'} lg:hidden`}>
        <div 
          className="absolute inset-0 bg-gray-600 opacity-75"
          onClick={toggleSidebar}
        ></div>
      </div>

      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} className="bg-white border-r border-gray-200 transition-colors duration-300" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />

        <motion.main 
          className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6 transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.main>
      </div>

      {/* Floating Action Buttons */}
      <FloatingActionButton />
      <WindSculptureFloatingButton />
      <HealingEmberFloatingButton />
      <PetalVortexFloatingButton />
      <CommunityGlowSphereFloatingButton />
    </div>
  );
};

export default Layout;