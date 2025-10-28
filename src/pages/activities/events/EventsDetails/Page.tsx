import TopSection from "./TopSection";
import MidSection from "./MidSection";
import FeedBackForm from "./FeedBackForm";
import Wave from "@/components/waave";

const EventDetailsPages = () => {
  return (
    <>
      <Wave
        title="EEEE STEP 2020: Transition to Sustainable Future"
        subtitle="IEEE NSU Student Branch"
      ></Wave>
      <div className="max-w-[1080px] mx-auto px-4">
        <TopSection />
        <hr className="my-8" />
      </div>
      <div className="max-w-[1080px] mx-auto px-4">
        <MidSection />
      </div>
      <FeedBackForm />
    </>
  );
};

export default EventDetailsPages;
