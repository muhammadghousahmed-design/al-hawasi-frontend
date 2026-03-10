// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // This function will be used to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-950 text-white">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex justify-between items-center h-16">
      {/* Logo + Al-Hawasi text on LEFT side */}
      <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
        {/* Logo Image */}
        <img
          src="/images/logo2.jpg"
          alt="Al-Hawasi Real Estate"
          className="h-10 w-auto object-contain" // full logo visible, height 40px
        />
        
        {/* Al-Hawasi text – white color, bold */}
        <span className="text-white font-extrabold text-xl tracking-tight">
          Al-Hawasi Real Estate
        </span>
      </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/services" className="hover:text-yellow-400">Services</Link></li>
            <li><Link to="/properties" className="hover:text-yellow-400">Properties</Link></li>
            {/* IMPROVEMENT 1: Added the "About" link to the desktop menu for consistency */}
            
            <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu} // Use the dedicated function
              className="focus:outline-none"
              // IMPROVEMENT 2: Added an aria-label for better accessibility
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden flex flex-col gap-4 py-4 text-center border-t border-gray-700">
            {/* IMPROVEMENT 3: Added onClick to close the menu after a link is clicked */}
            <li><Link to="/" className="block hover:text-yellow-400" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/services" className="block hover:text-yellow-400" onClick={toggleMenu}>Services</Link></li>
            <li><Link to="/properties" className="block hover:text-yellow-400" onClick={toggleMenu}>Properties</Link></li>
            
            <li><Link to="/contact" className="block hover:text-yellow-400" onClick={toggleMenu}>Contact</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;