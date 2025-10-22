import { useParams } from "react-router-dom";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

import MegaEventsCard from "@/components/MegaEventCard";
import Intro from "@/pages/society-and-ag/Intro";
import Parallax from "@/pages/society-and-ag/Parallax";
import ScAgWave from "@/pages/society-and-ag/ScAgWave";
import WhatWhyHowSection from "@/pages/society-and-ag/WhatWhyHowSection";
import Contact from "@/pages/society-and-ag/Contact";

const SocietyOrAg = () => {
  const { chapterId } = useParams<{ chapterId: string }>(); // get URL param

  // Load JSON dynamically based on `chapterId`
  const { loading, data, error, refetch } = useFetchDataJSON({
    path: `pages/society-and-ag/data/${chapterId}.json`,
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

  if (!data || !data[0]) {
    return (
      <ErrorMessage message="Page not found for this chapter" onRetry={refetch} />
    );
  }

  const pageData = data[0]; // Extract the chapter’s data

  return (
    <div>
      <ScAgWave pageData={pageData} />
      <Intro pageData={pageData} />
      <Parallax pageData={pageData} />
      <MegaEventsCard />
      <WhatWhyHowSection pageData={pageData} />
      <Contact pageData={pageData} />
    </div>
  );
};

export default SocietyOrAg;
