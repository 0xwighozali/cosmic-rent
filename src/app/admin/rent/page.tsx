"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RentalsStats from "@/components/admin/rent/RentalsStats";
import RentalsFilters from "@/components/admin/rent/RentalsFilters";
import RentalsGrid from "@/components/admin/rent/RentalsGrid";
import EmptyState from "@/components/ui/EmptyState";

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
      <RentalsStats
        ps4Available={ps4Available}
        ps5Available={ps5Available}
        vipAvailable={vipAvailable}
        bookingsToday={bookingsToday}
      />

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

        {/* Filters */}
        <RentalsFilters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isMobile={isMobile}
        />

        {/* Cards Grid */}
        <RentalsGrid units={filteredUnits} />

        {/* Empty State */}
        {filteredUnits.length === 0 && <EmptyState />}
      </motion.div>
    </div>
  );
};

export default Rents;
