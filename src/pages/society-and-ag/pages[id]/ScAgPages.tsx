import AgWave from './ScAgWave';
import AgBanner from './ScAgBanner';
import AgParallax from './ScAgParallax';
import Mega_and_Featured from './Mega_and_Featured';
import ScAgMissionVision from './ScAgMissionVision';
import ScAgContact from './ScAgContact';
import ScAgAbout from './ScAgAbout';
import ExecutiveBodySection from './ScAgExecutive';

// parallax fetch 
const parallaxImgData = async () => {
  const fetchData = await fetch("/ScAgParallax.json")
  return fetchData.json();
}
const parallaxImagePromise = parallaxImgData();

// mission vision fetch
const missionVisionData = async () => {
  const fetchData = await fetch('/MissionVision.json')
  return fetchData.json();
}
const missionVisionPromise = missionVisionData();
// about fetch 
const aboutData = async () => {
  const fetchData = await fetch("/ScAgAbout.json")
  return fetchData.json();
}
const aboutPromise = aboutData();


const SocietyOrAg = () => {
  return (
    <div>
      <AgWave></AgWave>
      <AgBanner></AgBanner>
      <AgParallax parallaxImagePromise={parallaxImagePromise}></AgParallax>
      <Mega_and_Featured></Mega_and_Featured>
      <ScAgMissionVision missionVisionPromise={missionVisionPromise}></ScAgMissionVision>
      <ExecutiveBodySection></ExecutiveBodySection>
      <ScAgAbout aboutPromise={aboutPromise}></ScAgAbout>
      <ScAgContact></ScAgContact>
    </div>
  );
};

export default SocietyOrAg;
