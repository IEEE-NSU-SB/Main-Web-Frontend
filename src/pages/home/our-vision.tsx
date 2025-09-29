import FadeIn from "@/components/ui/fade-in";
import Skeleton from "@/components/skeleton";
import SectionHeading from "@/components/ui/section-heading";

interface VisionSectionProps {
  data: { text: string } | null;
  loading: boolean;
}

const VisionSection = ({ data,loading }: VisionSectionProps) => {

  return (
    <FadeIn>
      <SectionHeading title="Our Vision" widthClass="w-42" />
      <section className="max-w-[1080px] mx-auto py-2 pb-16 px-5 sm:px-12 lg:px-5">
        {loading ? (
          <div className="space-y-2">
            <Skeleton width="h-4 w-full" />
            <Skeleton width="h-4 w-full" />
            <Skeleton width="h-4 w-full" />
            <Skeleton width="h-4 w-full" />
            <Skeleton width="h-4 w-full" />
            <Skeleton width="h-4 w-6/12" />
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
