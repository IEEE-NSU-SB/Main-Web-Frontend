import { useState } from "react";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import PanelCard from "@/pages/members/panel/PanelCard";
import Wave from "@/components/waave";

const Panel = () => {
  // Fetch JSON
  const { data, loading, error } = useFetchDataJSON<any>({
    path: "pages/members/panel/data.json",
  });

  const [selectedYear, setSelectedYear] = useState("CurrentExecutiveCommittee");

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!data) return null;

  // Extract year options from JSON keys dynamically
  const yearOptions = Object.keys(data);

  const currentData = data[selectedYear];

  return (
    <>
      <Wave title="Executive Panel of IEEE NSU SB" />

      {/* Year selector */}
      {/* Desktop buttons */}
      <div className="hidden md:flex flex-wrap justify-center mb-8 gap-4">
        {yearOptions.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 cursor-pointer
        ${
          selectedYear === year
            ? "bg-ieee-yellow text-black"
            : "bg-ieee-white border border-gray-300 text-gray-700"
        }`}
          >
            {year.replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden flex justify-center mb-8">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year.replace(/([A-Z])/g, " $1").trim()}
            </option>
          ))}
        </select>
      </div>

      {/* Panels for the selected year */}
      <PanelCard
        sectionTitle="Branch Counselors"
        members={currentData.counselors}
      />
      <PanelCard
        sectionTitle="Chapter & Affinity Group Faculty Advisors"
        members={currentData.SCAG}
      />
      <PanelCard sectionTitle="Executive Body" members={currentData.Excom} />
    </>
  );
};

export default Panel;
