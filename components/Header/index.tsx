"use client";

import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import { cls } from "@/utils/utl";
import React, { useRef, useState } from "react";


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
  const anchorRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useOnClickOutside(anchorRef, () => setMobileMenuOpen(false));

  return <header className={cls("flex-center mx-auto max-w-screen-xl h-[80px]", IS_STICK_NAV ? "sticky top-0" : "")}>
    <nav className="container flex items-center justify-between py-8 px-4 lg:px-8">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <img className="h-8 w-auto" src="/static/media/supermomos.png" alt="" />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <span className="header__toggle-icon"></span>
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {NAV_MENU.map(menu => <div key={`nav-menu-${menu.id}`}
          className="flex-center"
        >
          <a
            href="#"
            className="flex-center text-base font-medium text-gray hover:text-gray-900"
          >
            {menu.title}

            {(menu.children?.length || 0) === 0 ? null : <div className="flex-center ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path className="stroke-gray hover:stroke-gray-900" d="M1 1.5L6 6.5L11 1.5" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>}
          </a>
        </div>)}
      </div>
    </nav>
    <div className={cls("lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
      <div className="fixed inset-0 z-10" />
      <div ref={anchorRef} className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 bg-white">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <div className="flex-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {NAV_MENU.map(menu => <a key={`menu-mobile-${menu.id}`}
                href="#"
                className="-mx-3 flex items-center rounded-lg py-2 px-3 text-base text-gray font-medium leading-7 hover:text-gray-900"
              >
                {menu.title}

                {(menu.children?.length || 0) === 0 ? null : <div className="flex-center ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path className="stroke-gray hover:stroke-gray-900" d="M1 1.5L6 6.5L11 1.5" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>}
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