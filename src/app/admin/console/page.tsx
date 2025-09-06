"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  X,
  Gamepad2,
  Monitor,
  Wrench,
  Plus,
  Power,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "@/components/ui/StatCard";

interface ConsoleData {
  id: string;
  consoleId: string;
  consoleName: string;
  type: "PS4" | "PS5";
  status: "Available" | "In Use" | "Maintenance" | "Offline";
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  roomAssigned?: string;
  purchaseDate: string;
  lastMaintenance?: string;
  hoursUsed: number;
  serialNumber: string;
}

const consolesData: ConsoleData[] = [
  {
    id: "1",
    consoleId: "PS4-CON-001",
    consoleName: "PlayStation 4 Console A",
    type: "PS4",
    status: "In Use",
    condition: "Good",
    roomAssigned: "PS4-001",
    purchaseDate: "2023-01-15",
    lastMaintenance: "2024-01-10",
    hoursUsed: 1250,
    serialNumber: "PS4-ABC123456",
  },
  {
    id: "2",
    consoleId: "PS4-CON-002",
    consoleName: "PlayStation 4 Console B",
    type: "PS4",
    status: "Available",
    condition: "Excellent",
    roomAssigned: "PS4-002",
    purchaseDate: "2023-02-20",
    lastMaintenance: "2024-01-08",
    hoursUsed: 980,
    serialNumber: "PS4-DEF789012",
  },
  {
    id: "3",
    consoleId: "PS4-CON-003",
    consoleName: "PlayStation 4 Console C",
    type: "PS4",
    status: "Maintenance",
    condition: "Fair",
    roomAssigned: "PS4-003",
    purchaseDate: "2022-11-10",
    lastMaintenance: "2024-01-05",
    hoursUsed: 1850,
    serialNumber: "PS4-GHI345678",
  },
  {
    id: "4",
    consoleId: "PS4-CON-004",
    consoleName: "PlayStation 4 Console D",
    type: "PS4",
    status: "Available",
    condition: "Good",
    roomAssigned: "PS4-004",
    purchaseDate: "2023-03-05",
    lastMaintenance: "2024-01-12",
    hoursUsed: 750,
    serialNumber: "PS4-JKL901234",
  },
  {
    id: "5",
    consoleId: "PS4-CON-005",
    consoleName: "PlayStation 4 Console E",
    type: "PS4",
    status: "Offline",
    condition: "Poor",
    roomAssigned: "PS4-005",
    purchaseDate: "2022-08-15",
    lastMaintenance: "2023-12-20",
    hoursUsed: 2100,
    serialNumber: "PS4-MNO567890",
  },
  {
    id: "6",
    consoleId: "PS5-CON-001",
    consoleName: "PlayStation 5 Console A",
    type: "PS5",
    status: "In Use",
    condition: "Excellent",
    roomAssigned: "PS5-001",
    purchaseDate: "2023-06-10",
    lastMaintenance: "2024-01-14",
    hoursUsed: 650,
    serialNumber: "PS5-PQR123456",
  },
  {
    id: "7",
    consoleId: "PS5-CON-002",
    consoleName: "PlayStation 5 Console B",
    type: "PS5",
    status: "Available",
    condition: "Excellent",
    roomAssigned: "PS5-002",
    purchaseDate: "2023-07-20",
    lastMaintenance: "2024-01-11",
    hoursUsed: 520,
    serialNumber: "PS5-STU789012",
  },
  {
    id: "8",
    consoleId: "PS5-CON-003",
    consoleName: "PlayStation 5 Console C",
    type: "PS5",
    status: "Available",
    condition: "Good",
    roomAssigned: "PS5-003",
    purchaseDate: "2023-08-15",
    lastMaintenance: "2024-01-09",
    hoursUsed: 480,
    serialNumber: "PS5-VWX345678",
  },
  {
    id: "9",
    consoleId: "PS5-CON-004",
    consoleName: "PlayStation 5 Console D",
    type: "PS5",
    status: "Maintenance",
    condition: "Good",
    roomAssigned: "PS5-004",
    purchaseDate: "2023-09-05",
    lastMaintenance: "2024-01-03",
    hoursUsed: 380,
    serialNumber: "PS5-YZA901234",
  },
];

const Console: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"All" | "PS4" | "PS5">("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedConsole, setSelectedConsole] = useState<ConsoleData | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle status filter change and update active tab accordingly
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);

    // Update active tab based on status filter
    switch (status) {
      case "All":
        setActiveTab("All");
        break;
      default:
        // Keep current tab when filtering by status
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "In Use":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Maintenance":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Offline":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Available":
        return <Power size={12} />;
      case "In Use":
        return <Gamepad2 size={12} />;
      case "Maintenance":
        return <Wrench size={12} />;
      case "Offline":
        return <AlertTriangle size={12} />;
      default:
        return <Power size={12} />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Fair":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Poor":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredConsoles = consolesData.filter((console) => {
    let matchesTab = false;

    if (activeTab === "All") {
      matchesTab = true;
    } else {
      matchesTab = console.type === activeTab;
    }

    const matchesStatus =
      statusFilter === "All" || console.status === statusFilter;
    const matchesSearch =
      console.consoleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      console.consoleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      console.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesStatus && matchesSearch;
  });

  const handleViewDetails = (console: ConsoleData) => {
    setSelectedConsole(console);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedConsole(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate stats
  const ps4Available = consolesData.filter(
    (console) => console.type === "PS4" && console.status === "Available"
  ).length;
  const ps5Available = consolesData.filter(
    (console) => console.type === "PS5" && console.status === "Available"
  ).length;
  const ps4Maintenance = consolesData.filter(
    (console) =>
      console.type === "PS4" &&
      (console.status === "Maintenance" || console.status === "Offline")
  ).length;
  const ps5Maintenance = consolesData.filter(
    (console) =>
      console.type === "PS5" &&
      (console.status === "Maintenance" || console.status === "Offline")
  ).length;

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
          change={`${ps5Available}/4 units`}
          changeType="increase"
          icon={Gamepad2}
          gradient="from-purple-500 to-pink-600"
        />
        <StatCard
          title="Maintenance PS4"
          value={ps4Maintenance.toString()}
          change="Requires attention"
          changeType="increase"
          icon={AlertTriangle}
          gradient="from-orange-500 to-red-600"
        />
        <StatCard
          title="Maintenance PS5"
          value={ps5Maintenance.toString()}
          change="Requires attention"
          changeType="decrease"
          icon={AlertTriangle}
          gradient="from-red-500 to-pink-600"
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
            Console Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor all PlayStation console inventory
          </p>
        </div>

        {/* Add Console Button - Mobile (above tabs) */}
        {isMobile && (
          <div className="mb-6">
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Add Console
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-1 bg-gray-100/50 rounded-2xl p-1 w-fit">
            {(["All", "PS4", "PS5"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  isMobile ? "py-1.5 px-3 text-xs" : "py-2 px-4 text-sm"
                } rounded-xl font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
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
              placeholder="Search by console ID, name, or serial number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm min-w-[140px]"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Offline">Offline</option>
          </select>

          {/* Add Console Button - Desktop */}
          {!isMobile && (
            <button className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Add Console
            </button>
          )}
        </div>

        {/* Table with horizontal scroll for mobile */}
        <div className="overflow-x-auto rounded-xl border border-gray-200/50">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Console
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Room
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Condition
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Hours Used
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {filteredConsoles.map((console, index) => (
                <motion.tr
                  key={console.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {console.consoleName}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {console.consoleId}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 ${
                          console.type === "PS4"
                            ? "bg-blue-500"
                            : "bg-purple-500"
                        } rounded-full`}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">
                        {console.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {console.roomAssigned || "-"}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        console.status
                      )}`}
                    >
                      {getStatusIcon(console.status)}
                      {console.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getConditionColor(
                        console.condition
                      )}`}
                    >
                      {console.condition}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {console.hoursUsed.toLocaleString()}h
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewDetails(console)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={14} className="text-blue-600" />
                      </button>
                      <button className="p-1.5 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit size={14} className="text-green-600" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                        <X size={14} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredConsoles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Gamepad2 size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No consoles found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && selectedConsole && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Console Details
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Console Info */}
                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${
                        selectedConsole.type === "PS4"
                          ? "from-blue-500 to-indigo-600"
                          : "from-purple-500 to-pink-600"
                      } rounded-xl flex items-center justify-center`}
                    >
                      <Gamepad2 size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedConsole.consoleName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ID: {selectedConsole.consoleId}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Serial: {selectedConsole.serialNumber}</p>
                    <p>
                      Room: {selectedConsole.roomAssigned || "Not assigned"}
                    </p>
                  </div>
                </div>

                {/* Status & Condition */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Status
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          selectedConsole.status
                        )}`}
                      >
                        {getStatusIcon(selectedConsole.status)}
                        {selectedConsole.status}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Condition
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getConditionColor(
                          selectedConsole.condition
                        )}`}
                      >
                        {selectedConsole.condition}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Usage & Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Monitor size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Hours Used
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedConsole.hoursUsed.toLocaleString()}h
                    </p>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench size={16} className="text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Last Maintenance
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {selectedConsole.lastMaintenance
                        ? formatDate(selectedConsole.lastMaintenance)
                        : "Never"}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Power size={16} className="text-emerald-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Purchase Date
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {formatDate(selectedConsole.purchaseDate)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-sm font-medium">
                    Edit Console
                  </button>
                  <button className="flex-1 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors text-sm font-medium">
                    Delete Console
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-colors text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Console;
