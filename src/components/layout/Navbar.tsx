// components/layout/Navbar.tsx
"use client";

import React from "react";
import {
  Menu,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  toggleSidebar: () => void;
  isMobile: boolean;
  isVisible?: boolean;
  sidebarOpen?: boolean;
  currentPage?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  isMobile,
  isVisible = true,
  sidebarOpen = true,
  currentPage = "Dashboard",
}) => {
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);

  return (
    <motion.nav
      initial={false}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 flex items-center justify-between z-40 transition-all duration-300 ${
        !isMobile ? (sidebarOpen ? "left-64" : "left-20") : "left-0"
      }`}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Desktop burger */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
        )}

        {/* Desktop title */}
        {!isMobile && (
          <h1 className="text-xl font-bold text-gray-900">{currentPage}</h1>
        )}

        {/* Mobile burger + logo */}
        {isMobile && (
          <>
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cosmic
              </h1>
            </div>
          </>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <ChevronDown size={16} className="text-gray-600" />
          </button>

          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl overflow-hidden shadow-xl z-50"
              >
                <div className="p-4 border-b border-gray-100/50">
                  <p className="font-medium text-gray-900">John Admin</p>
                  <p className="text-sm text-gray-500">john@cosmic.com</p>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <User size={16} />
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings size={16} />
                    Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </motion.nav>
  );
};

export default Navbar;
