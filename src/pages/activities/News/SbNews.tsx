import { useState } from 'react';
import Skeleton from "@/components/skeleton";
import ErrorMessage from "@/components/ui/error-msg";
import Wave from "@/components/wave";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import FadeIn from '@/components/ui/fade-in';

type SbNewsResponse = {
    id: number,
    image: string,
    title: string,
    description: string
};

const SbNews = () => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(3);

    const { loading, data, error, refetch } = useFetchDataJSON<SbNewsResponse[]>({
        path: "pages/activities/News/sbnews.json"
    })

    const toggleCard = (id: number) => {
        setExpandedCard(expandedCard === id ? null : id);
    };   

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    const visibleData = data?.slice(0, visibleCount);
    const hasMore = data && data.length > visibleCount;

    return (
        <FadeIn>
            <div>
                <Wave title="News"></Wave>
                <h1 className="text-center text-[#00629B] text-[28px] font-semibold mb-4 md:mb-10">
                    IEEE NSU Student Branch News
                </h1>
                <div className="max-w-[1080px] mx-auto px-4 md:px-5 py-6">
                    {
                        loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                <Skeleton className="h-35 w-full" />
                                <Skeleton className="h-35 w-full" />
                                <Skeleton className="h-35 w-full" />
                                <Skeleton className="h-35 w-full" />
                            </div>
                        ) : error ? (
                            <ErrorMessage message={"Failed to load news info"} onRetry={refetch} />
                        ) : data && data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {visibleData?.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-fit"
                                        >
                                            <div className="w-full h-64 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt="404"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4 flex flex-col">
                                                <h2 className="text-2xl font-semibold hover:underline my-2 line-clamp-1">
                                                    {item.title}
                                                </h2>
                                                <div className="overflow-hidden">
                                                    <p
                                                        className={`text-gray-600 text-justify  transition-all duration-500 ease-in-out ${expandedCard === item.id ? 'max-h-[1000px]' : 'max-h-[24px]'
                                                            }`}
                                                    >
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => toggleCard(item.id)}
                                                    className="text-[#00629B] hover:text-[#004d7a] font-medium mt-3 text-left transition-colors"
                                                >
                                                    {expandedCard === item.id ? 'Read Less' : 'Read More'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {hasMore && (
                                    <div className="flex justify-center mt-8">
                                        <button
                                            onClick={handleLoadMore}
                                            className="bg-[#00629B] hover:bg-[#004d7a] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                                        >
                                            Load More
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No news available</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </FadeIn>

    );
};

export default SbNews;