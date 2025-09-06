"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  X,
  Home,
  MapPin,
  DollarSign,
  Clock,
  Plus,
  Gamepad2,
  Monitor,
  Wrench,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RoomData {
  id: string;
  roomId: string;
  roomName: string;
  roomType: "PS4" | "PS5" | "VIP";
  status: "Available" | "In Use" | "Maintenance";
  price: string;
  capacity: number;
  currentUser?: string;
  startTime?: string;
  endTime?: string;
  timeLeft?: string;
  equipment: string[];
  lastMaintenance?: string;
}

const roomsData: RoomData[] = [
  {
    id: "1",
    roomId: "PS4-001",
    roomName: "PlayStation 4 Room A",
    roomType: "PS4",
    status: "In Use",
    price: "$15/hr",
    capacity: 4,
    currentUser: "John Smith",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    timeLeft: "1h 23m",
    equipment: ["PS4 Console", "4 Controllers", '55" TV', "Sound System"],
    lastMaintenance: "2024-01-10",
  },
  {
    id: "2",
    roomId: "PS4-002",
    roomName: "PlayStation 4 Room B",
    roomType: "PS4",
    status: "Available",
    price: "$15/hr",
    capacity: 4,
    equipment: ["PS4 Console", "4 Controllers", '50" TV', "Sound System"],
    lastMaintenance: "2024-01-08",
  },
  {
    id: "3",
    roomId: "PS4-003",
    roomName: "PlayStation 4 Room C",
    roomType: "PS4",
    status: "Maintenance",
    price: "$15/hr",
    capacity: 4,
    equipment: ["PS4 Console", "4 Controllers", '55" TV', "Sound System"],
    lastMaintenance: "2024-01-05",
  },
  {
    id: "4",
    roomId: "PS5-001",
    roomName: "PlayStation 5 Room A",
    roomType: "PS5",
    status: "Available",
    price: "$25/hr",
    capacity: 4,
    equipment: ["PS5 Console", "4 Controllers", '65" 4K TV', "Surround Sound"],
    lastMaintenance: "2024-01-12",
  },
  {
    id: "5",
    roomId: "PS5-002",
    roomName: "PlayStation 5 Room B",
    roomType: "PS5",
    status: "In Use",
    price: "$25/hr",
    capacity: 4,
    currentUser: "Emma Davis",
    startTime: "1:30 PM",
    endTime: "3:30 PM",
    timeLeft: "45m",
    equipment: ["PS5 Console", "4 Controllers", '65" 4K TV', "Surround Sound"],
    lastMaintenance: "2024-01-11",
  },
  {
    id: "6",
    roomId: "PS5-003",
    roomName: "PlayStation 5 Room C",
    roomType: "PS5",
    status: "Maintenance",
    price: "$25/hr",
    capacity: 4,
    equipment: ["PS5 Console", "4 Controllers", '65" 4K TV', "Surround Sound"],
    lastMaintenance: "2024-01-03",
  },
  {
    id: "7",
    roomId: "VIP-001",
    roomName: "VIP Gaming Suite A",
    roomType: "VIP",
    status: "Available",
    price: "$50/hr",
    capacity: 8,
    equipment: [
      "PS5 Console",
      "8 Controllers",
      '75" 4K TV',
      "7.1 Surround Sound",
      "Gaming Chairs",
      "Mini Fridge",
    ],
    lastMaintenance: "2024-01-14",
  },
  {
    id: "8",
    roomId: "VIP-002",
    roomName: "VIP Gaming Suite B",
    roomType: "VIP",
    status: "In Use",
    price: "$50/hr",
    capacity: 8,
    currentUser: "Mike Johnson",
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    timeLeft: "2h 15m",
    equipment: [
      "PS5 Console",
      "8 Controllers",
      '75" 4K TV',
      "7.1 Surround Sound",
      "Gaming Chairs",
      "Mini Fridge",
    ],
    lastMaintenance: "2024-01-13",
  },
];

const Room: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "All" | "Available" | "In Use" | "Maintenance"
  >("All");
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
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
      case "Available":
        setActiveTab("Available");
        break;
      case "In Use":
        setActiveTab("In Use");
        break;
      case "Maintenance":
        setActiveTab("Maintenance");
        break;
      default:
        setActiveTab("All");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "In Use":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Maintenance":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Available":
        return <Home size={12} />;
      case "In Use":
        return <Gamepad2 size={12} />;
      case "Maintenance":
        return <Wrench size={12} />;
      default:
        return <Home size={12} />;
    }
  };

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case "PS4":
        return "bg-blue-500";
      case "PS5":
        return "bg-purple-500";
      case "VIP":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredRooms = roomsData.filter((room) => {
    let matchesTab = false;

    if (activeTab === "All") {
      matchesTab = true;
    } else {
      matchesTab = room.status === activeTab;
    }

    const matchesRoomType =
      roomTypeFilter === "All" || room.roomType === roomTypeFilter;
    const matchesStatus =
      statusFilter === "All" || room.status === statusFilter;
    const matchesSearch =
      room.roomId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.currentUser &&
        room.currentUser.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesRoomType && matchesStatus && matchesSearch;
  });

  const handleViewDetails = (room: RoomData) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Wrapper Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Room Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor all PlayStation gaming rooms
          </p>
        </div>

        {/* Add Room Button - Mobile (above tabs) */}
        {isMobile && (
          <div className="mb-6">
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Add Room
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-1 bg-gray-100/50 rounded-2xl p-1 w-fit">
            {(["All", "Available", "In Use", "Maintenance"] as const).map(
              (tab) => (
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
              )
            )}
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
              placeholder="Search by room ID, name, or current user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm"
            />
          </div>
          <select
            value={roomTypeFilter}
            onChange={(e) => setRoomTypeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm min-w-[140px]"
          >
            <option value="All">All Room Types</option>
            <option value="PS4">PS4</option>
            <option value="PS5">PS5</option>
            <option value="VIP">VIP</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm min-w-[140px]"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          {/* Add Room Button - Desktop */}
          {!isMobile && (
            <button className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Add Room
            </button>
          )}
        </div>

        {/* Desktop Table */}
        {!isMobile ? (
          <div className="overflow-hidden rounded-xl border border-gray-200/50">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Current User
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {filteredRooms.map((room, index) => (
                  <motion.tr
                    key={room.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {room.roomName}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {room.roomId}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 ${getRoomTypeColor(
                            room.roomType
                          )} rounded-full`}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">
                          {room.roomType}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {room.status === "In Use" && room.currentUser ? (
                        <div className="text-sm text-gray-600">
                          <div className="font-medium">{room.currentUser}</div>
                          <div className="text-xs text-gray-500">
                            {room.startTime} - {room.endTime}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-bold text-gray-900">
                        {room.price}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          room.status
                        )}`}
                      >
                        {getStatusIcon(room.status)}
                        {room.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(room)}
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
        ) : (
          /* Mobile Card View */
          <div className="space-y-4">
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${getRoomTypeColor(
                        room.roomType
                      )} rounded-xl flex items-center justify-center`}
                    >
                      <span className="text-xs font-bold text-white">
                        {room.roomType}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {room.roomName}
                      </p>
                      <p className="text-xs text-gray-500">ID: {room.roomId}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      room.status
                    )}`}
                  >
                    {getStatusIcon(room.status)}
                    {room.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign size={14} />
                    <span>{room.price}</span>
                  </div>
                  {room.status === "In Use" && room.currentUser && (
                    <>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Gamepad2 size={14} />
                        <span>{room.currentUser}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} />
                        <span>
                          {room.startTime} - {room.endTime} • {room.timeLeft}{" "}
                          left
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleViewDetails(room)}
                    className="flex items-center gap-1 py-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-xs font-medium"
                  >
                    <Eye size={12} />
                    View
                  </button>
                  <button className="flex items-center gap-1 py-1.5 px-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-colors text-xs font-medium">
                    <Edit size={12} />
                    Edit
                  </button>
                  <button className="flex items-center gap-1 py-1.5 px-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors text-xs font-medium">
                    <X size={12} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Home size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No rooms found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && selectedRoom && (
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
                  Room Details
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Room Info */}
                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${getRoomTypeColor(
                        selectedRoom.roomType
                      )} rounded-xl flex items-center justify-center`}
                    >
                      <span className="text-sm font-bold text-white">
                        {selectedRoom.roomType}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedRoom.roomName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ID: {selectedRoom.roomId}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Capacity: {selectedRoom.capacity} people</p>
                    <p>Price: {selectedRoom.price}</p>
                  </div>
                </div>

                {/* Current Session */}
                {selectedRoom.status === "In Use" &&
                  selectedRoom.currentUser && (
                    <div className="bg-blue-50/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Gamepad2 size={16} className="text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Current Session
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {selectedRoom.currentUser}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedRoom.startTime} - {selectedRoom.endTime}
                      </p>
                      <p className="text-sm font-medium text-blue-700 mt-1">
                        Time Left: {selectedRoom.timeLeft}
                      </p>
                    </div>
                  )}

                {/* Equipment */}
                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Monitor size={16} className="text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Equipment
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRoom.equipment.map((item, index) => (
                      <div
                        key={index}
                        className="text-xs bg-white rounded-lg px-2 py-1 text-gray-600"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status & Maintenance */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Status
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          selectedRoom.status
                        )}`}
                      >
                        {getStatusIcon(selectedRoom.status)}
                        {selectedRoom.status}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench size={16} className="text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Last Maintenance
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {selectedRoom.lastMaintenance}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-sm font-medium">
                    Edit Room
                  </button>
                  <button className="flex-1 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors text-sm font-medium">
                    Delete Room
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

export default Room;
