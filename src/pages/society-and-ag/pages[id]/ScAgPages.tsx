import AgWave from './ScAgWave';
import AgBanner from './ScAgBanner';
import AgParallax from './ScAgParallax';
import MegaEvents from '@/components/common_card/mega-event-card';

const parallaxImgData = async () => {
  const fetchData = await fetch("/ScAgParallax.json")
  return fetchData.json();
}
const parallaxImagePromise = parallaxImgData();


const megaEvents = async () => {
  const fetchData = await fetch("/ScAgMegaEvents.json")
  return fetchData.json()
}
const megaEventsPromise = megaEvents();

const SocietyOrAg = () => {



  return (
    <div>
      <AgWave></AgWave>
      <AgBanner></AgBanner>
      <AgParallax parallaxImagePromise={parallaxImagePromise}></AgParallax>
      <MegaEvents megaEventsPromise={megaEventsPromise}></MegaEvents>
    </div>
  );
};

export default SocietyOrAg;
