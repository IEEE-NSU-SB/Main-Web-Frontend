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

  const [decryptedText, setDecryptedText] = useState("");
  const fullText = event?.title ?? "UPCOMING EVENT";

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

  // Decrypt Animation
  useEffect(() => {
    if (!fullText) return;
    let iterations = 0;
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const interval = setInterval(() => {
      setDecryptedText(() =>
        fullText
          .split("")
          .map((char, i) => {
            if (i < iterations) return fullText[i];
            if (char === " ") return " ";
            return possible[Math.floor(Math.random() * possible.length)];
          })
          .join("")
      );

      if (iterations >= fullText.length) clearInterval(interval);
      iterations += 0.5;
    }, 50);

    return () => clearInterval(interval);
  }, [fullText]);

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
        ) : event ? (
          <>
            <FadeIn>
              <h2 className="text-3xl text-ieee-black-75 font-normal mb-2">
                UPCOMING EVENT :
              </h2>
              <Link to={event.id}>
                <h2 className="text-3xl shine-text line-clamp-2 text-left mb-5">
                  {decryptedText}
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
        ) : null}
      </div>
    </section>
  );
};

export default UpcomingEvent;
