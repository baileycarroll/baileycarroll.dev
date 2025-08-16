"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isActive = usePathname() === href;
  return (
    <Link
      href={href}
      className={clsx(
        "relative px-4 py-2 transition-all duration-200 font-medium rounded-lg",
        isActive 
          ? "text-primary bg-primary/10" 
          : "text-neutral-300 hover:text-primary hover:bg-primary/5"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

function MobileNavItem({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const isActive = usePathname() === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "block py-3 px-4 transition-all duration-200 font-medium rounded-lg",
        isActive 
          ? "text-primary bg-primary/10" 
          : "text-neutral-300 hover:text-primary hover:bg-primary/5"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

function DropdownItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isActive = usePathname() === href;
  
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={href}
          className={clsx(
            "block px-4 py-2 text-sm transition-colors duration-200",
            isActive 
              ? "bg-primary/10 text-primary" 
              : active 
                ? "bg-primary/5 text-primary" 
                : "text-neutral-300 hover:text-primary"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          {children}
        </Link>
      )}
    </Menu.Item>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isDropdownActive = ["/articles", "/books", "/poetry"].includes(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <>
      <motion.header 
        className="w-full bg-neutral-800/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50"
        role="banner"
        aria-label="Site header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white hover:text-primary transition-colors">
                Bailey Carroll
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2" role="navigation" aria-label="Main navigation">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/about">About</NavItem>
              <NavItem href="/resume">Resume</NavItem>
              <NavItem href="/projects">Projects</NavItem>
              
              {/* Dropdown Menu */}
              <Menu as="div" className="relative inline-block text-center">
                <div>
                  <Menu.Button 
                    className={clsx(
                      "inline-flex items-center justify-center px-4 py-2 transition-all duration-200 font-medium rounded-lg",
                      isDropdownActive
                        ? "text-primary bg-primary/10"
                        : "text-neutral-300 hover:text-primary hover:bg-primary/5"
                    )}
                    aria-label="More navigation options"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    More
                    <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform duration-200 ui-open:rotate-180" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items 
                      className="absolute right-0 top-full mt-2 w-40 rounded-xl shadow-lg bg-neutral-800/90 backdrop-blur-sm border border-primary/20 focus:outline-none z-[var(--z-dropdown)]"
                      aria-label="More navigation menu"
                    >
                      <div className="py-1" role="none">
                        <DropdownItem href="/articles">Articles</DropdownItem>
                        <DropdownItem href="/books">Books</DropdownItem>
                        <DropdownItem href="/poetry">Poetry</DropdownItem>
                      </div>
                    </Menu.Items>
                  </Transition>
                </div>
              </Menu>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-neutral-300 hover:text-primary hover:bg-primary/5 transition-colors"
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
            className="fixed inset-0 bg-neutral-950/50 backdrop-blur-sm z-40 md:hidden"
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
            className="fixed top-0 right-0 h-full w-80 bg-neutral-800/95 backdrop-blur-md border-l border-primary/20 z-50 md:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold text-white">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-neutral-400 hover:text-primary hover:bg-primary/5 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                <MobileNavItem href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavItem>
                <MobileNavItem href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavItem>
                <MobileNavItem href="/resume" onClick={() => setIsMobileMenuOpen(false)}>Resume</MobileNavItem>
                <MobileNavItem href="/projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</MobileNavItem>
                <MobileNavItem href="/articles" onClick={() => setIsMobileMenuOpen(false)}>Articles</MobileNavItem>
                <MobileNavItem href="/books" onClick={() => setIsMobileMenuOpen(false)}>Books</MobileNavItem>
                <MobileNavItem href="/poetry" onClick={() => setIsMobileMenuOpen(false)}>Poetry</MobileNavItem>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
