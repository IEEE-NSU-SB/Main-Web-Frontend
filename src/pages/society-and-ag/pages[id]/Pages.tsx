import AgWave from "./SCAGWave";
import Intro from "./Intro";
import MegaEvents from "@/components/MegaEventCard";
import AgParallax from "./Parallax";
import FeaturedEventCard from "@/pages/society-and-ag/pages[id]/FeaturedEventCard";
import SeeAllEvents from "./SeeAllEvents";
import ScAgMissionVision from "./MissionVision";
import ExecutiveBodySection from "./Executive";
import About from "./About";
import Contact from "./Contact";

const SocietyOrAg = () => {
  return (
    <div>
      <AgWave />
      <Intro />
      <MegaEvents />
      <AgParallax />
      <FeaturedEventCard />
      <SeeAllEvents/>
      {/* <ScAgMissionVision /> */}
      <ExecutiveBodySection />
      <About />
      <Contact />
    </div>
  );
};

export default SocietyOrAg;
