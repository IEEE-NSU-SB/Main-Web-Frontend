import { useEffect, useState } from "react";
import spac from "../../../assets/dummy/image1.png";
import FadeIn from "@/components/ui/fade-in";
import FadeInRight from "@/components/ui/fade-in-right";
import SectionHeading from "@/components/ui/section-heading";
import { Redo, Undo } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FlipUnitProps {
  value: number;
  label: string;
}

const UpcomingEvent = () => {
  const targetDate = new Date("2025-12-31T23:59:59");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [decryptedText, setDecryptedText] = useState("");
  const fullText = "SKILL VENTURE 4.0";

  // Countdown Timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Decrypted Text Animation
  useEffect(() => {
    let iterations = 0;
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const interval = setInterval(() => {
      setDecryptedText(() => {
        return fullText
          .split("")
          .map((char, i) => {
            if (i < iterations) return fullText[i];
            if (char === " ") return " ";
            return possible[Math.floor(Math.random() * possible.length)];
          })
          .join("");
      });

      if (iterations >= fullText.length) clearInterval(interval);
      iterations += 0.5;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Flip Digit Component
  const FlipUnit = ({ value, label }: FlipUnitProps) => {
    const [prevValue, setPrevValue] = useState<number>(value);
    const [flipping, setFlipping] = useState<boolean>(false);

    useEffect(() => {
      if (value !== prevValue) {
        setFlipping(true);
        const timeout = setTimeout(() => {
          setFlipping(false);
          setPrevValue(value);
        }, 600);
        return () => clearTimeout(timeout);
      }
    }, [value, prevValue]);

    return (
      <div className="flex flex-col items-center mx-4">
        <div className="relative w-16 h-15 bg-ieee-darkblue-15 text-white rounded-md shadow-[2px_2px_2px_theme(colors.ieee-black-75)] border-2 border-[#00629B] overflow-hidden perspective">
          {/* Top half */}
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
            {prevValue.toString().padStart(2, "0")}
          </div>

          {/* Animated bottom flip */}
          <div
            className={`absolute inset-0 flex items-center justify-center text-4xl font-bold bg-ieee-black-15 transform-origin-top ${
              flipping ? "animate-flip" : ""
            }`}
          >
            {value.toString().padStart(2, "0")}
          </div>
        </div>
        <span className="text-sm mt-2 font-semibold text-ieee-white uppercase tracking-wide">
          {label}
        </span>
      </div>
    );
  };

  return (
    <section className="w-full py-10">
      {/* <SectionHeading title="Upcoming Event" widthClass="62" /> */}

      {/* Single Column Card */}
      <div className="relative max-w-[1040px] m-auto mt-8 rounded-md">
        {/* Event Title */}
        <FadeIn>
          <h2 className="text-3xl text-ieee-black-75 font-normal mb-2">UPCOMING EVENT :</h2>
          <h2 className="text-3xl shine-text line-clamp-2 text-left mb-5">
            {decryptedText}
          </h2>
        </FadeIn>

        {/* Card Content */}

        <div className="relative flex items-center z-10 bg-white rounded-lg">
          {/* Banner Image */}
          <FadeInRight xIndex={500} zIndex={-1}>
            <img
              src={spac}
              alt="EPAC-24 Banner"
              className="w-170 h-85 object-cover rounded-[6px_0px_0_6px] shadow"
            />
          </FadeInRight>

          {/* Event Details */}
          <div className="w-140 h-85 bg-[#00629b] rounded-[0px_6px_6px_0px] py-4 text-left px-7">
            <FadeInRight xIndex={-50}>
              <p className="text-center text-ieee-white rounded-[30px_4px_30px_4px] text-md mb-1 font-semibold bg-gradient-to-r from-ieee-darkblue-15 to-ieee-darkblue-50 border-l-4 border-r-4 pl-6 py-2 border-ieee-white shadow-[2px_2px_2px_theme(colors.ieee-black-75)]">
                28 July, 2025 6:00 PM - 8:00 PM
              </p>
            </FadeInRight>
            <FadeInRight yIndex={50}>
              <p className="line-clamp-4 text-ieee-white mb-3 mt-3">
                Joining IEEE opens the doorway to a world of opportunities that
                go far beyond the classroom. Members enjoy access to research
                resources, technical workshops, competitions, and much more.
                IEEE members also get the opportunity to gain mentorships and
                guidance from experienced professionals and mentors, which helps
                them shape their academic and career paths. More than just
                resources, IEEE membership connects students to a global network
                of over 420,000 engineers and technology professionals, creating
                a space where they can exchange ideas, share knowledge, and
                motivate each other to grow. Don’t miss your chance to
                experience the full perks of IEEE membership and contribute to
                the future of technology!
              </p>
            </FadeInRight>

            {/* Flip Clock Countdown */}
            <FadeInRight xIndex={50}>
              <div className="flex justify-center items-center mt-5">
                <FlipUnit value={timeLeft.days} label="Days" />
                <FlipUnit value={timeLeft.hours} label="Hours" />
                <FlipUnit value={timeLeft.minutes} label="Minutes" />
                <FlipUnit value={timeLeft.seconds} label="Seconds" />
              </div>
            </FadeInRight>

            <div className="flex justify-center items-center gap-2 mt-4 text-center h-10">
            <FadeInRight yIndex={50} delay={.3}>
              <div className="rotate-225 relative bottom-2">
              <Undo />
              </div>
            </FadeInRight>
            <FadeInRight yIndex={50} delay={.5}>
              <button className="border-ieee-black-75 font-semibold px-3 py-2 rounded bg-ieee-yellow cursor-pointer uppercase transition-all hover:rounded-3xl hover:border-ieee-white hover:text-ieee-white border-2 hover:py-1 hover:px-6">
                Register Now!
              </button>
            </FadeInRight>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
