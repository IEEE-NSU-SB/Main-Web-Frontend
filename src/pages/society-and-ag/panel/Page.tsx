import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import PanelCard from "@/pages/society-and-ag/panel/PanelCard";
import Wave from "@/components/Wave";
import React from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface PanelYears {
  year: string;
}

// ✅ Society colors
const societyColors: Record<string, string> = {
  "ieee-nsu-ras-sbc": "#52154E",
  "ieee-nsu-pes-sbc": "#61A60E",
  "ieee-nsu-ias-sbc": "#fbbf24",
  "ieee-nsu-wie-ag": "#066697",
};

const SocietyOrAgPanel = () => {
  const location = useLocation();

  // --- Detect society slug from URL
  const currentSlug = location.pathname.split("/")[1] ?? "";
  const societyColor = societyColors[currentSlug] || "#002855"; // fallback

  // --- Map slug to baseName for API calls
  const baseName = React.useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("ras")) return "3";
    if (path.includes("pes")) return "2";
    if (path.includes("ias")) return "4";
    if (path.includes("wie")) return "5";
    return "";
  }, [location.pathname]);

  if (!baseName) return <ErrorMessage message="Unknown Society or AG page." />;
  
  const { year } = useParams(); // e.g., /panel/:year
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState(year || "");

  // Fetch available years from JSON
  const { data: yearList, loading: listLoading, error: listError } =
    useFetchDataAPI<PanelYears[]>({
      apiUrl: `main_website/get_panels/${baseName}`,
    });

  // Fetch panel data for the selected year
  const { data: panelData, loading: panelLoading, error: panelError } =
    useFetchDataAPI<any>({
      apiUrl: selectedYear ? `main_website/get_sc_ag_panel_executives/${baseName}/${selectedYear}`
                          : `main_website/get_sc_ag_panel_executives/${baseName}/`,
    });

  useEffect(() => {
    if (year) setSelectedYear(year);
  }, [year]);

  const handleYearChange = (newYear: string) => {
    setSelectedYear(newYear);
    navigate(`/${currentSlug}/panels/${newYear}`);
  };

  if (listLoading || panelLoading) {
    return (
      <>
        <Wave title="Loading.." color={societyColor}/>
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
      <Wave title="Executive Panel of IEEE NSU SB" color={societyColor}/>

      {/* Desktop buttons */}
      <div className="max-w-[1080px] m-auto hidden md:flex flex-wrap justify-center my-8 gap-4" style={{ "--societyColor": societyColor } as React.CSSProperties}>
        {yearsWithCurrent.map((item: any) => (
          <button
            key={item.year}
            onClick={() => handleYearChange(item.year)}
            className={`px-3 py-2 rounded-sm font-medium transition-colors duration-300 cursor-pointer border border-[var(--societyColor)] 
              ${
                selectedYear === item.year
                  ? "bg-[var(--societyColor)] text-ieee-white"
                  : "bg-ieee-white text-[var(--societyColor)] hover:text-ieee-white hover:bg-[var(--societyColor)]"
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
        sectionTitle="Faculty Advisors"
        color={societyColor}
        members={panelData.advisor || []}
      />
      <PanelCard sectionTitle="Executive Body" color={societyColor} members={panelData.executives || []} />

    </>
  );
};

export default SocietyOrAgPanel;
