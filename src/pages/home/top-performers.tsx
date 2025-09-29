import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import dummy from "../../assets/dummy/luffy.jpeg";

const tabs = [
  {
    id: 1,
    label: "Top 5 Performers",
    people: [
      { id: 1, name: "Alice Johnson", team: "Team Alpha", rank: 1, img: dummy },
      { id: 2, name: "Bob Smith", team: "Team Beta", rank: 2, img: dummy },
      { id: 3, name: "Clara Davis", team: "Team Gamma", rank: 3, img: dummy },
      { id: 4, name: "David Wilson", team: "Team Delta", rank: 4, img: dummy },
      { id: 5, name: "Eve Adams", team: "Team Omega", rank: 5, img: dummy },
    ],
  },
  {
    id: 2,
    label: "Rising Stars",
    people: [
      { id: 1, name: "Frank Green", team: "Team Gamma", rank: 1, img: dummy },
      { id: 2, name: "Grace Lee", team: "Team Alpha", rank: 2, img: dummy },
    ],
  },
  {
    id: 3,
    label: "Star Volunteers",
    people: [
      { id: 1, name: "Henry King", team: "Team Beta", rank: 1, img: dummy },
      { id: 2, name: "Ivy Moore", team: "Team Delta", rank: 2, img: dummy },
    ],
  },
  {
    id: 4,
    label: "Best Volunteer",
    people: [
      { id: 1, name: "Jack White", team: "Team Omega", rank: 1, img: dummy },
    ],
  },
  {
    id: 5,
    label: "Best >",
    people: [
      { id: 1, name: "Kara Blue", team: "Team Gamma", rank: 1, img: dummy },
    ],
  },
];

export default function TopPerformers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [personIndex, setPersonIndex] = useState(0);

  const handleSelectTab = (index: number) => {
    setActiveIndex(index);
    setPersonIndex(0);
  };

  const activeTab = tabs[activeIndex];
  const people = activeTab.people;

  const handleNextPerson = () => {
    setPersonIndex((prev) => (prev + 1) % people.length);
  };

  const handlePrevPerson = () => {
    setPersonIndex((prev) => (prev - 1 + people.length) % people.length);
  };

  const tabWidth = 160;
  const visibleCount = 4;

  return (
    <div className="max-w-[1080px] mx-auto p-5">
      {/* Tabs */}
      <div className="relative flex items-center justify-center overflow-hidden h-14">
        <div className="relative flex-1">
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            const order = (index - activeIndex + tabs.length) % tabs.length;

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
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                className={`absolute bottom-[-25px] h-6 flex items-center justify-center px-3 sm:px-4 py-5
            ${
              isActive
                ? "border-b-3 border-ieee-blue-75 text-ieee-blue"
                : "bg-ieee-white-15 text-ieee-blue"
            }`}
                style={{
                  width: tabWidth,
                  zIndex: visibleCount - order,
                  left: 0,
                }}
              >
                <span className="truncate text-sm sm:text-base">
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content / Carousel with Animated Background */}
      <div className="relative mt-4 rounded overflow-hidden flex items-center justify-center min-h-[22rem] sm:min-h-[20rem] bg-black/40">
        {/* Animated Background Layers */}
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        {/* Left Arrow */}
        {people.length > 1 && (
          <button
            onClick={handlePrevPerson}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 cursor-pointer"
          >
            <ChevronLeft size={20} className="sm:size-14 text-ieee-white-50" />
          </button>
        )}

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
                className="w-44 h-44 sm:w-60 sm:h-60 rounded-full object-cover shadow-md bg-gradient-animate"
              />
            </div>

            {/* Details */}
            <div className="w-full sm:w-1/2 flex flex-col justify-center px-4 sm:px-8 text-white">
              <span className="mt-2 sm:mt-4 text-lg sm:text-xl font-semibold text-ieee-yellow">
                Rank #{people[personIndex].rank}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                {people[personIndex].name}
              </h3>
              <p className="text-base sm:text-lg mt-1 sm:mt-2">
                {people[personIndex].team}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Arrow */}
        {people.length > 1 && (
          <button
            onClick={handleNextPerson}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 cursor-pointer"
          >
            <ChevronRight size={20} className="sm:size-14 text-ieee-white-50" />
          </button>
        )}
      </div>
    </div>
  );
}
