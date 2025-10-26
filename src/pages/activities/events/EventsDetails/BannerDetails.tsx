
import Skeleton from "@/components/skeeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FadeIn from "@/components/ui/FadeIn";
import { useFetchDataJSON } from "@/hooks/fetchdata";

import { Calendar, Users, Building2, Tags } from 'lucide-react';

type EventDetailsResponse = {
    image: string;
    date: string;
    title: string;
    category: string;
    organized_by: string;
    collaboration: string;
};

const BannerDetails = () => {

    const { data, loading, error, refetch } = useFetchDataJSON<EventDetailsResponse[]>({
        path: "pages/activities/events/EventsDetails/EventsDetails.json"
    })

    const eventData = data?.[0];

    return (
        <FadeIn>
            <div className="max-w-[1080px] mx-auto px-[4px] md:px-[6px]">
                {loading ? (
                    <div className="space-y-6">
                        <Skeleton className="h-96 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                ) : error ? (
                    <ErrorMessage message={"Failed to load event details"} onRetry={refetch} />
                ) : eventData ? (
                    <div className="space-y-6">
                        {/* Event Banner Image */}
                        <div className="relative overflow-hidden rounded-sm">
                            <img
                                src={eventData.image}
                                alt={eventData.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Event Details Section */}
                        <div className="bg-white rounded-sm">
                            {/* Date */}
                            <div className="flex items-center gap-3 mb-4">
                                <Calendar className="w-5 h-5 text-[#00629B]" />
                                <p className="text-sm uppercase tracking-wider text-[#00629B] font-semibold">
                                    {new Date(eventData.date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase leading-tight">
                                {eventData.title}
                            </h1>


                            {/* Category */}
                            <div className="flex items-center gap-3 mb-4">
                                <Tags className="w-5 h-5 text-[#E87722] flex-shrink-0" />
                                <div className="flex items-center">
                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        Category:{' '}
                                        <span className="normal-case text-base font-medium text-[#E87722]">
                                            {eventData.category}
                                        </span>
                                    </p>
                                </div>
                            </div>


                            {/* Organized By */}
                            <div className="flex items-center gap-3 mb-4">
                                <Users className="w-5 h-5 text-[#E87722] flex-shrink-0" />
                                <div className="flex items-center gap-2">
                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        Event Organised By:{' '}
                                        <span className="normal-case text-base font-medium text-[#E87722]">
                                            {eventData.organized_by}
                                        </span>
                                    </p>
                                </div>
                            </div>


                            {/* Collaboration */}
                            <div className="flex items-center gap-3">
                                <Building2 className="w-5 h-5 text-[#E87722] flex-shrink-0" />
                                <div className="flex items-center gap-2">
                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        In Collaboration With:{' '}
                                        <span className="normal-case text-base font-medium text-[#E87722]">
                                            {eventData.collaboration}
                                        </span>
                                    </p>


                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </FadeIn>
    );
};

export default BannerDetails;