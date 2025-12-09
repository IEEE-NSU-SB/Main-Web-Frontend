import Wave from '@/components/Wave'
import UpcomingEvent from './UpcomingEvent'
import LollipopChart from './EventGraph1'
import MegaEvents from '@/components/MegaEventCard'
import EventCard from './EventCard'
import { useFetchDataAPI } from '@/hooks/fetchdata'

interface EventData {
  megaEvents: any[];
  featuredEvents: any[];
}

const Events = () => {
  const { loading, data, error, refetch } = useFetchDataAPI<EventData>({ apiUrl: "main_website/get_mega_featured_events/1" });

  return (
    <>
      <Wave title='Events'/>
      <UpcomingEvent/>   
      <LollipopChart/>
      <MegaEvents events={data?.megaEvents || []} loading={loading} error={error || ''} refetch={refetch}/>
      <EventCard/>
    </>
  )
}

export default Events
