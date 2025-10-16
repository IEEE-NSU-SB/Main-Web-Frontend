import { useState } from "react";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Wave from "@/components/Wave";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import FadeIn from "@/components/ui/FadeIn";
import { Link } from "react-router";

type SbNewsResponse = {
  id: number;
  image: string;
  title: string;
  description: string;
};

const SbNews = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const { loading, data, error, refetch } = useFetchDataJSON<SbNewsResponse[]>({
    path: "pages/activities/News/sbnews.json",
  });

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleData = data?.slice(0, visibleCount);
  const hasMore = data && data.length > visibleCount;

  return (
    <FadeIn>
      <div>
        <Wave title="News"></Wave>
        <h1 className="text-center text-ieee-blue text-3xl font-semibold mb-4 md:mb-10 mt-10">
          IEEE NSU Student Branch News
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visibleData?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-ieee-gray/5 border border-ieee-white rounded-sm hover:shadow-[2px_2px_10px_theme(colors.ieee-black-25)] shadow-[2px_2px_8px_theme(colors.ieee-black-25)] transition-all duration-300 overflow-hidden flex flex-col h-fit"
                  >
                    <div className="w-full h-64 overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt="404"
                        className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex flex-col">
                      <h2 className="cursor-pointer text-xl font-semibold my-2 mb-4 line-clamp-1">
                        {item.title}
                      </h2>
                      <div className="overflow-hidden">
                        <p
                          className={`text-gray-600 text-justify  transition-all duration-500 ease-in-out ellipsis ${
                            expandedCard === item.id
                              ? "max-h-[1000px] line-clamp-none"
                              : "max-h-[72px] line-clamp-3"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleCard(item.id)}
                        className="text-ieee-blue hover:text-ieee-blue/80 cursor-pointer font-medium mt-3 text-left transition-colors"
                      >
                        {expandedCard === item.id ? "Read Less" : "Read More"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="cursor-pointer bg-ieee-darkblue-90 hover:bg-ieee-blue text-ieee-white px-8 py-3 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-ieee-gray text-lg">No news available</p>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

export default SbNews;
