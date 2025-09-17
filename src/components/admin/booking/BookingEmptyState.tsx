import React from "react";
import { Calendar } from "lucide-react";

const BookingEmptyState: React.FC = () => {
  return (
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
  );
};

export default BookingEmptyState;
