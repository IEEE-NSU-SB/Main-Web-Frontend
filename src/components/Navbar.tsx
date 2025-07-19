import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import insbLogo from "./../assets/logo/insb.gif";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-[#002855] text-white text-xs sticky top-0 z-50">
      <div className="max-w-[1038px] mx-auto py-3 flex justify-between items-center">
        {/* Logo */}
        <img src={insbLogo} alt="IEEE NSU SB Logo" className="h-8" />
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 items-center relative">
          {["Home", "Activities", "Societies & AG", "About", "Publications", "Contact", "Get Involved"].map((item) => (
            <span key={item} className="hover:text-yellow-500 px-3 py-2 rounded cursor-pointer">
              {item}
            </span>
          ))}

          {/* Members with hover dropdown */}
          <div className="group relative">
            <span className="hover:text-yellow-500 px-3 py-2 rounded cursor-pointer">
              Members
            </span>

            {/* Dropdown on hover */}
            <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white text-black shadow-lg rounded w-64 z-50">
              {["Panels", "Officers", "Volunteers"].map((item) => (
                <div key={item} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {item}
                </div>
              ))}

              {/* Teams submenu */}
              <div className="relative group/team">
                <div className="px-4 py-2 bg-yellow-300 hover:bg-yellow-200 cursor-pointer">
                  Teams
                </div>
                <div className="absolute left-full top-0 hidden group-hover/team:block bg-white text-black shadow-lg rounded w-72 z-50">
                  {[
                    "Content Writing and Publications",
                    "Website Development",
                    "Media",
                    "Events and Management",
                    "Graphics",
                    "Public Relation (PR)",
                    "Promotions",
                    "Finance and Corporate",
                    "Logistics and Operations",
                    "Membership Development",
                  ].map((team) => (
                    <div key={team} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {team}
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Exemplary Members</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">All Members & Statistics</div>
            </div>
          </div>

        </div>
        <div className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded cursor-pointer text-xs">
            IEEE NSU SB Portal
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#002855] text-white px-4 pb-4 space-y-2">
          {["Home", "Activities", "Societies & AG", "About", "Publications", "Contact", "Get Involved"].map((item) => (
            <div key={item} className="py-2 border-b border-blue-700">
              {item}
            </div>
          ))}

          <details className="text-white">
            <summary className="py-2 cursor-pointer">Members</summary>
            <div className="ml-4 space-y-1">
              <div>Panels</div>
              <div>Officers</div>
              <div>Volunteers</div>
              <details>
                <summary className="cursor-pointer">Teams</summary>
                <div className="ml-4 text-sm space-y-1">
                  {[
                    "Content Writing and Publications",
                    "Website Development",
                    "Media",
                    "Events and Management",
                    "Graphics",
                    "Public Relation (PR)",
                    "Promotions",
                    "Finance and Corporate",
                    "Logistics and Operations",
                    "Membership Development",
                  ].map((team) => (
                    <div key={team}>{team}</div>
                  ))}
                </div>
              </details>
              <div>Exemplary Members</div>
              <div>All Members & Statistics</div>
            </div>
          </details>

          <div className="bg-blue-600 hover:bg-blue-700 text-center py-2 rounded mt-2 text-sm">
            IEEE NSU SB Portal
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
