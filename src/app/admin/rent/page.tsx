"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import StatsOverview from "@/components/admin/rent/StatsOverview";
import Tabs from "@/components/ui/Tabs";
import SearchInput from "@/components/ui/SearchInput";
import SelectFilter from "@/components/ui/SelectFilter";
import RentCard from "@/components/admin/rent/RentCards";
import EmptyState from "@/components/ui/EmptyState";

export interface PlayStationUnit {
  id: string;
  type: "PS4" | "PS5" | "VIP";
  number: string;
  status: "Available" | "In Use" | "Offline";
  user?: string;
  startTime?: string;
  endTime?: string;
  timeLeft?: string;
}

const unitsData: PlayStationUnit[] = [
  {
    id: "1",
    type: "PS5",
    number: "PS5-001",
    status: "In Use",
    user: "John Smith",
    startTime: "14:00",
    endTime: "16:00",
    timeLeft: "45m",
  },
  {
    id: "2",
    type: "PS5",
    number: "PS5-002",
    status: "Available",
  },
  {
    id: "3",
    type: "PS4",
    number: "PS4-001",
    status: "In Use",
    user: "Emma Davis",
    startTime: "13:30",
    endTime: "15:30",
    timeLeft: "30m",
  },
  {
    id: "4",
    type: "PS4",
    number: "PS4-002",
    status: "Available",
  },
  {
    id: "5",
    type: "VIP",
    number: "VIP-001",
    status: "Offline",
  },
  {
    id: "6",
    type: "VIP",
    number: "VIP-002",
    status: "Available",
  },
];

const Rents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"All" | "PS4" | "PS5" | "VIP">(
    "All"
  );
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredUnits = unitsData.filter((unit) => {
    const matchesTab = activeTab === "All" || unit.type === activeTab;
    const matchesStatus =
      statusFilter === "All" || unit.status === statusFilter;
    const matchesSearch =
      unit.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (unit.user && unit.user.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Stats Cards */}
      <StatsOverview units={unitsData} bookingsToday={23} />

      {/* Wrapper Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 
          hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
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

        {/* Start New Rent Button - Mobile */}
        {isMobile && (
          <div className="mb-6">
            <button
              className="w-full flex items-center justify-center gap-2 py-3 px-4 
              bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
              text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm"
            >
              <Plus size={16} />
              Start New Rent
            </button>
          </div>
        )}

        {/* Tabs + Start Button */}
        <div className="flex items-center justify-between mb-6">
          <Tabs
            options={["All", "PS4", "PS5", "VIP"]}
            active={activeTab}
            onChange={setActiveTab}
          />
          {!isMobile && (
            <button
              className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 
              hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 
              text-sm font-medium shadow-sm"
            >
              <Plus size={16} />
              Start New Rent
            </button>
          )}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by unit number or user name..."
          />
          <SelectFilter
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: "All Status", value: "All" },
              { label: "Available", value: "Available" },
              { label: "In Use", value: "In Use" },
              { label: "Offline", value: "Offline" },
            ]}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUnits.map((unit, idx) => (
            <RentCard key={unit.id} unit={unit} index={idx} />
          ))}
        </div>

        {/* Empty State */}
        {filteredUnits.length === 0 && <EmptyState />}
      </motion.div>
    </div>
  );
};

export default Rents;
