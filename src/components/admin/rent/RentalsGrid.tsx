import React from "react";
import { Play, Pause, Coffee, Eye, Printer, User, Clock } from "lucide-react";
import { motion } from "framer-motion";

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

interface RentalsGridProps {
  units: PlayStationUnit[];
}

const RentalsGrid: React.FC<RentalsGridProps> = ({ units }) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {units.map((unit, index) => (
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
              <span className="text-white font-bold text-sm">{unit.type}</span>
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
  );
};

export default RentalsGrid;
