import { useState } from "react";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import Wave from "@/components/Wave";
import OfficerCard from "./OfficerCard";

const Officer = () => {
  const { data, loading, error } = useFetchDataJSON<any>({
    path: "pages/members/officers/data.json",
  });

  const [selectedTeam, setSelectedTeam] = useState("All");

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!data) return null;

  // Extract all team names dynamically
  const teamOptions = ["All", ...Object.keys(data)];

  // Combine all members if "All" is selected
  const currentData =
    selectedTeam === "All"
      ? Object.values(data).flat() // merges all arrays
      : data[selectedTeam] || [];

  return (
    <>
      <Wave title="Officer Panel of IEEE NSU SB" />

      {/* Team selector (Desktop view - buttons) */}
      <div className="hidden md:flex flex-wrap justify-center mb-8 gap-4">
        {teamOptions.map((team) => (
          <button
            key={team}
            onClick={() => setSelectedTeam(team)}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 cursor-pointer
              ${
                selectedTeam === team
                  ? "bg-ieee-yellow text-black"
                  : "bg-ieee-white border border-gray-300 text-gray-700"
              }`}
          >
            {team}
          </button>
        ))}
      </div>

      {/* Mobile view - dropdown */}
      <div className="md:hidden flex justify-center mb-8">
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          {teamOptions.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      {/* Render officer cards */}
      {selectedTeam === "All" ? (
        // When "All" is selected, show everyone together under one section
        <OfficerCard sectionTitle="All Officers" members={currentData} />
      ) : (
        // When a specific team is selected
        <OfficerCard sectionTitle={selectedTeam} members={currentData} />
      )}
    </>
  );
};

export default Officer;
