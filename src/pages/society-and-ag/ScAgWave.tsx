import Wave from "@/components/Wave";
import { type ChapterPageData } from "@/types/chapter";

interface ScAgWaveProps {
  pageData: ChapterPageData;
}

const ScAgWave: React.FC<ScAgWaveProps> = ({ pageData }) => {
  return (
    <Wave
      title={pageData.pageTitle || ""}
      subtitle={pageData.pageSubtitle || ""}
      color={pageData.primaryColor || "#000"}
    />
  );
};

export default ScAgWave;
