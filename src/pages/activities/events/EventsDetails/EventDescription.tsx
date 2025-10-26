import Skeleton from "@/components/skeeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FadeIn from "@/components/ui/FadeIn";
import { useFetchDataJSON } from "@/hooks/fetchdata";


type EventDescriptionResponse = {
    description: string;
}

const EventDescription = () => {
    const { data, loading, error, refetch } = useFetchDataJSON<EventDescriptionResponse[]>({
        path: "pages/activities/events/EventsDetails/EventsDetails.json"
    });
    // E:\Main-Web-Frontend\src\pages\activities\events\EventsDetails\EventsDetails.json

    return (
        <FadeIn>
            <div className="max-w-[1080px] mx-auto px-[4px] md:px-[6px] my-6 md:mt-6 md:mb-20">
                {loading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-30 w-full" />
                    </div>
                ) : error ? (
                    <ErrorMessage message={"Failed to load event description"} onRetry={refetch} />
                ) : (
                    data && data.length > 0 && (
                        <div className="bg-white">
                            <div className="text-[18px] text-justify">
                                {data[0].description}
                            </div>
                        </div>
                    )
                )}
            </div>
        </FadeIn>
    );
};

export default EventDescription;