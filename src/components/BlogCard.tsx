import React, { useState } from "react";
import SectionHeading from "./ui/SectionHeading";
import FadeIn from "./ui/FadeIn";
import { Calendar, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import Skeleton from "./Skeleton";
import ErrorMessage from "./ui/ErrorMessage";
import { Link } from "react-router-dom";

export interface BlogData {
  id: number;
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

  const isLandingPage = location.pathname === "/";

  // Fetch JSON
  const {
    loading,
    data: blogs,
    error,
    refetch,
  } = useFetchDataAPI<BlogData[]>({
    apiUrl: isLandingPage
      ? "main_website/get_blogs/landing/"
      : "main_website/get_blogs/",
  });

  // Unique categories
  const categories = [
    "All categories",
    ...Array.from(new Set(blogs?.map((e) => e.category))),
  ];

  // Filter & search
  let filteredBlogs =
    blogs?.filter((event) =>
      (event.title + event.author + event.category + event.description)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) || [];

  if (selectedCategory !== "All categories") {
    filteredBlogs = filteredBlogs.filter(
      (e) => e.category === selectedCategory
    );
  }

  filteredBlogs.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="w-full py-4">
      {location.pathname === "/" && <SectionHeading title="Recent Blogs" />}

      {location.pathname !== "/" && (
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 px-6 m-auto max-w-[1090px]">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-4.5 text-ieee-gray w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-4 border border-ieee-gray-15 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-ieee-blue-75 focus:border-ieee-blue-75 text-md"
            />
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            {/* Date filter */}
            <select
              value={dateOrder}
              onChange={(e) =>
                setDateOrder(e.target.value as "latest" | "oldest")
              }
              className="px-4 py-2 border rounded-md shadow-sm text-md focus:outline-none focus:ring-1 focus:ring-ieee-blue-75 focus:border-ieee-blue-75"
            >
              <option value="latest">Date: Latest</option>
              <option value="oldest">Date: Oldest</option>
            </select>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-md shadow-sm text-md focus:outline-none focus:ring-1 focus:ring-ieee-blue-75 focus:border-ieee-blue-75"
            >
              {categories
                .map((cat) =>
                  cat
                    .replace(/\u00A0/g, " ")
                    .replace(/&nbsp;/g, " ")
                    .trim()
                )
                .filter((cat) => cat !== "") // remove empty values
                .map((cleanCat, idx) => (
                  <option key={idx} value={cleanCat}>
                    {cleanCat}
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
            <Skeleton key={idx} className="w-80 h-96 rounded-md" />
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
        <div className="max-w-[1080px] m-auto my-10 flex flex-wrap justify-center items-start gap-10 px-5 max-sm:px-5">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((event) => (
              <FadeIn key={event.id}>
                <div className="max-w-110 lg:max-w-[300px] xl:max-w-[320px] bg-ieee-gray/5 rounded-lg border overflow-hidden  hover:shadow-[4px_4px_10px_var(--color-ieee-gray-50)] shadow-[2px_2px_8px_var(--color-ieee-gray-50)] transition-all duration-300">
                  <div className="overflow-hidden">
                    <Link to={event.link} className="w-110 h-48">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-110 h-48 object-cover transform  transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                  </div>
                  {/* Publisher */}
                  {/* <span className="absolute top-0 left-0 bg-ieee-blue text-ieee-white text-sm font-semibold px-3 py-1 rounded">
                      Branch
                    </span> */}
                  <div className="p-4 rounded-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-ieee-gray mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    {/* <p className="flex items-center gap-2 text-sm font-semibold text-ieee-gray">
                      <FolderClosed className="w-4 h-4" />
                      {event.category}
                    </p> */}
                    <p className="flex items-center italic gap-2 text-sm font-semibold text-ieee-gray overflow-hidden text-ellipsis whitespace-nowrap">
                      {/* <NotebookPen className="w-4 h-4" /> */}
                      {event.author}
                    </p>
                    <h3 className="font-bold my-3 text-[20px] line-clamp-1 text-ieee-black-75">
                      {event.title}
                    </h3>
                    <p
                      className="text-ieee-black-75 mb-4 line-clamp-2 text-[16px] h-12"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                    {/* <Link to={event.link}>
                      <button className="cursor-pointer bg-ieee-darkblue-90 hover:bg-ieee-white text-ieee-white hover:text-ieee-darkblue-90 text-sm font-semibold px-5 py-[.25rem] border border-ieee-darkblue-90 rounded-[.25rem] transition-colors duration-300">
                        Read More
                      </button>
                    </Link> */}
                  </div>
                </div>
              </FadeIn>
            ))
          ) : (
            <p className="text-ieee-gray-15">No blogs found.</p>
          )}
        </div>
      )}

      {/* "See All Blogs" button only on landing page */}
      {isLandingPage && (
        <div className="flex justify-center mt-8">
          <Link to="/blogs">
            <button className="cursor-pointer hover:bg-ieee-darkblue-90 bg-ieee-white hover:text-ieee-white text-ieee-darkblue-90 text-sm font-semibold px-6 py-2 border border-ieee-darkblue-90 rounded-[.25rem] transition-colors duration-300 mb-5">
              See All Blogs
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
