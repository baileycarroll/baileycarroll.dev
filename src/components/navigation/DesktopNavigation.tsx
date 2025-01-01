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
          "relative block px-3 py-2 transition",
          isActive ? "text-cyan-500" : "hover:text-cyan-500"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-cyan-500/0" />
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
      <ListNoneHorizontal className="flex rounded-full bg-slate-800/80 px-3 text-md font-medium shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-800/5 backdrop-blur">
        <NavItem href={"/"}>Home</NavItem>
        <NavItem href={"/about"}>About</NavItem>
        <NavItem href={"/resume"}>Resume</NavItem>
        <NavItem href={"/projects"}>Projects</NavItem>
        {/* <NavItem href={"/articles"}>Articles</NavItem> */}
        <div className="flex items-center ml-2">
          <Menu as="div" className="relative inline-block text-center">
            <div>
              <Menu.Button className="inline-flex justify-center hover:text-cyan-500 hover:cursor-pointer">
                Author{"'"}s Corner
                <ChevronDownIcon className="w-4 mx-2 my-auto" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 top-8 mt-2 w-36 rounded-xl shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      <NavItem href={"/books"}>Books</NavItem>
                    </Menu.Item>
                    <Menu.Item>
                      <NavItem href={"/articles"}>Articles</NavItem>
                    </Menu.Item>
                    <Menu.Item>
                      <NavItem href={"/poetry"}>Poetry</NavItem>
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
