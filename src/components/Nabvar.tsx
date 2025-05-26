import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Auth from "./Auth";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { navbarLinks } from "../constants/links";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 lg:px-1 text-white shadow-lg relative z-50">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex-shrink-0 ">
          <img src="/src/assets/Image/LogoHero.png" alt="Logo crypto" className="h-16" />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6">
          {navbarLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.href}
              className={({ isActive }) =>
                isActive
                  ? 'text-gray-400 font-semibold'
                  : 'hover:text-gray-400 transition'
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        {/* Auth - Desktop */}
        <div className="hidden md:block ml-4">
          <Auth />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center space-y-6 text-xl z-40">
        <Link to="/" className="flex justify-items-center py-4 ">
          <img src="/src/assets/Image/LogoHero.png" alt="Logo crypto" className="h-26" />
        </Link>

        <button
        className="absolute top-8 right-5 text-white"
        onClick={() => setMenuOpen(false)}
       >
       <IconX size={28} />
       </button>

          {navbarLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.href}
              className="text-white font-semibold transition hover:text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              {link.title}
            </NavLink>
          ))}
          <div className="text-white font-semibold transition-all duration-300 hover:text-gray-700">
            <Auth />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;