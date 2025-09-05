"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  X,
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingData {
  id: string;
  bookingId: string;
  customerName: string;
  roomType: "PS4" | "PS5" | "VIP";
  roomNumber: string;
  startTime: string;
  endTime: string;
  date: string;
  status: "Upcoming" | "Active" | "Completed" | "Cancelled" | "Missed";
  price: string;
  duration: string;
  customerEmail?: string;
  customerPhone?: string;
}

const bookingsData: BookingData[] = [
  {
    id: "1",
    bookingId: "BK001",
    customerName: "John Smith",
    roomType: "PS5",
    roomNumber: "PS5-001",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    date: "Today",
    status: "Active",
    price: "$50.00",
    duration: "2 hours",
    customerEmail: "john@email.com",
    customerPhone: "+1 234 567 8900",
  },
  {
    id: "2",
    bookingId: "BK002",
    customerName: "Emma Davis",
    roomType: "PS4",
    roomNumber: "PS4-002",
    startTime: "4:30 PM",
    endTime: "6:30 PM",
    date: "Today",
    status: "Upcoming",
    price: "$30.00",
    duration: "2 hours",
    customerEmail: "emma@email.com",
    customerPhone: "+1 234 567 8901",
  },
  {
    id: "3",
    bookingId: "BK003",
    customerName: "Mike Johnson",
    roomType: "VIP",
    roomNumber: "VIP-001",
    startTime: "7:00 PM",
    endTime: "9:00 PM",
    date: "Today",
    status: "Upcoming",
    price: "$100.00",
    duration: "2 hours",
    customerEmail: "mike@email.com",
    customerPhone: "+1 234 567 8902",
  },
  {
    id: "4",
    bookingId: "BK004",
    customerName: "Lisa Wang",
    roomType: "PS5",
    roomNumber: "PS5-002",
    startTime: "11:00 AM",
    endTime: "1:00 PM",
    date: "Yesterday",
    status: "Completed",
    price: "$50.00",
    duration: "2 hours",
    customerEmail: "lisa@email.com",
    customerPhone: "+1 234 567 8903",
  },
  {
    id: "5",
    bookingId: "BK005",
    customerName: "Alex Chen",
    roomType: "PS4",
    roomNumber: "PS4-001",
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    date: "Yesterday",
    status: "Cancelled",
    price: "$30.00",
    duration: "2 hours",
    customerEmail: "alex@email.com",
    customerPhone: "+1 234 567 8904",
  },
  {
    id: "6",
    bookingId: "BK006",
    customerName: "Sarah Kim",
    roomType: "VIP",
    roomNumber: "VIP-002",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    date: "Yesterday",
    status: "Missed",
    price: "$100.00",
    duration: "2 hours",
    customerEmail: "sarah@email.com",
    customerPhone: "+1 234 567 8905",
  },
  {
    id: "7",
    bookingId: "BK007",
    customerName: "Tom Wilson",
    roomType: "PS5",
    roomNumber: "PS5-003",
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    date: "Tomorrow",
    status: "Upcoming",
    price: "$50.00",
    duration: "2 hours",
    customerEmail: "tom@email.com",
    customerPhone: "+1 234 567 8906",
  },
  {
    id: "8",
    bookingId: "BK008",
    customerName: "Nina Rodriguez",
    roomType: "PS4",
    roomNumber: "PS4-003",
    startTime: "5:00 PM",
    endTime: "7:00 PM",
    date: "Tomorrow",
    status: "Upcoming",
    price: "$30.00",
    duration: "2 hours",
    customerEmail: "nina@email.com",
    customerPhone: "+1 234 567 8907",
  },
];

const Booking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "All" | "Upcoming" | "Completed" | "Cancelled"
  >("All");
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "Missed":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  const filteredBookings = bookingsData.filter((booking) => {
    const matchesTab = activeTab === "All" || booking.status === activeTab;
    const matchesRoomType =
      roomTypeFilter === "All" || booking.roomType === roomTypeFilter;
    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter;
    const matchesSearch =
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesRoomType && matchesStatus && matchesSearch;
  });

  const handleViewDetails = (booking: BookingData) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
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
            Booking Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor all PlayStation rental bookings
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div
            className={`flex gap-1 bg-gray-100/50 rounded-2xl p-1 ${
              isMobile ? "overflow-x-auto scrollbar-hide" : "w-fit"
            }`}
          >
            {(["All", "Upcoming", "Completed", "Cancelled"] as const).map(
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
              placeholder="Search by booking ID or customer name..."
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
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm min-w-[140px]"
          >
            <option value="All">All Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Missed">Missed</option>
          </select>
        </div>

        {/* Desktop Table */}
        {!isMobile ? (
          <div className="overflow-hidden rounded-xl border border-gray-200/50">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Room Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Time Slot
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
                {filteredBookings.map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-900">
                        {booking.bookingId}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {booking.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {booking.customerName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 ${getRoomTypeColor(
                            booking.roomType
                          )} rounded-full`}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">
                          {booking.roomNumber}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">
                        <div>{booking.date}</div>
                        <div className="text-xs text-gray-500">
                          {booking.startTime} - {booking.endTime}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(booking)}
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
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {booking.customerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {booking.customerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {booking.bookingId}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div
                      className={`w-3 h-3 ${getRoomTypeColor(
                        booking.roomType
                      )} rounded-full`}
                    ></div>
                    <span>{booking.roomNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={14} />
                    <span>
                      {booking.date} • {booking.startTime} - {booking.endTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleViewDetails(booking)}
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
                    Cancel
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && selectedBooking && (
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
                  Booking Details
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Info */}
                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {selectedBooking.customerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedBooking.customerName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedBooking.customerEmail}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Phone: {selectedBooking.customerPhone}</p>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Booking ID
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedBooking.bookingId}
                    </p>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Room
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 ${getRoomTypeColor(
                          selectedBooking.roomType
                        )} rounded-full`}
                      ></div>
                      <p className="text-lg font-bold text-gray-900">
                        {selectedBooking.roomNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={16} className="text-green-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Duration
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedBooking.duration}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedBooking.startTime} - {selectedBooking.endTime}
                    </p>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign size={16} className="text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Price
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedBooking.price}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Status
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        selectedBooking.status
                      )}`}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>
                  {selectedBooking.status === "Missed" && (
                    <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle
                          size={16}
                          className="text-orange-600 mt-0.5"
                        />
                        <p className="text-sm text-orange-800">
                          This booking was automatically marked as Missed after
                          exceeding the 15-minute grace period.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-sm font-medium">
                    Reschedule
                  </button>
                  <button className="flex-1 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors text-sm font-medium">
                    Cancel
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

export default Booking;
