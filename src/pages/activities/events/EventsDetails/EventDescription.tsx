import FadeIn from "@/components/ui/FadeIn";
import type { EventData } from "@/types/event";

type EventDetailsProps = {
  eventData: EventData;
};

const EventDescription: React.FC<EventDetailsProps> = ({ eventData }) => {
  return (
    <FadeIn>
      <div className="max-w-[1080px] mx-auto px-[4px] md:px-[6px] mb-10">
        <div className="bg-white">
          <div className="text-[16px] text-justify text-ieee-black-75">
            {eventData.description}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default EventDescription;
