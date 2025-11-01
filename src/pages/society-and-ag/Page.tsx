import { useLocation } from "react-router-dom";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

import Intro from "./Intro";
import Parallax from "./Parallax";
import WhatWhyHowSection from "./WhatWhyHowSection";
import Contact from "./Contact";

import MegaEventsCard from "@/components/MegaEventCard";
import FeaturedEventCard from "@/components/FeaturedEventCard";
import Executive from "./Executive";
import MissionVision from "./MissionVision";
import Achievements from "./AchievementCard";
import React from "react";
import Wave from "@/components/Wave";

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

interface Member {
  id: number;
  name: string;
  position: string;
}

interface ExecutiveData {
  advisor: Member | undefined;
  executives: any[];
}

interface Award {
  year: string;
  image: string;
  title: string;
  winner: string;
  primaryColor: string;
  description: string;
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

  if (!baseName) return <ErrorMessage message="Unknown Society or AG page." />;

  // ✅ Fetch page details
  const {
    loading: pageLoading,
    data: pageData,
    error: pageError,
    refetch: refetchPage,
  } = useFetchDataAPI<PageData>({
    apiUrl: `main_website/get_sc_ag_details/${baseName}/`,
  });

  // ✅ Fetch events
  const {
    loading: eventsLoading,
    data: eventsData,
    error: eventsError,
    refetch: refetchEvents,
  } = useFetchDataAPI<EventData>({
    apiUrl: `main_website/get_mega_featured_events/${baseName}/`,
  });

  // ✅ Fetch executives
  const {
    loading: execLoading,
    data: execData,
    error: execError,
    refetch: refetchExec,
  } = useFetchDataAPI<ExecutiveData>({
    apiUrl: `main_website/get_sc_ag_panel_executives/${baseName}/`,
  });

  // ✅ Fetch achievements
  const {
    loading: achLoading,
    data: achData,
    error: achError,
    refetch: refetchAch,
  } = useFetchDataAPI<Award[]>({
    apiUrl: `main_website/get_achievements/landing/${baseName}`,
  });

  return (
    <div>
      {/* Page Header */}
      {pageLoading && (
        <div className="min-h-screen">
          <Wave title="Loading..."/>
        </div>
      )}
      {pageError && (
        <ErrorMessage
          message="Failed to load page details."
          onRetry={refetchPage}
        />
      )}
      {pageData && (
        <Wave
          title={pageData.pageTitle || ""}
          subtitle={pageData.pageSubtitle || ""}
          color={pageData.primaryColor || "#000"}
        />
      )}
      {pageData && <Intro pageData={pageData} />}
      {pageData && <Parallax pageData={pageData} />}

      {/* Events */}
      {eventsLoading && <Skeleton className="h-48 w-full mt-6" />}
      {eventsError && (
        <ErrorMessage
          message="Failed to load events."
          onRetry={refetchEvents}
        />
      )}
      {eventsData && pageData && (
        <>
          <MegaEventsCard
            events={eventsData.megaEvents}
            color={`${pageData.primaryColor}b6`}
          />
          <FeaturedEventCard
            events={eventsData.featuredEvents}
            color={pageData.primaryColor}
          />
        </>
      )}

      {/* Achievements */}
      {achLoading && <Skeleton className="h-32 w-full mt-6" />}
      {achError && (
        <ErrorMessage
          message="Failed to load achievements."
          onRetry={refetchAch}
        />
      )}
      {achData && pageData && (
        <Achievements
          achievements={achData}
          primaryColor={pageData.primaryColor}
        />
      )}

      {/* Mission & Vision */}
      {pageData && <MissionVision pageData={pageData} />}

      {/* Executives */}
      {execLoading && <Skeleton className="h-32 w-full mt-6" />}
      {execError && (
        <ErrorMessage
          message="Failed to load executives."
          onRetry={refetchExec}
        />
      )}
      {execData && pageData && (
        <Executive
          advisor={execData.advisor}
          executives={execData.executives}
          color={`${pageData.primaryColor}b6`}
        />
      )}

      {/* Other Sections */}
      {pageData && <WhatWhyHowSection pageData={pageData} />}
      {pageData && <Contact pageData={pageData} />}
    </div>
  );
};

export default SocietyOrAg;
