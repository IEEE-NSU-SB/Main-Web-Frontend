import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataJSON } from "@/hooks/fetchdata";

interface ParallaxData {
  image: string; // path from JSON
}

interface ParallaxProps {
  chapterId: number;
}

const Parallax: React.FC<ParallaxProps> = ({ chapterId }) => {
  const { loading, data, error, refetch } = useFetchDataJSON<Record<string, ParallaxData[]>>({
    path: "pages/society-and-ag/data/ScAg.json",
  });

  if (loading) {
    return (
      <div className="min-h-[350px] flex items-center justify-center">
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[350px] flex items-center justify-center">
        <ErrorMessage message="Failed to load parallax image" onRetry={refetch} />
      </div>
    );
  }

  const id = chapterId.toString();
  const pageData = data[id]?.[0];

  if (!pageData || !pageData.image) return null;

  return (
    <FadeIn>
      <div className="min-h-[350px] relative [clip-path:inset(0)]">
        <img
          className="object-cover fixed brightness-75 left-0 top-0 w-full h-full"
          src={pageData.image}
          alt={`Chapter ${chapterId} Parallax`}
        />
      </div>
    </FadeIn>
  );
};

export default Parallax;
