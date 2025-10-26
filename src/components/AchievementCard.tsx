import FadeIn from "@/components/ui/FadeIn";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import Skeleton from "@/components/skeeleton";
import { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Link } from "react-router-dom";

interface Award {
  year: string;
  image: string;
  title: string;
  winner: string;
  primaryColor: string;
  description: string;
}

const AchievementCard = () => {
  const isLandingPage = location.pathname === "/";

  const { loading, data, error, refetch } = useFetchDataAPI({
    apiUrl: isLandingPage
      ? "main_website/get_achievements/landing/"
      : "main_website/get_achievements/",
  });

  const [selectedAward, setSelectedAward] = useState<Award | null>(null);

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedAward ? "hidden" : "auto";
  }, [selectedAward]);

  const awards: Award[] = data || [];
  return (
    <>
      {location.pathname === "/" && (
        <SectionHeading title="Achievements" widthClass="w-55 mb-4" />
      )}
      
      {/* Error State */}
      {error && (
        <FadeIn>
          <div className="flex flex-col items-center justify-center text-center my-10 space-y-4">
            <p className="text-ieee-red font-medium">
              Failed to load achievements. Please try again.
            </p>
            <button
              onClick={() => (refetch ? refetch() : window.location.reload())}
              className="bg-ieee-blue text-ieee-white px-4 py-2 rounded-md shadow hover:bg-ieee-blue-75 transition"
            >
              Retry
            </button>
          </div>
        </FadeIn>
      )}

      {/* Loading Skeleton */}
      {loading && !error && (
        <FadeIn>
          <div className="max-w-[1080px] m-auto flex flex-wrap gap-6 justify-center my-6 max-md:m-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-83 w-83" />
            ))}
          </div>
        </FadeIn>
      )}

      {/* Data Display */}
      {!loading && !error && (
        <div className="max-w-[1080px] m-auto flex flex-wrap gap-6 justify-center my-6 max-md:m-5">
          {awards.map((award, idx) => (
            <FadeIn key={idx}>
              <div
                onClick={() => setSelectedAward(award)}
                className="relative group cursor-pointer bg-ieee-white rounded-sm overflow-hidden shadow-[4px_4px_10px_theme('colors.ieee-black.25')] border-ieee-black transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[5px_5px_6px_theme('colors.ieee-black.25')]"
              >
                {/* Image */}
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-83 h-83 object-cover"
                />

                {/* Year tag */}
                <span className="absolute top-0 left-0 bg-ieee-blue text-ieee-white text-sm font-semibold px-3 py-1 rounded">
                  {award.year}
                </span>

                {/* Overlay with title */}
                <div
                  className="absolute bottom-0 left-0 w-full bg-ieee-blue bg-opacity-80 text-ieee-white text-center 
                              text-sm font-medium px-3 py-2 translate-y-full group-hover:translate-y-0 
                              transition-all duration-500"
                >
                  {award.title} - <span>{award.winner}</span>
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
            className="fixed inset-0 bg-ieee-black-50 backdrop-blur-sm flex justify-center items-center z-50 px-2"
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
              className="relative bg-ieee-white rounded-lg max-sm:rounded-sm shadow-lg max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAward(null)}
                className="flex justify-end text-ieee-gray hover:text-ieee-black-75 cursor-pointer bg-ieee-white px-8 pt-4"
              >
                <X size={22} />
              </button>

              {/* Scrollable Content */}
              <div className="relative flex flex-col p-6 px-1 sm:p-6 space-y-4 overflow-y-auto ieee-scrollbar">
                {/* Image at top */}
                <div className="w-full flex justify-center">
                  <div className="relative w-64 h-64">
                    <img
                      src={selectedAward.image}
                      alt={selectedAward.title}
                      className="w-full h-full object-cover rounded shadow-md z-2 relative"
                    />
                    {/* Blurred background */}
                    <div
                      className="absolute left-[-200px] inset-0 bg-cover bg-center blur-sm opacity-90 rounded-md w-160 max-sm:w-0"
                      style={{ backgroundImage: `url(${selectedAward.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-ieee-white to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="text-left px-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {selectedAward.title} -{" "}
                    <span style={{ color: `${selectedAward.primaryColor}` }}>
                      {selectedAward.winner}
                    </span>
                  </h3>
                  <p className="text-md text-ieee-black-75 mb-2">
                    Year - {selectedAward.year}
                  </p>
                  <div className="w-auto h-0.25 bg-ieee-black-50 mb-5"></div>
                  <p
                    className="text-ieee-black-75 text-sm text-justify leading-relaxed"
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
            {/* "See All Blogs" button only on landing page */}
      {isLandingPage && (
        <div className="flex justify-center mt-8">
          <Link to="/achievements">
            <button className="cursor-pointer hover:bg-ieee-darkblue-90 bg-ieee-white hover:text-ieee-white text-ieee-darkblue-90 text-sm font-semibold px-6 py-2 border border-ieee-darkblue-90 rounded-[.25rem] transition-colors duration-300">
              See All Achievements
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default AchievementCard;
