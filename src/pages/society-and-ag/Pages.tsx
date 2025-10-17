import { useFetchDataJSON } from "@/hooks/fetchdata";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ScAgWave from "./SCAGWave";
import Intro from "./Intro";
import Parallax from "./Parallax";
import WhatWhyHowSection from "./WhatWhyHowSection";
import Contact from "./Contact";

interface PageData {
  name: string;
  pageTitle: string;
  pageSubtitle: string;
  primaryColor?: string;
  secondaryColor?: string;
  missionVisionColor?: string;
  textColor?: string;
  logo?: string;
  [key: string]: any;
}

interface SocietyOrAgProps {
  chapterId: number;
}

const SocietyOrAg: React.FC<SocietyOrAgProps> = ({ chapterId }) => {
  const { loading, data, error, refetch } = useFetchDataJSON<
    Record<string, PageData[]>
  >({
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
    return (
      <ErrorMessage message="Failed to load page data" onRetry={refetch} />
    );
  }

  const id = chapterId.toString();

  // Validate that data exists for this chapter
  if (!data || !data[id] || !data[id][0]) {
    return (
      <ErrorMessage
        message="Page not found for this chapter"
        onRetry={refetch}
      />
    );
  }

  const pageData = data[id][0]; // Extract the correct chapter’s data

  return (
    <div>
      <ScAgWave pageData={pageData} />
      <Intro pageData={pageData} />
      <Parallax pageData={pageData} />
      <WhatWhyHowSection pageData={pageData} />
      <Contact pageData={pageData} />
    </div>
  );
};

export default SocietyOrAg;
