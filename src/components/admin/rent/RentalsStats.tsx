import React from "react";
import { motion } from "framer-motion";
import { Gamepad2, Calendar } from "lucide-react";
import StatCard from "@/components/ui/StatCard";

interface RentalsStatsProps {
  ps4Available: number;
  ps5Available: number;
  vipAvailable: number;
  bookingsToday: number;
}

const RentalsStats: React.FC<RentalsStatsProps> = ({
  ps4Available,
  ps5Available,
  vipAvailable,
  bookingsToday,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      <StatCard
        title="PS4 Available"
        value={ps4Available.toString()}
        change={`${ps4Available}/5 units`}
        changeType="increase"
        icon={Gamepad2}
        gradient="from-blue-500 to-indigo-600"
      />
      <StatCard
        title="PS5 Available"
        value={ps5Available.toString()}
        change={`${ps5Available}/5 units`}
        changeType="increase"
        icon={Gamepad2}
        gradient="from-purple-500 to-pink-600"
      />
      <StatCard
        title="VIP Available"
        value={vipAvailable.toString()}
        change={`${vipAvailable}/4 units`}
        changeType="increase"
        icon={Gamepad2}
        gradient="from-orange-500 to-red-600"
      />
      <StatCard
        title="Bookings Today"
        value={bookingsToday.toString()}
        change="+8.2%"
        changeType="increase"
        icon={Calendar}
        gradient="from-emerald-500 to-teal-600"
      />
    </motion.div>
  );
};

export default RentalsStats;
