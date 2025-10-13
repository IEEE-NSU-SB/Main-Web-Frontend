import { useState, useRef } from "react";
import Wave from "@/components/Wave";
import spac24Image from "../../../assets/dummy/image1.png";
import FadeIn from "@/components/ui/FadeIn";

const papers = [
  {
    image: spac24Image,
    title: "BulliShield: A Smart Cyberbullying Detection and Reporting System",
    author: "Farhan Ishrak Tahmid, Farhana Akbar, Dr. Ahsanur Rahman",
    description:
      "BulliShield is an intelligent and portable application that combines detection, reporting, and AI-based counseling to offer an integrated approach to solving the widespread problem of cyberbullying. Within the system's user-friendly architecture, registered users can file complaints about possible instances of cyberbullying. Since institutions typically require the victim to submit photo evidence showing a snapshot of the whole electronic conversation with the bully, BulliShield allows victims to submit photo evidence of conversations with the bully. Our app extracts texts from those photos using OCR, identifies the language (currently, it can only detect hate speech in Bangla and English texts), and then employs appropriate machine/deep learning techniques to identify potentially offensive content in those texts, thereby helping the appropriate authority (for example, a proctor in the case of a university). BulliShield allows authorities to review complaints, call both parties for meetings, add notes, save their judgments to resolve the case, and so on – thereby acting as a fully functional system for handling cyberbullying cases. BulliShield ensures accountability and transparency throughout the resolution process by keeping the plaintiff informed about the current status of the complaint. BulliShield also offers an AI-based counseling component, giving the victims easy and free access to a technology that can help them develop resilience and emotional well-being.",
    link: "#",
  },
  {
    image: spac24Image,
    title: "WIE Outstanding SB AG Award - IEEE NSU Student",
    author:
      "Syed Redwan MD Hassan, Nazmul Hasan, Mohammad Ali Siddique, K.M Solaiman Fahim, Rummana Rahman, Lamia Iftekhar",
    description:
      "The power sector of Bangladesh is presently experiencing essential changes as demand for power services is increasing with rising population and economic development. With a gradual shift from a rigidly centralized structure to a more decentralized and fluid setup, fundamentally because of the enormous advancement of distributed renewable energy sources, the future power system of the nation requires new control strategies to work efficiently and sustainably in the face of evolving conditions and constraints. Multi-Agent Systems (MAS) technology has attributes that meet these prerequisites of modern power systems and has been shown to be effective in dealing with its distributed and complex nature. This is a literature-based feasibility study to explore whether MAS technology is suited to be applied in the context of Bangladesh. For this preliminary paper, we look at the topic from a holistic perspective and conduct a meta-review to curate common applications of Multi-Agent System-based concepts, tools and algorithms on the power and energy sector. We also identify the top challenges of this domain in Bangladesh and connect the potential MAS-based solutions to address each challenge. Our qualitative assessment is motivated to provide a starting point for local researchers eager to experiment with MAS technology for application in Bangladesh",
    link: "#",
  },
  {
    image: spac24Image,
    title: "Outstanding Student Volunteer Award - IEEE NSU",
    author:
      "Syed Redwan MD Hassan, Nazmul Hasan, Mohammad Ali Siddique, K.M Solaiman Fahim, Rummana Rahman, Lamia Iftekhar",
    description:
      "Huge Congratulations to Our Chair! We are thrilled to announce that Mohammad Iftekhar Bin Ashraf, Chair of IEEE NSU Student Branch, has received the Outstanding Student Volunteer Award 2024 from IEEE Bangladesh Section! This well-deserved award recognizes his amazing work over the past 1.5 years as a chair. During this time, he has tirelessly led this student branch and organized a diverse range of events, including technical, non-technical, professional, humanitarian, and administrative activities.",
    link: "#",
  },
];

const ResearchPapers = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleCard = (index: number) => {
    const newIndex = expandedIndex === index ? null : index;
    setExpandedIndex(newIndex);

    if (newIndex !== null && cardRefs.current[newIndex]) {
      cardRefs.current[newIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Wave title="Research Papers" />
      <FadeIn>
        <div className="max-w-[1000px] m-auto flex flex-wrap gap-6 justify-center mt-6 mb-6 max-md:m-4">
          {papers.map((paper, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                ref={(el) => {cardRefs.current[idx] = el}}
                className={`bg-ieee-white shadow-lg hover:shadow-xl overflow-hidden transition-all duration-500 ease-in-out rounded max-w-[317px] ${
                  isExpanded ? "max-h-[1000px]" : "max-h-[530px]"
                }`}
              >
                {/* Image as a link with hover scale */}
                <a href={paper.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={paper.image}
                    alt={paper.title}
                    className="w-full h-76 object-cover cursor-pointer"
                  />
                </a>

                <div className="p-4">
                  {/* Title as a link */}
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold mb-4 mt-1 line-clamp-1 hover:text-ieee-blue transition-colors hover:underline"
                  >
                    {paper.title}
                  </a>

                  <h3 className="text-md mb-4 mt-1 line-clamp-2 text-ieee-black-75 italic">
                    {paper.author}
                  </h3>

                  {/* Animated expand/collapse */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? "max-h-[500px]" : "max-h-15"
                    }`}
                  >
                    <p className="text-ieee-black-75 text-sm mb-3 text-justify">
                      {paper.description}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleCard(idx)}
                    className="text-ieee-blue-75 hover:underline text-sm mt-2"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </>
  );
};

export default ResearchPapers;
