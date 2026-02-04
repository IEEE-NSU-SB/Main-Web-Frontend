import { useEffect, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import FadeInRight from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import { Undo } from "lucide-react";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Link } from "react-router";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventData {
  id: string;
  title: string;
  image: string;
  description: string;
  event_time: string;
  countdown_target: string;
  registration_link: string;
}

const UpcomingEvent = () => {
  // ✅ Fetches directly an EventData object (no nested "event" key)
  const { loading, data, error, refetch } = useFetchDataAPI<EventData>({
    apiUrl: "main_website/get_upcoming_event/",
  });

  const event = data;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown Timer
  useEffect(() => {
    if (!event?.countdown_target) return;

    const targetDate = new Date(event.countdown_target);

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
  }, [event]);

  // Flip Digit
  const FlipUnit = ({ value, label }: { value: number; label: string }) => {
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
      <div className="flex flex-col items-center mx-4 max-sm:mx-3">
        <div className="relative w-16 h-15 max-sm:h-12 max-sm:w-13 bg-ieee-darkblue-15 text-white rounded-md shadow-[2px_2px_2px_theme(colors.ieee-black-75)] border-2 border-[#00629B] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-4xl max-sm:text-md font-bold">
            {prevValue.toString().padStart(2, "0")}
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center text-4xl max-sm:text-md font-bold bg-ieee-black-15 transform-origin-top ${
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
      <div className="relative max-w-[1080px] m-auto mt-8 rounded-md px-5 max-lg:px-10 max-md:px-5">
        {loading ? (
          <div className="flex flex-col items-center gap-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-80 w-full rounded-md" />
          </div>
        ) : error ? (
          <ErrorMessage
            message="Failed to load upcoming event"
            onRetry={refetch}
          />
        ) : event && event.id && event.title ? (
          <>
            <FadeIn>
              <h2 className="text-3xl text-ieee-black-75 font-normal mb-2">
                UPCOMING EVENT :
              </h2>
              <Link to={event.id}>
                <h2 className="text-3xl shine-text line-clamp-2 text-left mb-5">
                  {event.title}
                </h2>
              </Link>
            </FadeIn>

            <div className="relative flex items-center max-md:flex-wrap flex-nowrap flex-row z-10 bg-white rounded-lg">
              <FadeInRight xIndex={50} zIndex={-1} yIndex={0}>
                <Link to={event.registration_link}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-130 h-90 max-md:w-full max-md:h-auto object-cover rounded-[6px_0px_0_6px] max-lg:rounded-[6px_6px_0px_0px] shadow"
                  />
                </Link>
              </FadeInRight>

              <div className="w-130 h-90 max-md:w-full bg-[#00629b] rounded-[0px_6px_6px_0px] max-lg:rounded-[0px_0px_6px_6px] py-6 text-left px-7">
                <FadeInRight xIndex={-50} yIndex={0}>
                  <p className="text-center text-ieee-white rounded-[30px_4px_30px_4px] text-md mb-1 font-semibold bg-gradient-to-r from-ieee-darkblue-15 to-ieee-darkblue-50 border-l-4 border-r-4 pl-6 py-2 border-ieee-white shadow-[2px_2px_2px_theme(colors.ieee-black-75)]">
                    {event.event_time}
                  </p>
                </FadeInRight>

                <FadeInRight yIndex={50}>
                  <p className="line-clamp-4 text-ieee-white mb-3 mt-3" dangerouslySetInnerHTML={{ __html: event.description, }}/>
                </FadeInRight>

                <FadeInRight xIndex={50} yIndex={0}>
                  <div className="flex justify-center items-center mt-5">
                    <FlipUnit value={timeLeft.days} label="Days" />
                    <FlipUnit value={timeLeft.hours} label="Hours" />
                    <FlipUnit value={timeLeft.minutes} label="Minutes" />
                    <FlipUnit value={timeLeft.seconds} label="Seconds" />
                  </div>
                </FadeInRight>

                <div className="flex justify-center items-center gap-2 mt-4 text-center h-10 relative right-4">
                  <FadeInRight yIndex={50} delay={0.3}>
                    <div className="rotate-225 relative bottom-2">
                      <Undo />
                    </div>
                  </FadeInRight>
                  <FadeInRight yIndex={50} delay={0.5}>
                    <a
                      href={event.registration_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-ieee-black-75 font-semibold px-3 py-2 rounded bg-ieee-yellow cursor-pointer uppercase transition-all hover:rounded-3xl hover:border-ieee-white hover:text-ieee-white border-2 hover:py-1 hover:px-6"
                    >
                      Register Now!
                    </a>
                  </FadeInRight>
                </div>
              </div>
            </div>
          </>
        ) : (
          <FadeIn>
            <div className="relative overflow-hidden bg-gradient-to-br from-[#00629b] via-[#004a7c] to-[#002855] rounded-2xl p-8 md:p-12 shadow-2xl">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse" />
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-ieee-yellow rounded-full blur-xl animate-pulse delay-300" />
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-bounce delay-150" />
              </div>

              <div className="relative z-10 text-center">
                {/* Main content */}
                <div className="mb-6">
                  <div className="inline-block mb-4">
                    <svg className="w-24 h-24 max-md:w-16 max-md:h-16 text-ieee-yellow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    🚀 Something Epic is Brewing...
                  </h3>
                  <p className="text-lg md:text-xl text-ieee-yellow mb-6 font-semibold">
                    No events scheduled yet, but that means we're cooking up something INCREDIBLE!
                  </p>
                </div>

                {/* Call to action */}
                <div className="space-y-4">
                  <p className="text-white/90 text-base md:text-lg">
                    In the meantime, check out our past events or follow us on social media!
                  </p>
                  
                  {/* Social Media Links */}
                  <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
                    <p className="text-white font-semibold text-lg w-full mb-2">Stay Connected:</p>
                    <a href="https://www.facebook.com/ieeensusb" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#1877f2] text-white rounded-lg transition-all transform hover:scale-105 backdrop-blur-sm border border-white/30">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="font-semibold">Facebook</span>
                    </a>
                    <a href="https://www.linkedin.com/company/ieeensusb" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#0077b5] text-white rounded-lg transition-all transform hover:scale-105 backdrop-blur-sm border border-white/30">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="font-semibold">LinkedIn</span>
                    </a>
                    <a href="https://instagram.com/ieeensusb?igshid=1g0f6asti4d02" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] text-white rounded-lg transition-all transform hover:scale-105 backdrop-blur-sm border border-white/30">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span className="font-semibold">Instagram</span>
                    </a>
                    <a href="https://www.twitter.com/ieeensusb" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#1da1f2] text-white rounded-lg transition-all transform hover:scale-105 backdrop-blur-sm border border-white/30">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      <span className="font-semibold">Twitter</span>
                    </a>
                  </div>
                </div>

                {/* Fun animated text */}
                <div className="mt-8 text-white/70 text-sm italic animate-pulse">
                  "Great things take time... and we're taking just enough time to make it AWESOME!" 🚀
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvent;
