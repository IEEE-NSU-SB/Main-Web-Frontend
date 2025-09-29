import { useState, useRef } from "react";
import Wave from "@/components/wave";
import spac24Image from "../../../assets/dummy/image1.png"; // placeholder image
import FadeIn from "@/components/ui/fade-in";

const awards = [
  {
    year: "2025",
    image: spac24Image,
    title: "IEEE IAS CMD Chapter Award 2025 - IEEE NSU Industry",
    description:
      "We are proud to announce that IEEE North South University Industry Applications Society Student Branch Chapter has been awarded the prestigious IEEE IAS CMD Chapter Award 2025 for Outstanding Chapter Performance. What makes this achievement even more special is that we are the only chapter from Bangladesh to have received this honor twice, and we were the first chapter from Bangladesh to win it as well — both under the Small Chapter category! This award reflects our continued commitment to excellence, innovation, and impactful contributions in industrial applications.",
  },
  {
    year: "2024",
    image: spac24Image,
    title: "WIE Outstanding SB AG Award - IEEE NSU Student",
    description:
      "We are thrilled to announce that IEEE NSU Student Branch, WIE Affinity Group has been honored with the prestigious WIE Outstanding Student Branch Affinity Group Award in the IEEE Bangladesh Section for 2024! This marks the second consecutive year that IEEE NSU SB WIE AG has achieved such recognition.",
  },
  {
    year: "2024",
    image: spac24Image,
    title: "Outstanding Student Volunteer Award - IEEE NSU",
    description:
      "Huge Congratulations to Our Chair! We are thrilled to announce that Mohammad Iftekhar Bin Ashraf, Chair of IEEE NSU Student Branch, has received the Outstanding Student Volunteer Award 2024 from IEEE Bangladesh Section! This well-deserved award recognizes his amazing work over the past 1.5 years as a chair. During this time, he has tirelessly led this student branch and organized a diverse range of events, including technical, non-technical, professional, humanitarian, and administrative activities.",
  },
];

const Achievements = () => {
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
      <Wave title="Achievements" />
      <FadeIn>
      <div className="max-w-[1000px] m-auto flex flex-wrap gap-6 justify-center mt-6 mb-6 max-md:m-5">
        {awards.map((award, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              ref={(el) => {cardRefs.current[idx] = el}}
              className={`bg-ieee-white shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out rounded max-w-[317px]  ${
                isExpanded ? "max-h-[1000px]" : "max-h-[440px]"
              }`}
            >
              <div className="relative overflow-hidden rounded">
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-76 object-cover hover:scale-105 transition-all ease-in-out 300ms"
                />
                <span className="absolute top-[-2px] bg-ieee-blue text-ieee-white text-md font-semibold px-3 py-1 rounded shadow-md">
                  {award.year}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4 mt-1 line-clamp-1">
                  {award.title}
                </h3>

                {/* Animated expand/collapse */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? "max-h-[500px]" : "max-h-10"
                  }`}
                >
                  <p className="text-ieee-black-75 text-sm mb-3 text-justify">
                    {award.description}
                  </p>
                </div>

                <button
                  onClick={() => toggleCard(idx)}
                  className="text-ieee-blue-75 hover:underline text-sm"
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

export default Achievements;
