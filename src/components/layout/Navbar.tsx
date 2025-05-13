import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <motion.nav 
      className="bg-white shadow-sm px-4 py-3"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="relative mx-4 lg:mx-0 hidden md:block">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search size={18} className="text-gray-400" />
            </span>
            <input
              className="w-32 sm:w-64 rounded-md bg-gray-100 border border-transparent focus:outline-none focus:border-primary-300 focus:bg-white pl-10 pr-4 py-2 text-sm"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center text-gray-600 focus:outline-none">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="border-l border-gray-200 h-6 mx-2"></div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 hidden md:inline-block">Dr. Jane Smith</span>
            <div className="h-8 w-8 bg-accent-500 rounded-full flex items-center justify-center text-white">
              <User size={16} />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;