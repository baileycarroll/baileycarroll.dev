"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

export default function AdminHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.header 
      className="w-full bg-neutral-900/80 backdrop-blur-xl border-b border-primary/20 sticky top-0 z-50"
      role="banner"
      aria-label="Admin header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="h-16 flex items-center px-6">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Admin Logo/Branding */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <Link href="/admin" className="text-xl font-bold text-white hover:text-primary transition-colors">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex justify-center flex-1 mx-8">
          <div className="relative w-96">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-base"
            />
          </div>
        </div>

        {/* Right Section - User Menu */}
        <div className="relative flex-shrink-0" ref={userMenuRef}>
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="p-2 rounded-lg text-neutral-300 hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="User menu"
          >
            <UserCircleIcon className="w-6 h-6" />
          </button>

          {/* User Dropdown Menu */}
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-48 bg-neutral-800/90 backdrop-blur-xl border border-primary/20 rounded-lg shadow-xl z-50"
              >
                <div className="py-2">
                  <Link
                    href="/"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <GlobeAltIcon className="w-4 h-4" />
                    <span>Visit Site</span>
                  </Link>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      // TODO: Implement logout functionality
                      console.log('Logout clicked');
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-300 hover:text-red-400 hover:bg-red-400/10 transition-colors w-full"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
