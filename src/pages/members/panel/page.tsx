import PanelCard from "@/pages/members/panel-card";
import Wave from "@/components/wave";

// dummyCounselors.ts
export const counselorsData = [
  {
    id: "1",
    name: "Saif Ahmed",
    position: "Branch Counselor",
    picture: "https://ieeensusb.org/media_files/user_profile_pictures/93453117_profile_picture.jpg",
    linkedin: "https://linkedin.com/in/alicejohnson",
    facebook: "https://facebook.com/alicejohnson",
    email: "alice@example.com",
    profileLink: "/member/alice",
  }
];
export const SCAGData = [
  {
    id: "1",
    name: "Saif Ahmed",
    position: "Faculty Advisor, IEEE NSU PES SBC",
    picture: "https://ieeensusb.org/media_files/user_profile_pictures/93453117_profile_picture.jpg",
    linkedin: "https://linkedin.com/in/alicejohnson",
    email: "alice@example.com",
    profileLink: "/member/alice",
  },
  {
    id: "2",
    name: "Dr. Lamia Iftekhar",
    position: "Faculty Advisor, IEEE NSU RAS SBC",
    picture: "https://ieeensusb.org/media_files/panel_profile_pictures/image11.png",
    profileLink: "/member/alice",
  },
  {
    id: "3",
    name: "Omar-Ibne Shahid",
    position: "Faculty Advisor, IEEE NSU RAS SBC",
    picture: "https://ieeensusb.org/media_files/panel_profile_pictures/image13.jpeg",
    linkedin: "https://linkedin.com/in/alicejohnson",
    profileLink: "/member/alice",
  },
  {
    id: "4",
    name: "Dr. Riasat Khan",
    position: "Faculty Advisor, IEEE NSU IAS SBC",
    picture: "https://ieeensusb.org/media_files/panel_profile_pictures/image17.jpeg",
    linkedin: "https://linkedin.com/in/alicejohnson",
    facebook: "https://facebook.com/alicejohnson",
    email: "alice@example.com",
    profileLink: "/member/alice",
  },
];

export const ExcomData = [
  {
    id:"1",
    name:"Md Nafiur Rahman",
    position: "Chair",
    picture: "https://ieeensusb.org/media_files/user_profile_pictures/97454566_profile_picture.jpg",
    linkedin: "https://linkedin.com/in/alicejohnson",
    facebook: "https://facebook.com/alicejohnson",
    email: "alice@example.com",
    profileLink: "/member/alice",
  }
]


const Panel = () => {
  return (
    <>
      <Wave title="Current Panel of IEEE NSU SB"></Wave>
      <PanelCard sectionTitle="Branch Counselor" counselors={counselorsData} />
      <PanelCard sectionTitle="Chapter and Affinity Group Faculty Advisors" counselors={SCAGData} />
      <PanelCard sectionTitle="IEEE NSU Student Branch Executive Body" counselors={ExcomData} />
      <PanelCard sectionTitle="Chapter and Affinity Group Chairs" counselors={ExcomData} />
    </>
  );
};

export default Panel;
