import { useLocation } from "react-router-dom";
import { useFetchDataJSON, useFetchDataAPI } from "@/hooks/fetchdata";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

import ScAgWave from "./ScAgWave";
import Intro from "./Intro";
import Parallax from "./Parallax";
import WhatWhyHowSection from "./WhatWhyHowSection";
import Contact from "./Contact";

import MegaEventsCard from "@/components/MegaEventCard";
import FeaturedEventCard from "@/components/FeaturedEventCard";
import Executive from "./Executive";
import MissionVision from "./MissionVision";
import Achievements from "./Achievements";
import React from "react";

// ✅ Interfaces
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

interface EventData {
  megaEvents: any[];
  featuredEvents: any[];
}

interface ExecutiveData {
  executives: any[];
}

interface AchievementData {
  achievements: any[];
}

const SocietyOrAg: React.FC = () => {
  const location = useLocation();

  const baseName = React.useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("ras")) return "3";
    if (path.includes("pes")) return "2";
    if (path.includes("ias")) return "4";
    if (path.includes("wie")) return "5";
    return "";
  }, [location.pathname]);

  // ✅ Only use hook paths if baseName is valid
  // const pagePath = baseName ? `pages/society-and-ag/data/${baseName}/${baseName}.json` : "";
  // const eventsPath = baseName ? `pages/society-and-ag/data/${baseName}/featured_mega.json` : "";
  const execPath = baseName ? `pages/society-and-ag/data/${baseName}/executive.json` : "";
  const achPath = baseName ? `pages/society-and-ag/data/${baseName}/achievements.json` : "";

  // ✅ Hooks
  const { loading: pageLoading, data: pageData, error: pageError, refetch: refetchPage } =
    useFetchDataAPI<PageData>({ apiUrl: `main_website/get_sc_ag_details/${baseName}/` });

  const { loading: eventsLoading, data: eventsData, error: eventsError, refetch: refetchEvents } =
    useFetchDataAPI<EventData>({ apiUrl: `main_website/get_mega_featured_events/${baseName}/` });

  const { loading: execLoading, data: execData, error: execError, refetch: refetchExec } =
    useFetchDataJSON<ExecutiveData>({ path: execPath });

  const { loading: achLoading, data: achData, error: achError, refetch: refetchAch } =
    useFetchDataJSON<AchievementData>({ path: achPath });

  // ✅ Handle unknown baseName
  if (!baseName) return <ErrorMessage message="Unknown Society or AG page." />;

  // ✅ Combined loading
  if (pageLoading || eventsLoading || execLoading || achLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Skeleton className="h-32 w-3/4" />
      </div>
    );
  }

  // ✅ Combined error
  if (pageError || eventsError || execError || achError || !pageData) {
    return (
      <ErrorMessage
        message="Failed to load one or more data sources."
        onRetry={() => {
          refetchPage();
          refetchEvents();
          refetchExec();
          refetchAch();
        }}
      />
    );
  }

  return (
    <div>
      <ScAgWave pageData={pageData} />
      <Intro pageData={pageData} />
      <Parallax pageData={pageData} />

      {eventsData && (
        <>
          <MegaEventsCard events={eventsData.megaEvents} color={`${pageData.primaryColor}b6`} />
          <FeaturedEventCard events={eventsData.featuredEvents} color={pageData.primaryColor} />
        </>
      )}

      {achData?.achievements && (
        <Achievements achievements={achData.achievements} color={pageData.primaryColor} />
      )}

      <MissionVision pageData={pageData} />

      {execData && <Executive members={execData.executives} color={`${pageData.primaryColor}b6`} />}

      <WhatWhyHowSection pageData={pageData} />
      <Contact pageData={pageData} />
    </div>
  );
};

export default SocietyOrAg;
