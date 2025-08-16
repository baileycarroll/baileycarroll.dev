"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListNoneHorizontal } from "@/components/lists/UnorderedLists";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isActive = usePathname() === href;
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative block px-4 py-2 transition-all duration-200 font-medium",
          isActive 
            ? "text-primary" 
            : "text-neutral-300 hover:text-primary hover:bg-primary/5"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-0.5 bg-primary rounded-full" />
        )}
      </Link>
    </li>
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
            "block px-4 py-2 text-sm transition-colors duration-200 relative",
            isActive 
              ? "bg-primary/10 text-primary" 
              : active 
                ? "bg-primary/5 text-primary" 
                : "text-neutral-300 hover:text-primary"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          {children}
          {isActive && (
            <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full" />
          )}
        </Link>
      )}
    </Menu.Item>
  );
}

export default function DesktopNavigation(
  props: React.ComponentPropsWithoutRef<"nav">
) {
  const pathname = usePathname();
  const isDropdownActive = ["/articles", "/books", "/poetry"].includes(pathname);
  
  return (
    <nav {...props} role="navigation" aria-label="Main navigation">
      <ListNoneHorizontal className="flex rounded-full bg-neutral-800/30 backdrop-blur-sm px-2 py-1 text-sm font-medium border border-primary/20 shadow-lg shadow-primary/5">
        <NavItem href={"/"}>Home</NavItem>
        <NavItem href={"/about"}>About</NavItem>
        <NavItem href={"/resume"}>Resume</NavItem>
        <NavItem href={"/projects"}>Projects</NavItem>
        <div className="flex items-center">
          <Menu as="div" className="relative inline-block text-center">
            <div>
              <Menu.Button 
                className={clsx(
                  "inline-flex items-center justify-center px-4 py-2 transition-all duration-200 font-medium rounded-full",
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
                  className="absolute right-0 top-full mt-2 w-40 rounded-xl shadow-lg bg-neutral-800/90 backdrop-blur-sm border border-primary/20 focus:outline-none z-50"
                  role="menu"
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
        </div>
      </ListNoneHorizontal>
    </nav>
  );
}
