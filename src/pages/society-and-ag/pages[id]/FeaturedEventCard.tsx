import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import SectionHeading from "@/components/ui/SectionHeading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import { Link, useParams } from "react-router-dom";
import { Calendar } from "lucide-react";

interface FeaturedEvent {
  id: number;
  key: string;
  name: string;
  description: string;
  banner_image: string;
  group_name: string;
  date: string;
  color: string;
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
        <ErrorMessage message={"Failed to load Events"} onRetry={refetch} />
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
            className="w-full md:w-[calc(33.333%-1rem)] bg-white h-[480px] border rounded-md overflow-hidden transition-shadow hover:shadow-[4px_4px_10px_theme(colors.ieee-black-50)] shadow-[2px_2px_8px_theme(colors.ieee-black-50)]"
            style={{ backgroundColor: `${event.color}E6` }}
          >
            <div className="relative h-[200px] overflow-hidden cursor-pointer">
              <Link to={"/"}>
                <img
                  className="w-full h-full object-cover transform transition duration-500 ease-in-out hover:scale-105 hover:brightness-90"
                  src={getImageSrc(event.banner_image.split("/").pop() || "")}
                  alt={event.name}
                />
              </Link>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 h-15 overflow-hidden line-clamp-2 rounded text-ieee-white">
                <Link to={"/"}>
                  <span className="cursor-pointer hover:underline">
                    {event.name}
                  </span>
                </Link>
              </h3>
              <h5 className="flex gap-2 text-sm text-ieee-white/90 font-semibold mb-2">
                <Calendar className="w-4 h-4" />
                {event.date}
              </h5>
              {/* <h5 className="text-sm text-ieee-white-75 font-semibold mb-2">
                By - {event.group_name}
                </h5> */}
              <p className="h-25 text-ieee-black-75 overflow-hidden line-clamp-4 font-bold mb-5">
                {event.description}
              </p>
              <a
                href="#"
                className={`hover:bg-ieee-white transition-all border-ieee-white border-1 300 ease-in-out hover:rounded-2xl hover:underline bg-ieee-white/15 px-4 py-1 rounded`}
                style={{
                  color: "#ffffff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = `${event.color}CC`)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
              >
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
