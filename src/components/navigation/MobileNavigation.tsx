"use client";

import Link from "next/link";
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { ListNone } from "../lists/UnorderedLists";

function MobileNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <PopoverButton
        as={Link}
        href={href}
        className={"block py-2 hover:bg-slate-600/40 rounded-lg px-5"}
      >
        {children}
      </PopoverButton>
    </li>
  );
}

export default function MobileNavigation(
  props: React.ComponentPropsWithoutRef<typeof Popover>
) {
  return (
    <Popover {...props}>
      <PopoverButton className="group flex items-center rounded-full bg-slate-800/50 px-4 py-2 text-md font-medium text-slate-300 shadow-md shadow-cyan-800 backdrop-blur">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-slate-950 p-8 ring-1 ring-cyan-800/5 duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      >
        <div className="flex flex-row-reverse items-center justify-between">
          <PopoverButton aria-label="Close Navigation" className="-m-1 p-1">
            <XMarkIcon className="h-6 w-6 text-cyan-500" />
          </PopoverButton>
          <h2 className="text-sm font-medium ml-5">Navigation</h2>
        </div>
        <nav className="mt-6">
          <ListNone className="-my2 divide-7 divide-cyan-800 text-base">
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
