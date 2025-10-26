import Wave from '@/components/waave'
import UpcomingEvent from './UpcomingEvent'
import LollipopChart from './EventGraph1'
import MegaEvents from '@/components/MegaEventCard'
import EventCard from './EventCard'

const Events = () => {
  return (
    <>
      <Wave title='Events'/>
      <UpcomingEvent/>   
      <LollipopChart/>
      <MegaEvents events={[]}/>
      <EventCard/>
    </>
  )
}

export default Events
