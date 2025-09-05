"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Clock,
  User,
  Coffee,
  Eye,
  Printer,
  Play,
  Pause,
  Plus,
  Gamepad2,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";

interface PlayStationUnit {
  id: string;
  number: string;
  type: "PS4" | "PS5" | "VIP";
  status: "Available" | "In Use" | "Offline";
  user?: string;
  startTime?: string;
  endTime?: string;
  timeLeft?: string;
}

const unitsData: PlayStationUnit[] = [
  {
    id: "1",
    number: "PS4-001",
    type: "PS4",
    status: "In Use",
    user: "John Smith",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    timeLeft: "1h 23m",
  },
  { id: "2", number: "PS4-002", type: "PS4", status: "Available" },
  { id: "3", number: "PS4-003", type: "PS4", status: "Offline" },
  {
    id: "4",
    number: "PS4-004",
    type: "PS4",
    status: "In Use",
    user: "Emma Davis",
    startTime: "1:30 PM",
    endTime: "3:30 PM",
    timeLeft: "45m",
  },
  { id: "5", number: "PS4-005", type: "PS4", status: "Available" },
  {
    id: "6",
    number: "PS5-001",
    type: "PS5",
    status: "In Use",
    user: "Mike Johnson",
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    timeLeft: "2h 15m",
  },
  { id: "7", number: "PS5-002", type: "PS5", status: "Available" },
  {
    id: "8",
    number: "PS5-003",
    type: "PS5",
    status: "In Use",
    user: "Lisa Wang",
    startTime: "4:00 PM",
    endTime: "6:00 PM",
    timeLeft: "3h 8m",
  },
  { id: "9", number: "PS5-004", type: "PS5", status: "Offline" },
  {
    id: "10",
    number: "VIP-001",
    type: "VIP",
    status: "In Use",
    user: "Alex Chen",
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    timeLeft: "4h 32m",
  },
  { id: "11", number: "VIP-002", type: "VIP", status: "Available" },
  { id: "12", number: "VIP-003", type: "VIP", status: "Available" },
  {
    id: "13",
    number: "PS4-006",
    type: "PS4",
    status: "In Use",
    user: "Sarah Kim",
    startTime: "5:00 PM",
    endTime: "7:00 PM",
    timeLeft: "5h 12m",
  },
  { id: "14", number: "PS5-005", type: "PS5", status: "Available" },
  { id: "15", number: "VIP-004", type: "VIP", status: "Offline" },
];

const Rents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"All" | "PS4" | "PS5" | "VIP">(
    "All"
  );
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "In Use":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Offline":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCardGradient = (type: string) => {
    switch (type) {
      case "PS4":
        return "from-blue-500 to-indigo-600";
      case "PS5":
        return "from-purple-500 to-pink-600";
      case "VIP":
        return "from-orange-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const filteredUnits = unitsData.filter((unit) => {
    const matchesTab = activeTab === "All" || unit.type === activeTab;
    const matchesStatus =
      statusFilter === "All" || unit.status === statusFilter;
    const matchesSearch =
      unit.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (unit.user && unit.user.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesStatus && matchesSearch;
  });

  // Calculate stats
  const ps4Available = unitsData.filter(
    (unit) => unit.type === "PS4" && unit.status === "Available"
  ).length;
  const ps5Available = unitsData.filter(
    (unit) => unit.type === "PS5" && unit.status === "Available"
  ).length;
  const vipAvailable = unitsData.filter(
    (unit) => unit.type === "VIP" && unit.status === "Available"
  ).length;
  const bookingsToday = 23; // This would come from your booking data

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatCard
          title="PS4 Available"
          value={ps4Available.toString()}
          change={`${ps4Available}/5 units`}
          changeType="increase"
          icon={Gamepad2}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard
          title="PS5 Available"
          value={ps5Available.toString()}
          change={`${ps5Available}/5 units`}
          changeType="increase"
          icon={Gamepad2}
          gradient="from-purple-500 to-pink-600"
        />
        <StatCard
          title="VIP Available"
          value={vipAvailable.toString()}
          change={`${vipAvailable}/4 units`}
          changeType="increase"
          icon={Gamepad2}
          gradient="from-orange-500 to-red-600"
        />
        <StatCard
          title="Bookings Today"
          value={bookingsToday.toString()}
          change="+8.2%"
          changeType="increase"
          icon={Calendar}
          gradient="from-emerald-500 to-teal-600"
        />
      </motion.div>

      {/* Wrapper Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            PlayStation Rentals
          </h1>
          <p className="text-gray-600">
            Manage and monitor all PlayStation rental units
          </p>
        </div>

        {/* Start New Rent Button - Mobile (above tabs) */}
        {isMobile && (
          <div className="mb-6">
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Start New Rent
            </button>
          </div>
        )}

        {/* Tabs and Start New Rent Button - Desktop */}
        <div className="flex items-center justify-between mb-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100/50 rounded-2xl p-1 w-fit">
            {(["All", "PS4", "PS5", "VIP"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-6 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab === "All" ? "All" : `${tab}`}
              </button>
            ))}
          </div>

          {/* Start New Rent Button - Desktop */}
          {!isMobile && (
            <button className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Start New Rent
            </button>
          )}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by unit number or user name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm min-w-[140px]"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUnits.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/30 transition-all duration-300 flex flex-col"
            >
              {/* Unit Header */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${getCardGradient(
                    unit.type
                  )} rounded-2xl flex items-center justify-center shadow-sm`}
                >
                  <span className="text-white font-bold text-sm">
                    {unit.type}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    unit.status
                  )}`}
                >
                  {unit.status}
                </span>
              </div>

              {/* Unit Number */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {unit.number}
              </h3>

              {/* User Info - Flexible content area */}
              <div className="flex-1">
                {unit.status === "In Use" && unit.user ? (
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {unit.user}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {unit.startTime} → {unit.endTime}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600">
                          Time Left
                        </span>
                        <span className="text-sm font-bold text-blue-700">
                          {unit.timeLeft}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 py-8 flex items-center justify-center">
                    <span className="text-sm text-gray-500">
                      {unit.status === "Available"
                        ? "Ready for rental"
                        : "Unit offline"}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons - Always at bottom */}
              <div className="mt-auto">
                {unit.status === "In Use" ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button className="flex items-center justify-center gap-1 py-2 px-3 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl transition-colors text-xs font-medium">
                        <Coffee size={12} />
                        <span className="hidden sm:inline">Add Food</span>
                        <span className="sm:hidden">Food</span>
                      </button>
                      <button className="flex items-center justify-center gap-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-xs font-medium">
                        <Eye size={12} />
                        Show
                      </button>
                    </div>
                    <button className="w-full flex items-center justify-center gap-1 py-2 px-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-colors text-xs font-medium">
                      <Printer size={12} />
                      <span className="hidden sm:inline">Print Receipt</span>
                      <span className="sm:hidden">Print</span>
                    </button>
                  </div>
                ) : unit.status === "Available" ? (
                  <button className="w-full flex items-center justify-center gap-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 text-sm font-medium shadow-sm">
                    <Play size={14} />
                    <span className="hidden sm:inline">Start Rental</span>
                    <span className="sm:hidden">Start</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-1 py-3 px-4 bg-gray-100 text-gray-400 rounded-xl text-sm font-medium cursor-not-allowed"
                  >
                    <Pause size={14} />
                    <span className="hidden sm:inline">Unit Offline</span>
                    <span className="sm:hidden">Offline</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUnits.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No units found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Rents;
