import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FadeIn from "@/components/ui/FadeIn";
import { useFetchDataJSON } from "@/hooks/fetchdata";

type EventGalleryResponse = {
    gallary_images: string[];
}

const EventGallery = () => {
    const { data, loading, error, refetch } = useFetchDataJSON<EventGalleryResponse[]>({
        path: "pages/activities/events/EventsDetails/EventsDetails.json"
    });
// E:\Main-Web-Frontend\src\pages\activities\events\EventsDetails\EventsDetails.json


    return (
        <FadeIn>
            <div className="max-w-[1080px] mx-auto px-[4px] md:px-[6px] md:mb-10">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                ) : error ? (
                    <ErrorMessage message={"Failed to load event gallery"} onRetry={refetch} />
                ) : (
                    data && data.length > 0 && data[0].gallary_images.length > 0 && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data[0].gallary_images.map((image, index) => (
                                    <div 
                                        key={index} 
                                        className="relative overflow-hidden rounded-sm border-2 border-ieee-white hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                    >
                                        <img
                                            src={image}
                                            alt={`Event gallery image ${index + 1}`}
                                            className="w-full h-auto object-cover hover:scale-105 duration-300 transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        </FadeIn>
    );
};

export default EventGallery;