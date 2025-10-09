import SectionHeading from "@/components/ui/section-heading";
import Wave from "@/components/wave";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import eventImage from "../../../assets/dummy/image1.png";

const Events = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-10-11T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Wave title="Events" subtitle="IEEE NSU Student Branch" />
      <SectionHeading title="Upcoming Event" widthClass="w-65" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1060px] m-auto flex flex-col items-center rounded-3xl relative overflow-hidden"
      >
        <div className="relative z-10 text-center w-full">
          {/* === Glowing Border Image Wrapper === */}
          <motion.div
            className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer group p-[3px]
                       bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-500 animate-gradient-move"
          >
            <div className="rounded-xl overflow-hidden">
              <img
                src={eventImage}
                alt="Event Banner"
                className="rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Shine overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
          </motion.div>

          {/* === Shiny Text === */}
          <h2 className="relative text-3xl font-extrabold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-500 to-indigo-600 animate-text-shine">
            SKILL VENTURE 4.0
          </h2>

          {/* Countdown timer */}
          <div className="bg-amber-100 text-gray-900 py-2 px-4 rounded-lg inline-block font-semibold text-lg tracking-wide shadow-md mb-4">
            {timeLeft.days} <span className="text-xs">DAYS</span>{" "}
            {timeLeft.hours} <span className="text-xs">HOURS</span>{" "}
            {timeLeft.minutes} <span className="text-xs">MINUTES</span>{" "}
            {timeLeft.seconds} <span className="text-xs">SECONDS</span>
          </div>

          {/* Event Details */}
          <div className="flex justify-between items-center mt-5 w-full">
            <span className="bg-sky-100 text-sky-800 font-medium py-1 px-3 rounded-md text-sm">
              Event Date: 28 July, 2025 - 6 August, 2025
            </span>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 bg-amber-300 hover:bg-amber-400 text-gray-900 font-semibold px-3 py-1.5 rounded-md text-sm shadow-md"
            >
              Registration Link <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Events;
