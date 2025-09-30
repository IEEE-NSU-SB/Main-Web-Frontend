import { use, type FC } from "react";
import { useParams } from "react-router";
import SectionHeading from "../ui/section-heading";

interface FeaturedEvent {
    id: number;
    key: string;
    super_event_name: string;
    super_event_description: string;
    banner_image: string;
    group_name: string;
    date: string;
}

interface FeaturedEventsData {
    all_featured_events: FeaturedEvent[];
}

interface FeaturedEventsProps {
    featuredEventsPromise: Promise<FeaturedEventsData>;
}

const FeaturedEventCard: FC<FeaturedEventsProps> = ({ featuredEventsPromise }) => {
    const { id } = useParams();
    const featuredEventsData: FeaturedEventsData = use(featuredEventsPromise);

    // console.log(featuredEventsData);

    const eventMapping: Record<string, FeaturedEvent[]> = {
        "ieee-nsu-ras-sbc": featuredEventsData.all_featured_events.filter(event =>
            event.key?.toLowerCase().includes("ras")
        ),
        "ieee-nsu-pes-sbc": featuredEventsData.all_featured_events.filter(event =>
            event.key?.toLowerCase().includes("pes")
        ),
        "ieee-nsu-ias-sbc": featuredEventsData.all_featured_events.filter(event =>
            event.key?.toLowerCase().includes("ias")
        ),
        "ieee-nsu-wie-ag": featuredEventsData.all_featured_events.filter(event =>
            event.key?.toLowerCase().includes("wie")
        ),
    };
    //    console.log(eventMapping) 
    const eventsToShow = id && eventMapping[id] ? eventMapping[id] : featuredEventsData.all_featured_events;
    console.log(eventsToShow);

    return (
        <>
            <div className="md:max-w-[1080px] w-full mx-auto my-10 px-3">
                {eventsToShow.length > 0 && (
                    <SectionHeading title="FEATURED EVENTS" widthClass="w-65"></SectionHeading>
                )}



                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    {eventsToShow.map((event) => (
                        <div
                            key={event.id}    
                            className="w-full md:w-[calc(33.333%-1rem)]"
                        >
                            <article className="bg-white h-[400px] border border-black rounded-md overflow-hidden transition-shadow hover:shadow-lg">
                                <div className="relative h-[200px]">
                                    <a href="#">
                                        <img
                                            className="w-full h-full object-cover transform transition duration-500 ease-in-out hover:scale-105 hover:brightness-90"
                                            src={event.banner_image}
                                            alt="img"
                                        />
                                    </a>
                                </div>

                                <div className="p-4">
                                    <header className="mb-4">
                                        <div className="text-sm text-[#A8A8A8] font-semibold">
                                            {event.date} {""}
                                            /By {event.group_name}
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 overflow-hidden line-clamp-2">
                                            <a
                                                href="#"
                                                className="text-gray-800 hover:underline font-bold transition-colors duration-200"
                                            >
                                                {event.super_event_name}
                                            </a>
                                        </h3>
                                    </header>

                                    <p className="leading-relaxed text-gray-700 overflow-hidden line-clamp-2">
                                        {event.super_event_description}
                                    </p>

                                    <a
                                        href="#"
                                        className="font-medium hover:underline"
                                    >
                                        Read More
                                    </a>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>




            </div>
        </>
    );
};

export default FeaturedEventCard;