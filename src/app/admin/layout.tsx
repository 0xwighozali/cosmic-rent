// app/(admin)/layout.tsx
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <LayoutWrapper>{children}</LayoutWrapper>
    </div>
  );
}
