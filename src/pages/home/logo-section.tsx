import ias from "@/assets/logo/ias.png";
import insb from "@/assets/logo/insb.png";
import pes from "@/assets/logo/pes.png";
import ras from "@/assets/logo/ras.png";
import wie from "@/assets/logo/wie.png";


export default function LogoSection() {
    return (
        <div className="py-12 max-md:py-0 flex flex-col items-center">

            <img src={insb} alt="IEEE NSU Student Branch" className="w-82 max-md:w-52 max-sm:w-37" />

            <div className="flex justify-center gap-100 max-md:gap-80 max-sm:gap-35 max-sm:m-5">
                <img src={pes} alt="PES Logo" className="h-45 max-md:h-25 max-sm:h-25" />
                <img src={ias} alt="IAS Logo" className="h-50 max-md:h-30 max-sm:h-25" />
            </div>

            <div className="flex justify-center gap-42 max-md:gap-22 max-sm:gap-12">
                <img src={ras} alt="RAS Logo" className="h-40 max-md:h-20 max-sm:h-20" />
                <img src={wie} alt="WIE Logo" className="h-40 max-md:h-20 max-sm:h-20" />
            </div>

        </div>
    );
}