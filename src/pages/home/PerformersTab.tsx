import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import SectionHeading from "@/components/ui/SectionHeading";

interface Person {
  id: number;
  name: string;
  team: string;
  rank: number;
  img: string;
}

interface Tab {
  id: number;
  label: string;
  people: Person[];
}

export default function TopPerformers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [personIndex, setPersonIndex] = useState(0);

  // Fetch performers JSON
  const { loading, data, error, refetch } = useFetchDataAPI<Tab[]>({
    apiUrl: "main_website/get_volunteer_awards/",
  });

  const tabs: Tab[] = data || [];

  const activeTab = tabs[activeIndex] || { people: [], id: 0, label: "" };
  const people = activeTab.people || [];

  const handleSelectTab = (index: number) => {
    setActiveIndex(index);
    setPersonIndex(0);
  };

  const handleNextPerson = () => {
    setPersonIndex((prev) => (prev + 1) % people.length);
  };

  const handlePrevPerson = () => {
    setPersonIndex((prev) => (prev - 1 + people.length) % people.length);
  };

  const tabWidth = 220;
  const visibleCount = 4;

  return (
    <>
      <SectionHeading title="Our Recognized Members"/>
      <div className="max-w-[1080px] mx-auto p-5">
        {/* Tabs */}
        <FadeIn>
          {loading ? (
            <div className="flex gap-2 overflow-hidden h-14">
              {[...Array(5)].map((_, idx) => (
                <Skeleton key={idx} className="w-40 h-6 rounded-md" />
              ))}
            </div>
          ) : error ? (
            <div className="py-6">
              <ErrorMessage
                message={"Failed to load Performers Tab"}
                onRetry={refetch}
              />
            </div>
          ) : (
            <div className="relative flex items-center justify-center overflow-hidden h-14">
              <div className="relative flex-1">
                {tabs.map((tab, index) => {
                  const isActive = index === activeIndex;
                  const order =
                    (index - activeIndex + tabs.length) % tabs.length;

                  return (
                    <motion.button
                      key={tab.id}
                      layout
                      onClick={() => handleSelectTab(index)}
                      initial={false}
                      animate={{
                        x: order * (tabWidth + 12),
                        opacity: order < visibleCount ? 1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 18,
                      }}
                      className={`absolute transition-colors ease-in-out 300 bottom-[-25px] rounded-[5px_5px] h-6 flex items-center justify-center px-3 sm:px-4 py-5 cursor-pointer
                    ${
                      isActive
                        ? "shadow-md border-b-3 border-r-3 border-l-1 border-t-1 bg-ieee-white border-ieee-blue-75 text-ieee-blue"
                        : "bg-ieee-white-15 text-ieee-black-50 hover:bg-ieee-gray-15"
                    }`}
                      style={{
                        width: tabWidth,
                        zIndex: visibleCount - order,
                        left: 0,
                      }}
                    >
                      <span className="font-bold text-[16px] sm:text-md">
                        {tab.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}
        </FadeIn>

        {/* Carousel */}
        {!error && (
          <div className="relative mt-4 rounded-md overflow-hidden flex items-center justify-center min-h-[22rem] sm:min-h-[20rem] bg-black/40">
            {/* Animated Background Layers */}
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>

            {/* Left Arrow */}
            {!loading && people.length > 1 && (
              <button
                onClick={handlePrevPerson}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 cursor-pointer"
              >
                <ChevronLeft
                  size={20}
                  className="sm:size-14 text-ieee-white-50"
                />
              </button>
            )}

            {loading ? (
              <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-6 py-6">
                <Skeleton className="w-44 h-44 sm:w-60 sm:h-60 rounded-full" />
                <div className="flex flex-col gap-3 max-sm:justify-center items-center">
                  <Skeleton className="w-36 h-4 rounded-md" />
                  <Skeleton className="w-32 h-3 rounded-md" />
                  <Skeleton className="w-28 h-3 rounded-md" />
                </div>
              </div>
            ) : !loading && people.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={personIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col sm:flex-row w-full relative z-10 items-center text-center sm:text-left"
                >
                  {/* Picture */}
                  <div className="w-full sm:w-1/2 flex justify-center items-center p-4">
                    <img
                      src={people[personIndex].img}
                      alt={people[personIndex].name}
                      className="w-44 h-44 sm:w-60 sm:h-60 rounded-full object-cover shadow-md bg-glow"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.onerror = null; // prevent loop
                        target.src = `${
                          import.meta.env.VITE_API_URL
                        }/static/images/default_profile_picture.png`;
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="w-full sm:w-1/2 flex flex-col justify-center px-4 sm:px-8 text-white">
                    {people[personIndex].rank <= 5 && (
                      <span className="mt-2 sm:mt-4 text-lg sm:text-xl font-semibold text-ieee-yellow">
                        Rank #{people[personIndex].rank}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-bold">
                      {people[personIndex].name}
                    </h3>
                    <p className="text-base sm:text-lg mt-1 sm:mt-2">
                      {people[personIndex].team}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : null}

            {/* Right Arrow */}
            {!loading && people.length > 1 && (
              <button
                onClick={handleNextPerson}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 cursor-pointer"
              >
                <ChevronRight
                  size={20}
                  className="sm:size-14 text-ieee-white-50"
                />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
