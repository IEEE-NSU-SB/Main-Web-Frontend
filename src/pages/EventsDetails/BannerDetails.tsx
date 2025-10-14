import { useFetchDataJSON } from "@/hooks/fetchdata";

type EventDetailsResponse = {
    image: string;
    date: string;
    title: string;
    category: string;
    organized_by: string;
    collaboration: string;
};



const BannerDetails = () => {

    const {data, loading, error, refetch} = useFetchDataJSON<EventDetailsResponse>({
            path: "pages/EventsDetails/EventsDetails.json"
    })

console.log(data)
// E:\Main-Web-Frontend\src\pages\EventsDetails\EventsDetails.json










    return (
        <div>
            <h1>I am banner details</h1>
        </div>
    );
};

export default BannerDetails;