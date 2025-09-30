import { useEffect, useState } from "react";
import Wave from "@/components/wave";
import FadeIn from "@/components/ui/fade-in";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import Skeleton from "@/components/skeleton";

interface Award {
  year: string;
  image: string;
  title: string;
  description: string;
}

const Achievements = () => {
  // ✅ Fetch awards from JSON
  const { loading, data } = useFetchDataJSON({
    path: "pages/activities/achievements/data/achievements.json",
  });

  // ✅ Local state for modal
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);

  // 🚫 Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedAward ? "hidden" : "auto";
  }, [selectedAward]);

  const awards: Award[] = data;

  return (
    <>
      <Wave title="Achievements" />
      {loading ? (
        <FadeIn>
          <div className="max-w-[1080px] m-auto flex flex-wrap gap-6 justify-center my-6 max-md:m-5">
            <Skeleton className="h-83 w-83" />
            <Skeleton className="h-83 w-83" />
            <Skeleton className="h-83 w-83" />
            <Skeleton className="h-83 w-83" />
            <Skeleton className="h-83 w-83" />
            <Skeleton className="h-83 w-83" />
          </div>
        </FadeIn>
      ) : (
        <div className="max-w-[1080px] m-auto flex flex-wrap gap-6 justify-center my-6 max-md:m-5">
          {awards.map((award, idx) => (
            <FadeIn>
              <div
                key={idx}
                onClick={() => setSelectedAward(award)}
                className="relative group cursor-pointer bg-white rounded-sm overflow-hidden shadow-[4px_4px_10px_theme('colors.ieee-black.25')] border-ieee-black transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[5px_5px_6px_theme('colors.ieee-black.25')]"
              >
                {/* Image */}
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-83 h-83 object-cover"
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
            </FadeIn>
          ))}
        </div>
      )}

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
                className="flex justify-end text-gray-700 hover:text-gray-900 cursor-pointer bg-ieee-white px-8 pt-4"
              >
                <X size={22} />
              </button>

              {/* Scrollable Content */}
              <div className="relative flex flex-col p-6 px-1 sm:p-6 space-y-4 overflow-y-auto ieee-scrollbar">
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
