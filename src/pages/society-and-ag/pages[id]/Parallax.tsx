import { useParams } from "react-router-dom";
import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataJSON } from "@/hooks/fetchdata";

interface ImageData {
  rasImg: string;
  pesImg: string;
  iasImg: string;
  wieImg: string;
}

// Import all logo images from assets/logo
const images = import.meta.glob("/src/assets/logo/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// Helper to resolve image by filename
const getImageSrc = (filename: string) => {
  if (!filename) return "";
  const key = Object.keys(images).find((k) => k.includes(filename));
  return key ? images[key] : "";
};

const Parallax = () => {
  const { id } = useParams();

  // Use your global JSON fetch hook
  const { loading, data, error, refetch } = useFetchDataJSON<ImageData>({
    path: "pages/society-and-ag/data/Parallax.json",
  });

  const imageMapping: Record<string, { imgKey: keyof ImageData; alt: string }> = {
    "ieee-nsu-ras-sbc": { imgKey: "rasImg", alt: "RAS" },
    "ieee-nsu-pes-sbc": { imgKey: "pesImg", alt: "PES" },
    "ieee-nsu-ias-sbc": { imgKey: "iasImg", alt: "IAS" },
    "ieee-nsu-wie-ag": { imgKey: "wieImg", alt: "WIE" },
  };

  // No matching ID? Don’t render
  if (!id || !imageMapping[id]) return null;

  // 🌀 Loading state
  if (loading) {
    return (
      <div className="min-h-[350px] flex items-center justify-center">
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  // ⚠️ Error state
  if (error || !data) {
    return (
      <div className="min-h-[350px] flex items-center justify-center">
        <ErrorMessage
          message="Failed to load parallax image"
          onRetry={refetch}
        />
      </div>
    );
  }

  // ✅ Select the proper image key based on route
  const { imgKey, alt } = imageMapping[id];
  const imageSrc = getImageSrc(data[imgKey]);

  // If image missing, skip render
  if (!imageSrc) return null;

  return (
    <FadeIn>
      <div className="min-h-[350px] relative [clip-path:inset(0)]">
        <img
          className="object-cover fixed brightness-75 left-0 top-0 w-full h-full"
          src={imageSrc}
          alt={alt}
        />
      </div>
    </FadeIn>
  );
};

export default Parallax;
