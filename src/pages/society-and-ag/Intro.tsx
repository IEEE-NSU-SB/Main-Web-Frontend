import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitText from "@/components/ui/SplitText";

interface AboutSection {
  title: string;
  description: string[];
}

interface PageData {
  primaryColor: string;
  logo: string;
  about: AboutSection[];
}

interface IntroProps {
  pageData: PageData;
}

const Intro: React.FC<IntroProps> = ({ pageData }) => {
  const ag = pageData;

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
