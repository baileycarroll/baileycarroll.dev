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
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-0.5 bg-primary rounded-full" />
        )}
      </Link>
    </li>
  );
}

export default function DesktopNavigation(
  props: React.ComponentPropsWithoutRef<"nav">
) {
  return (
    <nav {...props}>
      <ListNoneHorizontal className="flex rounded-full bg-neutral-800/30 backdrop-blur-sm px-2 py-1 text-sm font-medium border border-primary/20 shadow-lg shadow-primary/5">
        <NavItem href={"/"}>Home</NavItem>
        <NavItem href={"/about"}>About</NavItem>
        <NavItem href={"/resume"}>Resume</NavItem>
        <NavItem href={"/projects"}>Projects</NavItem>
        <div className="flex items-center">
          <Menu as="div" className="relative inline-block text-center">
            <div>
              <Menu.Button className="inline-flex items-center justify-center px-4 py-2 transition-all duration-200 font-medium text-neutral-300 hover:text-primary hover:bg-primary/5 rounded-full">
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
                <Menu.Items className="absolute right-0 top-full mt-2 w-40 rounded-xl shadow-lg bg-neutral-800/90 backdrop-blur-sm border border-primary/20 focus:outline-none z-50">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/articles"
                          className={clsx(
                            "block px-4 py-2 text-sm transition-colors duration-200",
                            active ? "bg-primary/10 text-primary" : "text-neutral-300 hover:text-primary"
                          )}
                        >
                          Articles
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/books"
                          className={clsx(
                            "block px-4 py-2 text-sm transition-colors duration-200",
                            active ? "bg-primary/10 text-primary" : "text-neutral-300 hover:text-primary"
                          )}
                        >
                          Books
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/poetry"
                          className={clsx(
                            "block px-4 py-2 text-sm transition-colors duration-200",
                            active ? "bg-primary/10 text-primary" : "text-neutral-300 hover:text-primary"
                          )}
                        >
                          Poetry
                        </Link>
                      )}
                    </Menu.Item>
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
