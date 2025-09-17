import React from "react";
import { Search } from "lucide-react";

interface BookingFiltersProps {
  activeTab: "All" | "Upcoming" | "Completed" | "Cancelled";
  setActiveTab: (tab: "All" | "Upcoming" | "Completed" | "Cancelled") => void;
  roomTypeFilter: string;
  setRoomTypeFilter: (type: string) => void;
  statusFilter: string;
  handleStatusFilterChange: (status: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isMobile: boolean;
}

const BookingFilters: React.FC<BookingFiltersProps> = ({
  activeTab,
  setActiveTab,
  roomTypeFilter,
  setRoomTypeFilter,
  statusFilter,
  handleStatusFilterChange,
  searchTerm,
  setSearchTerm,
  isMobile,
}) => {
  return (
    <>
      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-1 bg-gray-100/50 rounded-2xl p-1 w-fit">
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
          onChange={(e) => handleStatusFilterChange(e.target.value)}
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
    </>
  );
};

export default BookingFilters;
