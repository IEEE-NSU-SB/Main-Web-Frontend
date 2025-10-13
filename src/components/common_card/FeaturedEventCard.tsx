import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import SectionHeading from "@/components/ui/SectionHeading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import { useParams } from "react-router-dom";

interface FeaturedEvent {
  id: number;
  key: string;
  super_event_name: string;
  super_event_description: string;
  banner_image: string;
  group_name: string;
  date: string;
}

interface FeaturedEventsData {
  all_featured_events: FeaturedEvent[];
}

const images = import.meta.glob("/src/assets/dummy/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// Helper to resolve image by filename
const getImageSrc = (filename: string) => {
  const key = Object.keys(images).find((k) => k.includes(filename));
  return key ? images[key] : "";
};

const FeaturedEventCard = () => {
  const { id } = useParams();
  const { loading, data, error, refetch } =
    useFetchDataJSON<FeaturedEventsData>({
      path: "pages/society-and-ag/data/Events.json",
    });

  if (loading) {
    return (
      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 space-y-4">
        <Skeleton className="h-10 w-48" />
        <div className="flex flex-wrap justify-center gap-4">
          <Skeleton className="w-full md:w-[calc(33.333%-1rem)] h-[400px]" />
          <Skeleton className="w-full md:w-[calc(33.333%-1rem)] h-[400px]" />
          <Skeleton className="w-full md:w-[calc(33.333%-1rem)] h-[400px]" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <ErrorMessage
          message={error || "Failed to load Featured Events"}
          onRetry={refetch}
        />
      </div>
    );
  }

  const eventMapping: Record<string, FeaturedEvent[]> = {
    "ieee-nsu-ras-sbc": data.all_featured_events.filter((e) =>
      e.key.toLowerCase().includes("ras")
    ),
    "ieee-nsu-pes-sbc": data.all_featured_events.filter((e) =>
      e.key.toLowerCase().includes("pes")
    ),
    "ieee-nsu-ias-sbc": data.all_featured_events.filter((e) =>
      e.key.toLowerCase().includes("ias")
    ),
    "ieee-nsu-wie-ag": data.all_featured_events.filter((e) =>
      e.key.toLowerCase().includes("wie")
    ),
  };

  const eventsToShow =
    id && eventMapping[id] ? eventMapping[id] : data.all_featured_events;

  // If no events exist, render nothing
  if (!eventsToShow || eventsToShow.length === 0) {
    return null;
  }

  return (
    <FadeIn>
      <SectionHeading title="Featured Events" widthClass="w-58" />
      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 flex flex-wrap justify-center gap-4 mb-15">
        {eventsToShow.map((event) => (
          <article
            key={event.id}
            className="w-full md:w-[calc(33.333%-1rem)] bg-white h-[400px] border shadow-md rounded-md overflow-hidden transition-shadow hover:shadow-lg"
          >
            <div className="relative h-[200px] overflow-hidden cursor-pointer">
              <img
                className="w-full h-full object-cover transform transition duration-500 ease-in-out hover:scale-105 hover:brightness-90"
                src={getImageSrc(event.banner_image.split("/").pop() || "")}
                alt={event.super_event_name}
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-[#A8A8A8] font-semibold mb-2">
                {event.date} / By {event.group_name}
              </div>
              <h3 className="text-lg font-semibold mb-2 overflow-hidden line-clamp-2">
                {event.super_event_name}
              </h3>
              <p className="leading-relaxed text-gray-700 overflow-hidden line-clamp-2">
                {event.super_event_description}
              </p>
              <a href="#" className="font-medium hover:underline">
                Read More
              </a>
            </div>
          </article>
        ))}
      </div>
    </FadeIn>
  );
};

export default FeaturedEventCard;
