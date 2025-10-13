import Table from "@/components/Table";
import FadeIn from "@/components/ui/FadeIn";
import Wave from "@/components/Wave";

const membersData = [
  {
    sl: 1,
    ieeeId: "93453117",
    nsuId: "None",
    name: "Saif Ahmed",
    ieeeEmail: "saif.ahmed02@ieee.org",
    nsuEmail: "saif.ahmed02@northsouth.edu",
    bloodGroup: "None",
  },
  {
    sl: 2,
    ieeeId: "97454566",
    nsuId: "2014154042",
    name: "Md Nafiur Rahman",
    ieeeEmail: "mdnafiur.rahman19@ieee.org",
    nsuEmail: "nafiur.rahman01@northsouth.edu",
    bloodGroup: "O+",
  },
];

const AllMembersStatistcs = () => {
  return (
    <>
      <Wave title="All Registered Members & Member Statistics of IEEE NSU SB" />
      <FadeIn>
        <Table title="All Registered Members" data={membersData} />
      </FadeIn>
    </>
  );
};

export default AllMembersStatistcs;
