"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

const PRIMARY_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
];

function ActiveGlowPill({
  layoutId,
  variant = "mobile",
}: {
  layoutId: string;
  variant?: "desktop" | "mobile";
}) {
  const isDesktop = variant === "desktop";

  return (
    <motion.span
      layoutId={layoutId}
      className={clsx(
        "pointer-events-none absolute inset-x-2",
        isDesktop ? "bottom-0 h-5" : "bottom-1 h-4"
      )}
      transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.65 }}
    >
      <span
        className={clsx(
          "absolute inset-x-0 rounded-full",
          isDesktop
            ? "bottom-0 h-[2px] bg-primary/75"
            : "bottom-0 h-[3px] bg-primary/80"
        )}
      />
      <span
        className={clsx(
          "absolute inset-x-0 rounded-full blur-md",
          isDesktop
            ? "bottom-0 h-5 bg-gradient-to-t from-primary/45 via-primary/16 to-transparent"
            : "bottom-0 h-4 bg-gradient-to-t from-primary/35 via-primary/12 to-transparent"
        )}
      />
    </motion.span>
  );
}

function NavItem({
  href,
  children,
  layoutId,
}: {
  href: string;
  children: React.ReactNode;
  layoutId: string;
}) {
  const isActive = usePathname() === href;
  return (
    <Link
      href={href}
      className={clsx(
        "relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:text-primary",
        isActive 
          ? "text-primary" 
          : "text-neutral-300 hover:text-primary"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="relative z-10">{children}</span>
      {isActive && <ActiveGlowPill layoutId={layoutId} variant="desktop" />}
    </Link>
  );
}

function MobileNavItem({
  href,
  children,
  onClick,
  layoutId,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  layoutId: string;
}) {
  const isActive = usePathname() === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "relative block py-3 px-4 text-base font-medium transition-colors duration-200 rounded-xl focus-visible:outline-none focus-visible:text-primary",
        isActive 
          ? "text-primary" 
          : "text-neutral-300 hover:text-primary"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="relative z-10">{children}</span>
      {isActive && <ActiveGlowPill layoutId={layoutId} />}
    </Link>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  return (
    <>
      <motion.header 
        className="w-full bg-neutral-900/40 backdrop-blur-xl border-b border-primary/10 sticky top-0 z-50"
        role="banner"
        aria-label="Site header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white hover:text-primary transition-colors">
                Bailey Carroll
              </Link>
            </div>
            
            <nav className="hidden lg:flex items-center justify-center space-x-2" role="navigation" aria-label="Main navigation">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <NavItem key={item.href} href={item.href} layoutId="desktop-nav-pill">
                  {item.label}
                </NavItem>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden justify-self-end">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-neutral-300 hover:text-primary hover:bg-neutral-800/30 hover:shadow-md hover:shadow-primary/10 transition-all duration-200 backdrop-blur-sm"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-neutral-900/60 backdrop-blur-2xl border-l border-primary/10 shadow-2xl shadow-primary/20 z-50 lg:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold text-white">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-neutral-400 hover:text-primary hover:bg-neutral-800/30 hover:shadow-md hover:shadow-primary/10 transition-all duration-200 backdrop-blur-sm"
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                {PRIMARY_NAV_ITEMS.map((item) => (
                  <MobileNavItem
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    layoutId="mobile-nav-pill"
                  >
                    {item.label}
                  </MobileNavItem>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
