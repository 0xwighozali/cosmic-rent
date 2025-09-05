"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { day: "Mon", orders: 45 },
  { day: "Tue", orders: 32 },
  { day: "Wed", orders: 78 },
  { day: "Thu", orders: 56 },
  { day: "Fri", orders: 89 },
  { day: "Sat", orders: 124 },
  { day: "Sun", orders: 98 },
];

const CustomerActivityChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          Total Orders by Customers
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
          <span className="text-sm text-gray-600">Daily Activity</span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(226, 232, 240, 0.5)",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ fill: "#ec4899", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: "#8b5cf6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CustomerActivityChart;
