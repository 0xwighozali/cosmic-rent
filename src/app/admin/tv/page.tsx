"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  X,
  Monitor,
  Tv,
  AlertTriangle,
  Plus,
  Wrench,
  Power,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "@/components/ui/StatCard";

interface TVData {
  id: string;
  tvId: string;
  tvName: string;
  type: "LED" | "OLED" | "4K" | "Smart TV";
  size: string;
  status: "Available" | "In Use" | "Maintenance" | "Offline";
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  roomAssigned?: string;
  purchaseDate: string;
  lastMaintenance?: string;
  hoursUsed: number;
  serialNumber: string;
  brand: string;
  resolution: string;
}

const tvsData: TVData[] = [
  {
    id: "1",
    tvId: "TV-001",
    tvName: 'Samsung 55" 4K Smart TV A',
    type: "4K",
    size: '55"',
    status: "In Use",
    condition: "Excellent",
    roomAssigned: "PS5-001",
    purchaseDate: "2023-06-10",
    lastMaintenance: "2024-01-14",
    hoursUsed: 2450,
    serialNumber: "SAM-55-4K-001",
    brand: "Samsung",
    resolution: "3840x2160",
  },
  {
    id: "2",
    tvId: "TV-002",
    tvName: 'LG 50" LED TV B',
    type: "LED",
    size: '50"',
    status: "Available",
    condition: "Good",
    roomAssigned: "PS4-001",
    purchaseDate: "2023-01-15",
    lastMaintenance: "2024-01-10",
    hoursUsed: 3200,
    serialNumber: "LG-50-LED-002",
    brand: "LG",
    resolution: "1920x1080",
  },
  {
    id: "3",
    tvId: "TV-003",
    tvName: 'Sony 65" OLED TV C',
    type: "OLED",
    size: '65"',
    status: "Maintenance",
    condition: "Fair",
    roomAssigned: "VIP-001",
    purchaseDate: "2022-11-10",
    lastMaintenance: "2024-01-05",
    hoursUsed: 4850,
    serialNumber: "SONY-65-OLED-003",
    brand: "Sony",
    resolution: "3840x2160",
  },
  {
    id: "4",
    tvId: "TV-004",
    tvName: 'Samsung 55" Smart TV D',
    type: "Smart TV",
    size: '55"',
    status: "Available",
    condition: "Excellent",
    roomAssigned: "PS5-002",
    purchaseDate: "2023-07-20",
    lastMaintenance: "2024-01-11",
    hoursUsed: 1850,
    serialNumber: "SAM-55-SMART-004",
    brand: "Samsung",
    resolution: "3840x2160",
  },
  {
    id: "5",
    tvId: "TV-005",
    tvName: 'LG 50" LED TV E',
    type: "LED",
    size: '50"',
    status: "Offline",
    condition: "Poor",
    roomAssigned: "PS4-002",
    purchaseDate: "2022-08-15",
    lastMaintenance: "2023-12-20",
    hoursUsed: 5200,
    serialNumber: "LG-50-LED-005",
    brand: "LG",
    resolution: "1920x1080",
  },
  {
    id: "6",
    tvId: "TV-006",
    tvName: 'Sony 65" 4K TV F',
    type: "4K",
    size: '65"',
    status: "In Use",
    condition: "Good",
    roomAssigned: "VIP-002",
    purchaseDate: "2023-08-15",
    lastMaintenance: "2024-01-09",
    hoursUsed: 2100,
    serialNumber: "SONY-65-4K-006",
    brand: "Sony",
    resolution: "3840x2160",
  },
  {
    id: "7",
    tvId: "TV-007",
    tvName: 'Samsung 75" OLED TV G',
    type: "OLED",
    size: '75"',
    status: "Available",
    condition: "Excellent",
    roomAssigned: "VIP-003",
    purchaseDate: "2023-09-05",
    lastMaintenance: "2024-01-13",
    hoursUsed: 1200,
    serialNumber: "SAM-75-OLED-007",
    brand: "Samsung",
    resolution: "3840x2160",
  },
  {
    id: "8",
    tvId: "TV-008",
    tvName: 'LG 55" Smart TV H',
    type: "Smart TV",
    size: '55"',
    status: "Maintenance",
    condition: "Good",
    roomAssigned: "PS5-003",
    purchaseDate: "2023-10-01",
    lastMaintenance: "2024-01-03",
    hoursUsed: 980,
    serialNumber: "LG-55-SMART-008",
    brand: "LG",
    resolution: "3840x2160",
  },
];

const TV: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTV, setSelectedTV] = useState<TVData | null>(null);
  const [showModal, setShowModal] = useState(false);

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
        return <Tv size={12} />;
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "LED":
        return "bg-blue-500";
      case "OLED":
        return "bg-purple-500";
      case "4K":
        return "bg-green-500";
      case "Smart TV":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredTVs = tvsData.filter((tv) => {
    const matchesStatus = statusFilter === "All" || tv.status === statusFilter;
    const matchesSearch =
      tv.tvId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tv.tvName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tv.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tv.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (tv: TVData) => {
    setSelectedTV(tv);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTV(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate stats
  const availableTVs = tvsData.filter((tv) => tv.status === "Available").length;
  const inUseTVs = tvsData.filter((tv) => tv.status === "In Use").length;
  const maintenanceTVs = tvsData.filter(
    (tv) => tv.status === "Maintenance" || tv.status === "Offline"
  ).length;
  const totalTVs = tvsData.length;

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatCard
          title="Available TVs"
          value={availableTVs.toString()}
          change={`${availableTVs}/${totalTVs} units`}
          changeType="increase"
          icon={Monitor}
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Currently In Use"
          value={inUseTVs.toString()}
          change={`${inUseTVs}/${totalTVs} active`}
          changeType="increase"
          icon={Tv}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard
          title="Need Maintenance"
          value={maintenanceTVs.toString()}
          change="Requires attention"
          changeType="increase"
          icon={AlertTriangle}
          gradient="from-orange-500 to-red-600"
        />
        <StatCard
          title="Total TVs"
          value={totalTVs.toString()}
          change="All units"
          changeType="increase"
          icon={Monitor}
          gradient="from-purple-500 to-pink-600"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div>
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
                TV Management
              </h1>
              <p className="text-gray-600">
                Manage and monitor all TV inventory
              </p>
            </div>

            {/* Add TV Button - Mobile (above search) */}
            {isMobile && (
              <div className="mb-6">
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
                  <Plus size={16} />
                  Add TV
                </button>
              </div>
            )}

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by TV ID, name, brand, or serial number..."
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
                <option value="Maintenance">Maintenance</option>
                <option value="Offline">Offline</option>
              </select>

              {/* Add TV Button - Desktop */}
              {!isMobile && (
                <button className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
                  <Plus size={16} />
                  Add TV
                </button>
              )}
            </div>

            <div>
              <div className="overflow-x-auto rounded-xl border border-gray-200/50">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        TV
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        Size
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
                    {filteredTVs.map((tv, index) => (
                      <motion.tr
                        key={tv.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {tv.tvName}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: {tv.tvId} • {tv.brand}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 ${getTypeColor(
                                tv.type
                              )} rounded-full`}
                            ></div>
                            <span className="text-sm font-medium text-gray-900">
                              {tv.type}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {tv.size}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                          {tv.roomAssigned || "-"}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              tv.status
                            )}`}
                          >
                            {getStatusIcon(tv.status)}
                            {tv.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getConditionColor(
                              tv.condition
                            )}`}
                          >
                            {tv.condition}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {tv.hoursUsed.toLocaleString()}h
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewDetails(tv)}
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
            </div>

            {/* Empty State */}
            {filteredTVs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Monitor size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No TVs found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </motion.div>

          {/* Detail Modal */}
          <AnimatePresence>
            {showModal && selectedTV && (
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
                      TV Details
                    </h2>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <X size={20} className="text-gray-600" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* TV Info */}
                    <div className="bg-gray-50/50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${
                            getTypeColor(selectedTV.type) === "bg-blue-500"
                              ? "from-blue-500 to-indigo-600"
                              : getTypeColor(selectedTV.type) ===
                                "bg-purple-500"
                              ? "from-purple-500 to-pink-600"
                              : getTypeColor(selectedTV.type) === "bg-green-500"
                              ? "from-green-500 to-emerald-600"
                              : "from-orange-500 to-red-600"
                          } rounded-xl flex items-center justify-center`}
                        >
                          <Monitor size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {selectedTV.tvName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            ID: {selectedTV.tvId} • {selectedTV.brand}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Serial: {selectedTV.serialNumber}</p>
                        <p>Room: {selectedTV.roomAssigned || "Not assigned"}</p>
                        <p>Resolution: {selectedTV.resolution}</p>
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
                              selectedTV.status
                            )}`}
                          >
                            {getStatusIcon(selectedTV.status)}
                            {selectedTV.status}
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
                              selectedTV.condition
                            )}`}
                          >
                            {selectedTV.condition}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Size & Usage */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Monitor size={16} className="text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Screen Size
                          </span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {selectedTV.size}
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedTV.type}
                        </p>
                      </div>
                      <div className="bg-gray-50/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Tv size={16} className="text-purple-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Hours Used
                          </span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {selectedTV.hoursUsed.toLocaleString()}h
                        </p>
                      </div>
                    </div>

                    {/* Maintenance & Purchase */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Wrench size={16} className="text-orange-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Last Maintenance
                          </span>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          {selectedTV.lastMaintenance
                            ? formatDate(selectedTV.lastMaintenance)
                            : "Never"}
                        </p>
                      </div>
                      <div className="bg-gray-50/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Power size={16} className="text-emerald-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Purchase Date
                          </span>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          {formatDate(selectedTV.purchaseDate)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-sm font-medium">
                        Edit TV
                      </button>
                      <button className="flex-1 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors text-sm font-medium">
                        Delete TV
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
      </div>
    </div>
  );
};

export default TV;
