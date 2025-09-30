import MegaEvents from '@/components/common_card/mega-event-card';
import FeaturedEventCard from '@/components/common_card/FeaturedEventCard';
import { Calendar } from 'lucide-react';
import FadeIn from '@/components/ui/fade-in';





// mega event fetch 
const megaEvents = async () => {
    const fetchData = await fetch("/ScAgMegaEvents.json")
    return fetchData.json()
}
const megaEventsPromise = megaEvents();


// featured event fetch
const featuredEvents = async () => {
    const fetchData = await fetch("/ScAgFeaturedEvents.json")
    return fetchData.json()
}
const featuredEventsPromise = featuredEvents();





const Mega_and_Featured = () => {
    return (
    <FadeIn>
       
       <div>
            <MegaEvents megaEventsPromise={megaEventsPromise}></MegaEvents>
            <FeaturedEventCard featuredEventsPromise={featuredEventsPromise}></FeaturedEventCard>
            <div className="text-center flex justify-center mb-6">
                <button className='bg-[#50C878] flex font-bold py-2 px-4 duration-300 rounded-md hover:bg-[#61A60E]'>
                    <Calendar /> See All
                    Events
                </button>
            </div>

        </div>

    </FadeIn>
        
    );
};

export default Mega_and_Featured;