import Wave from "@/components/Wave";
import MembersTable from "./Table";
import Graph from "./Graph";

const headers = [
  { key: "sl", label: "SL No." },
  { key: "ieeeId", label: "IEEE ID" },
  { key: "nsuId", label: "NSU ID" },
  { key: "name", label: "Name" },
  { key: "ieeeEmail", label: "IEEE Email" },
  { key: "nsuEmail", label: "NSU Email" },
  { key: "bloodGroup", label: "Blood Group" },
];

const AllMemStats = () => {
  return (
    <>
      <Wave title="All Registered Members & Member Statistics of IEEE NSU SB" />
      <Graph/>
      <MembersTable
        title="All Registered Members of IEEE NSU Student Branch"
        headers={headers}
        dataPath="pages/members/all-members-statistics/data/MemStats.json"
      />
    </>
  );
};

export default AllMemStats;
