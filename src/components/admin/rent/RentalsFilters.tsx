import React from "react";
import { Search, Plus } from "lucide-react";

interface RentalsFiltersProps {
  activeTab: "All" | "PS4" | "PS5" | "VIP";
  setActiveTab: (tab: "All" | "PS4" | "PS5" | "VIP") => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isMobile: boolean;
}

const RentalsFilters: React.FC<RentalsFiltersProps> = ({
  activeTab,
  setActiveTab,
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm,
  isMobile,
}) => {
  return (
    <>
      {/* Start New Rent Button - Mobile (above tabs) */}
      {isMobile && (
        <div className="mb-6">
          <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
            <Plus size={16} />
            Start New Rent
          </button>
        </div>
      )}

      {/* Tabs and Start New Rent Button - Desktop */}
      <div className="flex items-center justify-between mb-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100/50 rounded-2xl p-1 w-fit">
          {(["All", "PS4", "PS5", "VIP"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-6 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "All" ? "All" : `${tab}`}
            </button>
          ))}
        </div>

        {/* Start New Rent Button - Desktop */}
        {!isMobile && (
          <button className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
            <Plus size={16} />
            Start New Rent
          </button>
        )}
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
            placeholder="Search by unit number or user name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm min-w-[140px]"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Offline">Offline</option>
        </select>
      </div>
    </>
  );
};

export default RentalsFilters;
