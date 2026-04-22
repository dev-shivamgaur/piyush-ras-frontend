import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { BsInfoCircle } from "react-icons/bs";
import { RiBook3Line } from "react-icons/ri";

function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-[#321a07f4] px-4 sm:px-8 py-3 flex items-center justify-between shadow-md font-[Poppins] font-extrabold text-white text-xl">
      
      {/* Logo */}
      <Link to="/">
        <img src="/logo.jpeg" alt="logo" className="w-12 h-12 rounded-full" />
      </Link>

      {/* Navigation */}
      <nav className="flex space-x-7 sm:space-x-10 text-sm font-medium">

        {/* Kavita Page */}
        <Link to="/allKavita">
          <RiBook3Line
            className={`w-5 h-5 sm:w-6 sm:h-6 transition 
              ${isActive("/allKavita") ? "text-yellow-400" : "text-white hover:text-yellow-300"}
            `}
          />
        </Link>

        {/* About Page */}
        <Link to="/about">
          <BsInfoCircle
            className={`w-5 h-5 sm:w-6 sm:h-6 transition 
              ${isActive("/about") ? "text-yellow-400" : "text-white hover:text-yellow-300"}
            `}
          />
        </Link>

        {/* Profile Page */}
        <Link to="/profiledashboard">
          <GoPerson
            className={`w-5 h-5 sm:w-6 sm:h-6 transition 
              ${isActive("/login") ? "text-yellow-400" : "text-white hover:text-yellow-300"}
            `}
          />
        </Link>

      </nav>
    </header>
  );
}

export default Header;