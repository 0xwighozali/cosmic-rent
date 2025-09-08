"use client";

import React, { useState } from "react";
import { Search, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Pagination from "@/components/ui/Pagination";

const roomsData = {
  PS4: [
    {
      id: "PS4-001",
      name: "PlayStation 4 Room A",
      status: "Available",
      price: "$15/hr",
    },
    {
      id: "PS4-002",
      name: "PlayStation 4 Room B",
      status: "In Use",
      price: "$15/hr",
    },
    {
      id: "PS4-003",
      name: "PlayStation 4 Room C",
      status: "Maintenance",
      price: "$15/hr",
    },
    {
      id: "PS4-004",
      name: "PlayStation 4 Room D",
      status: "Available",
      price: "$15/hr",
    },
    {
      id: "PS4-005",
      name: "PlayStation 4 Room E",
      status: "In Use",
      price: "$15/hr",
    },
  ],
  PS5: [
    {
      id: "PS5-001",
      name: "PlayStation 5 Room A",
      status: "Available",
      price: "$25/hr",
    },
    {
      id: "PS5-002",
      name: "PlayStation 5 Room B",
      status: "In Use",
      price: "$25/hr",
    },
    {
      id: "PS5-003",
      name: "PlayStation 5 Room C",
      status: "Maintenance",
      price: "$25/hr",
    },
    {
      id: "PS5-004",
      name: "PlayStation 5 Room D",
      status: "Available",
      price: "$25/hr",
    },
  ],
  VIP: [
    {
      id: "VIP-001",
      name: "VIP Gaming Suite A",
      status: "Available",
      price: "$50/hr",
    },
    {
      id: "VIP-002",
      name: "VIP Gaming Suite B",
      status: "In Use",
      price: "$50/hr",
    },
    {
      id: "VIP-003",
      name: "VIP Gaming Suite C",
      status: "Available",
      price: "$50/hr",
    },
  ],
};

const RoomStatus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"PS4" | "PS5" | "VIP">("PS5");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-emerald-100 text-emerald-800";
      case "In Use":
        return "bg-blue-100 text-blue-800";
      case "Maintenance":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRooms = roomsData[activeTab].filter((room) => {
    const matchesStatus =
      statusFilter === "All" || room.status === statusFilter;
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRooms = filteredRooms.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Room Status</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100/50 rounded-xl p-1">
        {(["PS4", "PS5", "VIP"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200/50">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Room
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Price
              </th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {paginatedRooms.map((room) => (
              <tr
                key={room.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-3 px-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {room.name}
                    </p>
                    <p className="text-xs text-gray-500">ID: {room.id}</p>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      room.status
                    )}`}
                  >
                    {room.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {room.price}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit size={14} className="text-blue-600" />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={14} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        itemsPerPage={itemsPerPage}
        totalItems={filteredRooms.length}
        startIndex={startIndex}
      />
    </motion.div>
  );
};

export default RoomStatus;
