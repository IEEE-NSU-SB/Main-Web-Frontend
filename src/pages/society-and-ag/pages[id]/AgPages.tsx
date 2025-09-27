import AgWave from './AgWave';
import AgBanner from './AgBanner';
import AgParallax from './AgParallax';

  const parallaxImgData = async () => {
    const fetchData =  await fetch("/AgParallax.json")
    return fetchData.json();
  }
  const parallaxImagePromise = parallaxImgData();


const SocietyOrAg = () => {

  

  return (
    <div>
      <AgWave></AgWave>
      <AgBanner></AgBanner>
      <AgParallax parallaxImagePromise={parallaxImagePromise}></AgParallax>
    </div>
  );
};

export default SocietyOrAg;
