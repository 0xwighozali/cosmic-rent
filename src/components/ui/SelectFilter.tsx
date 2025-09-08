"use client";
import React from "react";

interface SelectFilterProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  value,
  onChange,
  options,
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="px-4 py-3 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm 
      focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm min-w-[140px]"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default SelectFilter;
