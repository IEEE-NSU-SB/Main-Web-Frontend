import FeedBackForm from "./FeedBackForm";
import Wave from "@/components/Wave";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import BannerDetails from "./BannerDetails";
import RegisterDetails from "./RegisterDetails";
import EventDescription from "./EventDescription";
import EventGallery from "./EventGallery";
import { useParams } from "react-router-dom";

const EventDetailsPages = () => {
  
  const { id } = useParams()

  const { data, loading, error, refetch } = useFetchDataAPI<any>({
    apiUrl: `main_website/get_event_details/${id}`,
  });

  return (
    <>
      <Wave title={data?.title || "Loading..."} />

      {loading ? (
          <><div className="flex justify-center items-center min-h-[500px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading event...</p>
        </div>
      </div></>
      ) : error ? (
        <ErrorMessage message="Failed to load event" onRetry={refetch} />
      ) : (
        <>
          <div className="max-w-[1080px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-[67%_31%] gap-6">
              <div>
                <BannerDetails eventData={data} />
              </div>
              <div className="bg-white">
                <RegisterDetails eventData={data} />
              </div>
            </div>
            <hr className="my-8" />
          </div>

          <EventDescription eventData={data} />
          <EventGallery eventData={data} />
          <FeedBackForm eventData={data} />
        </>
      )}
    </>
  );
};

export default EventDetailsPages;
