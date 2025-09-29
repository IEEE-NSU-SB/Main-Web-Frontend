import SectionHeading from "./ui/section-heading";
import Skeleton from "@/components/skeleton";
import FadeIn from "./ui/fade-in";
import { useFetchDataJSON } from "@/hooks/fetchdata";

const VisionSection = () => {

  const { loading, data } = useFetchDataJSON({ path: "data/vision.json" });

  return (
    <FadeIn>
      <SectionHeading title="Our Vision" widthClass="w-42" />
      <section className="max-w-[1080px] mx-auto py-2 pb-16 px-5 sm:px-12 lg:px-5">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-6/12" />
          </div>
        ) : data ? (
          <p className="text-lg text-ieee-black-75 leading-relaxed text-justify">
            {data.text}
          </p>
        ) : (
          <p className="text-red-500 px-4">Failed to load vision statement.</p>
        )}
      </section>
    </FadeIn>
  );
};

export default VisionSection;
