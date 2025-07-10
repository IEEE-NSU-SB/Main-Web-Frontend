import ias from "./../assets/ias.png";
import insb from "./../assets/insb.png";
import pes from "./../assets/pes.png";
import ras from "./../assets/ras.png";
import wie from "./../assets/wie.png";


export default function LogoSection() {
    return (
        <div class="py-12 px-6 flex flex-col items-center space-y-8">

            <img src={insb} alt="IEEE NSU Student Branch" class="w-72" />


            <div class="grid grid-cols-1 gap-8">




                <div class="flex justify-center gap-12">
                    <img src={pes} alt="Logo 2" class="h-40" />
                    <img src={ias} alt="Logo 3" class="h-40" />
                </div>


                <div class="flex justify-center gap-12">
                    <img src={ras} alt="Logo 4" class="h-40" />
                    <img src={wie} alt="Logo 5" class="h-40" />
                </div>
            </div>
        </div>

    );
}
