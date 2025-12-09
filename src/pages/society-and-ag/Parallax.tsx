import { type ChapterPageData } from "@/types/chapter";

interface ParallaxProps {
  pageData: ChapterPageData;
}

const Parallax: React.FC<ParallaxProps> = ({ pageData }) => {
  if (!pageData.parallax) return null;

  return (
      <div className="min-h-[350px] relative [clip-path:inset(0)]">
        <img
          className="object-cover fixed brightness-75 left-0 top-0 w-full h-full"
          src={pageData.parallax}
          alt="Chapter Parallax"
        />
      </div>
  );
};

export default Parallax;
