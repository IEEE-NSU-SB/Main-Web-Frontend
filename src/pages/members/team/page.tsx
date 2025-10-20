import { useFetchDataJSON } from "@/hooks/fetchdata";
import FamilyTree from "./OrgChart";
import Wave from "@/components/wave";

const TeamPage = () => {
  const { loading, data, error } = useFetchDataJSON({
    path: "pages/members/team/team.json",
  });

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Loading team...</div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;
  if (!data)
    return <div className="text-center text-gray-500">No data found</div>;

  return (
    <>
      <Wave
        title="Content Writing and Publication Team"
        subtitle="IEEE NSU Student Branch"
      />
      <div className="mb-8">

        <FamilyTree data={data} />
      </div>
    </>
  );
};

export default TeamPage;
