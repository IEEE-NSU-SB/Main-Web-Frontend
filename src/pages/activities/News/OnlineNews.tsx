import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import FadeIn from "@/components/ui/FadeIn";
import { Link } from "react-router";

type OnlineNewsResponse = {
  id: number;
  date: string;
  by: string;
  image: string;
  title: string;
  description: string;
  article_link: string;
};

const OnlineNews = () => {
  const { loading, data, error, refetch } = useFetchDataAPI<
    OnlineNewsResponse[]
  >({
    apiUrl: "main_website/get_online_news/",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = data ? Math.ceil(data.length / itemsPerView) - 1 : 0;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !data || data.length <= itemsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, data, maxIndex, itemsPerView]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setIsAutoPlaying(false); // Pause auto-play when manually navigating
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setIsAutoPlaying(false); // Pause auto-play when manually navigating
  };

  return (
    <FadeIn>
      <div>
        <h1 className="text-center text-ieee-blue text-3xl font-semibold mb-4 mt-12 md:mb-8">
          Online News
        </h1>
        <div className="max-w-[1080px] mx-auto px-4 md:px-5 py-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Skeleton className="h-96 w-full" />
              <Skeleton className="h-96 w-full md:block hidden" />
              <Skeleton className="h-96 w-full md:block hidden" />
            </div>
          ) : error ? (
            <ErrorMessage
              message={"Failed to load news info"}
              onRetry={refetch}
            />
          ) : data && data.length > 0 ? (
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded">
                <div className="flex transition-transform duration-400 ease-in-out">
                  {Array.from({
                    length: Math.ceil(data.length / itemsPerView),
                  }).map((_, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-1"
                    >
                      {data
                        .slice(
                          slideIndex * itemsPerView,
                          (slideIndex + 1) * itemsPerView
                        )
                        .map((item) => (
                          <div
                            key={item.id}
                            className="bg-ieee-gray/5 border border-ieee-white rounded-md hover:shadow-[2px_2px_10px_theme(colors.ieee-black-25)] shadow-[2px_2px_8px_theme(colors.ieee-black-25)] transition-all duration-300"
                          >
                            {/* Image */}
                            <div className="w-full h-48 overflow-hidden bg-gray-100">
                              <Link to={item.article_link} target="_blank">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                />
                              </Link>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                              {/* Date and By */}
                              <div className="flex items-center gap-2 text-ieee-gray text-sm mb-3 line-clamp-1">
                                <span>
                                  {
                                    new Date(item.date)
                                      .toISOString()
                                      .split("T")[0]
                                  }
                                </span>
                                <span>•</span>
                                <span>By {item.by}</span>
                              </div>

                              {/* Title */}
                              <Link to={item.article_link} target="_blank">
                                <h3 className="text-lg line-clamp-2 h-12 font-bold mb-2 text-[17px] text-gray-800 hover:text-ieee-blue transition-colors">
                                  {item.title}
                                </h3>
                              </Link>

                              {/* Description */}
                              <p className="line-clamp-4 h-25 text-gray-600 text-sm leading-relaxed">
                                {item.description}
                              </p>
                              <button className="mt-4 text-ieee-blue font-semibold hover:underline hover:text-[#004d7a] transition-colors">
                                <a href={item.article_link} target="_blank">
                                  Read More
                                </a>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {data.length > itemsPerView && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-ieee-white/95 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg hover:bg-ieee-blue hover:text-ieee-white transition-all duration-300 cursor-pointer z-10 group"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:text-ieee-white transition-colors" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-ieee-white/95 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-lg hover:bg-ieee-blue hover:text-ieee-white transition-all duration-300 cursor-pointer z-10 group"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:text-ieee-white transition-colors" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No news available</p>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

export default OnlineNews;
