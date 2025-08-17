"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HomeIcon,
  DocumentTextIcon,
  BookOpenIcon,
  FolderIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSection {
  name: string;
  items: NavItem[];
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavSection[] = [
  {
    name: "Overview",
    icon: HomeIcon,
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
    ]
  },
  {
    name: "Content",
    icon: DocumentTextIcon,
    items: [
      { name: "Articles", href: "/admin/articles", icon: DocumentTextIcon },
      { name: "Poems", href: "/admin/poems", icon: BookOpenIcon },
      { name: "Projects", href: "/admin/projects", icon: FolderIcon },
    ]
  },
  {
    name: "Data",
    icon: WrenchScrewdriverIcon,
    items: [
      { name: "Skills", href: "/admin/skills", icon: WrenchScrewdriverIcon },
      { name: "Experiences", href: "/admin/experiences", icon: BriefcaseIcon },
    ]
  },
  {
    name: "System",
    icon: Cog6ToothIcon,
    items: [
      { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Overview', 'Content', 'Data']);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === '/admin/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      className="admin-sidebar bg-neutral-900/60 backdrop-blur-xl border-r border-primary/20 h-full w-64"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="h-full flex flex-col">
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-2 px-3">
            {navigation.map((section) => {
              const isExpanded = expandedSections.includes(section.name);
              const hasActiveItem = section.items.some(item => isActive(item.href));

              return (
                <div key={section.name} className="space-y-1">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.name)}
                    className={clsx(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      hasActiveItem 
                        ? "text-primary bg-primary/10" 
                        : "text-neutral-300 hover:text-primary hover:bg-neutral-800/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="w-5 h-5" />
                      <span>{section.name}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 0 : -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDownIcon className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Section Items */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1 ml-4"
                      >
                        {section.items.map((item) => {
                          const active = isActive(item.href);
                          
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={clsx(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                active
                                  ? "text-primary bg-primary/20 border border-primary/30"
                                  : "text-neutral-400 hover:text-primary hover:bg-neutral-800/30"
                              )}
                            >
                              <item.icon className="w-4 h-4" />
                              <span className="flex-1">{item.name}</span>
                              {item.badge && (
                                <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-primary/20">
          <div className="text-xs text-neutral-500 text-center">
            Admin Portal v1.0
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
