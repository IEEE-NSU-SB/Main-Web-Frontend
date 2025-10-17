import EventDescription from "./EventDescription";
import EventGallary from "./EventGallary";
import RegisterDetails from "./RegisterDetails";

const MidSection = () => {
    return (
        <div>
            <span className="block md:hidden"><RegisterDetails></RegisterDetails></span>
         <EventDescription></EventDescription>
         <EventGallary></EventGallary>
        </div>
    );
};

export default MidSection;