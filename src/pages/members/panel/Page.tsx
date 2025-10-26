import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import PanelCard from "@/pages/members/panel/PanelCard";
import Wave from "@/components/waave";

const Panel = () => {
  const { year } = useParams(); // e.g., /panel/:year
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedYear, setSelectedYear] = useState(year || "");
  const [baseName, setBaseName] = useState<string>("");

  // ✅ Detect which base path the user is on (if panel page grows in the future)
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("panel")) setBaseName("panel");
    else setBaseName("");
  }, [location.pathname]);

  // ✅ Fetch the list of all available committees
  const { data: listData, loading: listLoading, error: listError } =
    useFetchDataJSON<any>({
      path: `pages/members/panel/commitee.json`,
    });

  // ✅ Fetch the actual panel data for the selected year
  const { data: panelData, loading: panelLoading, error: panelError } =
    useFetchDataJSON<any>({
      path: `pages/members/panel/data.json`,
      // pages/members/${baseName}/data/${selectedYear}.json
    });

  // ✅ Update selectedYear when URL param changes
  useEffect(() => {
    if (year) setSelectedYear(year);
  }, [year]);

  // ✅ When year changes, update both state and URL
  const handleYearChange = (newYear: string) => {
    setSelectedYear(newYear);
    navigate(`/panel/${newYear}`);
  };

  // ✅ Handle loading/error states
  if (listLoading || panelLoading)
    return <p className="text-center mt-10">Loading...</p>;
  if (listError || panelError)
    return (
      <p className="text-center mt-10 text-red-500">
        {listError || panelError}
      </p>
    );
  if (!listData || !panelData) return null;

  // ✅ committees.json now only contains names
  const committees = listData;

  return (
    <>
      <Wave title="Executive Panel of IEEE NSU SB" />

      {/* Year selector */}
      <div className="hidden md:flex flex-wrap justify-center mb-8 gap-4">
        {committees.map((item: any) => {
          // convert name into ID slug
          const id =
            item.name.toLowerCase().includes("current")
              ? ""
              : item.name.replace("Executive Committee ", "");
          return (
            <button
              key={id}
              onClick={() => handleYearChange(id)}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 cursor-pointer
              ${
                selectedYear === id
                  ? "bg-ieee-yellow text-black"
                  : "bg-ieee-white border border-gray-300 text-gray-700"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden flex justify-center mb-8">
        <select
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          {committees.map((item: any) => {
            const id =
              item.name.toLowerCase().includes("current")
                ? "current"
                : item.name.replace("Executive Committee ", "");
            return (
              <option key={id} value={id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* Panels for the selected year */}
      <PanelCard
        sectionTitle="Branch Counselors"
        members={panelData.counselors || []}
      />
      <PanelCard
        sectionTitle="Chapter & Affinity Group Faculty Advisors"
        members={panelData.SCAG || []}
      />
      <PanelCard
        sectionTitle="Executive Body"
        members={panelData.Excom || []}
      />
    </>
  );
};

export default Panel;
