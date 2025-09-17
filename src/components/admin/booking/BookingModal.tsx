import React from "react";
import {
  X,
  Calendar,
  MapPin,
  Clock,
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

interface BookingModalProps {
  booking: BookingData | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  if (!booking) return null;

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
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
                onClick={onClose}
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
                      {booking.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {booking.customerName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {booking.customerEmail}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Phone: {booking.customerPhone}</p>
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
                    {booking.bookingId}
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
                        booking.roomType
                      )} rounded-full`}
                    ></div>
                    <p className="text-lg font-bold text-gray-900">
                      {booking.roomNumber}
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
                    {booking.duration}
                  </p>
                  <p className="text-xs text-gray-500">
                    {booking.startTime} - {booking.endTime}
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
                    {booking.price}
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
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
                {booking.status === "Missed" && (
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
                  onClick={onClose}
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
  );
};

export default BookingModal;
