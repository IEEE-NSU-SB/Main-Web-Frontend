import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FadeIn from "@/components/ui/FadeIn";
import { useFetchDataJSON } from "@/hooks/fetchdata";

import { Calendar, Users, Building2, Tags } from "lucide-react";

type EventDetailsResponse = {
  image: string;
  date: string;
  title: string;
  category: string;
  organized_by: string;
  collaboration: string;
};

const BannerDetails = () => {
  const { data, loading, error, refetch } = useFetchDataJSON<
    EventDetailsResponse[]
  >({
    path: "pages/activities/events/EventsDetails/EventsDetails.json",
  });

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
          <ErrorMessage
            message={"Failed to load event details"}
            onRetry={refetch}
          />
        ) : eventData ? (
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
              <h1 className="text-3xl shine-text md:text-4xl font-bold mb-6 uppercase leading-tight">
                {eventData.title}
              </h1>

              <div className="flex items-center gap-3 mb-4 text-ieee-black-50">
                {/* Date */}
                <Calendar className="w-5 h-5 text-ieee-darkorange-75" />
                <p className="text-xs uppercase tracking-wider font-semibold">
                  {new Date(eventData.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Category */}
              <div className="flex items-center gap-3 mb-4">
                <Tags className="w-5 h-5 text-ieee-darkorange-75 flex-shrink-0" />
                <div className="flex items-center">
                  <p className="text-xs uppercase tracking-wider text-ieee-black-50 font-semibold">
                    Category:{" "}
                    <span className="normal-case text-base font-medium text-ieee-darkorange-75">
                      {eventData.category}
                    </span>
                  </p>
                </div>
              </div>

              {/* Organized By */}
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-ieee-darkorange-75 flex-shrink-0" />
                <div className="flex items-center gap-2">
                  <p className="text-xs uppercase tracking-wider text-ieee-black-50 font-semibold">
                    Event Organised By:{" "}
                    <span className="normal-case text-base font-medium text-ieee-darkorange-75">
                      {eventData.organized_by}
                    </span>
                  </p>
                </div>
              </div>

              {/* Collaboration */}
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-ieee-darkorange-75 flex-shrink-0" />
                <div className="flex items-center gap-2">
                  <p className="text-xs uppercase tracking-wider text-ieee-black-50 font-semibold">
                    In Collaboration With:{" "}
                    <span className="normal-case text-base font-medium text-ieee-darkorange-75">
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
