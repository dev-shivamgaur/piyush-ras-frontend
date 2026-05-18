import React from "react";
import { FaInstagram, FaLinkSlash } from "react-icons/fa6";
import { RiHomeSmileLine } from "react-icons/ri";
import { LuSparkles } from "react-icons/lu";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { MdAttachEmail } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className=" bg-[#120c08] text-[#f2d9a6]">

            {/* Top Section */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <div className="flex items-center cursor-pointer">
                        <div className="text-xl font-bold tracking-wide mr-2 ml-0">
                            <Link
                                to="/"
                            >
                                <img src="/logo.jpeg" alt="logo" className="w-14 h-14 sm:w-18 sm:h-18 rounded-full" />
                            </Link>
                        </div>
                        <h1 className="text-2xl font-bold mb-3">Piyush Ras</h1>
                    </div>
                    <p className="text-sm text-[#caa56a] mt-1">
                        कविता के पियूष रूपी रस से कभी अपने मन की प्यास बुझाना तो कभी उसमें भीग जाना...
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <div className="flex items-center gap-x-3">
                        <FaLinkSlash className="w-8 h-8" />
                        <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
                    </div>
                    <div className=" mt-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-y-3">
                        <Link
                            to="/"
                        >
                            <div className="hover:text-white cursor-pointer flex items-center gap-2">
                                <RiHomeSmileLine className="w-5 h-5 sm:w-6 sm:h-6" />
                                <h3>Home</h3>
                            </div>
                        </Link>
                        <Link
                            to="/"
                        >
                            <div className="hover:text-white cursor-pointer flex items-center gap-2">
                                <LuSparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                                <h3>Latest</h3>
                            </div>
                        </Link>
                        <Link
                            to="/about"
                        >
                            <div className="hover:text-white cursor-pointer flex items-center gap-2">
                                <BsInfoCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                                <h3>About</h3>
                            </div>
                        </Link>
                        <Link
                            to="/allKavita"
                        >
                            <div className="hover:text-white cursor-pointer flex items-center gap-2">
                                <MdOutlineCategory className="w-5 h-5 sm:w-6 sm:h-6" />
                                <h3>Category</h3>
                            </div>
                        </Link>
                    </div>

                </div>

                {/* Social / Contact */}
                <div>
                    <div className="flex items-center">
                        <MdOutlineConnectWithoutContact className="h-8 w-8" />
                        <h2 className="text-lg font-semibold mb-3">Connect</h2>
                    </div>
                    <div className=" mt-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-y-3">
                        <div className="hover:text-white cursor-pointer flex items-center gap-2">
                            <MdAttachEmail className="w-5 h-5 sm:w-6 sm:h-6" />
                            <h3>Email</h3>
                        </div>
                        <div className="hover:text-white cursor-pointer flex items-center gap-2">
                            <a
                                className="flex items-center gap-2 "
                                href="https://www.instagram.com/piyushras_kavya/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
                                <h3>Instagram</h3>
                            </a>
                        </div>
                        <div className="hover:text-white cursor-pointer flex items-center gap-2">
                            <BsTwitterX className="w-5 h-5 sm:w-6 sm:h-6 " />
                            <h3>Twitter</h3>
                        </div>
                        <div className="hover:text-white cursor-pointer flex items-center gap-2" >
                        <a
                                className="flex items-center gap-2 "
                                href="https://www.youtube.com/@PiyushRasKavya"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                            <IoLogoYoutube className="w-5 h-5 sm:w-6 sm:h-6" />
                            <h3>Youtube</h3>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Section */}
            <div className="border-t border-[#2b1b14] text-center py-4 text-sm text-[#caa56a]">
                © {new Date().getFullYear()} Piyush Ras. All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;