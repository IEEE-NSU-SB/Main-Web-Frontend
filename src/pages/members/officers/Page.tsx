import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import Wave from "@/components/waave";
import OfficerCard from "./OfficerCard";

interface OfficerData {
  id: string;
  name: string;
  position: string;
  image: string;
  linkedin?: string;
  facebook?: string;
  email?: string;
  profileLink?: string;
  team?: string;
}

const Officer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [baseName, setBaseName] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("All");

  // ✅ Detect which team page user is on
  useEffect(() => {
    const path = location.pathname.toLowerCase();

    if (path.includes("content")) setBaseName("team");
    else if (path.includes("web")) setBaseName("pes");
    else if (path.includes("event")) setBaseName("ias");
    else if (path.includes("graphics")) setBaseName("wie");
    else if (path.includes("logistics")) setBaseName("r10");
    else if (path.includes("media")) setBaseName("team6");
    else if (path.includes("pr")) setBaseName("team7");
    else if (path.includes("promotions")) setBaseName("team8");
    else if (path.includes("finance")) setBaseName("team9");
    else setBaseName("");
  }, [location.pathname]);

  // ✅ Fetch data hooks (hooks must always come before any return)
  const {
    data: teamList,
    loading: teamLoading,
    error: teamError,
  } = useFetchDataJSON<any>({
    path: "pages/members/officers/teams.json",
  });

  const {
    data: officersData,
    loading: officersLoading,
    error: officersError,
  } = useFetchDataJSON<OfficerData[]>({
    path: "pages/members/officers/data.json",
  });

  // ✅ Set selected team when baseName or teamList changes
  useEffect(() => {
    if (baseName && teamList?.includes(baseName)) {
      setSelectedTeam(baseName);
    } else {
      setSelectedTeam("All");
    }
  }, [baseName, teamList]);

  // ✅ Handle user selection
  const handleTeamChange = (newTeam: string) => {
    setSelectedTeam(newTeam);
    if (newTeam === "All") navigate("/officers");
    else navigate(`/officers/${newTeam.toLowerCase()}`);
  };

  // ✅ Filter data based on selected team
  const filteredData =
    selectedTeam === "All"
      ? officersData || []
      : (officersData || []).filter(
          (officer) => officer.team?.toLowerCase() === selectedTeam.toLowerCase()
        );

  // ✅ Only return JSX *after* all hooks have been called
  if (teamLoading || officersLoading)
    return <p className="text-center mt-10">Loading...</p>;

  if (teamError || officersError)
    return (
      <p className="text-center mt-10 text-red-500">
        {teamError || officersError}
      </p>
    );

  if (!teamList || !officersData)
    return <p className="text-center mt-10 text-gray-500">No data found.</p>;

  return (
    <>
      <Wave title="Officer Panel of IEEE NSU SB" />

      {/* Team selector (Desktop buttons) */}
      <div className="hidden md:flex flex-wrap justify-center mb-8 gap-4">
        {teamList.map((team: string) => (
          <button
            key={team}
            onClick={() => handleTeamChange(team)}
            className={`px-3 py-2 rounded-xl font-medium transition-colors duration-300 cursor-pointer border border-ieee-darkblue-90
              ${
                selectedTeam === team
                  ? "bg-ieee-darkblue-90 text-ieee-white"
                  : "bg-ieee-white text-ieee-darkblue-90 hover:text-ieee-white hover:bg-ieee-darkblue-75"
              }`}
          >
            {team}
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
          {teamList.map((team: string) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      {/* Officer cards */}
      <OfficerCard
        sectionTitle={
          selectedTeam === "All" ? "All Officers" : `${selectedTeam} Officers`
        }
        members={filteredData}
      />
    </>
  );
};

export default Officer;
