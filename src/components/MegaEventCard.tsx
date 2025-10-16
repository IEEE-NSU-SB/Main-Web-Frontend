import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import SectionHeading from "@/components/ui/SectionHeading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

interface MegaEvent {
  id: number;
  name: string;
  description: string;
  banner_image: string;
  group_name: string;
  date: string;
  color?: string;
}

interface SocietyData {
  color: string;
  mega_events: MegaEvent[];
}

interface SocietiesData {
  [key: string]: SocietyData;
}

const images = import.meta.glob("/src/assets/dummy/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImageSrc = (filename: string) => {
  const key = Object.keys(images).find((k) => k.includes(filename));
  return key ? images[key] : "";
};

const MegaEventsCard = () => {
  const { id } = useParams();
  const { loading, data, error, refetch } = useFetchDataJSON<SocietiesData>({
    path: "pages/society-and-ag/data/Events.json",
  });

  const [visibleCount, setVisibleCount] = useState(4);

  if (loading) {
    return (
      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 space-y-4">
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-full md:w-[calc(50%-1rem)] h-[200px]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <ErrorMessage message={"Failed to load Mega Events"} onRetry={refetch} />
      </div>
    );
  }

  const societyData = id && data[id] ? data[id] : null;
  if (!societyData || !societyData.mega_events) return null;

  const { mega_events, color: sectionColor } = societyData;

  const visibleEvents = mega_events.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, mega_events.length));
  };

  return (
    <FadeIn>
      <SectionHeading title="Mega Events" widthClass="w-45" titleColor={sectionColor} />

      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 flex flex-wrap justify-center gap-6 mb-6">
        {visibleEvents.map((event) => (
          <article
            key={event.id}
            className="w-full md:w-[calc(50%-1rem)] border-ieee-white border-1 hover:shadow-[4px_4px_10px_theme(colors.ieee-black-50)] shadow-[2px_2px_8px_theme(colors.ieee-black-50)] rounded-md overflow-hidden"
          >
            <div className="relative w-full h-[250px] overflow-hidden group">
              <Link to={`/events/${event.id}`}>
                <img
                  className="w-full h-full object-cover cursor-pointer transform transition duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-90 group-hover:blur-sm"
                  src={getImageSrc(event.banner_image.split("/").pop() || "")}
                  alt={event.name}
                />
                <div className="absolute inset-0 shadow bg-ieee-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="text-white text-center">
                    <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
                    <p className="text-sm line-clamp-3">{event.description}</p>
                    <span className="text-xs mt-2 block">By {event.group_name}</span>
                  </div>
                </div>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {visibleCount < mega_events.length && (
        <div className="w-full flex justify-center mb-10">
          <button
            onClick={handleLoadMore}
            className="cursor-pointer bg-ieee-darkblue-90 hover:bg-ieee-white text-ieee-white hover:text-ieee-darkblue-90 text-sm font-semibold px-5 py-2 mt-4 mb-8 border border-ieee-darkblue-90 rounded-[.25rem] transition-colors duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </FadeIn>
  );
};

export default MegaEventsCard;
