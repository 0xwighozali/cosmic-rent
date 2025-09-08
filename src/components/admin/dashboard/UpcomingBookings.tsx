"use client";

import React from "react";
import { Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Pagination from "@/components/ui/Pagination";

const bookings = [
  {
    id: "1",
    user: "John Smith",
    room: "PS5-001",
    time: "2:00 PM - 4:00 PM",
    status: "Confirmed",
    avatar: "JS",
  },
  {
    id: "2",
    user: "Emma Davis",
    room: "PS4-002",
    time: "4:30 PM - 6:30 PM",
    status: "Pending",
    avatar: "ED",
  },
  {
    id: "3",
    user: "Mike Johnson",
    room: "PS5-003",
    time: "7:00 PM - 9:00 PM",
    status: "Confirmed",
    avatar: "MJ",
  },
  {
    id: "4",
    user: "Lisa Wang",
    room: "VIP-001",
    time: "9:30 PM - 11:30 PM",
    status: "Confirmed",
    avatar: "LW",
  },
  {
    id: "5",
    user: "Alex Chen",
    room: "PS5-002",
    time: "11:00 AM - 1:00 PM",
    status: "Pending",
    avatar: "AC",
  },
  {
    id: "6",
    user: "Sarah Johnson",
    room: "PS4-003",
    time: "1:30 PM - 3:30 PM",
    status: "Confirmed",
    avatar: "SJ",
  },
  {
    id: "7",
    user: "Tom Wilson",
    room: "VIP-002",
    time: "8:00 PM - 10:00 PM",
    status: "Pending",
    avatar: "TW",
  },
  {
    id: "8",
    user: "Nina Rodriguez",
    room: "PS5-004",
    time: "3:00 PM - 5:00 PM",
    status: "Confirmed",
    avatar: "NR",
  },
];

const UpcomingBookings: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = bookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Upcoming Bookings</h3>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {paginatedBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center justify-between p-4 border border-gray-100/50 rounded-xl hover:bg-gray-50/50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {booking.avatar}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {booking.user}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{booking.room}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{booking.time}</span>
                  </div>
                </div>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                booking.status === "Confirmed"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {booking.status}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        itemsPerPage={itemsPerPage}
        totalItems={bookings.length}
        startIndex={startIndex}
      />
    </motion.div>
  );
};

export default UpcomingBookings;
