import React, { useState } from "react";
import SectionHeading from "../ui/section-heading";
import FadeIn from "../ui/fade-in";
import { Calendar, FolderClosed, NotebookPen, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import Skeleton from "../skeleton";
import ErrorMessage from "../ui/error-msg";
import { Link } from "react-router-dom";

export interface EventData {
  image: string;
  date: string;
  author: string;
  category: string;
  title: string;
  description: string;
  link: string;
}

const BlogCard: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateOrder, setDateOrder] = useState<"latest" | "oldest">("latest");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All categories");

  // Fetch JSON
  const {
    loading,
    data: events,
    error,
    refetch,
  } = useFetchDataAPI<EventData[]>({
    apiUrl: "main_website/get_blogs/",
  });

  // Unique categories
  const categories = [
    "All categories",
    ...Array.from(new Set(events?.map((e) => e.category))),
  ];

  // Filter & search
  let filteredEvents =
    events?.filter((event) =>
      (event.title + event.author + event.category + event.description)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) || [];

  if (selectedCategory !== "All categories") {
    filteredEvents = filteredEvents.filter(
      (e) => e.category === selectedCategory
    );
  }

  filteredEvents.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="w-full py-4">
      {location.pathname === "/" && (
        <SectionHeading title="Blogs" widthClass="w-32" />
      )}

      {location.pathname !== "/" && (
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 px-6 m-auto max-w-[1090px]">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 text-ieee-gray w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-ieee-gray-15 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-ieee-blue-75 focus:border-ieee-blue-75 text-sm"
            />
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            {/* Date filter */}
            <select
              value={dateOrder}
              onChange={(e) =>
                setDateOrder(e.target.value as "latest" | "oldest")
              }
              className="px-4 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-ieee-blue-75 focus:border-ieee-blue-75"
            >
              <option value="latest">Date: Latest</option>
              <option value="oldest">Date: Oldest</option>
            </select>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-ieee-blue-75 focus:border-ieee-blue-75"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="flex flex-wrap justify-center items-start gap-7 p-6 max-sm:px-5">
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} className="w-80 h-[24rem] rounded-md" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="py-6">
          <ErrorMessage message={"Failed to load blogs"} onRetry={refetch} />
        </div>
      )}

      {/* Blog cards */}
      {!loading && !error && (
        <div className="max-w-[1080px] m-auto mt-10 flex flex-wrap justify-center items-start gap-5 px-5 max-sm:px-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <FadeIn key={index}>
                <div className="max-w-[332px] lg:max-w-[313px] xl:max-w-[332px] bg-ieee-white rounded-sm border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="overflow-hidden h-48 w-full">
                    <Link to={event.link}>
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                  </div>
                  <div className="p-4 rounded-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-ieee-gray mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>

                    <p className="flex items-center gap-2 text-sm font-semibold text-ieee-gray truncate">
                      <NotebookPen className="w-4 h-4" />
                      By {event.author}
                    </p>
                    <p className="flex items-center gap-2 text-sm font-semibold text-ieee-gray truncate">
                      <FolderClosed className="w-4 h-4" />
                      {event.category}
                    </p>
                    <h3 className="font-bold my-3 line-clamp-2 text-ieee-black-75 h-12">
                      {event.title}
                    </h3>
                    <p
                      className="text-ieee-black-75 mb-4 line-clamp-3 text-justify"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                    <Link to={event.link}>
                      <button className="cursor-pointer bg-ieee-darkblue-90 hover:bg-ieee-white text-ieee-white hover:text-ieee-darkblue-90 text-sm font-semibold px-5 py-[.25rem] border border-ieee-darkblue-90 rounded-[.25rem] transition-colors duration-300">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))
          ) : (
            <p className="text-ieee-gray-15">No blogs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogCard;
