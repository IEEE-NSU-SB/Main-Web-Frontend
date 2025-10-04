import FadeIn from "@/components/ui/fade-in";
import Skeleton from "@/components/skeleton";
import SectionHeading from "@/components/ui/section-heading";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import ErrorMessage from "../../components/ui/error-msg";

const VisionSection = () => {
  const { loading, data, error, refetch } = useFetchDataJSON({
    path: "pages/home/data/our-vision.json",
  });

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
        ) : error ? (
          <ErrorMessage message={"Failed to load stats"} onRetry={refetch} />
        ) : (
          <p className="text-lg text-ieee-black-75 leading-relaxed text-justify">
            {data.text}
          </p>
        )}
      </section>
    </FadeIn>
  );
};

export default VisionSection;
