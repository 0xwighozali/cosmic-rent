import React from "react";
import { Eye, Edit, X, Clock } from "lucide-react";
import { motion } from "framer-motion";

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

interface BookingTableProps {
  bookings: BookingData[];
  isMobile: boolean;
  onViewDetails: (booking: BookingData) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  isMobile,
  onViewDetails,
}) => {
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

  if (!isMobile) {
    return (
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
            {bookings.map((booking, index) => (
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
                      onClick={() => onViewDetails(booking)}
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
    );
  }

  // Mobile Card View
  return (
    <div className="space-y-4">
      {bookings.map((booking, index) => (
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
                <p className="text-xs text-gray-500">ID: {booking.bookingId}</p>
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
              onClick={() => onViewDetails(booking)}
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
  );
};

export default BookingTable;
