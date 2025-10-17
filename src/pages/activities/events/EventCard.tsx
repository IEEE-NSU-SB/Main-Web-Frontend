import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import SectionHeading from "@/components/ui/SectionHeading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataJSON } from "../../../hooks/fetchdata";
import { Link } from "react-router-dom";
import { Calendar, Search } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";

interface FeaturedEvent {
  id: number;
  name: string;
  description: string;
  image: string;
  date: string;
  color: string;
  category?: string;
}

interface FeaturedEventsData {
  featured_events: FeaturedEvent[];
}

const images = import.meta.glob("/src/assets/dummy/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getImageSrc = (filename: string) => {
  const key = Object.keys(images).find((k) => k.includes(filename));
  return key ? images[key] : "";
};

const EventCard = () => {
  const { loading, data, error, refetch } =
    useFetchDataJSON<FeaturedEventsData>({
      path: "pages/society-and-ag/data/Events.json",
    });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // --- Base events ---
  const baseEvents = useMemo(() => {
    return data?.featured_events ?? [];
  }, [data]);

  // --- Filtering, searching, sorting ---
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

  // --- Infinite scroll ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setVisibleCount((prev) => {
            const increment = window.innerWidth < 768 ? 1 : 6;
            return Math.min(prev + increment, filteredEvents.length);
          });
        }
      },
      { root: null, rootMargin: "20px", threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [filteredEvents]);

  const visibleEvents = filteredEvents.slice(0, visibleCount);

  if (loading) {
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

  if (error || !data) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <ErrorMessage message={"Failed to load Events"} onRetry={refetch} />
      </div>
    );
  }

  return (
    <>
      <FadeIn>
        <SectionHeading title="Our Events" widthClass="w-42" />
      </FadeIn>

      {/* Filter Bar */}
      <FadeIn>
        <div className="md:max-w-[1080px] w-full mx-auto mt-10 mb-5 flex flex-wrap items-center justify-between gap-4 px-5">
          <div className="relative flex items-center w-full md:w-[48%]">
            <Search className="absolute left-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-3 py-2 border rounded-md w-full text-sm focus:ring-2 focus:ring-ieee-blue focus:outline-none"
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
      <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3 flex flex-wrap justify-center gap-4 mb-15">
        {visibleEvents.map((event, index) => (
          <FadeIn
            key={event.id}
            className="w-full md:w-[calc(33.333%-1rem)]"
            delay={window.innerWidth < 768 ? index * 100 : 0}
          >
            <article className="bg-ieee-gray/5 h-[480px] border rounded-md overflow-hidden transition-shadow hover:shadow-[4px_4px_10px_theme(colors.ieee-black-50)] shadow-[2px_2px_8px_theme(colors.ieee-black-50)]">
              <div className="relative h-[200px] overflow-hidden cursor-pointer">
                <Link to={"/"}>
                  <img
                    className="w-full h-full object-cover transform transition duration-500 ease-in-out hover:scale-105 hover:brightness-90"
                    src={event.image}
                    alt={event.name}
                  />
                </Link>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 h-15 overflow-hidden line-clamp-2 rounded text-ieee-black">
                  <Link to={"/"}>
                    <span className="cursor-pointer hover:underline">
                      {event.name}
                    </span>
                  </Link>
                </h3>
                <h5 className="flex gap-2 text-sm text-ieee-black/90 font-semibold mb-2">
                  <Calendar className="w-4 h-4" />
                  {event.date}
                </h5>
                <p className="h-25 text-ieee-black-75 overflow-hidden line-clamp-4 mb-5">
                  {event.description}
                </p>
                <a
                  href="#"
                  className="cursor-pointer bg-ieee-darkblue-90 hover:bg-ieee-white text-ieee-white hover:text-ieee-darkblue-90 text-sm font-semibold px-6 py-2 border border-ieee-darkblue-90 rounded-[.25rem] transition-colors duration-300"
                >
                  Read More
                </a>
              </div>
            </article>
          </FadeIn>
        ))}

        {visibleCount < filteredEvents.length && (
          <div ref={loaderRef} className="w-full text-center py-5">
            <p className="text-gray-400">Loading more events...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default EventCard;
