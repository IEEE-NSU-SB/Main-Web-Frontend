import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitText from "@/components/ui/SplitText";
import { useFetchDataJSON } from "@/hooks/fetchdata";

interface AboutSection {
  title: string;
  description: string[];
}

interface ChapterData {
  primaryColor: string;
  logo: string;
  about: AboutSection[];
}

interface IntroProps {
  chapterId: number; // dynamic prop passed from parent
}

const Intro: React.FC<IntroProps> = ({ chapterId }) => {
  const { loading, data, error, refetch } = useFetchDataJSON<Record<string, ChapterData[]>>({
    path: "pages/society-and-ag/data/ScAg.json",
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

  // Access the chapter data directly by key
  const agArray = data?.[String(chapterId)];
  const ag = agArray?.[0]; // since each key maps to an array

  if (!ag) {
    return (
      <ErrorMessage
        message="Affinity Group not found."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="max-w-[1080px] mx-auto py-4 mb-5 items-center gap-8">
      {/* Logo */}
      <FadeIn yIndex={0} duration={1.3}>
        <img
          src={ag.logo}
          alt={`${ag.about[0].title} logo`}
          className="w-70 h-auto object-contain m-auto"
        />
      </FadeIn>

      {/* About Section */}
      <FadeIn>
        <SectionHeading
          title={ag.about[0].title}
          widthClass="w-42"
          titleColor={ag.primaryColor}
          underlineColor={ag.primaryColor}
        />

        {ag.about[0].description.map((para, index) => (
          <SplitText
            key={index}
            text={para}
            className="text-lg text-left px-5 mb-3"
            duration={0.3}
            ease="elistic.out(1,0.3)"
            splitType="lines"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />
        ))}
      </FadeIn>
    </div>
  );
};

export default Intro;
