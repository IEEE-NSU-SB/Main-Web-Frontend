import FadeIn from "@/components/ui/FadeIn";
import type { EventData } from "@/types/event";

type EventDetailsProps = {
  eventData: EventData;
};

const EventGallery: React.FC<EventDetailsProps> = ({ eventData }) => {
  return (
    <FadeIn>
      <div className="max-w-[1080px] mx-auto px-[4px] md:px-[6px] md:mb-10">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventData.images.map((image, index) => (
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
      </div>
    </FadeIn>
  );
};

export default EventGallery;
