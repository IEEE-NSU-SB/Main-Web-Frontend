
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FadeIn from "@/components/ui/FadeIn";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import { Calendar, DollarSign, Info } from 'lucide-react';

type RegisterDetailsResponse = {
    start_time: string;
    end_time: string;
    cost: string;
    read_more_link: string;
    four_event_share_links: {
        facebook: string;
        twitter: string;
        linkedin: string;
        instagram: string;
    };
}

const RegisterDetails = () => {
    const { data, loading, error, refetch } = useFetchDataJSON<RegisterDetailsResponse[]>({
        path: "pages/activities/events/EventsDetails/EventsDetails.json"
    })
    console.log(data)

    return (
        <FadeIn>
            <div className="max-w-[1080px] mx-auto px-[4px] md:px-[6px]">
                {loading ? (
                    <div className="space-y-6">
                        <Skeleton className="h-96 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                ) : error ? (
                    <ErrorMessage message={"Failed to load register details"} onRetry={refetch} />
                ) : (
                    data && data.length > 0 && (
                        <div className="max-w-sm mx-auto">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                {/* Event Details Section */}
                                <div className="p-6 space-y-4">
                                    {/* Start Time */}
                                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                        <div className="mt-0.5">
                                            <Calendar className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-700 mb-1">Start Time</h3>
                                            <p className="text-sm text-gray-600">{data[0].start_time}</p>
                                        </div>
                                    </div>

                                    {/* End Time */}
                                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                        <div className="mt-0.5">
                                            <Calendar className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-700 mb-1">End Time</h3>
                                            <p className="text-sm text-gray-600">{data[0].end_time}</p>
                                        </div>
                                    </div>

                                    {/* Cost */}
                                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                        <div className="mt-0.5">
                                            <DollarSign className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-700 mb-1">COST</h3>
                                            <p className="text-sm text-gray-600">{data[0].cost}</p>
                                        </div>
                                    </div>

                                    {/* More Info */}
                                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                                        <div className="mt-0.5">
                                            <Info className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-700 mb-1">MORE INFO</h3>
                                            <a
                                                href={data[0].read_more_link}
                                                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                                            >
                                                Read More
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Register Button */}
                                <div className="px-6 pb-6">
                                    <button className=" cursor-pointer w-full bg-[#002855] hover:bg-[#003366] text-white font-bold py-4 px-6 rounded transition-colors duration-200">
                                        REGISTER
                                    </button>

                                </div>

                                {/* Share Section */}
                                {/* <div className="border-t border-gray-200 p-6">
                                    <h3 className="text-center text-sm font-bold text-blue-900 mb-4">
                                        SHARE THIS EVENT
                                    </h3>
                                    <div className="flex justify-center items-center gap-4">
                                        <a
                                            href={data[0].four_event_share_links.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-700 transition-colors"
                                            aria-label="Share on Facebook"
                                        >
                                            <Facebook className="w-6 h-6" fill="currentColor" />
                                        </a>
                                        <a
                                            href={data[0].four_event_share_links.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-800 hover:text-gray-900 transition-colors"
                                            aria-label="Share on Twitter"
                                        >
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </a>
                                        <a
                                            href={data[0].four_event_share_links.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 hover:text-blue-800 transition-colors"
                                            aria-label="Share on LinkedIn"
                                        >
                                            <Linkedin className="w-6 h-6" fill="currentColor" />
                                        </a>
                                        <a
                                            href={`mailto:?subject=Event&body=Check out this event`}
                                            className="text-red-500 hover:text-red-600 transition-colors"
                                            aria-label="Share via Email"
                                        >
                                            <Mail className="w-6 h-6" fill="currentColor" />
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    )
                )}
            </div>
        </FadeIn>
    );

};

export default RegisterDetails;