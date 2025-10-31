import Wave from "@/components/Wave";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import { useLocation } from "react-router";
import React from "react";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import AchievementCard from "@/components/AchievementCard";

interface Award {
  year: string;
  image: string;
  title: string;
  winner: string;
  primaryColor: string;
  description: string;
}

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

const Achievements = () => {
  const location = useLocation();

  const baseName = React.useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("ras")) return "3";
    if (path.includes("pes")) return "2";
    if (path.includes("ias")) return "4";
    if (path.includes("wie")) return "5";
    return "";
  }, [location.pathname]);

  const {
    loading: achLoading,
    error: achError,
    refetch: refetchAch,
  } = useFetchDataAPI<Award[]>({
    apiUrl: `main_website/get_achievements/landing/${baseName}`,
  });

  const {
    loading: pageLoading,
    data: pageData,
    error: pageError,
    refetch: refetchPage,
  } = useFetchDataAPI<PageData>({
    apiUrl: `main_website/get_sc_ag_details/${baseName}/`,
  });

    // ✅ Combined loading
  if (pageLoading || achLoading) {
    return (
      <div className="flex justify-center mt-10">
        <Skeleton className="h-32 w-3/4" />
      </div>
    );
  }

  // ✅ Combined error
  if (pageError || !pageData || achError) {
    return (
      <ErrorMessage
        message="Failed to load one or more data sources."
        onRetry={() => {
          refetchPage();
          refetchAch();
        }}
      />
    );
  }
  
  return (
    <>
      <Wave title="Achievements" />
        <AchievementCard/>
    </>
  );
};

export default Achievements;
