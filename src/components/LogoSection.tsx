import ias from "./../assets/ias.png";
import insb from "./../assets/insb.png";
import pes from "./../assets/pes.png";
import ras from "./../assets/ras.png";
import wie from "./../assets/wie.png";


export default function LogoSection() {
    return (
        <div className="py-12 px-6 flex flex-col items-center space-y-8">

            <img src={insb} alt="IEEE NSU Student Branch" className="w-72" />


            <div className="grid grid-cols-1 gap-8">




                <div className="flex justify-center gap-12">
                    <img src={pes} alt="Logo 2" className="h-40" />
                    <img src={ias} alt="Logo 3" className="h-40" />
                </div>


                <div className="flex justify-center gap-12">
                    <img src={ras} alt="Logo 4" className="h-40" />
                    <img src={wie} alt="Logo 5" className="h-40" />
                </div>
            </div>
        </div>

    );
}