import { useParams } from "react-router-dom";
import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SectionHeading from "@/components/ui/SectionHeading";

interface IntroItem {
  id: string;
  title: string;
  color: string; // hex color e.g. "#602569"
  description: string[];
  image: string;
}

interface IntroResponse {
  ag_banner: IntroItem[];
}

const images = import.meta.glob("/src/assets/logo/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// Helper function to resolve image by filename
const getImageSrc = (filename: string) => {
  const key = Object.keys(images).find((k) => k.includes(filename));
  return key ? images[key] : "";
};

const Intro = () => {
  const { id } = useParams();
  const { loading, data, error, refetch } = useFetchDataJSON<IntroResponse>({
    path: "/pages/society-and-ag/data/Banner.json",
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-6 mt-10 m-auto">
        <Skeleton className="h-60 w-60" />
        <div className="flex flex-col gap-6">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-6 w-[1080px]" />
        <Skeleton className="h-6 w-[1080px]" />
        <Skeleton className="h-6 w-[1080px]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load Affinity Group information"
        onRetry={refetch}
      />
    );
  }

  const ag = data?.ag_banner.find((item) => item.id === id);

  if (!ag) {
    return (
      <ErrorMessage message="Affinity Group not found." onRetry={refetch} />
    );
  }

  return (
    <div className="max-w-[1080px] mx-auto py-4 mb-5 items-center gap-8">
      {/* Left Side Image */}
      <FadeIn yIndex={0} duration={1.3}>
        <img
          src={getImageSrc(ag.image)}
          alt={`${ag.title} logo`}
          className="w-70 h-auto object-contain m-auto"
        />
      </FadeIn>

      {/* Right Side Text */}
      <FadeIn>
          <SectionHeading
            title={ag.title}
            widthClass="w-48"
            titleColor={ag.color}       // dynamic title color
            underlineColor={ag.color}   // dynamic underline color
          />
          {ag.description.map((para, index) => (
            <p
              key={index}
              className="text-lg text-left px-5"
            >
              {para}
            </p>
          ))}
      </FadeIn>
    </div>
  );
};

export default Intro;
