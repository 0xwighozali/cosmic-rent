// components/layout/LayoutWrapper.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();
  const getPageTitle = (path: string) => {
    const routeTitles: { [key: string]: string } = {
      "/admin": "Dashboard",
      "/admin/rents": "Rents",
      "/admin/booking": "Booking",
      "/admin/users": "Users",
      "/admin/room": "Room",
      "/admin/food": "Food",
      "/admin/console": "Console",
      "/admin/controller": "Controller",
      "/admin/tv": "TV",
      "/admin/transaction": "Transaction",
      "/admin/analysis-report": "Analysis & Report",
      "/admin/settings": "Settings",
    };
    return routeTitles[path] || "Cosmic Admin";
  };
  const currentPageTitle = getPageTitle(pathname);

  // Logic untuk mobile resize dan scroll
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY) {
          setNavbarVisible(false);
        } else {
          setNavbarVisible(true);
        }
      } else {
        setNavbarVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    if (isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile, lastScrollY]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex">
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col">
        <Navbar
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          isVisible={navbarVisible}
          sidebarOpen={sidebarOpen}
          currentPage={currentPageTitle}
        />
        <main
          className={`min-h-screen transition-all duration-300 ${
            !isMobile ? (sidebarOpen ? "ml-64" : "ml-20") : "ml-0"
          } pt-[73px]`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
