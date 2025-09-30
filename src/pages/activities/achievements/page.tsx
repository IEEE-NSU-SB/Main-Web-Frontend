import { useEffect, useState } from "react";
import Wave from "@/components/wave";
import spac24Image from "../../../assets/dummy/image1.png";
import FadeIn from "@/components/ui/fade-in";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const awards = [
  {
    year: "2025",
    image: spac24Image,
    title: "IEEE IAS CMD Chapter Award 2025 - IEEE NSU Industry",
    description:
      "We are proud to announce that IEEE North South University Industry Applications Society Student Branch Chapter has been awarded the prestigious IEEE IAS CMD Chapter Award 2025 for Outstanding Chapter Performance. What makes this achievement even more special is that we are the only chapter from Bangladesh to have received this honor twice, and we were the first chapter from Bangladesh to win it as well — both under the Small Chapter category! This award reflects our continued commitment to excellence, innovation, and impactful contributions in industrial applications. We are proud to announce that IEEE North South University Industry Applications Society Student Branch Chapter has been awarded the prestigious IEEE IAS CMD Chapter Award 2025 for Outstanding Chapter Performance. What makes this achievement even more special is that we are the only chapter from Bangladesh to have received this honor twice, and we were the first chapter from Bangladesh to win it as well — both under the Small Chapter category! This award reflects our continued commitment to excellence, innovation, and impactful contributions in industrial applications. We are proud to announce that IEEE North South University Industry Applications Society Student Branch Chapter has been awarded the prestigious IEEE IAS CMD Chapter Award 2025 for Outstanding Chapter Performance. What makes this achievement even more special is that we are the only chapter from Bangladesh to have received this honor twice, and we were the first chapter from Bangladesh to win it as well — both under the Small Chapter category! This award reflects our continued commitment to excellence, innovation, and impactful contributions in industrial applications. We are proud to announce that IEEE North South University Industry Applications Society Student Branch Chapter has been awarded the prestigious IEEE IAS CMD Chapter Award 2025 for Outstanding Chapter Performance. What makes this achievement even more special is that we are the only chapter from Bangladesh to have received this honor twice, and we were the first chapter from Bangladesh to win it as well — both under the Small Chapter category! This award reflects our continued commitment to excellence, innovation, and impactful contributions in industrial applications. We are proud to announce that IEEE North South University Industry Applications Society Student Branch Chapter has been awarded the prestigious IEEE IAS CMD Chapter Award 2025 for Outstanding Chapter Performance. What makes this achievement even more special is that we are the only chapter from Bangladesh to have received this honor twice, and we were the first chapter from Bangladesh to win it as well — both under the Small Chapter category! This award reflects our continued commitment to excellence, innovation, and impactful contributions in industrial applications. We are proud to announce that IEEE North South University Industry Applications Society Student Branch Chapter has been awarded the prestigious IEEE IAS CMD Chapter Award 2025 for Outstanding Chapter Performance. What makes this achievement even more special is that we are the only chapter from Bangladesh to have received this honor twice, and we were the first chapter from Bangladesh to win it as well — both under the Small Chapter category! This award reflects our continued commitment to excellence, innovation, and impactful contributions in industrial applications. We are proud to announce that IEEE North South University Industry Applications Society Student Branch Chapter has been awarded the prestigious IEEE IAS CMD Chapter Award 2025 for Outstanding Chapter Performance. What makes this achievement even more special is that we are the only chapter from Bangladesh to have received this honor twice, and we were the first chapter from Bangladesh to win it as well — both under the Small Chapter category! This award reflects our continued commitment to excellence, innovation, and impactful contributions in industrial applications. We are proud to announce that IEEE North South University Industry Applications Society Student Branch Chapter has been awarded the prestigious IEEE IAS CMD Chapter Award 2025 for Outstanding Chapter Performance. What makes this achievement even more special is that we are the only chapter from Bangladesh to have received this honor twice, and we were the first chapter from Bangladesh to win it as well — both under the Small Chapter category! This award reflects our continued commitment to excellence, innovation, and impactful contributions in industrial applications.",
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
  const [selectedAward, setSelectedAward] = useState<null | (typeof awards)[0]>(
    null
  );

  // 🚫 Disable background scroll when modal is open
  useEffect(() => {
    if (selectedAward) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedAward]);

  return (
    <>
      <Wave title="Achievements" />
      <FadeIn>
        <div className="max-w-[1080px] m-auto flex flex-wrap gap-6 justify-center my-6 max-md:m-5">
          {awards.map((award, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedAward(award)}
              className="relative group cursor-pointer bg-white rounded-md overflow-hidden shadow-[4px_4px_8px_theme('colors.ieee-black.50')] border border-ieee-black transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[8px_8px_8px_theme('colors.ieee-black.50')]"
            >
              {/* Image */}
              <img
                src={award.image}
                alt={award.title}
                className="w-82 h-82 object-cover"
              />

              {/* Year tag */}
              <span className="absolute top-0 left-0 bg-ieee-blue text-white text-sm font-semibold px-3 py-1 rounded">
                {award.year}
              </span>

              {/* Overlay with title (on hover) */}
              <div
                className="absolute bottom-0 left-0 w-full bg-ieee-blue bg-opacity-90 text-white text-center 
                              text-sm font-medium px-3 py-2 translate-y-full group-hover:translate-y-0 
                              transition-all duration-500"
              >
                {award.title}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Modal */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-2"
            onClick={() => setSelectedAward(null)} // close on outside click
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Box */}
            <motion.div
              onClick={(e) => e.stopPropagation()} // prevent closing on content click
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative bg-white rounded-lg max-sm:rounded-sm shadow-lg max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAward(null)}
                className="absolute top-3 right-5 max-sm:top-1 max-sm:right-3 text-gray-700 hover:text-gray-900 cursor-pointer z-10"
              >
                <X size={22} />
              </button>

              {/* Scrollable Content */}
              <div className="relative flex flex-col p-6 px-1 sm:p-6 space-y-4 overflow-y-auto">
                {/* Image at top (square) */}
                <div className="w-full flex justify-center">
                  <div className="relative w-64 h-64">
                    <img
                      src={selectedAward.image}
                      alt={selectedAward.title}
                      className="w-full h-full object-cover rounded shadow-md z-2 relative"
                    />
                    {/* Blurred background for image */}
                    <div
                      className="absolute left-[-200px] inset-0 bg-cover bg-center blur-sm opacity-90 rounded-md w-160 max-sm:w-0"
                      style={{ backgroundImage: `url(${selectedAward.image})` }}
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="text-left px-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {selectedAward.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Year - {selectedAward.year}
                  </p>
                  <div className="w-auto h-0.25 bg-ieee-black-50 mb-5"></div>
                  <p className="text-gray-700 text-sm text-justify leading-relaxed">
                    {selectedAward.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Achievements;
