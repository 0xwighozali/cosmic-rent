"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  X,
  Coffee,
  Utensils,
  Cookie,
  DollarSign,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FoodData {
  id: string;
  name: string;
  category: "Makanan" | "Minuman" | "Snack";
  price: string;
  stock: number;
  status: "Available" | "Out of Stock" | "Discontinued";
  description?: string;
  image?: string;
  sold: number;
}

const foodData: FoodData[] = [
  {
    id: "1",
    name: "Nasi Goreng Spesial",
    category: "Makanan",
    price: "$8.50",
    stock: 15,
    status: "Available",
    description: "Nasi goreng dengan telur, ayam, dan sayuran",
    sold: 45,
  },
  {
    id: "2",
    name: "Mie Ayam",
    category: "Makanan",
    price: "$6.00",
    stock: 0,
    status: "Out of Stock",
    description: "Mie ayam dengan bakso dan pangsit",
    sold: 32,
  },
  {
    id: "3",
    name: "Burger Beef",
    category: "Makanan",
    price: "$12.00",
    stock: 8,
    status: "Available",
    description: "Burger daging sapi dengan keju dan sayuran",
    sold: 28,
  },
  {
    id: "4",
    name: "Es Teh Manis",
    category: "Minuman",
    price: "$2.50",
    stock: 25,
    status: "Available",
    description: "Teh manis dingin segar",
    sold: 89,
  },
  {
    id: "5",
    name: "Jus Jeruk",
    category: "Minuman",
    price: "$4.00",
    stock: 12,
    status: "Available",
    description: "Jus jeruk segar tanpa gula tambahan",
    sold: 56,
  },
  {
    id: "6",
    name: "Kopi Hitam",
    category: "Minuman",
    price: "$3.50",
    stock: 0,
    status: "Out of Stock",
    description: "Kopi hitam premium",
    sold: 67,
  },
  {
    id: "7",
    name: "Keripik Kentang",
    category: "Snack",
    price: "$3.00",
    stock: 20,
    status: "Available",
    description: "Keripik kentang rasa original",
    sold: 78,
  },
  {
    id: "8",
    name: "Coklat Bar",
    category: "Snack",
    price: "$2.00",
    stock: 30,
    status: "Available",
    description: "Coklat batang premium",
    sold: 92,
  },
  {
    id: "9",
    name: "Kacang Goreng",
    category: "Snack",
    price: "$2.50",
    stock: 0,
    status: "Discontinued",
    description: "Kacang goreng pedas manis",
    sold: 23,
  },
];

const Food: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "All" | "Makanan" | "Minuman" | "Snack"
  >("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodData | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle status filter change and update active tab accordingly
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);

    // Update active tab based on status filter
    switch (status) {
      case "All":
        setActiveTab("All");
        break;
      case "Available":
      case "Out of Stock":
      case "Discontinued":
        // Keep current tab when filtering by status
        break;
      default:
        setActiveTab("All");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Out of Stock":
        return "bg-red-100 text-red-800 border-red-200";
      case "Discontinued":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Available":
        return <Package size={12} />;
      case "Out of Stock":
        return <X size={12} />;
      case "Discontinued":
        return <X size={12} />;
      default:
        return <Package size={12} />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Makanan":
        return <Utensils size={16} className="text-orange-600" />;
      case "Minuman":
        return <Coffee size={16} className="text-blue-600" />;
      case "Snack":
        return <Cookie size={16} className="text-purple-600" />;
      default:
        return <Package size={16} className="text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Makanan":
        return "bg-orange-500";
      case "Minuman":
        return "bg-blue-500";
      case "Snack":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredFood = foodData.filter((food) => {
    let matchesTab = false;

    if (activeTab === "All") {
      matchesTab = true;
    } else {
      matchesTab = food.category === activeTab;
    }

    const matchesStatus =
      statusFilter === "All" || food.status === statusFilter;
    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesStatus && matchesSearch;
  });

  const handleViewDetails = (food: FoodData) => {
    setSelectedFood(food);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFood(null);
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
            Food Menu Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor all food menu items
          </p>
        </div>

        {/* Add Food Menu Button - Mobile (above tabs) */}
        {isMobile && (
          <div className="mb-6">
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Add Food Menu
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-1 bg-gray-100/50 rounded-2xl p-1 w-fit">
            {(["All", "Makanan", "Minuman", "Snack"] as const).map((tab) => (
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
            ))}
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
              placeholder="Search by food name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm min-w-[140px]"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Discontinued">Discontinued</option>
          </select>

          {/* Add Food Menu Button - Desktop */}
          {!isMobile && (
            <button className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 text-sm font-medium shadow-sm">
              <Plus size={16} />
              Add Food Menu
            </button>
          )}
        </div>

        {/* Desktop Table */}
        {!isMobile ? (
          <div className="overflow-hidden rounded-xl border border-gray-200/50">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Food Item
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
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
                {filteredFood.map((food, index) => (
                  <motion.tr
                    key={food.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {food.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {food.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 ${getCategoryColor(
                            food.category
                          )} rounded-full`}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">
                          {food.category}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-bold text-gray-900">
                        {food.price}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">
                        <div className="font-medium">{food.stock} items</div>
                        <div className="text-xs text-gray-500">
                          {food.sold} sold
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          food.status
                        )}`}
                      >
                        {getStatusIcon(food.status)}
                        {food.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(food)}
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
            {filteredFood.map((food, index) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${getCategoryColor(
                        food.category
                      )} rounded-xl flex items-center justify-center`}
                    >
                      {getCategoryIcon(food.category)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {food.name}
                      </p>
                      <p className="text-xs text-gray-500">{food.category}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      food.status
                    )}`}
                  >
                    {getStatusIcon(food.status)}
                    {food.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign size={14} />
                    <span className="font-bold">{food.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package size={14} />
                    <span>
                      {food.stock} in stock • {food.sold} sold
                    </span>
                  </div>
                  {food.description && (
                    <p className="text-xs text-gray-500">{food.description}</p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleViewDetails(food)}
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
        {filteredFood.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Utensils size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No food items found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && selectedFood && (
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
                  Food Item Details
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Food Info */}
                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(
                        selectedFood.category
                      )} rounded-xl flex items-center justify-center`}
                    >
                      {getCategoryIcon(selectedFood.category)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedFood.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedFood.category}
                      </p>
                    </div>
                  </div>
                  {selectedFood.description && (
                    <p className="text-sm text-gray-600">
                      {selectedFood.description}
                    </p>
                  )}
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign size={16} className="text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Price
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedFood.price}
                    </p>
                  </div>
                  <div className="bg-gray-50/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Package size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Stock
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedFood.stock} items
                    </p>
                  </div>
                </div>

                {/* Sales Info */}
                <div className="bg-gray-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingCart size={16} className="text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Sales
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {selectedFood.sold} sold
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
                        selectedFood.status
                      )}`}
                    >
                      {getStatusIcon(selectedFood.status)}
                      {selectedFood.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-sm font-medium">
                    Edit Item
                  </button>
                  <button className="flex-1 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors text-sm font-medium">
                    Delete Item
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

export default Food;
