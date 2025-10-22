import { useParams } from "react-router-dom";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import FamilyTree from "./OrgChart";
import Wave from "@/components/Wave";

const TeamPage = () => {
  const { id } = useParams(); // 👈 dynamic team id from URL

  // Load JSON dynamically based on `id`
  const { loading, data, error } = useFetchDataJSON({
    path: `pages/members/team/${id}/team.json`, // 👈 fetches team-specific data
    // path: `pages/members/team/team.json`, // 👈 fetches team-specific data
  });

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Loading team...</div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;
  if (!data)
    return <div className="text-center text-gray-500">No data found</div>;

  const title =  "Web";

  return (
    <>
      <Wave title={title} subtitle="IEEE NSU Student Branch" />
      <div className="mb-8">
        <FamilyTree data={data} />
      </div>
    </>
  );
};

export default TeamPage;