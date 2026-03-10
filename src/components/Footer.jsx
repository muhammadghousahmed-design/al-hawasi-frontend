// src/components/Footer.jsx
// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Head Office */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Head Office</h3>
          <p className="text-gray-300 leading-relaxed">
            Plaza No 65, River View commercial,<br />
            Bahria Town Phase 7 Rawalpindi
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Contact</h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-center gap-3">
              <span className="text-xl">📧</span>
              <a href="mailto:info@al-hawasi.com" className="hover:text-yellow-400 transition">
                info@al-hawasi.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📞</span>
              <a href="tel:+923337778346" className="hover:text-yellow-400 transition">
                033377778346
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/about" className="hover:text-yellow-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-yellow-400 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Social</h3>
          <div className="flex gap-5">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-yellow-400 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-yellow-400 transition"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl hover:text-yellow-400 transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-blue-900 mt-10 pt-6 text-center text-gray-400 text-sm">
        © 2026 Al-Hawasi Real Estate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;