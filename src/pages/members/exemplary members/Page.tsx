import Members from "./members";

const ExemplaryMember = [
  {
    member_name: "John Doe",
    member_picture: "/photos/john.png",
    former_position: "Chair",
    activity_year: "2021",
    current_activity: "Software Engineer",
    facebook_account_link: "https://facebook.com",
    email: "john@example.com",
    achievements: "<ul><li>Award X</li><li>Project Lead</li></ul>",
    rank:1,
  },
  {
    member_name: "John Doe",
    former_position: "Chair",
    activity_year: "2021",
    current_activity: "Software Engineer",
    member_picture: "/photos/john.png",
    facebook_account_link: "https://facebook.com",
    email: "john@example.com",
    achievements: "<ul><li>Award X</li><li>Project Lead</li></ul>",
    rank:2,
  },
  {
    member_name: "John Doe",
    former_position: "Chair",
    activity_year: "2021",
    current_activity: "Software Engineer",
    member_picture: "/photos/john.png",
    facebook_account_link: "https://facebook.com",
    email: "john@example.com",
    achievements: "<ul><li>Award X</li><li>Project Lead</li></ul>",
    rank:3,
  },
  {
    member_name: "John Doe",
    former_position: "Chair",
    activity_year: "2021",
    current_activity: "Software Engineer",
    member_picture: "/photos/john.png",
    facebook_account_link: "https://facebook.com",
    email: "john@example.com",
    achievements: "<ul><li>Award X</li><li>Project Lead</li></ul>",
    rank:4,
  },
  {
    member_name: "John Doe",
    former_position: "Chair",
    activity_year: "2021",
    current_activity: "Software Engineer",
    member_picture: "/photos/john.png",
    facebook_account_link: "https://facebook.com",
    email: "john@example.com",
    achievements: "<ul><li>Award X</li><li>Project Lead</li></ul>",
    rank:5,
  },
];

export default function Exemplary() {
  return <Members members={ExemplaryMember} />;
}
