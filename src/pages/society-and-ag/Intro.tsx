import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
// import SplitText from "@/components/ui/SplitText";
import { type ChapterPageData } from "@/types/chapter";

interface IntroProps {
  pageData: ChapterPageData;
}

const Intro: React.FC<IntroProps> = ({ pageData }) => {
  const ag = pageData;

  if (!ag.about) return null;

  return (
    <div className="max-w-[1080px] mx-auto py-4 mb-5 items-center gap-8">
      {/* Logo */}
      {ag.logo && (
        <FadeIn yIndex={0} duration={1.3}>
          <img
            src={ag.logo}
            alt={`${ag.name} logo`}
            className="w-70 h-auto object-contain m-auto"
          />
        </FadeIn>
      )}

      {/* About Section */}
      <FadeIn>
        <SectionHeading
          title={`About ${ag.name}`}
          widthClass="w-42"
          titleColor={ag.primaryColor}
          underlineColor={ag.primaryColor}
        />
        <p
            dangerouslySetInnerHTML={{ __html: ag.about }}
            className="text-lg text-left px-5 mb-3"
          />
      </FadeIn>
    </div>
  );
};

export default Intro;
