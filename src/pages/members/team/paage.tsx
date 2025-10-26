import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import FamilyTree from "./OrgChart";
import Wave from "@/components/waave";

interface Member {
  id: string;
  name: string;
  position: string;
  img: string;
}

interface TeamData {
  team: {
    title: string;
    img: string;
    details: string;
  };
  subExecutive: Member[];
  incharge: Member[];
  coreVolunteers: Member[];
  volunteers: Member[];
}

const TeamPage = () => {
  const location = useLocation();
  const [baseName, setBaseName] = useState<string>(""); // default empty

  // Detect team name from URL
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("content")) setBaseName("team");
    else if (path.includes("web")) setBaseName("pes");
    else if (path.includes("event")) setBaseName("ias");
    else if (path.includes("graphics")) setBaseName("wie");
    else if (path.includes("logistics")) setBaseName("r10"); // add other teams similarly
    else if (path.includes("media")) setBaseName("team6");
    else if (path.includes("pr")) setBaseName("team7");
    else if (path.includes("promotions")) setBaseName("team8");
    else if (path.includes("finance")) setBaseName("team9");
    else setBaseName(""); // unknown
  }, [location.pathname]);

  const { loading, data, error } = useFetchDataJSON<TeamData>({ path: `pages/members/team/${baseName}.json` });

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Loading team...</div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;
  if (!data)
    return <div className="text-center text-gray-500">No data found</div>;

  return (
    <>
      <Wave title={data.team.title} subtitle="IEEE NSU Student Branch" />
      <div className="mb-8">
        <FamilyTree data={data} />
      </div>
    </>
  );
};

export default TeamPage;
