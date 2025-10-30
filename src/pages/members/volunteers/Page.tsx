import { useFetchDataJSON } from "@/hooks/fetchdata";
import Wave from "@/components/Wave";
import VolunteerCard from "./VolunteerCard";

interface VolunteerData {
  coreVolunteer: {
    id: string;
    name: string;
    position: string;
    image: string;
    linkedin?: string;
    facebook?: string;
    email?: string;
    profileLink?: string;
    team?: string;
  }[];
  teamVolunteer: {
    id: string;
    name: string;
    position: string;
    image: string;
    linkedin?: string;
    facebook?: string;
    email?: string;
    profileLink?: string;
    team?: string;
  }[];
}

const Volunteer = () => {
  const {
    data: VolunteersData,
    loading: VolunteersLoading,
    error: VolunteersError,
  } = useFetchDataJSON<VolunteerData>({
    path: "pages/members/volunteers/data.json",
  });

  // ✅ Only return JSX *after* all hooks have been called
  if (VolunteersLoading) return <p className="text-center mt-10">Loading...</p>;

  if (VolunteersError)
    return <p className="text-center mt-10 text-red-500">{VolunteersError}</p>;

  if (!VolunteersData)
    return <p className="text-center mt-10 text-gray-500">No data found.</p>;

  return (
    <>
      <Wave title="Volunteer Panel of IEEE NSU SB" />
      {/* Volunteer cards */}
      <VolunteerCard
        members={VolunteersData.coreVolunteer}
        sectionTitle="Core Volunteers"
      />
      <VolunteerCard
        members={VolunteersData.teamVolunteer}
        sectionTitle="Team Volunteers"
      />
    </>
  );
};

export default Volunteer;
