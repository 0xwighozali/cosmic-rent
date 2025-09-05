import React from "react";
import { CreditCard, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const transactions = [
  {
    id: "1",
    user: "Alex Chen",
    room: "PS5-001",
    amount: "$25.00",
    status: "Completed",
    time: "2 min ago",
    avatar: "AC",
  },
  {
    id: "2",
    user: "Maria Garcia",
    room: "PS4-002",
    amount: "$18.00",
    status: "Pending",
    time: "15 min ago",
    avatar: "MG",
  },
  {
    id: "3",
    user: "James Wilson",
    room: "VIP-001",
    amount: "$50.00",
    status: "Completed",
    time: "32 min ago",
    avatar: "JW",
  },
  {
    id: "4",
    user: "Sarah Kim",
    room: "PS5-002",
    amount: "$25.00",
    status: "Completed",
    time: "1 hour ago",
    avatar: "SK",
  },
  {
    id: "5",
    user: "David Brown",
    room: "PS4-001",
    amount: "$20.00",
    status: "Failed",
    time: "2 hours ago",
    avatar: "DB",
  },
  {
    id: "6",
    user: "Emma Davis",
    room: "VIP-002",
    amount: "$50.00",
    status: "Completed",
    time: "3 hours ago",
    avatar: "ED",
  },
];

const RecentTransactions: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CreditCard size={20} className="text-green-600" />
          <h3 className="text-lg font-bold text-gray-900">
            Recent Transactions
          </h3>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200/50">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                User
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Room
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {transactions.map((transaction, index) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {transaction.avatar}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {transaction.user}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 font-medium whitespace-nowrap">
                  {transaction.room}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-green-600" />
                    <span className="text-sm font-bold text-gray-900">
                      {transaction.amount}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500 whitespace-nowrap">
                  {transaction.time}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentTransactions;
