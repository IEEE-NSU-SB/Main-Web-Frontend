import { useLocation } from "react-router-dom";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import FamilyTree from "./OrgChart";
import Wave from "@/components/Wave";
import React from "react";
import bg from "../team/assets/img/service-bg.jpg"

interface Member {
  id: string;
  name: string;
  position: string;
  image: string;
}

interface TeamData {
  team: {
    title: string;
    img: string | null;
    details: string;
  };
  subExecutive: Member[];
  incharge: Member[];
  coreVolunteers: Member[];
  volunteers: Member[];
}

const TeamPage = () => {
  const location = useLocation();

  // Detect team name from URL
  const baseName = React.useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("content")) return "2";
    else if (path.includes("web")) return "8";
    else if (path.includes("event")) return "3";
    else if (path.includes("graphics")) return "10";
    else if (path.includes("logistics")) return "4";
    else if (path.includes("media")) return "9";
    else if (path.includes("public")) return "0";
    else if (path.includes("promotions")) return "5";
    else if (path.includes("finance")) return "11";
    else if (path.includes("membership")) return "7";
    else return ""; // unknown
  }, [location.pathname]);

  const { loading, data, error } = useFetchDataAPI<TeamData>({
    apiUrl: `main_website/get_team_details/${baseName}/`,
  });

  if (loading)
    return (
      <>
        <Wave title="Loading..." />
        <div className="flex justify-center items-center min-h-[500px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading team...</p>
          </div>
        </div>
      </>
    );

  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  if (!data)
    return <div className="text-center text-gray-500">No data found</div>;

  return (
    <>
      {/* Wave header */}
      <Wave title={data.team.title} subtitle="IEEE NSU Student Branch" />

      {/* Team image & description */}
      <div className="max-w-[1050px] mx-auto my-8 flex flex-col items-center gap-4 text-center px-4">
        {data.team.img && (
          <img
            src={data.team.img}
            alt={data.team.title}
            className="h-150 object-cover rounded-3xl md:my-10 shadow-md"
          />
        )}
      </div>
      <div style={{
        backgroundImage : `url("${bg}")`
      }}>
        {data.team.details && (
          <p className="max-w-[1050px]  text-lg p-10 m-auto" dangerouslySetInnerHTML={{ __html: data.team.details }}></p>
        )}
      </div>

      {/* Family tree / Org chart */}
      <div className="mb-8">
        <FamilyTree data={data} />
      </div>
    </>
  );
};

export default TeamPage;
