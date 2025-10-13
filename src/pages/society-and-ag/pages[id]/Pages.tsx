import AgWave from "./Wave";
import Intro from "./Intro";
import MegaEvents from "@/components/common_card/MegaEventCard";
import AgParallax from "./Parallax";
import FeaturedEventCard from "@/components/common_card/FeaturedEventCard";
import ScAgMissionVision from "./MissionVision";
import ExecutiveBodySection from "./Executive";
import About from "./About";
import Contact from "./Contact";
import { Calendar } from "lucide-react";

const SocietyOrAg = () => {
  return (
    <div>
      <AgWave />
      <Intro />
      <MegaEvents />
      <AgParallax />
      <FeaturedEventCard />
      <div className="text-center flex justify-center mb-6">
        <button className="bg-[#50C878] cursor-pointer flex font-bold py-2 px-4 duration-300 rounded-md hover:bg-[#61A60E]">
          <Calendar /> See All Events
        </button>
      </div>
      {/* <ScAgMissionVision /> */}
      <ExecutiveBodySection />
      <About />
      <Contact />
    </div>
  );
};

export default SocietyOrAg;
