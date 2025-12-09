import insb from "@/assets/logo/insbMain.png";
import pes from "@/assets/logo/pes.png";
import ias from "@/assets/logo/ias.png";
import ras from "@/assets/logo/ras.png";
import wie from "@/assets/logo/wie.png";

import FadeIn from "@/components/ui/FadeIn";
import { OrbitingCircles } from "@/registry/magicui/orbiting-circles";

export default function LogoSection() {
  return (
    <FadeIn>
      <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none">
          <img
            src={insb}
            alt="IEEE NSU SB"
            className="w-25 max-md:w-20 max-sm:w-20"
          />
        </div>
         {/* Adjust the rotating speed by increasing the speed value*/}
        <OrbitingCircles iconSize={90} radius={200} speed={20}> 
          <img src={pes} alt="PES" className="w-full h-full object-contain" />
          <img src={ias} alt="IAS" className="w-full h-full object-contain" />
          <img src={ras} alt="RAS" className="w-full h-full object-contain" />
          <img src={wie} alt="WIE" className="w-full h-full object-contain" />
        </OrbitingCircles>

      </div>
    </FadeIn>
  );
}
