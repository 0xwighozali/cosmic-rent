"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookingFilters from "@/components/admin/booking/BookingFilters";
import BookingTable from "@/components/admin/booking/BookingTable";
import BookingModal from "@/components/admin/booking/BookingModal";
import EmptyState from "@/components/ui/EmptyState";

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

  // Handle status filter change and update active tab accordingly
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);

    // Update active tab based on status filter
    switch (status) {
      case "All":
        setActiveTab("All");
        break;
      case "Upcoming":
        setActiveTab("Upcoming");
        break;
      case "Active":
      case "Completed":
        setActiveTab("Completed");
        break;
      case "Cancelled":
      case "Missed":
        setActiveTab("Cancelled");
        break;
      default:
        setActiveTab("All");
    }
  };

  const filteredBookings = bookingsData.filter((booking) => {
    let matchesTab = false;

    if (activeTab === "All") {
      matchesTab = true;
    } else if (activeTab === "Upcoming") {
      matchesTab = booking.status === "Upcoming";
    } else if (activeTab === "Completed") {
      matchesTab =
        booking.status === "Active" || booking.status === "Completed";
    } else if (activeTab === "Cancelled") {
      matchesTab =
        booking.status === "Cancelled" || booking.status === "Missed";
    }

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

        {/* Filters */}
        <BookingFilters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          roomTypeFilter={roomTypeFilter}
          setRoomTypeFilter={setRoomTypeFilter}
          statusFilter={statusFilter}
          handleStatusFilterChange={handleStatusFilterChange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isMobile={isMobile}
        />

        {/* Table */}
        <BookingTable
          bookings={filteredBookings}
          isMobile={isMobile}
          onViewDetails={handleViewDetails}
        />

        {/* Empty State */}
        {filteredBookings.length === 0 && <EmptyState />}
      </motion.div>

      {/* Detail Modal */}
      <BookingModal
        booking={selectedBooking}
        isOpen={showModal}
        onClose={closeModal}
      />
    </div>
  );
};

export default Booking;
