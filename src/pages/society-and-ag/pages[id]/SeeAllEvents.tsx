import { Calendar } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

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

const SeeAllEvents = () => {
  const { id } = useParams();
  const { loading, data, error, refetch } =
    useFetchDataJSON<FeaturedEventsData>({
      path: "pages/society-and-ag/data/Events.json",
    });

  if (loading)
    return (
      <div className="flex justify-center my-16">
        <Skeleton className="w-[180px] h-[45px] rounded-md" />
      </div>
    );

  if (error || !data) {
    return (
      <div className="flex justify-center my-16">
        <ErrorMessage message="Failed to load color" onRetry={refetch} />
      </div>
    );
  }

  // Same mapping logic as in FeaturedEventCard
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

  // Determine color based on first event in filtered list
  const buttonColor = eventsToShow[0]?.color || "#00629b";

  return (
    <div className="text-center flex justify-center my-16">
      <Link to="/events">
        <button
          className="cursor-pointer flex items-center gap-2 font-bold py-2 px-4 duration-300 rounded-md text-white"
          style={{
            backgroundColor: buttonColor,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = `${buttonColor}CC`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = buttonColor)
          }
        >
          <Calendar className="w-4 h-4" /> See All Events
        </button>
      </Link>
    </div>
  );
};

export default SeeAllEvents;
