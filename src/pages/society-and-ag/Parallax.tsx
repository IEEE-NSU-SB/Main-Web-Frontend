import FadeIn from "@/components/ui/FadeIn";

interface PageData {
  parallax?: string;
}

interface ParallaxProps {
  pageData: PageData;
}

const Parallax: React.FC<ParallaxProps> = ({ pageData }) => {
  if (!pageData.parallax) return null;

  return (
    <FadeIn>
      <div className="min-h-[350px] relative [clip-path:inset(0)]">
        <img
          className="object-cover fixed brightness-75 left-0 top-0 w-full h-full"
          src={pageData.parallax}
          alt="Chapter Parallax"
        />
      </div>
    </FadeIn>
  );
};

export default Parallax;
