import ias from "./../assets/logo/ias.png";
import insb from "./../assets/logo/insb.png";
import pes from "./../assets/logo/pes.png";
import ras from "./../assets/logo/ras.png";
import wie from "./../assets/logo/wie.png";


export default function LogoSection() {
    return (
        <div className="py-12 flex flex-col items-center">

            <img src={insb} alt="IEEE NSU Student Branch" className="w-82" />

            <div className="flex justify-center gap-100">
                <img src={pes} alt="PES Logo" className="h-45" />
                <img src={ias} alt="IAS Logo" className="h-50" />
            </div>

            <div className="flex justify-center gap-42">
                <img src={ras} alt="RAS Logo" className="h-40" />
                <img src={wie} alt="WIE Logo" className="h-40" />
            </div>

        </div>
    );
}