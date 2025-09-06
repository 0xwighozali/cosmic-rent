"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  X,
  Gamepad,
  Battery,
  AlertTriangle,
  Plus,
  Wrench,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "@/components/ui/StatCard";

interface ControllerData {
  id: string;
  controllerId: string;
  controllerName: string;
  type: "PS4" | "PS5";
  status: "Available" | "In Use" | "Maintenance" | "Offline";
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  batteryLevel?: number;
  roomAssigned?: string;
  purchaseDate: string;
  lastMaintenance?: string;
  hoursUsed: number;
  serialNumber: string;
}

const controllersData: ControllerData[] = [
  {
    id: "1",
    controllerId: "PS4-CTRL-001",
    controllerName: "PS4 Controller A1",
    type: "PS4",
    status: "In Use",
    condition: "Good",
    batteryLevel: 85,
    roomAssigned: "PS4-001",
    purchaseDate: "2023-01-15",
    lastMaintenance: "2024-01-10",
    hoursUsed: 850,
    serialNumber: "PS4-CTRL-ABC123",
  },
  {
    id: "2",
    controllerId: "PS4-CTRL-002",
    controllerName: "PS4 Controller A2",
    type: "PS4",
    status: "Available",
    condition: "Excellent",
    batteryLevel: 100,
    roomAssigned: "PS4-001",
    purchaseDate: "2023-01-15",
    lastMaintenance: "2024-01-08",
    hoursUsed: 720,
    serialNumber: "PS4-CTRL-DEF456",
  },
  {
    id: "3",
    controllerId: "PS4-CTRL-003",
    controllerName: "PS4 Controller B1",
    type: "PS4",
    status: "Maintenance",
    condition: "Fair",
    batteryLevel: 0,
    roomAssigned: "PS4-002",
    purchaseDate: "2022-11-10",
    lastMaintenance: "2024-01-05",
    hoursUsed: 1250,
    serialNumber: "PS4-CTRL-GHI789",
  },
  {
    id: "4",
    controllerId: "PS4-CTRL-004",
    controllerName: "PS4 Controller B2",
    type: "PS4",
    status: "Available",
    condition: "Good",
    batteryLevel: 92,
    roomAssigned: "PS4-002",
    purchaseDate: "2023-03-05",
    lastMaintenance: "2024-01-12",
    hoursUsed: 650,
    serialNumber: "PS4-CTRL-JKL012",
  },
  {
    id: "5",
    controllerId: "PS4-CTRL-005",
    controllerName: "PS4 Controller C1",
    type: "PS4",
    status: "Offline",
    condition: "Poor",
    batteryLevel: 0,
    roomAssigned: "PS4-003",
    purchaseDate: "2022-08-15",
    lastMaintenance: "2023-12-20",
    hoursUsed: 1850,
    serialNumber: "PS4-CTRL-MNO345",
  },
  {
    id: "6",
    controllerId: "PS5-CTRL-001",
    controllerName: "PS5 DualSense A1",
    type: "PS5",
    status: "In Use",
    condition: "Excellent",
    batteryLevel: 78,
    roomAssigned: "PS5-001",
    purchaseDate: "2023-06-10",
    lastMaintenance: "2024-01-14",
    hoursUsed: 450,
    serialNumber: "PS5-CTRL-PQR678",
  },
  {
    id: "7",
    controllerId: "PS5-CTRL-002",
    controllerName: "PS5 DualSense A2",
    type: "PS5",
    status: "Available",
    condition: "Excellent",
    batteryLevel: 95,
    roomAssigned: "PS5-001",
    purchaseDate: "2023-06-10",
    lastMaintenance: "2024-01-11",
    hoursUsed: 380,
    serialNumber: "PS5-CTRL-STU901",
  },
  {
    id: "8",
    controllerId: "PS5-CTRL-003",
    controllerName: "PS5 DualSense B1",
    type: "PS5",
    status: "Available",
    condition: "Good",
    batteryLevel: 88,
    roomAssigned: "PS5-002",
    purchaseDate: "2023-07-20",
    lastMaintenance: "2024-01-09",
    hoursUsed: 320,
    serialNumber: "PS5-CTRL-VWX234",
  },
  {
    id: "9",
    controllerId: "PS5-CTRL-004",
    controllerName: "PS5 DualSense B2",
    type: "PS5",
    status: "Maintenance",
    condition: "Good",
    batteryLevel: 45,
    roomAssigned: "PS5-002",
    purchaseDate: "2023-07-20",
    lastMaintenance: "2024-01-03",
    hoursUsed: 280,
    serialNumber: "PS5-CTRL-YZA567",
  },
  {
    id: "10",
    controllerId: "PS4-CTRL-006",
    controllerName: "PS4 Controller D1",
    type: "PS4",
    status: "Available",
    condition: "Excellent",
    batteryLevel: 100,
    roomAssigned: "PS4-004",
    purchaseDate: "2023-09-05",
    lastMaintenance: "2024-01-15",
    hoursUsed: 420,
    serialNumber: "PS4-CTRL-BCD890",
  },
  {
    id: "11",
    controllerId: "PS5-CTRL-005",
    controllerName: "PS5 DualSense C1",
    type: "PS5",
    status: "Available",
    condition: "Excellent",
    batteryLevel: 92,
    roomAssigned: "PS5-003",
    purchaseDate: "2023-08-15",
    lastMaintenance: "2024-01-13",
    hoursUsed: 250,
    serialNumber: "PS5-CTRL-EFG123",
  },
  {
    id: "12",
    controllerId: "PS4-CTRL-007",
    controllerName: "PS4 Controller E1",
    type: "PS4",
    status: "In Use",
    condition: "Good",
    batteryLevel: 67,
    roomAssigned: "PS4-005",
    purchaseDate: "2023-10-01",
    lastMaintenance: "2024-01-16",
    hoursUsed: 380,
    serialNumber: "PS4-CTRL-HIJ456",
  },
];

const Controller: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedController, setSelectedController] =
    useState<ControllerData | null>(null);
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
        return <Battery size={12} />;
      case "In Use":
        return <Gamepad size={12} />;
      case "Maintenance":
        return <Wrench size={12} />;
      case "Offline":
        return <AlertTriangle size={12} />;
      default:
        return <Battery size={12} />;
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

  const getBatteryColor = (level: number) => {
    if (level >= 80) return "text-emerald-600";
    if (level >= 50) return "text-yellow-600";
    if (level >= 20) return "text-orange-600";
    return "text-red-600";
  };

  const filteredControllers = controllersData.filter((controller) => {
    const matchesStatus =
      statusFilter === "All" || controller.status === statusFilter;
    const matchesSearch =
      controller.controllerId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      controller.controllerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      controller.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (controller: ControllerData) => {
    setSelectedController(controller);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedController(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate stats
  const ps4Available = controllersData.filter(
    (controller) =>
      controller.type === "PS4" && controller.status === "Available"
  ).length;
  const ps5Available = controllersData.filter(
    (controller) =>
      controller.type === "PS5" && controller.status === "Available"
  ).length;
  const ps4Maintenance = controllersData.filter(
    (controller) =>
      controller.type === "PS4" &&
      (controller.status === "Maintenance" || controller.status === "Offline")
  ).length;
  const ps5Maintenance = controllersData.filter(
    (controller) =>
      controller.type === "PS5" &&
      (controller.status === "Maintenance" || controller.status === "Offline")
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
          change={`${ps4Available}/7 units`}
          changeType="increase"
          icon={Gamepad}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard
          title="PS5 Available"
          value={ps5Available.toString()}
          change={`${ps5Available}/5 units`}
          changeType="increase"
          icon={Gamepad}
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
            Controller Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor all PlayStation controller inventory
          </p>
        </div>

        {/* Add Controller Button - Mobile (above search) */}
        {isMobile && (
          <div className="mb-6">
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Add Controller
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
              placeholder="Search by controller ID, name, or serial number..."
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

          {/* Add Controller Button - Desktop */}
          {!isMobile && (
            <button className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Add Controller
            </button>
          )}
        </div>

        {/* Table with horizontal scroll for mobile */}
        <div className="overflow-x-auto rounded-xl border border-gray-200/50">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Controller
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
                  Battery
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
              {filteredControllers.map((controller, index) => (
                <motion.tr
                  key={controller.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {controller.controllerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {controller.controllerId}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 ${
                          controller.type === "PS4"
                            ? "bg-blue-500"
                            : "bg-purple-500"
                        } rounded-full`}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">
                        {controller.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                    {controller.roomAssigned || "-"}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        controller.status
                      )}`}
                    >
                      {getStatusIcon(controller.status)}
                      {controller.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getConditionColor(
                        controller.condition
                      )}`}
                    >
                      {controller.condition}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Battery
                        size={14}
                        className={getBatteryColor(
                          controller.batteryLevel || 0
                        )}
                      />
                      <span
                        className={`text-sm font-medium ${getBatteryColor(
                          controller.batteryLevel || 0
                        )}`}
                      >
                        {controller.batteryLevel || 0}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {controller.hoursUsed.toLocaleString()}h
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewDetails(controller)}
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
        {filteredControllers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Gamepad size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No controllers found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && selectedController && (
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
                  Controller Details
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Controller Info */}
                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${
                        selectedController.type === "PS4"
                          ? "from-blue-500 to-indigo-600"
                          : "from-purple-500 to-pink-600"
                      } rounded-xl flex items-center justify-center`}
                    >
                      <Gamepad size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedController.controllerName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ID: {selectedController.controllerId}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Serial: {selectedController.serialNumber}</p>
                    <p>
                      Room: {selectedController.roomAssigned || "Not assigned"}
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
                          selectedController.status
                        )}`}
                      >
                        {getStatusIcon(selectedController.status)}
                        {selectedController.status}
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
                          selectedController.condition
                        )}`}
                      >
                        {selectedController.condition}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Battery & Usage */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Battery
                        size={16}
                        className={getBatteryColor(
                          selectedController.batteryLevel || 0
                        )}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Battery Level
                      </span>
                    </div>
                    <p
                      className={`text-lg font-bold ${getBatteryColor(
                        selectedController.batteryLevel || 0
                      )}`}
                    >
                      {selectedController.batteryLevel || 0}%
                    </p>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Gamepad size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Hours Used
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedController.hoursUsed.toLocaleString()}h
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
                      {selectedController.lastMaintenance
                        ? formatDate(selectedController.lastMaintenance)
                        : "Never"}
                    </p>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Battery size={16} className="text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Purchase Date
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {formatDate(selectedController.purchaseDate)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-sm font-medium">
                    Edit Controller
                  </button>
                  <button className="flex-1 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors text-sm font-medium">
                    Delete Controller
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

export default Controller;
