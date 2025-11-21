import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full mt-10">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">

        {/* Brand */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-white">Mohan's Store</h2>
          <p className="text-sm text-gray-400">Shop the best products online</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Link to={'/'} className="hover:text-white transition">Home</Link>
          <Link href="/shop" className="hover:text-white transition">Shop</Link>
          <Link href="/categories" className="hover:text-white transition">Categories</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <FaFacebookF className="hover:text-white cursor-pointer transition" />
          <FaInstagram className="hover:text-white cursor-pointer transition" />
          <FaTwitter className="hover:text-white cursor-pointer transition" />
          <FaLinkedinIn className="hover:text-white cursor-pointer transition" />
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-6">
        <p className="text-center text-gray-500 text-sm py-4">
          © {new Date().getFullYear()} Mohan's Store. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
