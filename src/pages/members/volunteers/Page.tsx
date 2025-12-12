import { useFetchDataAPI } from "@/hooks/fetchdata";
import Wave from "@/components/Wave";
import VolunteerCard from "./VolunteerCard";

interface VolunteerMember {
  id: string;
  name: string;
  position: string;
  position_of: string;
  image: string | null;
  linkedin?: string;
  facebook?: string;
  email?: string;
  team?: string;
}

const Volunteer = () => {
  const {
    data,
    loading,
    error,
  } = useFetchDataAPI<VolunteerMember[]>({
    apiUrl: "main_website/get_volunteers/",
  });

  if (loading) return <>
          <Wave title="Loading.." />
          <div className="flex justify-center items-center min-h-[500px]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 font-medium">Loading volunteers...</p>
            </div>
          </div>
        </>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!data || data.length === 0)
    return <>
            <Wave title="Loading.." />
            <div className="flex justify-center items-center min-h-[500px]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">Loading volunteers...</p>
              </div>
            </div>
          </>;

  // ✅ Split into Core vs Team volunteers
  const coreVolunteer = data.filter((v) => v.position === "Core-Volunteer");
  const teamVolunteer = data.filter((v) => v.position !== "Core-Volunteer");

  return (
    <>
      <Wave title="Volunteers of IEEE NSU Student Branch" />

      <VolunteerCard
        members={coreVolunteer}
        sectionTitle="Core Volunteers"
      />

      <VolunteerCard
        members={teamVolunteer}
        sectionTitle="Team Volunteers"
      />
    </>
  );
};

export default Volunteer;
