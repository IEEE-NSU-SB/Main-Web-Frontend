import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchDataJSON, useFetchDataAPI } from "@/hooks/fetchdata";
import PanelCard from "@/pages/members/panel/PanelCard";
import Wave from "@/components/waave";

interface PanelYears {
  year: string;
}

const Panel = () => {
  const { year } = useParams(); // e.g., /panel/:year
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState(year || "current");

  // Fetch available years from JSON
  const { data: yearList, loading: listLoading, error: listError } =
    useFetchDataAPI<PanelYears[]>({
      apiUrl: 'main_website/get_panels/',
    });

  // Fetch panel data for the selected year
  const { data: panelData, loading: panelLoading, error: panelError } =
    useFetchDataJSON<any>({
      // path: `api/panel/${selectedYear}`, // backend endpoint
      path: `pages/members/panel/data.json`, // backend endpoint
    });

  useEffect(() => {
    if (year) setSelectedYear(year);
  }, [year]);

  const handleYearChange = (newYear: string) => {
    setSelectedYear(newYear);
    navigate(`/panels/${newYear}`);
  };

  if (listLoading || panelLoading)
    return <p className="text-center mt-10">Loading...</p>;
  if (listError || panelError)
    return (
      <p className="text-center mt-10 text-red-500">
        {listError || panelError}
      </p>
    );
  if (!yearList || !panelData) return null;

  // Map JSON to year strings, prepend Current Executive Committee
  const yearsWithCurrent = [
    { year: "current", display: "Current Executive Committee" },
    ...yearList.map((item: any) => ({ year: item.year, display: item.year })),
  ];

  return (
    <>
      <Wave title="Executive Panel of IEEE NSU SB" />

      {/* Year selector label */}
      <div className="text-center mb-4 font-semibold text-lg uppercase">
        Executive Committee
      </div>

      {/* Desktop buttons */}
      <div className="hidden md:flex flex-wrap justify-center mb-8 gap-4">
        {yearsWithCurrent.map((item: any) => (
          <button
            key={item.year}
            onClick={() => handleYearChange(item.year)}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 cursor-pointer
              ${
                selectedYear === item.year
                  ? "bg-ieee-yellow text-black"
                  : "bg-ieee-white border border-gray-300 text-gray-700"
              }`}
          >
            {item.display}
          </button>
        ))}
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden flex justify-center mb-8">
        <select
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          {yearsWithCurrent.map((item: any) => (
            <option key={item.year} value={item.year}>
              {item.display}
            </option>
          ))}
        </select>
      </div>

      {/* Panel data */}
      <PanelCard
        sectionTitle="Branch Counselors"
        members={panelData.counselors || []}
      />
      <PanelCard
        sectionTitle="Chapter & Affinity Group Faculty Advisors"
        members={panelData.SCAG || []}
      />
      <PanelCard sectionTitle="Executive Body" members={panelData.Excom || []} />
    </>
  );
};

export default Panel;
