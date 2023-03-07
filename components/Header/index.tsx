"use client";

import { cls } from "@/utils/utl";
import Image from "next/image";
import React from "react";


const NAV_MENU = [
  {
    id: 1,
    slug: "/blog",
    title: "Blog"
  },
  {
    id: 2,
    slug: "/socials",
    title: "Socials"
  },
  {
    id: 3,
    slug: "/past-socials",
    title: "Past Socials"
  },
  {
    id: 4,
    slug: "/clubs",
    title: "Clubs",
    children: [
      {
        id: 6,
        slug: "/club/club-1",
        title: "Club 1"
      },
      {
        id: 7,
        slug: "/club/club-2",
        title: "Club 2"
      },
    ]
  },
  {
    id: 5,
    slug: "/contact",
    title: "Contact"
  }
]
const IS_STICK_NAV = false;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return <header className={cls("flex items-center justify-center mx-auto max-w-screen-xl h-[80px]", IS_STICK_NAV ? "sticky top-0" : "")}>
    <nav className="container flex items-center justify-between px-[32px] py-0">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img className="h-8 w-auto" src="/static/media/supermomos.png" alt="" />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          MORE
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {NAV_MENU.map(menu => <div key={`nav-menu-${menu.id}`}
          className="flex items-center justify-center"
        >
          <a
            href="#"
            className="text-base font-semibold text-[#333333] hover:text-gray-400"
          >
            {menu.title}
          </a>
          {(menu.children?.length || 0) === 0 ? null : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="#333333" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
          </svg>}
        </div>)}
      </div>
    </nav>
    <div className={cls("lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
      <div className="fixed inset-0 z-10" />
      <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            x
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {NAV_MENU.map(menu => <a key={`menu-mobile-${menu.id}`}
                href="#"
                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {menu.title}
              </a>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  // return <header className="abcd">
  //   <div>
  //     <div>
  //       <Image
  //         className=""
  //         src="/next.svg"
  //         alt="Next.js Logo"
  //         width={180}
  //         height={37}
  //         priority
  //       />
  //     </div>
  //   </div>
  // </header>

}

export default Header;