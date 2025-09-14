"use client";

import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { logout } = useAuthStore();
  const auth = useAuthStore();
  const [activeHref, setActiveHref] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    setActiveHref(href);
  };

  const onLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div
      className={`navbar fixed font-bold shadow-sm transition duration-300 left-0 top-0 z-99 px-10 bg-teal-700 text-gray-200`}
    >
      <div className="navbar-start gap-5"></div>
      <div className="navbar-end hidden lg:flex">
        {auth?.username && (
          <div className="dropdown dropdown-end ml-auto">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-md avatar flex"
            >
              <div className="w-7 rounded-full">
                <FaUserCircle className="w-full h-full" />
              </div>
              <span className="ml-1 my-auto">
                {auth?.username.split(" ")[0]}
              </span>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-teal-700 rounded-box z-1 mt-3 w-52 p-2 shadow text-gray-200"
            >
              <li>
                <Link href={"/app/profile"}>Profile</Link>
              </li>
              <li>
                <button onClick={() => onLogout()}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
