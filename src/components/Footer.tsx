import ieee from "./../assets/ieee.png";
import insb from "./../assets/insb.png";

const footerLinks = [
  {
    title: null,
    links: [
      "Ieee.org", "IEEE Explore", "IEEE Standards", "IEEE Spectrum",
      "IEEE Collabratec", "More Sites"
    ],
  },
  {
    title: null,
    links: [
      "Ask a Question", "About IEEE NSU SB", "About IEEE NSU SB IAS",
      "About IEEE NSU SB PES", "About IEEE NSU SB RAS", "About IEEE NSU SB WIE"
    ],
  },
  {
    title: null,
    links: [
      "News", "Upcoming Events", "Toolkit", "Gallery",
      "Magazines", "Research Papers"
    ],
  },
  {
    title: null,
    links: [
      "Join IEEE NSU SB", "Write a Blog", "Blogs", "Achievements",
      "Current Executive Body", "Exemplary Members"
    ],
  },
];

const socialLinks = ["Facebook", "LinkedIn", "Instagram", "X", "YouTube"];
const contactInfo = [
  "info@ieeensusb.org",
  "contact@ieeensusb.org",
  "Last Updated: 01 June 2025"
];

function Footer() {
  return (
    <footer className="bg-[#232323] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Logos */}
        <div className="flex flex-col md:flex-row items-center justify-evenly mb-6">
          <img src={ieee} alt="IEEE Logo" className="h-20" />
          <img src={insb} alt="INSB Logo" className="h-28" />
        </div>

        {/* Link Sections */}
        <div className="text-[#dedede] grid grid-cols-5 gap-4 m-auto w-300">
          {footerLinks.map((section, index) => (
            <ul key={index}>
              {section.links.map((text, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:underline">{text}</a>
                </li>
              ))}
            </ul>
          ))}

          {/* Follow Us + Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us:</h3>
            <ul className="flex flex-wrap gap-2 mb-4">
              {socialLinks.map((platform, i) => (
                <li key={i}>
                  <a href="#" className="hover:underline">{platform}</a>
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
        <div className="border-t border-gray-900 pt-6 text-center text-sm text-gray-400 mt-8">
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
