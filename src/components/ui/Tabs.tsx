"use client";
import React from "react";

interface TabsProps<T extends string> {
  options: T[];
  active: T;
  onChange: (val: T) => void;
}

const Tabs = <T extends string>({
  options,
  active,
  onChange,
}: TabsProps<T>) => (
  <div className="flex gap-1 bg-gray-100/50 rounded-2xl p-1 w-fit">
    {options.map((tab) => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`py-3 px-6 rounded-xl text-sm font-medium transition-all duration-200 ${
          active === tab
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default Tabs;
