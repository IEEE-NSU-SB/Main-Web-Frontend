import FadeIn from "@/components/ui/FadeIn";
import type { EventData } from "@/types/event";
import { Calendar, Users, Building2, Tags } from "lucide-react";

type EventDetailsProps = {
  eventData: EventData;
};

const BannerDetails: React.FC<EventDetailsProps> = ({ eventData }) => {
  return (
    <FadeIn>
      <div className="max-w-[1080px] mx-auto px-[4px] md:px-[6px]">
        <div className="space-y-6">
          {/* Event Banner Image */}
          <div className="relative overflow-hidden ">
            <div className="w-full flex justify-center">
              <div className="relative w-200">
                <img
                  src={eventData.image}
                  alt={eventData.title}
                  className="w-full h-full object-cover rounded-md shadow-md z-2 relative"
                />
              </div>
            </div>
          </div>

          {/* Event Details Section */}
          <div className="bg-white rounded-sm">
            {/* Title */}
            <h1 className="text-3xl shine-text md:text-3xl font-bold mb-6 uppercase leading-tight">
              {eventData.title}
            </h1>

            {/* Date (always shown if start_date exists) */}
            {eventData.start_date && (
              <div className="flex items-center gap-3 mb-4 text-ieee-black-50">
                <Calendar className="w-5 h-5 text-ieee-darkorange-75" />
                <p className="text-xs uppercase tracking-wider font-semibold">
                  {new Date(eventData.start_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}

            {/* Category */}
            {eventData.category && (
              <div className="flex items-center gap-3 mb-4">
                <Tags className="w-5 h-5 text-ieee-darkorange-75 flex-shrink-0" />
                <p className="text-xs uppercase tracking-wider text-ieee-black-50 font-semibold">
                  Category:{" "}
                  <span className="normal-case text-base font-medium text-ieee-darkorange-75">
                    {eventData.category}
                  </span>
                </p>
              </div>
            )}

            {/* Organized By */}
            {eventData.organizer && (
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-ieee-darkorange-75 flex-shrink-0" />
                <p className="text-xs uppercase tracking-wider text-ieee-black-50 font-semibold">
                  Event Organised By:{" "}
                  <span className="normal-case text-base font-medium text-ieee-darkorange-75">
                    {eventData.organizer}
                  </span>
                </p>
              </div>
            )}

            {/* Collaboration */}
            {eventData.collaboration && (
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-ieee-darkorange-75 flex-shrink-0" />
                <p className="text-xs uppercase tracking-wider text-ieee-black-50 font-semibold">
                  In Collaboration With:{" "}
                  <span className="normal-case text-base font-medium text-ieee-darkorange-75">
                    {eventData.collaboration}
                  </span>
                </p>
              </div>
            )}

            {/* Inter Branch Collaboration */}
            {eventData.inter_branch && (
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-ieee-darkorange-75 flex-shrink-0" />
                <p className="text-xs uppercase tracking-wider text-ieee-black-50 font-semibold">
                  Inter Branch Collaboration:{" "}
                  <span className="normal-case text-base font-medium text-ieee-darkorange-75">
                    {eventData.inter_branch}
                  </span>
                </p>
              </div>
            )}

            {/* Intra Branch Collaboration */}
            {eventData.intra_branch && (
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-ieee-darkorange-75 flex-shrink-0" />
                <p className="text-xs uppercase tracking-wider text-ieee-black-50 font-semibold">
                  Intra Branch Collaboration:{" "}
                  <span className="normal-case text-base font-medium text-ieee-darkorange-75">
                    {eventData.intra_branch}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default BannerDetails;
