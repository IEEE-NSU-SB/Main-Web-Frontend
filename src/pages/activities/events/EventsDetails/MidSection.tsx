import EventDescription from "./EventDescription";
import EventGallery from "./EventGallery";
import RegisterDetails from "./RegisterDetails";

const MidSection = () => {
    return (
        <div>
            <span className="block md:hidden"><RegisterDetails/></span>
         <EventDescription/>
         <EventGallery/>
        </div>
    );
};

export default MidSection;