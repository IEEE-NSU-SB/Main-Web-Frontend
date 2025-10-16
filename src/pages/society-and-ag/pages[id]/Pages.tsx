import AgWave from "./SCAGWave";
import Intro from "./Intro";
import MegaEvents from "@/components/MegaEventCard";
import AgParallax from "./Parallax";
import FeaturedEventCard from "./FeaturedEventCard";
import ScAgMissionVision from "./MissionVision";
import ExecutiveBodySection from "./Executive";
import About from "./About";
import Contact from "./Contact";

const SocietyOrAg = () => {
  return (
    <div>
      <AgWave />
      <Intro />
      <AgParallax />
      <MegaEvents />
      <FeaturedEventCard />
      {/* <ScAgMissionVision /> */}
      <ExecutiveBodySection />
      <About />
      <Contact />
    </div>
  );
};

export default SocietyOrAg;
