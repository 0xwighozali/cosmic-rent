"use client";

import React from "react";
import { DollarSign, Calendar, Home, Gamepad } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";
import RevenueChart from "@/components/charts/RevenueChart";
import CustomerActivityChart from "@/components/charts/CustomerActivityChart";
import RoomStatus from "@/components/admin/dashboard/RoomStatus";
import RecentTransactions from "@/components/admin/dashboard/RecentTransactions";
import UpcomingBookings from "@/components/admin/dashboard/UpcomingBookings";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatCard
          title="Daily Revenue"
          value="$2,847"
          change="+12.5%"
          changeType="increase"
          icon={DollarSign}
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Today's Bookings"
          value="23"
          change="+8.2%"
          changeType="increase"
          icon={Calendar}
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard
          title="Active Rooms"
          value="12/18"
          change="67% occupied"
          changeType="increase"
          icon={Home}
          gradient="from-purple-500 to-pink-600"
        />
        <StatCard
          title="Controllers Ready"
          value="34/40"
          change="6 in maintenance"
          changeType="decrease"
          icon={Gamepad}
          gradient="from-orange-500 to-red-600"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <RevenueChart />
        </div>
        <div>
          <CustomerActivityChart />
        </div>
      </div>

      {/* Room Status & Upcoming Bookings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <RoomStatus />
        </div>
        <div>
          <UpcomingBookings />
        </div>
      </div>

      {/* Recent Transactions Row */}
      <div className="grid grid-cols-1 gap-6">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
