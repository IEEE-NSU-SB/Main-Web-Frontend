import { useState } from "react";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import Wave from "@/components/Wave";
import VolunteerCard from "./VolunteerCard";

const Volunteers = () => {
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
      <Wave title="Volunteer Panel of IEEE NSU SB" />

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

      {/* Officer for the selected year */}
      <VolunteerCard
        sectionTitle="Branch Counselors"
        members={currentData.counselors}
      />
      <VolunteerCard
        sectionTitle="Chapter & Affinity Group Faculty Advisors"
        members={currentData.SCAG}
      />
      <VolunteerCard sectionTitle="Executive Body" members={currentData.Excom} />
    </>
  );
};

export default Volunteers;
