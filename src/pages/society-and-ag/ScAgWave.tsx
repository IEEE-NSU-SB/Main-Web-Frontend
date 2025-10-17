import { useFetchDataJSON } from "@/hooks/fetchdata";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Wave from "../../components/wave";

interface PageData {
  pageTitle: string;
  pageSubtitle: string;
  primaryColor: string;
}

interface ScAgWaveProps {
  chapterId: number; // number passed from parent
}

const ScAgWave: React.FC<ScAgWaveProps> = ({ chapterId }) => {
  const { loading, data, error, refetch } = useFetchDataJSON<Record<string, PageData[]>>({
    path: "pages/society-and-ag/data/ScAg.json",
  });

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Skeleton className="h-32 w-3/4" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message="Failed to load page header" onRetry={refetch} />;
  }

  const id = chapterId.toString(); // convert number to string to match JSON keys

  if (!data || !data[id]) {
    return <ErrorMessage message="Page not found" onRetry={refetch} />;
  }

  const pageInfo = data[id][0];

  return (
    <Wave
      title={pageInfo.pageTitle}
      subtitle={pageInfo.pageSubtitle}
      color={pageInfo.primaryColor}
    />
  );
};

export default ScAgWave;
