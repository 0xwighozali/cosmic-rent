// components/layout/Sidebar.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  Home,
  Coffee,
  Gamepad2,
  Gamepad,
  Monitor,
  CreditCard,
  BarChart3,
  Settings,
  X,
  Zap,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isMobile,
  toggleSidebar,
}) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Rent", icon: Calendar, href: "/admin/rent" },
    { name: "Booking", icon: BookOpen, href: "/admin/booking" },
    { name: "Manage", isLabel: true },
    { name: "Users", icon: Users, href: "/admin/users", isSubItem: true },
    { name: "Room", icon: Home, href: "/admin/room", isSubItem: true },
    { name: "Food", icon: Coffee, href: "/admin/food", isSubItem: true },
    { name: "Inventory", isLabel: true },
    {
      name: "Console",
      icon: Gamepad2,
      href: "/admin/console",
      isSubItem: true,
    },
    {
      name: "Controller",
      icon: Gamepad,
      href: "/admin/controller",
      isSubItem: true,
    },
    { name: "TV", icon: Monitor, href: "/admin/tv", isSubItem: true },
    { name: "Transaction", icon: CreditCard, href: "/admin/transaction" },
    {
      name: "Analysis & Report",
      icon: BarChart3,
      href: "/admin/analysis-report",
    },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-xl border-r border-gray-200/50">
      {/* Logo Section - Desktop Only */}
      {!isMobile && (
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Cosmic
                </h1>
                <p className="text-xs text-gray-500">PlayStation Rental</p>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cosmic
            </h2>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
      )}

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-4 pt-6">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            if (item.isLabel) {
              if (!isMobile && !isOpen) return null;
              return (
                <div
                  key={item.name}
                  className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {item.name}
                </div>
              );
            }

            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href || "#"}
                className={`w-full flex items-center ${
                  isOpen || isMobile ? "gap-3" : "justify-center"
                } px-3 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                } ${item.isSubItem && (isOpen || isMobile) ? "ml-4" : ""}`}
                title={!isOpen && !isMobile ? item.name : undefined}
              >
                {Icon && <Icon size={18} />}
                {(isOpen || isMobile) && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );

  // Mobile Sidebar
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={toggleSidebar}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 z-50"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop Sidebar
  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed left-0 top-0 h-full z-30 overflow-hidden"
    >
      {sidebarContent}
    </motion.div>
  );
};

export default Sidebar;
