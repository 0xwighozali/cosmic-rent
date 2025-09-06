"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  X,
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  UserCheck,
  UserX,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalBookings: number;
  totalSpent: string;
  status: "Active" | "Inactive" | "Banned";
  lastLogin?: string;
  avatar: string;
}

const usersData: UserData[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@email.com",
    phone: "+1 234 567 8900",
    joinDate: "2024-01-15",
    totalBookings: 25,
    totalSpent: "$625.00",
    status: "Active",
    lastLogin: "2 hours ago",
    avatar: "JS",
  },
  {
    id: "2",
    name: "Emma Davis",
    email: "emma@email.com",
    phone: "+1 234 567 8901",
    joinDate: "2024-02-20",
    totalBookings: 18,
    totalSpent: "$450.00",
    status: "Active",
    lastLogin: "1 day ago",
    avatar: "ED",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@email.com",
    phone: "+1 234 567 8902",
    joinDate: "2024-01-08",
    totalBookings: 32,
    totalSpent: "$800.00",
    status: "Active",
    lastLogin: "5 minutes ago",
    avatar: "MJ",
  },
  {
    id: "4",
    name: "Lisa Wang",
    email: "lisa@email.com",
    phone: "+1 234 567 8903",
    joinDate: "2023-12-10",
    totalBookings: 45,
    totalSpent: "$1,125.00",
    status: "Active",
    lastLogin: "3 hours ago",
    avatar: "LW",
  },
  {
    id: "5",
    name: "Alex Chen",
    email: "alex@email.com",
    phone: "+1 234 567 8904",
    joinDate: "2024-03-05",
    totalBookings: 8,
    totalSpent: "$200.00",
    status: "Inactive",
    lastLogin: "2 weeks ago",
    avatar: "AC",
  },
  {
    id: "6",
    name: "Sarah Kim",
    email: "sarah@email.com",
    phone: "+1 234 567 8905",
    joinDate: "2024-01-22",
    totalBookings: 12,
    totalSpent: "$300.00",
    status: "Banned",
    lastLogin: "1 month ago",
    avatar: "SK",
  },
  {
    id: "7",
    name: "Tom Wilson",
    email: "tom@email.com",
    phone: "+1 234 567 8906",
    joinDate: "2024-02-14",
    totalBookings: 22,
    totalSpent: "$550.00",
    status: "Active",
    lastLogin: "30 minutes ago",
    avatar: "TW",
  },
  {
    id: "8",
    name: "Nina Rodriguez",
    email: "nina@email.com",
    phone: "+1 234 567 8907",
    joinDate: "2024-03-01",
    totalBookings: 15,
    totalSpent: "$375.00",
    status: "Active",
    lastLogin: "1 hour ago",
    avatar: "NR",
  },
];

const Users: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Banned":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <UserCheck size={12} />;
      case "Inactive":
        return <User size={12} />;
      case "Banned":
        return <UserX size={12} />;
      default:
        return <User size={12} />;
    }
  };

  const filteredUsers = usersData.filter((user) => {
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (user: UserData) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Wrapper Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor all registered users
          </p>
        </div>

        {/* Add User Button - Mobile (above search) */}
        {isMobile && (
          <div className="mb-6">
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Add User
            </button>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Banned">Banned</option>
          </select>

          {/* Add User Button - Desktop */}
          {!isMobile && (
            <button className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Add User
            </button>
          )}
        </div>

        {/* Desktop Table */}
        {!isMobile ? (
          <div className="overflow-x-auto rounded-xl border border-gray-200/50">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    User
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Join Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Bookings
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Total Spent
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {user.avatar}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail size={12} />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Phone size={12} />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(user.joinDate)}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {user.totalBookings}
                    </td>
                    <td className="py-3 px-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                      {user.totalSpent}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {getStatusIcon(user.status)}
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(user)}
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
        ) : (
          /* Mobile Card View */
          <div className="space-y-4">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {user.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {getStatusIcon(user.status)}
                    {user.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    <span>Joined {formatDate(user.joinDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <span>{user.totalBookings} bookings</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-gray-900">
                      <DollarSign size={14} />
                      <span>{user.totalSpent}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleViewDetails(user)}
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
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && selectedUser && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              onClick={closeModal}
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
                  User Details
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                {/* User Info */}
                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {selectedUser.avatar}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedUser.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedUser.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Phone: {selectedUser.phone}</p>
                    <p>Last Login: {selectedUser.lastLogin}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Join Date
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {formatDate(selectedUser.joinDate)}
                    </p>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign size={16} className="text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Total Spent
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedUser.totalSpent}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Total Bookings
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {selectedUser.totalBookings}
                  </p>
                </div>

                {/* Status */}
                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Status
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        selectedUser.status
                      )}`}
                    >
                      {getStatusIcon(selectedUser.status)}
                      {selectedUser.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-sm font-medium">
                    Edit User
                  </button>
                  <button className="flex-1 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors text-sm font-medium">
                    Delete User
                  </button>
                  <button
                    onClick={closeModal}
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
    </div>
  );
};

export default Users;
