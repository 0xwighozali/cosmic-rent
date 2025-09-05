"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: LucideIcon;
  gradient?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  gradient = "from-blue-500 to-purple-600",
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          <div className="flex items-center gap-1">
            <span
              className={`text-sm font-medium ${
                changeType === "increase" ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {changeType === "increase" ? "↗" : "↘"} {change}
            </span>
          </div>
        </div>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}
        >
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
