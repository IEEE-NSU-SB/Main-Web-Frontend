
import { use, type FC } from "react";
import { useParams } from "react-router-dom";

interface MegaEvent {
    id: number;
    super_event_name: string;
    super_event_description: string;
    banner_image: string;
    group_name: string;
}

interface MegaEventsData {
    all_mega_events: MegaEvent[];
}

interface MegaEventsProps {
    megaEventsPromise: Promise<MegaEventsData>;
}

const MegaEvents: FC<MegaEventsProps> = ({ megaEventsPromise }) => {
    const { id } = useParams();
    const megaEventsData: MegaEventsData = use(megaEventsPromise);

    // must group_name er moddhe own nam likhte hobe ******* cause include diye filter kora hoyeche  

    const eventMapping: Record<string, MegaEvent[]> = {
        "ieee-nsu-ras-sbc": megaEventsData.all_mega_events.filter(event =>
            event.group_name.toLowerCase().includes("ras") ||
            event.group_name.toLowerCase().includes("robotics and automation")
        ),
        "ieee-nsu-pes-sbc": megaEventsData.all_mega_events.filter(event =>
            event.group_name.toLowerCase().includes("pes") ||
            event.group_name.toLowerCase().includes("power and energy")
        ),
        "ieee-nsu-ias-sbc": megaEventsData.all_mega_events.filter(event =>
            event.group_name.toLowerCase().includes("ias") ||
            event.group_name.toLowerCase().includes("industry application")
        ),
        "ieee-nsu-wie-ag": megaEventsData.all_mega_events.filter(event =>
            event.group_name.toLowerCase().includes("wie") ||
            event.group_name.toLowerCase().includes("women engineering")
        ),
    };

    //  console.log(eventMapping)

    const eventsToShow = id && eventMapping[id] ? eventMapping[id] : megaEventsData.all_mega_events;
    console.log(eventsToShow);


    return (
        <>
            <div className="max-w-[1100px] w-full mx-auto my-10 px-4">
                {eventsToShow.length > 0 && (
                    <>
                        <h2 className="font-bold text-3xl md:text-4xl">
                            MEGA EVENTS
                        </h2>
                    </>
                )}

                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    {eventsToShow.map((event) => (
                        <div
                            key={event.id}
                            className="w-full md:w-[calc(33.333%-1rem)]"
                        >
                            <article className="bg-white border border-black rounded-md overflow-hidden transition-shadow hover:shadow-lg">
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
                                            By {event.group_name}
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

export default MegaEvents;