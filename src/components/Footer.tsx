import {
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  ExternalLink,
} from "lucide-react";
import ieee from "./../assets/logo/ieee.png";
import insb from "./../assets/logo/insb.png";
import {} from "lucide-react";
import FadeIn from "./ui/FadeIn";

const footerLinks = [
  {
    links: [
      { text: "Ieee.org", href: "https://www.ieee.org/" },
      { text: "IEEE Explore", href: "https://ieeexplore.ieee.org/" },
      { text: "IEEE Standards", href: "https://standards.ieee.org/" },
      { text: "IEEE Spectrum", href: "https://spectrum.ieee.org/" },
      { text: "IEEE Collabratec", href: "https://ieee-collabratec.ieee.org/" },
      { text: "More Sites", href: "https://www.ieee.org/sitemap.html" },
    ],
  },
  {
    links: [
      { text: "Ask a Question", href: "/faq/" },
      { text: "IEEE NSU SB", href: "/ieee_nsu_student_branch/" },
      { text: "IEEE NSU SB IAS", href: "/ieee-nsu-ias-sbc/" },
      { text: "IEEE NSU SB PES", href: "/ieee-nsu-pes-sbc/" },
      { text: "IEEE NSU SB RAS", href: "/ieee-nsu-ras-sbc/" },
      { text: "IEEE NSU SB WIE", href: "/ieee-nsu-wie-ag/" },
    ],
  },
  {
    links: [
      { text: "News", href: "/news/" },
      { text: "Upcoming Events", href: "/events/" },
      { text: "Toolkit", href: "/toolkit/" },
      { text: "Gallery", href: "/gallery/" },
      { text: "Magazines", href: "/magazines/" },
      { text: "Research Papers", href: "/research/" },
    ],
  },
  {
    links: [
      { text: "Join IEEE NSU SB", href: "/join_insb/" },
      { text: "Write a Blog", href: "/write_blogs/" },
      { text: "Blogs", href: "/blogs/" },
      { text: "Achievements", href: "/achievements/" },
      { text: "Current Executive Body", href: "/panels/" },
      { text: "Exemplary Members", href: "/exemplary_members" },
    ],
  },
];

const socialIcons = [
  { icon: <Facebook />, link: "https://www.facebook.com/ieeensusb/" },
  { icon: <Linkedin />, link: "https://www.linkedin.com/company/ieeensusb" },
  { icon: <Instagram />, link: "https://instagram.com/ieeensusb?igshid=1g0f6asti4d02" },
  { icon: <Twitter />, link: "https://www.twitter.com/ieeensusb" },
  { icon: <Youtube />, link: "https://youtube.com/channel/UCR--MNc_lCe9lvgdnSWm6kA" },
];

const contactInfo = [
  "info@ieeensusb.org",
  "contact@ieeensusb.org",
  "Last Updated: 01 November 2025",
];

function Footer() {
  return (
    <footer className="bg-[#252525] py-8">
      <FadeIn>
        <div className="mx-auto px-8">
          {/* Logos */}
          <div className="flex flex-row items-center justify-evenly mb-6">
            <img src={ieee} alt="IEEE Logo" className="h-20 max-sm:h-10" />
            <img src={insb} alt="INSB Logo" className="h-28 max-sm:h-18" />
          </div>

          {/* Link Sections */}
          <div className="text-ieee-white-75 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mt-8 mx-auto w-full max-w-[1040px]">
            {footerLinks.map((section, index) => (
              <ul key={index}>
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      target="_blank"
                      className="hover:underline hover:text-ieee-yellow-75 transition-all inline-flex gap-1"
                    >
                      <ExternalLink size={20} /> {link.text}
                    </a>
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
                    {info.includes("@") ? (
                      <a
                       href={`mailto:${info}`}
                       className="hover:underline hover:text-ieee-yellow-75 transition-all"
                     >
                       {info}
                     </a>
                   ) : (
                     <span>{info}</span> 
                   )}
                 </li>
               ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-ieee-white-25 pt-6 font-bold text-center text-sm text-ieee-white-75 mt-8">
            <p>
              © 2025 IEEE NSU SB – All rights reserved. Developed by{" "}
              <a
                href="#"
                className="text-ieee-yellow-75 hover:text-ieee-blue-75 transition-colors"
              >
                IEEE NSU SB Web Development Team
              </a>
            </p>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}

export default Footer;
