import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import SectionHeading from "@/components/ui/SectionHeading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import { useParams, Link } from "react-router-dom";

interface MegaEvent {
  id: number;
  key: string;
  super_event_name: string;
  super_event_description: string;
  banner_image: string;
  group_name: string;
}

interface MegaEventsData {
  all_mega_events: MegaEvent[];
}

const images = import.meta.glob("/src/assets/dummy/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImageSrc = (filename: string) => {
  const key = Object.keys(images).find((k) => k.includes(filename));
  return key ? images[key] : "";
};

const MegaEvents = () => {
  const { id } = useParams();
  const { loading, data, error, refetch } = useFetchDataJSON<MegaEventsData>({
    path: "pages/society-and-ag/data/Events.json",
  });

  if (loading) {
    return (
      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 space-y-4">
        <div className="flex flex-wrap justify-center gap-4">
          <Skeleton className="w-full md:w-[calc(50%-1rem)] h-[200px]" />
          <Skeleton className="w-full md:w-[calc(50%-1rem)] h-[200px]" />
          <Skeleton className="w-full md:w-[calc(50%-1rem)] h-[200px]" />
          <Skeleton className="w-full md:w-[calc(50%-1rem)] h-[200px]" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <ErrorMessage
          message={error || "Failed to load Mega Events"}
          onRetry={refetch}
        />
      </div>
    );
  }

  const eventMapping: Record<string, MegaEvent[]> = {
    "ieee-nsu-ras-sbc": data.all_mega_events.filter((e) =>
      e.key.toLowerCase().includes("ras")
    ),
    "ieee-nsu-pes-sbc": data.all_mega_events.filter((e) =>
      e.key.toLowerCase().includes("pes")
    ),
    "ieee-nsu-ias-sbc": data.all_mega_events.filter((e) =>
      e.key.toLowerCase().includes("ias")
    ),
    "ieee-nsu-wie-ag": data.all_mega_events.filter((e) =>
      e.key.toLowerCase().includes("wie")
    ),
  };

  const eventsToShow =
    id && eventMapping[id] ? eventMapping[id] : data.all_mega_events;

  if (!eventsToShow || eventsToShow.length === 0) {
    return null;
  }

  return (
    <FadeIn>
      <SectionHeading title="Mega Events" widthClass="w-45" />
      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 flex flex-wrap justify-center gap-6 mb-15">
        {eventsToShow.map((event) => (
          <article
            key={event.id}
            className="w-full md:w-[calc(50%-1rem)] bg-white border shadow-md rounded-md overflow-hidden hover:shadow-lg"
          >
            {/* Image wrapped in Link */}
            <div className="relative w-full h-[250px] overflow-hidden">
              <Link to={`/events/${event.id}`}>
                <img
                  className="w-full h-full object-cover cursor-pointer transform transition duration-500 ease-in-out hover:scale-105 hover:brightness-90"
                  src={getImageSrc(event.banner_image.split("/").pop() || "")}
                  alt={event.super_event_name}
                />

                <div className="absolute inset-0 bg-ieee-black/50 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="text-white text-left">
                    <h3 className="text-lg font-semibold mb-2">{event.super_event_name}</h3>
                    <p className="text-sm line-clamp-3">{event.super_event_description}</p>
                    <span className="text-xs mt-2 block">By {event.group_name}</span>
                  </div>
                </div>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </FadeIn>
  );
};

export default MegaEvents;
