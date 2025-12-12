import FadeIn from "@/components/ui/FadeIn";
import Wave from "@/components/Wave";
import { useState } from "react";


interface QA {
  question: string;
  answer: string;
}

interface Category {
  title: string;
  qas: QA[];
}

const faqData: Category[] = [
  {
    title: "About IEEE",
    qas: [
      { question: "What is IEEE ?", answer: "IEEE stands for Institute of Electrical and Electronics Engineers. It is a professional association for electronic engineering and electrical engineering. IEEE is currently the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.It was formed in 1963 from the combination of the American Institute of Electrical Engineers and the Institute of Radio Engineers.Due to its expansion of scope into so many related fields, it is simply referred to by the letters I-E-E-E (pronounced I-triple-E).Its objectives are the educational and technical advancement of electrical and electronic engineering, telecommunications, computer engineering and allied disciplines." },
      { question: "Vision and mission of IEEE", answer: "IEEE from its inception has worked with a vision to leverage science, technology and engineering to benefit human welfare by promoting public awareness and understanding of the engineering profession, worked to promote a culture of respect for the employee and volunteer, valuing contributions at all levels of the organization, investing in training and development to enhance capabilities, empowering individuals to make a positive difference, and building a membership organization based on a strong volunteer-staff partnership to serve the profession.<br><br>IEEE has now become a trusted and unbiased source of technical information, and forums, for technical dialog and collaboration.<br><br>IEEE is now essential to the global technical community and to technical professionals everywhere, and is universally recognized for the contributions of technology and of technical professionals in improving global conditions" },
      { question: "Globalization of IEEE", answer: "In this digital world as globalization emerged technologies and the industries that developed them increasingly transcended national boundaries, IEEE has kept pace. It is now a global institution that uses the innovations of the practitioners it represents to enhance IEEE’s excellence in delivering products and services to members, industries, and the public at large. Publications and educational programs are delivered online, as are member services such as renewal and elections.<br><br>By 2010, IEEE comprised over 395,000 members in 160 countries. Through its global network of geographical units, publications, web services, and conferences, IEEE remain the world's largest technical professional association." },
      { question: "Advantages and resources of IEEE", answer: "IEEE delivers access to the industry's most essential technical information, networking opportunities, career development tools, and many other exclusive benefits to its members.Members of IEEE have access to new resources, valuable opportunities, discounts and value added member exclusive benefits and services that will help you advance your career. IEEE delivers access to the industry's most essential technical information, networking opportunities and career development tools.Some of the benefits members receive include:<br><br><ul ><li>IEEE Spectrum Magazine subscription</li><li>IEEE Collabratec</li><li>IEEE Technical Navigator</li><li>IEEE Xplore Digital Library discounts</li><li>IEEE Mentoring Program</li><li>IEEE Jobsite</li><li>IEEE Learning Network</li></ul>" },
    ],
  },
  {
    title: "Benefits of IEEE membership",
    qas: [
      { question: "Training for Student Branch Development", answer: "IEEE delivers access to the industry's most essential technical information, networking opportunities, career development tools, and many other exclusive benefits to its members. Through memberships, you can keep current in your chosen technology profession, connect with peers, and invest in your career advancement.IEEE members get exclusive access to the largest library of electrical engineering, computer science, and electronics technical literature." },
      { question: "Membership resources", answer: "IEEE membership offers access to technical innovation, cutting-edge information, networking opportunities, and exclusive member benefits. Members support IEEE's mission to advance technology for humanity and the profession, while memberships build a platform to introduce careers in technology to students around the world.IEEE memberships support technical innovation for humanity and the profession. Access to cutting-edge information, networking opportunities, career enhancement, and many other exclusive member benefits are the key values of IEEE membership.<ul><li>Access to cutting-edge knowledge</li><li>Networking opportunities</li><li>Profession</li><li>Member Discounts</li></ul>" },
      { question: "IEEE membership all across the world", answer: "Vestibulum vitae purus sed libero facilisis blandit." },
      { question: "Volunteer Development and resources", answer: "Aliquam erat volutpat. Donec mattis turpis in urna posuere." },
    ],
  },
  {
    title: "About IEEE NSU SB",
    qas: [
      { question: "What is IEEE NSU SB?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      { question: "Purpose and Objective of IEEE NSU SB", answer: "Sed dignissim turpis nec sapien feugiat ultricies." },
      { question: "Member opportunities of IEEE NSU SB", answer: "Aenean sit amet arcu suscipit, convallis neque quis, varius justo." },
      { question: "Executive body of IEEE NSU SB", answer: "Curabitur tincidunt erat in tincidunt aliquet, ex erat egestas turpis." },
      { question: "How to connect with IEEE NSU SB", answer: "Morbi luctus erat at felis tristique, nec fermentum ex finibus." },
    ],
  },
  {
    title: "Societies of IEEE NSU SB",
    qas: [
      { question: "Chapters and Affinity Group of IEEE NSU SB", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      { question: "IEEE NSU PES Student Branch Chapter", answer: "Nullam consequat risus non justo blandit, ut imperdiet justo gravida." },
      { question: "IEEE NSU RAS Student Branch Chapter", answer: "Vivamus a lorem ac diam iaculis facilisis." },
      { question: "IEEE NSU IAS Student Branch Chapter", answer: "Mauris vulputate diam id lacus fringilla ultricies." },
      { question: "IEEE NSU WIE Affinity Group", answer: "Nam posuere elit id libero vulputate viverra." },
    ],
  },
  {
    title: "How to join with us",
    qas: [
      { question: "Join IEEE NSU SB", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      { question: "How to join a chapter of IEEE", answer: "Etiam porta lorem sed magna pretium, sed blandit purus suscipit." },
      { question: "How much to pay for IEEE membership?", answer: "Donec malesuada erat ut metus tempus, in sodales eros ultricies." },
      { question: "Renewal Fee", answer: "Aenean porttitor leo in augue gravida, non tincidunt nulla aliquam." },
      { question: "How to connect with IEEE and IEEE NSU SB?", answer: "Proin bibendum magna vitae ante ullamcorper tincidunt." },
    ],
  },
];

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <Wave title="Frequently Asked Questions - IEEE NSU SB" />

      <FadeIn>
        <section className="py-16 px-5 flex flex-col items-center max-w-[1080px] m-auto">
          <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 md:gap-10">
            <div className="relative block md:hidden w-full">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full border border-gray-300 bg-white text-[#002855] font-semibold rounded-md p-3 flex justify-between items-center shadow-sm focus:outline-none"
              >
                {faqData[activeCategory].title}
                <span
                  className={`transform transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                >

                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                  {faqData.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveCategory(index);
                        setIsDropdownOpen(false);
                        setOpenQuestion(null);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${activeCategory === index
                          ? "bg-[#002855] text-[#FFD100]"
                          : "hover:bg-[#E6F0FB] text-[#002855]"
                        }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ul className="hidden md:flex md:flex-col md:w-1/4 w-full justify-start gap-3">
              {faqData.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setActiveCategory(index);
                      setOpenQuestion(null);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-md border transition-all duration-300 cursor-pointer ${activeCategory === index
                        ? "bg-[#002855] text-[#FFD100]"
                        : "bg-white hover:bg-[#002855] hover:text-[#FFD100] text-black"
                      }`}
                  >
                    {category.title}
                  </button>
                </li>
              ))}
            </ul>

            <div className="md:w-3/4 w-full space-y-4">
              {faqData[activeCategory].qas.map((qa, i) => (
                <div key={i} className="bg-[#E6F0FB] rounded-lg shadow-sm overflow-hidden transition-all">
                  <button
                    onClick={() =>
                      setOpenQuestion(openQuestion === i ? null : i)
                    }
                    className="flex justify-between items-center w-full px-5 py-3 font-semibold text-[#002855] text-left text-base sm:text-lg cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl font-bold">+</span> {qa.question}
                    </span>
                  </button>
                  <div
                    className={`px-5 text-[#002855] transition-all duration-500 ease-in-out ieee-scrollbar ${openQuestion === i
                        ? "max-h-43 py-3 overflow-y-scroll"
                        : "max-h-0 overflow-hidden"
                      }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: qa.answer }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-[#06121D] py-16 px-6 flex justify-center">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full max-w-5xl">
            <div className="md:w-1/2 w-full text-center md:text-left">
              <h2 className="text-[#FFD100] text-3xl sm:text-4xl font-semibold mb-3 leading-tight">
                Would you like to know more?
              </h2>

              <div className="flex justify-center md:justify-start items-center gap-2 mb-4">
                <div className="h-1.5 w-1.5 bg-[#00629B] rounded-full" />
                <div className="h-1.5 w-1.5 bg-[#00629B] rounded-full" />
                <div className="h-1.5 w-1.5 bg-[#00629B] rounded-full" />
                <div className="h-1.5 w-24 bg-[#00629B] rounded-full" />
              </div>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Ask us any question related to IEEE NSU SB. We’ll email you the
                answer as soon as possible.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Your message has been submitted!"); //dummy form no functionality yet :')
              }}
              className="md:w-1/2 w-full flex flex-col gap-4 bg-[#0a1b2c] p-6 rounded-2xl shadow-lg"
            >
              <div>
                <label className="text-white text-sm mb-1 block">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#00B5E2] transition"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-1 block">Your Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#00B5E2] transition"
                />
              </div>

              <div>
                <label className="text-white text-sm mb-1 block">Your Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full p-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-[#00B5E2] transition"
                />
              </div>

              <button
                type="submit"
                className="bg-[#00B5E2] hover:bg-[#009dc7] text-white font-semibold py-2 rounded-md transition-all duration-300 w-full sm:w-32 self-center md:self-start"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </FadeIn>
    </>
  );
};

export default FAQPage;
