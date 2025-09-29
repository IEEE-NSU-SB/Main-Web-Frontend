import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import insbLogo from "./../assets/logo/insb.gif";
import FadeIn from "./ui/fade-in";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if current page is Home
  const isHome = location.pathname === "/";

  const scrollClass = isHome
    ? isScrolled
      ? "bg-ieee-darkblue shadow-md" // home + scrolled
      : "bg-transparent" // home + top
    : "bg-ieee-darkblue"; // every other page

  return (
    <nav
      className={`text-ieee-white text-xs max-lg:text-[10px] sticky top-0 z-50 transition-all duration-500 ${scrollClass}`}
    >
      <FadeIn>
        <div className="max-w-[1080px] mx-auto py-4  flex justify-between max-lg:justify-center max-md:justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img
              src={insbLogo}
              alt="IEEE NSU SB Logo"
              className="h-12 mx-5 cursor-pointer max-lg:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center relative">
            <Link
              to="/"
              className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase"
            >
              Home
            </Link>

            {/* Activities */}
            <div className="group relative">
              <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">
                Activities
              </span>
              <div className="absolute text-center left-[-22px] top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-35 z-50">
                {["Events", "News", "Achievements"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Societies & AG */}
            <div className="group relative">
              <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">
                Societies & AG
              </span>
              <div className="absolute text-center left-[-22px] top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-35 z-50">
                {Object.entries({
                  "IEEE NSU RAS SBC": "ieee-nsu-ras-sbc",
                  "IEEE NSU PES SBC": "ieee-nsu-pes-sbc",
                  "IEEE NSU IAS SBC": "ieee-nsu-ias-sbc",
                  "IEEE NSU WIE AG": "ieee-nsu-wie-ag",
                }).map(([label, path]) => (
                  <Link
                    key={path}
                    to={`/society-ag/${path}`}
                    className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Members */}
            <div className="group relative">
              <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">
                Members
              </span>
              <div className="absolute text-center left-[-48px] top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-45 z-50">
                {["Panels", "Officers", "Volunteers"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer"
                  >
                    {item}
                  </Link>
                ))}

                {/* Teams submenu */}
                <div className="relative group/team">
                  <span className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer">
                    Teams
                  </span>
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
                      <Link
                        key={team}
                        to={`/${team.toLowerCase().replace(/ /g, "-")}`}
                        className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer"
                      >
                        {team}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/exemplary-members"
                  className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer"
                >
                  Exemplary Members
                </Link>
                <Link
                  to="/all-members"
                  className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer"
                >
                  All Members & Statistics
                </Link>
              </div>
            </div>

            {/* About */}
            <div className="group relative">
              <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">
                About
              </span>
              <div className="absolute text-center left-[-55px] top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-45 z-50">
                {Object.entries({
                  IEEE: "ieee",
                  "IEEE Region 10": "ieee-region-10",
                  "IEEE Bangladesh Section": "ieee-bangladesh-section",
                  "IEEE NSU Student Branch": "ieee-nsu-student-branch",
                  FAQ: "FAQ",
                }).map(([label, path]) => (
                  <Link
                    key={path}
                    to={`/about/${path}`}
                    className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div className="group relative">
              <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">
                Publications
              </span>
              <div className="absolute text-center left-[-22px] top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-35 z-50">
                {[
                  "Blogs",
                  "Research Papers",
                  "Magazines",
                  "Gallery",
                  "Toolkit",
                ].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase"
            >
              Contact
            </Link>

            {/* Get Involved */}
            <div className="group relative">
              <span className="hover:text-ieee-yellow px-3 py-2 cursor-pointer font-medium uppercase">
                Get Involved
              </span>
              <div className="absolute text-center left-[-22px] top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-35 z-50">
                {["Join IEEE NSU SB", "Write a blog", "Add Research Paper"].map(
                  (item) => (
                    <Link
                      key={item}
                      to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                      className="block px-4 py-2 hover:bg-ieee-gray-15 cursor-pointer"
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Portal button */}
          <div className="hidden md:inline-block mx-5">
            <Link
              to="/portal"
              className="
              relative
              inline-block
              px-4 py-2
              rounded
              text-ieee-white
              text-xs
              font-semibold
              overflow-hidden
              cursor-pointer
              border-0
              shadow-lg
              transform
              transition-all
              duration-300
              ease-in-out
              hover:scale-105
              hover:shadow-[0_0_20px_rgba(0,98,155,0.7)]
              bg-gradient-animate
            "
            >
              IEEE NSU SB Portal
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden mx-5 mt-1">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </FadeIn>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-ieee-darkblue text-ieee-white px-6 pt-6 pb-10 space-y-4 transition-all duration-300 ease-in-out overflow-y-auto">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button onClick={toggleMobileMenu}>
              <X size={28} />
            </button>
          </div>

          <Link
            to="/"
            className="block py-2 border-b border-ieee-blue-75"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>

          {/* Activities */}
          <details>
            <summary className="py-2 cursor-pointer">Activities</summary>
            <div className="ml-4 space-y-1 text-sm">
              {["Events", "News", "Achievements"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="block"
                  onClick={toggleMobileMenu}
                >
                  {item}
                </Link>
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
                "IEEE NSU WIE AG",
              ].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="block"
                  onClick={toggleMobileMenu}
                >
                  {item}
                </Link>
              ))}
            </div>
          </details>

          {/* Members */}
          <details>
            <summary className="py-2 cursor-pointer">Members</summary>
            <div className="ml-4 space-y-1 text-sm">
              {["Panels", "Officers", "Volunteers"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="block"
                  onClick={toggleMobileMenu}
                >
                  {item}
                </Link>
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
                    <Link
                      key={team}
                      to={`/${team.toLowerCase().replace(/ /g, "-")}`}
                      className="block"
                      onClick={toggleMobileMenu}
                    >
                      {team}
                    </Link>
                  ))}
                </div>
              </details>

              <Link
                to="/exemplary-members"
                className="block"
                onClick={toggleMobileMenu}
              >
                Exemplary Members
              </Link>
              <Link
                to="/all-members"
                className="block"
                onClick={toggleMobileMenu}
              >
                All Members & Statistics
              </Link>
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
                "FAQ",
              ].map((about) => (
                <Link
                  key={about}
                  to={`/${about.toLowerCase().replace(/ /g, "-")}`}
                  className="block"
                  onClick={toggleMobileMenu}
                >
                  {about}
                </Link>
              ))}
            </div>
          </details>

          {/* Publications */}
          <details>
            <summary className="py-2 cursor-pointer">Publications</summary>
            <div className="ml-4 space-y-1 text-sm">
              {[
                "Blogs",
                "Research Papers",
                "Magazines",
                "Gallery",
                "Toolkit",
              ].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="block"
                  onClick={toggleMobileMenu}
                >
                  {item}
                </Link>
              ))}
            </div>
          </details>

          {/* Get Involved */}
          <details>
            <summary className="py-2 cursor-pointer">Get Involved</summary>
            <div className="ml-4 space-y-1 text-sm">
              {["Join IEEE NSU SB", "Write a blog", "Add Research Paper"].map(
                (item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="block"
                    onClick={toggleMobileMenu}
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </details>

          <Link
            to="/portal"
            className="relative
              inline-block
              px-4 py-2
              rounded
              text-ieee-white
              text-xs
              font-semibold
              overflow-hidden
              cursor-pointer
              border-0
              shadow-lg
              transform
              transition-all
              duration-300
              ease-in-out
              hover:scale-105
              hover:shadow-[0_0_20px_rgba(0,98,155,0.7)]
              bg-gradient-animate
              w-full
              text-center"
            onClick={toggleMobileMenu}
          >
            IEEE NSU SB Portal
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
