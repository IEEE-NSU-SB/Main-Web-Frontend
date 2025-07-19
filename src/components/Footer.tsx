import { Facebook, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';
import ieee from "./../assets/ieee.png";
import insb from "./../assets/insb.png";
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
    <footer className="bg-[#363636] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Logos */}
        <div className="flex flex-col md:flex-row items-center justify-evenly mb-6">
          <img src={ieee} alt="IEEE Logo" className="h-20" />
          <img src={insb} alt="INSB Logo" className="h-28" />
        </div>

        {/* Link Sections */}
        <div className="text-[#dedede] grid grid-cols-5 gap-4 mt-8 mx-auto w-270">
          {footerLinks.map((section, index) => (
            <ul key={index}>
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} target="_blank" className="hover:underline inline-flex gap-1"><ExternalLink size={20}/> {link.text}</a>
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
                    className="hover:text-blue-400 transition-colors"
                >
                    {item.icon}
                </a>
                </li>
            ))}
            </ul>
            <ul>
              {contactInfo.map((info, i) => (
                <li key={i}>
                  <a href="#" className="hover:underline">{info}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 font-bold text-center text-sm text-white mt-8">
          <p>
            © 2025 IEEE NSU SB – All rights reserved. Developed by{' '}
            <a href="#" className="text-amber-300 hover:text-blue-300 transition-colors">
              IEEE NSU SB Web Development Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
