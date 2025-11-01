import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import SectionHeading from "@/components/ui/SectionHeading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataAPI } from "../../../hooks/fetchdata";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { BiCategory } from "react-icons/bi";

interface FeaturedEvent {
  id: number;
  name: string;
  description: string;
  image: string;
  date: string;
  category?: string;
}

interface FeaturedEventsData {
  count: number;
  next: string | null;
  previous: string | null;
  results: FeaturedEvent[];
}

const EventCard: React.FC = () => {
  const INITIAL_URL = "main_website/get_all_events/";

  const { loading, data, error, refetch } = useFetchDataAPI<FeaturedEventsData>({
    apiUrl: INITIAL_URL,
  });

  const [baseEvents, setBaseEvents] = useState<FeaturedEvent[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Load first page
  useEffect(() => {
    if (data) {
      setBaseEvents(data.results);
      setNextUrl(data.next);
    }
  }, [data]);

  // Fetch next pages manually
  const fetchNextPage = async () => {
    if (!nextUrl) return;
    try {
      const res = await fetch(`${nextUrl}`);
      if (!res.ok) throw new Error("Failed to fetch next page");
      const json: FeaturedEventsData = await res.json();
      setBaseEvents((prev) => [...prev, ...json.results]);
      setNextUrl(json.next);
    } catch (err) {
      console.error(err);
    }
  };

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && nextUrl) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "20px", threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [nextUrl]);

  // Filtering & Sorting
  const filteredEvents = useMemo(() => {
    let filtered = [...baseEvents];

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter((e) => e.category === categoryFilter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      switch (sortOption) {
        case "latest":
          return dateB.getTime() - dateA.getTime();
        case "oldest":
          return dateA.getTime() - dateB.getTime();
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [baseEvents, searchTerm, categoryFilter, sortOption]);

  const visibleEvents = filteredEvents;

  // JSX Rendering
  if (loading && baseEvents.length === 0) {
    return (
      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 space-y-4">
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-full md:w-[calc(33.333%-1rem)] h-[400px]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error && baseEvents.length === 0) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <ErrorMessage message={"Failed to load Events"} onRetry={refetch} />
      </div>
    );
  }

  return (
    <>
      <FadeIn>
        <SectionHeading title="Our Events" />
      </FadeIn>

      {/* Filter Bar */}
      <FadeIn>
        <div className="md:max-w-[1080px] w-full mx-auto mt-10 mb-5 flex flex-wrap items-center justify-between gap-4 px-5">
          <div className="relative flex items-center w-full md:w-[48%]">
            <input
              type="text"
              placeholder="Search events..."
              className="pl-5 pr-3 py-2 border rounded-md w-full md:w-100 text-sm focus:ring-2 focus:ring-ieee-blue focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-[48%] justify-end max-md:justify-center">
            <select
              className="border px-3 py-2 rounded-md text-sm max-md:w-[48%]"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="latest">Date (Latest)</option>
              <option value="oldest">Date (Oldest)</option>
              <option value="az">A–Z</option>
              <option value="za">Z–A</option>
            </select>

            <select
              className="border px-3 py-2 rounded-md text-sm max-md:w-[48%]"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Professional">Professional</option>
              <option value="Technical">Technical</option>
              <option value="Non Technical">Non Technical</option>
              <option value="Administrative">Administrative</option>
              <option value="Humanitarian">Humanitarian</option>
            </select>
          </div>
        </div>
      </FadeIn>

      {/* Event Cards */}
      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 flex flex-wrap justify-center gap-8 mb-15">
        {visibleEvents.map((event) => (
          <FadeIn
            key={event.id}
            className="w-full md:w-[calc(32.333%-1rem)]"
          >
            <article className="bg-ieee-gray/5 h-[420px] border rounded-md overflow-hidden transition-shadow hover:shadow-[4px_4px_10px_theme(colors.ieee-black-50)] shadow-[2px_2px_8px_theme(colors.ieee-black-50)]">
              <Link to={`/events/${event.id}`}>
                <div className="relative h-[200px] overflow-hidden cursor-pointer">
                  <img
                    className="w-full h-full object-cover transform transition duration-500 ease-in-out hover:scale-105 hover:brightness-90"
                    src={event.image}
                    alt={event.name}
                  />
                </div>
                <div className="p-4">
                  <h5 className="inline-flex gap-2 text-[12px] font-semibold px-2 py-1 border-1 rounded-full border-ieee-gray mr-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toISOString().split("T")[0]}
                  </h5>
                  <h5 className="inline-flex gap-2 text-[12px] font-semibold px-2 py-1 border-1 rounded-full border-ieee-gray">
                    <BiCategory className="w-4 h-4" /> {event.category}
                  </h5>
                  <h3 className="text-[20px] font-semibold overflow-hidden line-clamp-1 rounded text-ieee-black mt-3 mb-2">
                    <span className="cursor-pointer hover:underline">{event.name}</span>
                  </h3>
                  <p className="h-25 text-ieee-black-75 overflow-hidden line-clamp-4 mb-5" dangerouslySetInnerHTML={{ __html: event.description }}/>
                </div>
              </Link>
            </article>
          </FadeIn>
        ))}

        {nextUrl && (
          <div ref={loaderRef} className="w-full text-center py-5">
            <p className="text-gray-400">Loading more events...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default EventCard;
