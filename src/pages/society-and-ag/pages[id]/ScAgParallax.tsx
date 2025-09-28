import { use, type FC } from "react";
import { useParams } from "react-router-dom";

interface ImageData {
    rasImg: string;
    pesImg: string;
    iasImg: string;
    wieImg: string;
}

interface AgParallaxProps {
    parallaxImagePromise: Promise<ImageData>;
}

const AgParallax: FC<AgParallaxProps> = ({ parallaxImagePromise }) => {
    const { id } = useParams();
    const imgData: ImageData = use(parallaxImagePromise);

    const imageMapping: Record<string, { imgKey: keyof ImageData; alt: string }> = {
        "ieee-nsu-ras-sbc": { imgKey: "rasImg", alt: "RAS" },
        "ieee-nsu-pes-sbc": { imgKey: "pesImg", alt: "PES" },
        "ieee-nsu-ias-sbc": { imgKey: "iasImg", alt: "IAS" },
        "ieee-nsu-wie-ag": { imgKey: "wieImg", alt: "WIE" },
    };

    if (!id || !imageMapping[id]) return null;

    const { imgKey, alt } = imageMapping[id];

    return (
        <div className="min-h-[350px] relative [clip-path:inset(0)]">
            <img
                className="object-cover fixed brightness-75 left-0 top-0 w-full h-full"
                src={imgData[imgKey]}
                alt={alt}
            />
        </div>
    );
};

export default AgParallax;