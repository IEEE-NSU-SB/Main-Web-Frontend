import React, { useState } from "react";
import spac24Image from "../../assets/dummy/image1.png"; // placeholder image
import SectionHeading from "../ui/section-heading";
import FadeIn from "../ui/fade-in";
import { Calendar, FolderClosed, NotebookPen, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

type EventData = {
  image: string;
  date: string;
  author: string;
  category: string;
  title: string;
  description: string;
};

const events: EventData[] = [
  {
    image: spac24Image,
    date: "2025-12-23",
    author: "Azima Islam Ruba",
    category: "Science & Technology",
    title: "Human, In a battleground with Human-made Machines",
    description:
      "To begin with the pressing question, what will happen to human if AI takes over all our jobs. When it comes to employment being “taken over” by AI, it’s more likely to say that the more complex and specialized jobs will be “replaced” by AI. AI’s or Robots have a  unique strength which is they are strongly programmed to be precise, fast, be able to store more data and information, and lacking emotions and sense for which they won’t be off to any machined and complex works and be more efficient. Thus the jobs AI will take and be replaced by are more of the routine, repetitive, optimizing jobs along with the high and more complex jobs. Since AI be taking over the more complex and programmed jobs, it brings to the possibilities and what works could humans be doing in the AI era. AI will bring us serendipity as it will help us know the true existence of human life. Human life is not about the routine jobs. Human purpose in life is not only about working hard and attain wealth and respect but more about expressing love and compassion, making a positive difference to others and the social values. ",
  },
  {
    image: spac24Image,
    date: "2025-12-22",
    author: "Azima Islam Ruba",
    category: "Education",
    title: "Ivy League Insights for Aspiring Engineers",
    description:
      "Signal processing, a cornerstone of scientific and engineering endeavors, finds its essence in extracting meaningful information from often noisy datasets. In our recent project, we delved into the expansive world of signal processing using MATLAB, aiming to uncover the effects of different filters on two fundamental signal types: rectangular and triangular pulses. Our journey began by leveraging MATLAB’s robust signal generation functions to create baseline pulses, which then underwent a transformation as we introduced carefully controlled levels of noise.In the realm of signal processing, noise is an inevitable adversary, mimicking the real-world challenges that engineers and scientists encounter. Our goal was to simulate these challenges and observe how various filters, including lowpass filters, respond to restore clarity and precision in the signals. By adding noise to our pulses, we created a dynamic and realistic environment that allowed us to assess the efficacy of different filters in mitigating the impact of interference on signal integrity.",
  },
  {
    image: spac24Image,
    date: "2025-12-21",
    author: "Azima Islam Ruba",
    category: "Technology",
    title: "AI & Future of Bangladesh",
    description:
      "Whether AI will take over jobs in future, what will the future be for human and what affect will the AI  bring to the work life, what will AI mean for the future of work. All these questions have arisen as computers and technology have progressed. John McCarthy initially invented  the term artificial intelligence (AI) in 1956, defining it as “the science and engineering of  creating intelligent machines, which is the simulation of human intelligence processed  by computers.” However, today’s AI is based on the current state of the art and functions as an optimizer. It is still debated if AI poses a threat to humanity. While no one can predict exactly how AI’s will evolve in the future, the current trends and developments picture of how AI will become part of our lives. ",
  },
];

const BlogCard: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateOrder, setDateOrder] = useState<"latest" | "oldest">("latest");
  const [selectedCategory, setSelectedCategory] = useState<string>("All categories");

  // Get unique categories
  const categories = ["All categories", ...Array.from(new Set(events.map(e => e.category)))];

  // Filter & search
  let filteredEvents = events.filter(event =>
    (event.title + event.author + event.category + event.description)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Filter by category
  if (selectedCategory !== "All categories") {
    filteredEvents = filteredEvents.filter(e => e.category === selectedCategory);
  }

  // Sort by date
  filteredEvents.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="w-full py-4">
        {/* Show heading only on home page */} 
        {location.pathname === "/" && <SectionHeading title="Blogs" widthClass="w-32" />}
        {/* Show search + filters outside home */}
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ieee-darkblue-90 focus:border-ieee-darkblue-90 text-sm"
                />
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
            {/* Date filter */}
            <select
              value={dateOrder}
              onChange={(e) => setDateOrder(e.target.value as "latest" | "oldest")}
              className="px-4 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-ieee-darkblue-90 focus:border-ieee-darkblue-90"
              >
              <option value="latest">Date: Latest</option>
              <option value="oldest">Date: Oldest</option>
            </select>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-ieee-darkblue-90 focus:border-ieee-darkblue-90"
              >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            </div>
          </div>
        )}

        {/* Blog cards */}
        <div className="flex flex-wrap justify-center items-start gap-7 p-6 max-sm:px-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <FadeIn>
              <div
                key={index}
                className="max-w-[328px] lg:max-w-[305px] xl:max-w-[328px] bg-ieee-white rounded-sm border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                <div className="overflow-hidden h-48 w-full">
                  <img
                    src={event.image}
                    alt={`Event ${index}`}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                    />
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
                  <p className="text-ieee-black-75 mb-4 line-clamp-3 text-justify">
                    {event.description}
                  </p>
                  <button className="cursor-pointer bg-ieee-darkblue-90 hover:bg-ieee-white text-ieee-white hover:text-ieee-darkblue-90 text-sm font-semibold px-5 py-[.25rem] border-1 border-ieee-darkblue-90 rounded-[.25rem] transition-colors duration-300">
                    Read More
                  </button>
                </div>
              </div>
          </FadeIn>
            ))
          ) : (
            <p className="text-gray-500">No blogs found.</p>
          )}
        </div>
      </div>
    );
};

export default BlogCard;
