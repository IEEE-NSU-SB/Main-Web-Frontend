import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import PanelCard from "@/pages/members/panel/PanelCard";
import Wave from "@/components/Wave";

interface PanelYears {
  year: string;
}

const Panel = () => {
  const { year } = useParams(); // e.g., /panel/:year
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState(year || "");

  // Fetch available years from JSON
  const { data: yearList, loading: listLoading, error: listError } =
    useFetchDataAPI<PanelYears[]>({
      apiUrl: 'main_website/get_panels/',
    });

  // Fetch panel data for the selected year
  const { data: panelData, loading: panelLoading, error: panelError } =
    useFetchDataAPI<any>({
      apiUrl: selectedYear ? `main_website/get_panel_executives/${selectedYear}`
                          : 'main_website/get_panel_executives/',
    });

  useEffect(() => {
    if (year) setSelectedYear(year);
  }, [year]);

  const handleYearChange = (newYear: string) => {
    setSelectedYear(newYear);
    navigate(`/panels/${newYear}`);
  };

  if (listLoading || panelLoading) {
    return (
      <>
        <Wave title="Loading.." />
        <div className="flex justify-center items-center min-h-[500px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading panel...</p>
          </div>
        </div>
      </>
    );
  }
  if (listError || panelError)
    return (
      <p className="text-center mt-10 text-red-500">
        {listError || panelError}
      </p>
    );
  if (!yearList || !panelData) return null;

  // Map JSON to year strings, prepend Current Executive Committee
  const yearsWithCurrent = [
    { year: "", display: "Current Executive Committee" },
    ...yearList.map((item: any) => ({ year: item.year, display: item.year })),
  ];

  return (
    <>
      <Wave title="Executive Panel of IEEE NSU SB" />

      {/* Desktop buttons */}
      <div className="max-w-[1080px] m-auto hidden md:flex flex-wrap justify-center my-8 gap-4">
        {yearsWithCurrent.map((item: any) => (
          <button
            key={item.year}
            onClick={() => handleYearChange(item.year)}
            className={`px-3 py-2 rounded-sm font-medium transition-colors duration-300 cursor-pointer border border-ieee-darkblue-90
              ${
                selectedYear === item.year
                  ? "bg-ieee-darkblue-90 text-ieee-white"
                  : "bg-ieee-white text-ieee-darkblue-90 hover:text-ieee-white hover:bg-ieee-darkblue-75"
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
        members={panelData.sc_ag_faculty_advisors || []}
      />
      <PanelCard sectionTitle="Mentors" members={panelData.mentors || []} />
      <PanelCard sectionTitle="Executive Body" members={panelData.excom || []} />

      <PanelCard sectionTitle="Chapter & Affinity Group Chairs" members={panelData.sc_ag_chairs || []} />
    </>
  );
};

export default Panel;
