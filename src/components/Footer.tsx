import { Facebook, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';
import ieee from "./../assets/logo/ieee.png";
import insb from "./../assets/logo/insb.png";
import { ExternalLink } from 'lucide-react';

const footerLinks = [
  {
    links: [
      { text: "Ieee.org", href: "#" },
      { text: "IEEE Explore", href: "#" },
      { text: "IEEE Standards", href: "#" },
      { text: "IEEE Spectrum", href: "#" },
      { text: "IEEE Collabratec", href: "#" },
      { text: "More Sites", href: "#" },
    ],
  },
  {
    links: [
      { text: "Ask a Question", href: "#" },
      { text: "IEEE NSU SB", href: "#" },
      { text: "IEEE NSU SB IAS", href: "#" },
      { text: "IEEE NSU SB PES", href: "#" },
      { text: "IEEE NSU SB RAS", href: "#" },
      { text: "IEEE NSU SB WIE", href: "#" },
    ],
  },
  {
    links: [
      { text: "News", href: "#" },
      { text: "Upcoming Events", href: "#" },
      { text: "Toolkit", href: "#" },
      { text: "Gallery", href: "#" },
      { text: "Magazines", href: "#" },
      { text: "Research Papers", href: "#" },
    ],
  },
  {
    links: [
      { text: "Join IEEE NSU SB", href: "#" },
      { text: "Write a Blog", href: "#" },
      { text: "Blogs", href: "#" },
      { text: "Achievements", href: "#" },
      { text: "Current Executive Body", href: "#" },
      { text: "Exemplary Members", href: "#" },
    ],
  },
];


const socialIcons = [
  { icon: <Facebook />, link: "https://facebook.com" },
  { icon: <Linkedin />, link: "https://linkedin.com" },
  { icon: <Instagram />, link: "https://instagram.com" },
  { icon: <Twitter />, link: "https://twitter.com" },
  { icon: <Youtube />, link: "https://youtube.com" },
];


const contactInfo = [
  "info@ieeensusb.org",
  "contact@ieeensusb.org",
  "Last Updated: 01 June 2025"
];

function Footer() {
  return (
    <footer className="bg-[#252525] py-8">
      <div className="mx-auto px-8">
        {/* Logos */}
        <div className="flex flex-row items-center justify-evenly mb-6">
          <img src={ieee} alt="IEEE Logo" className="h-20 max-sm:h-10" />
          <img src={insb} alt="INSB Logo" className="h-28 max-sm:h-18" />
        </div>

        {/* Link Sections */}
        <div className="text-ieee-white-75 grid grid-cols-1 max-sm:hidden md:grid-cols-3 lg:grid-cols-5 mt-8 mx-auto w-full max-w-[1000px]">
          {footerLinks.map((section, index) => (
            <ul key={index}>
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} target="_blank" className="hover:underline hover:text-ieee-yellow-75 transition-all inline-flex gap-1"><ExternalLink size={20}/> {link.text}</a>
                </li>
              ))}
            </ul>
          ))}

          {/* Social + Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us:</h3>
            <ul className="flex gap-4 text-2xl mb-4">
            {socialIcons.map((item, i) => (
                <li key={i}>
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ieee-blue-75 transition-colors"
                >
                    {item.icon}
                </a>
                </li>
            ))}
            </ul>
            <ul>
              {contactInfo.map((info, i) => (
                <li key={i}>
                  <a href="#" className="hover:underline hover:text-ieee-yellow-75 transition-all">{info}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-ieee-white-25 pt-6 font-bold text-center text-sm text-ieee-white-75 mt-8">
          <p>
            © 2025 IEEE NSU SB – All rights reserved. Developed by{' '}
            <a href="#" className="text-ieee-yellow-75 hover:text-ieee-blue-75 transition-colors">
              IEEE NSU SB Web Development Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
