import Intro from "./Intro";
import MegaEvents from "@/components/MegaEventCard";
import Parallax from "./Parallax";
import FeaturedEventCard from "../../components/FeaturedEventCard";
import ExecutiveBodySection from "./Executive";
import WhatWhyHowSection from "./WhatWhyHowSection";
import Contact from "./Contact";
import ScAgWave from "./SCAGWave";

interface SocietyOrAgProps {
  chapterId: number; // the society/AG identifier
}

const SocietyOrAg: React.FC<SocietyOrAgProps> = ({ chapterId }) => {
  return (
    <div>
      <ScAgWave chapterId={chapterId} />
      <Intro chapterId={chapterId} />
      <Parallax chapterId={chapterId}/>
      {/* 
      <MegaEvents/>
      <FeaturedEventCard />
      <ExecutiveBodySection chapterId={chapterId}/>
      */}
      <WhatWhyHowSection chapterId={chapterId}/> 
      {/* <Contact /> */}
    </div>
  );
};

export default SocietyOrAg;
