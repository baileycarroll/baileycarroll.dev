"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { ListNone } from "../lists/UnorderedLists";
import clsx from "clsx";

function MobileNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isActive = usePathname() === href;
  
  return (
    <li>
      <PopoverButton
        as={Link}
        href={href}
        className={clsx(
          "block py-3 px-6 transition-all duration-200 font-medium rounded-lg relative",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-neutral-300 hover:bg-neutral-800/50 hover:text-primary"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
        {isActive && (
          <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full" />
        )}
      </PopoverButton>
    </li>
  );
}

export default function MobileNavigation(
  props: React.ComponentPropsWithoutRef<typeof Popover>
) {
  return (
    <Popover {...props}>
      <PopoverButton 
        className="group flex items-center rounded-full bg-neutral-800/30 backdrop-blur-sm px-4 py-2 text-sm font-medium text-neutral-300 border border-primary/20 shadow-lg shadow-primary/5 transition-all duration-200 hover:bg-neutral-800/50 hover:border-primary/30"
        aria-label="Open navigation menu"
        aria-expanded="false"
        aria-haspopup="true"
      >
        Menu
        <ChevronDownIcon className="ml-2 h-4 w-4 transition-transform duration-200 group-data-[open]:rotate-180" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-sm duration-200 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
        aria-hidden="true"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-20 z-50 origin-top rounded-2xl bg-neutral-800/90 backdrop-blur-sm p-6 border border-primary/20 shadow-xl shadow-primary/10 duration-200 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
      >
        <div className="flex flex-row-reverse items-center justify-between mb-4">
          <PopoverButton 
            aria-label="Close Navigation" 
            className="-m-1 p-1 rounded-lg hover:bg-neutral-700/50 transition-colors duration-200"
          >
            <XMarkIcon className="h-5 w-5 text-neutral-400 hover:text-primary transition-colors duration-200" />
          </PopoverButton>
          <h2 className="text-sm font-semibold text-neutral-200">Navigation</h2>
        </div>
        <nav className="mt-2" role="navigation" aria-label="Mobile navigation">
          <ListNone className="space-y-1" role="menu">
            <MobileNavItem href={"/"}>Home</MobileNavItem>
            <MobileNavItem href={"/about"}>About</MobileNavItem>
            <MobileNavItem href={"/resume"}>Resume</MobileNavItem>
            <MobileNavItem href={"/projects"}>Projects</MobileNavItem>
            <MobileNavItem href={"/articles"}>Articles</MobileNavItem>
            <MobileNavItem href={"/poetry"}>Poetry</MobileNavItem>
            <MobileNavItem href={"/books"}>Books</MobileNavItem>
          </ListNone>
        </nav>
      </PopoverPanel>
    </Popover>
  );
}
