import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import insbLogo from "./../assets/logo/insb.gif";
import FadeIn from "./ui/FadeIn";

interface AccordionProps {
  title: string;
  links: string[];
  toggleMobileMenu: () => void;
}

const AccordionSection: React.FC<AccordionProps> = ({
  title,
  links,
  toggleMobileMenu,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-ieee-blue-75">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-2 cursor-pointer font-medium"
      >
        {title}
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-4 space-y-1 mt-2">
          {links.map((link) => (
            <Link
              key={link}
              to={`/${link.toLowerCase().replace(/ /g, "-")}`}
              className="block py-1 hover:pl-2 transition-all"
              onClick={toggleMobileMenu}
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


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

  const societyColors: Record<string, string> = {
    "ieee-nsu-ras-sbc": "#602569",
    "ieee-nsu-pes-sbc": "#659941",
    "ieee-nsu-ias-sbc": "#0f904b",
    "ieee-nsu-wie-ag": "#006699",
  };

  const currentSlug = location.pathname.split("/")[1] ?? "";
  const societyColor = societyColors[currentSlug];
  // Check if current page is Home
  const isHome = location.pathname === "/";

  const scrollClass = societyColor
    ? "" // we'll set color inline
    : isHome
    ? isScrolled
      ? "bg-ieee-darkblue shadow-md"
      : "bg-transparent"
    : "bg-ieee-darkblue";
  return (
    <nav
      className={`text-ieee-white text-[10px] xl:text-[.70rem] sticky top-0 z-50 transition-all duration-500 ${scrollClass}`}
      style={{
        backgroundColor: societyColor,
      }}
    >
      <FadeIn>
        <div className="max-w-[1080px] mx-auto py-3  flex flex-wrap justify-between lg:justify-between md:justify-center items-center">
          {/* Logo */}
          <Link to="/">
            <img
              src={insbLogo}
              alt="IEEE NSU SB Logo"
              className="h-10 mx-5 cursor-pointer lg:h-12"
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
              <div
                className="absolute text-center left-[-28px] top-full mt-2 hidden group-hover:block text-ieee-white shadow-lg rounded w-35 z-50"
                style={{
                  backgroundColor: societyColor || "#002855",
                }}
              >
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
              <div
                className="absolute text-center left-[-14px] top-full mt-2 hidden group-hover:block bg-ieee-darkblue text-ieee-white shadow-lg rounded w-35 z-50"
                style={{
                  backgroundColor: societyColor || "#002855",
                }}
              >
                {Object.entries({
                  "IEEE NSU RAS SBC": "ieee-nsu-ras-sbc",
                  "IEEE NSU PES SBC": "ieee-nsu-pes-sbc",
                  "IEEE NSU IAS SBC": "ieee-nsu-ias-sbc",
                  "IEEE NSU WIE AG": "ieee-nsu-wie-ag",
                }).map(([label, path]) => (
                  <Link
                    key={path}
                    to={`/${path}`}
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
              <div
                className="absolute text-center left-[-48px] top-full mt-2 hidden group-hover:block text-ieee-white shadow-lg rounded w-45 z-50"
                style={{
                  backgroundColor: societyColor || "#002855",
                }}
              >
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
                  <div
                    className="absolute left-full top-0 hidden group-hover/team:block  text-ieee-white shadow-lg rounded w-55 z-50"
                    style={{
                      backgroundColor: societyColor || "#002855",
                    }}
                  >
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
                        to={`/team/${team.toLowerCase().replace(/ /g, "-")}`}
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
              <div
                className="absolute text-center left-[-55px] top-full mt-2 hidden group-hover:block  text-ieee-white shadow-lg rounded w-45 z-50"
                style={{
                  backgroundColor: societyColor || "#002855",
                }}
              >
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
              <div
                className="absolute text-center left-[-22px] top-full mt-2 hidden group-hover:block  text-ieee-white shadow-lg rounded w-35 z-50"
                style={{
                  backgroundColor: societyColor || "#002855",
                }}
              >
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
              <div
                className="absolute text-center left-[-16px] top-full mt-2 hidden group-hover:block  text-ieee-white shadow-lg rounded w-35 z-50"
                style={{
                  backgroundColor: societyColor || "#002855",
                }}
              >
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
              to={import.meta.env.VITE_PORTAL_URL}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
<div
  className={`fixed top-0 right-0 z-40 w-full h-full text-ieee-white px-6 pt-6 pb-10 overflow-y-auto
    transition-all duration-500 ease-in-out
    ${
      isMobileMenuOpen
        ? "opacity-100 scale-100"
        : "opacity-0 scale-90 pointer-events-none"
    }`}
  style={{
    backgroundColor: societyColor || "#002855",
  }}
>
  {/* Close Button */}
  <div className="flex justify-end mb-4">
    <button onClick={toggleMobileMenu}>
      <X size={28} />
    </button>
  </div>

  <div className="space-y-4 text-sm">
    <Link
      to="/"
      className="block py-2 border-b border-ieee-blue-75 transition-all hover:pl-2"
      onClick={toggleMobileMenu}
    >
      Home
    </Link>

    {[
      {
        title: "Activities",
        links: ["Events", "News", "Achievements"],
      },
      {
        title: "Societies & AG",
        links: [
          "IEEE NSU RAS SBC",
          "IEEE NSU PES SBC",
          "IEEE NSU IAS SBC",
          "IEEE NSU WIE AG",
        ],
      },
      {
        title: "Members",
        links: [
          "Panels",
          "Officers",
          "Volunteers",
          "Teams",
          "Exemplary Members",
          "All Members & Statistics",
        ],
      },
      {
        title: "About",
        links: [
          "IEEE",
          "IEEE Region 10",
          "IEEE Bangladesh Section",
          "IEEE NSU Student Branch",
          "FAQ",
        ],
      },
      {
        title: "Publications",
        links: ["Blogs", "Research Papers", "Magazines", "Gallery", "Toolkit"],
      },
      {
        title: "Get Involved",
        links: ["Join IEEE NSU SB", "Write a blog", "Add Research Paper"],
      },
    ].map((section) => (
      <AccordionSection
        key={section.title}
        title={section.title}
        links={section.links}
        toggleMobileMenu={toggleMobileMenu}
      />
    ))}

    <Link
      to="/portal"
      className="block w-full text-center py-2 px-4 rounded font-semibold bg-gradient-animate shadow-lg transition-transform duration-300 hover:scale-105"
      onClick={toggleMobileMenu}
    >
      IEEE NSU SB Portal
    </Link>
  </div>
</div>

      )}
    </nav>
  );
};

export default Navbar;
