import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { useState } from "react";

interface MegaEvent {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  color?: string;
}

interface MegaEventsCardProps {
  events: MegaEvent[];
  color?: string; // optional
}

const MegaEventsCard: React.FC<MegaEventsCardProps> = ({
  events,
  color = "#002855",
}) => {
  const [visibleCount, setVisibleCount] = useState(4);

  if (!events || events.length === 0) return null; // don't render if no events

  const visibleEvents = events.slice(0, visibleCount);

  return (
    <FadeIn>
      <SectionHeading
        title="Mega Events"
        widthClass="w-45"
        titleColor={color}
        underlineColor={color}
      />

      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 flex flex-wrap justify-center gap-6 mb-6">
        {visibleEvents.map((event, idx) => (
          <article
            key={idx}
            className="w-full md:w-[calc(50%-1rem)] border-ieee-white border-1 hover:shadow-[4px_4px_10px_theme(colors.ieee-black-50)] shadow-[2px_2px_8px_theme(colors.ieee-black-50)] rounded-md overflow-hidden"
          >
            <div className="relative w-full h-[250px] cursor-pointer overflow-hidden group">
              <img
                className="w-full h-full object-cover transform transition duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-90"
                src={event.image || "/src/assets/dummy/placeholder.png"}
                alt={event.title}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="text-white text-center">
                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <p className="text-sm line-clamp-3">{event.description}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleCount < events.length && (
        <div className="w-full flex justify-center mb-10">
          <button
            onClick={() =>
              setVisibleCount((prev) => Math.min(prev + 2, events.length))
            }
            style={{
              backgroundColor: color,
              color: "#fff",
              borderColor: color,
            }}
            className="cursor-pointer text-sm font-semibold px-5 py-2 mt-4 mb-8 rounded transition-colors duration-300 hover:brightness-90"
          >
            Load More
          </button>
        </div>
      )}
    </FadeIn>
  );
};

export default MegaEventsCard;
