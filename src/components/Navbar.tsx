import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import insbLogo from "./../assets/logo/insb.gif";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollClass = isScrolled ? "bg-ieee-darkblue shadow-md" : "bg-transparent";

  return (
    <nav className={`text-ieee-white text-xs sticky top-0 z-50 transition-all duration-500 ${scrollClass}`}>
      <div className="max-w-[1038px] mx-auto py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={insbLogo} alt="IEEE NSU SB Logo" className="h-10 mx-5 cursor-pointer" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center relative">
          <Link to="/" className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">Home</Link>

          {/* Activities */}
          <div className="group relative">
            <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">Activities</span>
            <div className="absolute left-2 top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-35 z-50">
              {["Events", "News", "Achievements"].map((item) => (
                <Link key={item} to={`/${item.toLowerCase()}`} className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer">{item}</Link>
              ))}
            </div>
          </div>

          {/* Societies & AG */}
          <div className="group relative">
            <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">Societies & AG</span>
            <div className="absolute left-2 top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-35 z-50">
              {[
                "IEEE NSU RAS SBC",
                "IEEE NSU PES SBC",
                "IEEE NSU IAS SBC",
                "IEEE NSU WIE AG"
              ].map((society) => (
                <Link key={society} to={`/${society.toLowerCase().replace(/ /g, "-")}`} className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer">
                  {society}
                </Link>
              ))}
            </div>
          </div>

          {/* Members */}
          <div className="group relative">
            <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">Members</span>
            <div className="absolute left-2 top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-45 z-50">
              {["Panels", "Officers", "Volunteers"].map((item) => (
                <Link key={item} to={`/${item.toLowerCase()}`} className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer">{item}</Link>
              ))}

              {/* Teams submenu */}
              <div className="relative group/team">
                <span className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer">Teams</span>
                <div className="absolute left-full top-0 hidden group-hover/team:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-55 z-50">
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
                    <Link key={team} to={`/${team.toLowerCase().replace(/ /g, "-")}`} className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer">
                      {team}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/exemplary-members" className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer">Exemplary Members</Link>
              <Link to="/members-statistics" className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer">All Members & Statistics</Link>
            </div>
          </div>

          {/* About */}
          <div className="group relative">
            <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">About</span>
            <div className="absolute left-2 top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-45 z-50">
              {[
                "IEEE",
                "IEEE Region 10",
                "IEEE Bangladesh Section",
                "IEEE NSU Student Branch",
                "FAQ"
              ].map((about) => (
                <Link key={about} to={`/${about.toLowerCase().replace(/ /g, "-")}`} className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer">
                  {about}
                </Link>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div className="group relative">
            <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">Publications</span>
            <div className="absolute left-2 top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-35 z-50">
              {["Blogs", "Research Paper", "Magazines", "Gallery", "Toolkit"].map((item) => (
                <Link key={item} to={`/${item.toLowerCase().replace(/ /g, "-")}`} className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Get Involved */}
          <div className="group relative">
            <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">Get Involved</span>
            <div className="absolute left-2 top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-35 z-50">
              {["Join IEEE NSU SB", "Write a blog", "Add Research Paper"].map((item) => (
                <Link key={item} to={`/${item.toLowerCase().replace(/ /g, "-")}`} className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Portal button */}
        <div className="hidden md:block bg-ieee-blue hover:bg-ieee-blue-50 px-4 py-1 rounded cursor-pointer text-xs mx-5">
          <Link to="/portal">IEEE NSU SB Portal</Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden mx-5 mt-1">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-ieee-darkblue text-ieee-white px-4 pb-4 space-y-2">
          <Link to="/" className="block py-2 border-b border-ieee-blue-75">Home</Link>

          {/* Activities */}
          <details>
            <summary className="py-2 cursor-pointer">Activities</summary>
            <div className="ml-4 space-y-1 text-sm">
              {["Events", "News", "Achievements"].map((item) => (
                <Link key={item} to={`/${item.toLowerCase()}`} className="block">{item}</Link>
              ))}
            </div>
          </details>

          {/* Societies & AG */}
          <details>
            <summary className="py-2 cursor-pointer">Societies & AG</summary>
            <div className="ml-4 space-y-1 text-sm">
              {[
                "IEEE NSU RAS SBC",
                "IEEE NSU PES SBC",
                "IEEE NSU IAS SBC",
                "IEEE NSU WIE AG"
              ].map((item) => (
                <Link key={item} to={`/${item.toLowerCase().replace(/ /g, "-")}`} className="block">{item}</Link>
              ))}
            </div>
          </details>

          {/* Members */}
          <details>
            <summary className="py-2 cursor-pointer">Members</summary>
            <div className="ml-4 space-y-1 text-sm">
              {["Panels", "Officers", "Volunteers"].map((item) => (
                <Link key={item} to={`/${item.toLowerCase()}`} className="block">{item}</Link>
              ))}

              <details>
                <summary className="cursor-pointer">Teams</summary>
                <div className="ml-4 space-y-1">
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
                    <Link key={team} to={`/${team.toLowerCase().replace(/ /g, "-")}`} className="block">{team}</Link>
                  ))}
                </div>
              </details>

              <Link to="/exemplary-members" className="block">Exemplary Members</Link>
              <Link to="/members-statistics" className="block">All Members & Statistics</Link>
            </div>
          </details>

          {/* About */}
          <details>
            <summary className="py-2 cursor-pointer">About</summary>
            <div className="ml-4 space-y-1 text-sm">
              {[
                "IEEE",
                "IEEE Region 10",
                "IEEE Bangladesh Section",
                "IEEE NSU Student Branch",
                "FAQ"
              ].map((about) => (
                <Link key={about} to={`/${about.toLowerCase().replace(/ /g, "-")}`} className="block">{about}</Link>
              ))}
            </div>
          </details>

          {/* Publications */}
          <details>
            <summary className="py-2 cursor-pointer">Publications</summary>
            <div className="ml-4 space-y-1 text-sm">
              {["Blogs", "Research Paper", "Magazines", "Gallery", "Toolkit"].map((item) => (
                <Link key={item} to={`/${item.toLowerCase().replace(/ /g, "-")}`} className="block">{item}</Link>
              ))}
            </div>
          </details>

          {/* Get Involved */}
          <details>
            <summary className="py-2 cursor-pointer">Get Involved</summary>
            <div className="ml-4 space-y-1 text-sm">
              {["Join IEEE NSU SB", "Write a blog", "Add Research Paper"].map((item) => (
                <Link key={item} to={`/${item.toLowerCase().replace(/ /g, "-")}`} className="block">{item}</Link>
              ))}
            </div>
          </details>

          <Link to="/portal" className="block bg-ieee-blue hover:bg-ieee-blue-50 text-center py-2 rounded mt-2 text-sm">
            IEEE NSU SB Portal
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;