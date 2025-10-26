import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Achievement {
  year: string;
  image: string;
  title: string;
  winner: string;
  description: string;
}

interface AchievementsProps {
  achievements: Achievement[];
  color?: string;
}

const Achievements: React.FC<AchievementsProps> = ({ achievements, color = "#006699" }) => {
  const [selectedAward, setSelectedAward] = useState<Achievement | null>(null);

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedAward ? "hidden" : "auto";
  }, [selectedAward]);

  if (!achievements || achievements.length === 0) return null;

  return (
    <section className="max-w-[1080px] mx-auto py-2 pb-16">
      <SectionHeading
        title="Achievements"
        widthClass="w-64"
        titleColor={color}
        underlineColor={color}
      />

      {/* Cards */}
      <div className="flex flex-wrap justify-center items-center mt-10 gap-x-8 gap-y-10 px-5">
        {achievements.map((award, index) => (
          <FadeIn key={index}>
            <div
              onClick={() => setSelectedAward(award)}
              className="relative cursor-pointer w-[235px] bg-white rounded-xl shadow-md border text-center pt-4 pb-10 hover:shadow-xl transition-all duration-300 overflow-hidden"
              style={{ borderColor: `${color}B3` }}
            >
              <div className="h-48 w-full overflow-hidden rounded-md">
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <h3 className="font-semibold text-lg text-gray-800 mt-6">
                {award.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 mb-2">
                {award.winner}
              </p>
              <span
                className="inline-block text-sm font-semibold rounded px-3 py-1 mt-1"
                style={{
                  backgroundColor: `${color}`,
                  color: "white",
                }}
              >
                {award.year}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-2"
            onClick={() => setSelectedAward(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAward(null)}
                className="flex justify-end text-gray-600 hover:text-gray-800 cursor-pointer bg-white px-8 pt-4"
              >
                <X size={22} />
              </button>

              {/* Content */}
              <div className="flex flex-col p-6 space-y-4 overflow-y-auto ieee-scrollbar">
                <div className="w-full flex justify-center">
                  <img
                    src={selectedAward.image}
                    alt={selectedAward.title}
                    className="w-64 h-64 object-cover rounded shadow-md"
                  />
                </div>

                <div className="text-left px-2">
                  <h3 className="text-xl font-semibold mb-2">
                    {selectedAward.title} -{" "}
                    <span style={{ color }}>{selectedAward.winner}</span>
                  </h3>
                  <p className="text-md text-gray-700 mb-2">
                    Year - {selectedAward.year}
                  </p>
                  <div className="w-auto h-0.5 bg-gray-300 mb-4"></div>
                  <p
                    className="text-gray-700 text-sm text-justify leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: selectedAward.description,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <div className="text-center flex justify-center my-16">
        <Link to="/achievements">
          <button
            className="cursor-pointer flex items-center gap-2 border-1 font-bold py-2 px-4 duration-300 rounded-md"
            style={{
              backgroundColor: "white",
              borderColor: color,
              color: color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = color;
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = color;
            }}
          >
            See All Achievements
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Achievements;
