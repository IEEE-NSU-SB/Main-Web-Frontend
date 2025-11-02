import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import Wave from "@/components/Wave";
import OfficerCard, { type Member } from "./OfficerCard";
import React from "react";

interface Team {
  title: string;
}

const Officer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Detect team name from URL
  const pathTeam =React.useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("content")) return "2";
    else if (path.includes("web")) return "8";
    else if (path.includes("event")) return "3";
    else if (path.includes("graphics")) return "10";
    else if (path.includes("logistics")) return "4"; // add other teams similarly
    else if (path.includes("media")) return "9";
    else if (path.includes("pr")) return "0";
    else if (path.includes("promotions")) return "5";
    else if (path.includes("finance")) return "11";
    else if (path.includes("membership")) return "7";
    else return ""; // unknown
  }, [location.pathname]);
  
  const [selectedTeam, setSelectedTeam] = useState<string>("All");
  const [teamList, setTeamList] = useState<Team[]>([]);

  // Fetch team list
  const { data: teamsData } = useFetchDataAPI<Team[]>({ apiUrl: "main_website/get_teams/" });
  useEffect(() => {
    if (teamsData?.length) setTeamList(teamsData);
  }, [teamsData]);

  // Fetch officers data from API
  const apiUrl =
    selectedTeam && selectedTeam !== "All"
      ? `main_website/get_officers/${pathTeam}`
      : "main_website/get_officers/"; // All officers

  const { data: panelData, loading: panelLoading, error: panelError } = useFetchDataAPI<Member[]>({ apiUrl });

  // Handle team selection
  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
    if (team === "All") navigate("/officers");
    else navigate(`/officers/${team}`);
  };

  if (panelError) return <p className="text-center mt-10 text-red-500">{panelError}</p>;
  if (!panelData?.length) return <p className="text-center mt-10 text-gray-500">No data found.</p>;

  // Filter Officers vs Incharges
  const filteredOfficers = panelData.filter(officer =>
    officer.position.toLowerCase().includes("co-ordinator")
  );
  const filteredIncharges = panelData.filter(officer =>
    officer.position.toLowerCase().includes("incharge")
  );

  return (
    <>
        {panelLoading && (
        <div className="min-h-screen">
          <Wave title="Loading Officers..."/>
        </div>
      )}
      <Wave title="Officer Panel of IEEE NSU SB" />

      {/* Desktop team buttons */}
      <div className="hidden md:flex flex-wrap justify-center mb-8 gap-4 max-w-[1080px] m-auto">
        <button
          onClick={() => handleTeamChange("All")}
          className={`px-3 py-2 rounded-sm font-medium transition-colors duration-300 cursor-pointer border border-ieee-darkblue-90
            ${selectedTeam === "All"
              ? "bg-ieee-darkblue-90 text-ieee-white"
              : "bg-ieee-white text-ieee-darkblue-90 hover:text-ieee-white hover:bg-ieee-darkblue-75"
            }`}
        >
          All Officers
        </button>
        {teamList.map(team => (
          <button
            key={team.title}
            onClick={() => handleTeamChange(team.title)}
            className={`px-3 py-2 rounded-sm font-medium transition-colors duration-300 cursor-pointer border border-ieee-darkblue-90
              ${selectedTeam === team.title
                ? "bg-ieee-darkblue-90 text-ieee-white"
                : "bg-ieee-white text-ieee-darkblue-90 hover:text-ieee-white hover:bg-ieee-darkblue-75"
              }`}
          >
            {team.title}
          </button>
        ))}
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden flex justify-center mb-8">
        <select
          value={selectedTeam}
          onChange={(e) => handleTeamChange(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="All">All Officers</option>
          {teamList.map(team => (
            <option key={team.title} value={team.title}>{team.title}</option>
          ))}
        </select>
      </div>

      {/* Officer Cards */}
      <OfficerCard
        sectionTitle={selectedTeam === "All" ? "Our Officers" : `${selectedTeam} Officers`}
        members={filteredOfficers}
      />
      <OfficerCard
        sectionTitle={selectedTeam === "All" ? "Our Incharges" : `${selectedTeam} Incharges`}
        members={filteredIncharges}
      />
    </>
  );
};

export default Officer;
