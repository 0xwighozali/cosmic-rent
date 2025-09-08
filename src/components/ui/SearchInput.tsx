"use client";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <div className="flex-1 relative">
    <Search
      size={20}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm 
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm"
    />
  </div>
);

export default SearchInput;
