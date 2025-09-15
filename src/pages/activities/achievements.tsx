import Wave from "@/components/wave";
import spac24Image from "../../assets/dummy/image1.png"; // Use placeholder image path

const awards = [
  {
    year: "2025",
    image: spac24Image,
    title: "IEEE IAS CMD Chapter Award 2025 - IEEE NSU Industry",
    description: "We are proud to announce that IEEE North South University Industry Applications Society Student Branch Chapter has been awarded the prestigious IEEE IAS CMD Chapter Award 2025 for Outstanding Chapter Performance. What makes this achievement even more special is that we are the only chapter from Bangladesh to have received this honor twice, and we were the first chapter from Bangladesh to win it as well — both under the Small Chapter category! This award reflects our continued commitment to excellence, innovation, and impactful contributions in industrial applications.",
    link: "#",
  },
  {
    year: "2024",
    image: spac24Image,
    title: "WIE Outstanding SB AG Award - IEEE NSU Student",
    description: "We are thrilled to announce that IEEE NSU Student Branch, WIE Affinity Group has been honored with the prestigious WIE Outstanding Student Branch Affinity Group Award in the IEEE Bangladesh Section for 2024! This marks the second consecutive year that IEEE NSU SB WIE AG has achieved such recognition.",
    link: "#",
  },
  {
    year: "2024",
    image: spac24Image,
    title: "Outstanding Student Volunteer Award - IEEE NSU",
    description: "Huge Congratulations to Our Chair! We are thrilled to announce that Mohammad Iftekhar Bin Ashraf, Chair of IEEE NSU Student Branch, has received the Outstanding Student Volunteer Award 2024 from IEEE Bangladesh Section! This well-deserved award recognizes his amazing work over the past 1.5 years as a chair. During this time, he has tirelessly led this student branch and organized a diverse range of events, including technical, non-technical, professional, humanitarian, and administrative activities.",
    link: "#",
  },
  {
    year: "2025",
    image: spac24Image,
    title: "IEEE IAS CMD Chapter Award 2025 - IEEE NSU Industry",
    description: "We are proud to announce that IEEE North South University Industry Applications Society Student Branch Chapter has been awarded the prestigious IEEE IAS CMD Chapter Award 2025 for Outstanding Chapter Performance. What makes this achievement even more special is that we are the only chapter from Bangladesh to have received this honor twice, and we were the first chapter from Bangladesh to win it as well — both under the Small Chapter category! This award reflects our continued commitment to excellence, innovation, and impactful contributions in industrial applications.",
    link: "#",
  },
  {
    year: "2024",
    image: spac24Image,
    title: "WIE Outstanding SB AG Award - IEEE NSU Student",
    description: "We are thrilled to announce that IEEE NSU Student Branch, WIE Affinity Group has been honored with the prestigious WIE Outstanding Student Branch Affinity Group Award in the IEEE Bangladesh Section for 2024! This marks the second consecutive year that IEEE NSU SB WIE AG has achieved such recognition.",
    link: "#",
  },
  {
    year: "2024",
    image: spac24Image,
    title: "Outstanding Student Volunteer Award - IEEE NSU",
    description: "Huge Congratulations to Our Chair! We are thrilled to announce that Mohammad Iftekhar Bin Ashraf, Chair of IEEE NSU Student Branch, has received the Outstanding Student Volunteer Award 2024 from IEEE Bangladesh Section! This well-deserved award recognizes his amazing work over the past 1.5 years as a chair. During this time, he has tirelessly led this student branch and organized a diverse range of events, including technical, non-technical, professional, humanitarian, and administrative activities.",
    link: "#",
  },
];
const Achievements = () => {
  return (
    <>
      <Wave title="Achievements" />
      <div className="max-w-[1000px] m-auto flex flex-wrap gap-6 justify-center mt-6 mb-6">
        {awards.map((award, idx) => (
          <div
            key={idx}
            className="bg-ieee-white shadow-lg hover:shadow-xl transition ease-in-out rounded max-w-[317px]"
          >
            <div className="relative">
              <img
                src={award.image}
                alt={award.title}
                className="w-full h-76 object-cover"
              />
              <span className="absolute top-[-6px] bg-ieee-blue text-ieee-white text-md font-semibold px-3 py-1 rounded shadow-md">
                {award.year}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-6 mt-1 line-clamp-1">{award.title}</h3>
              <p className="text-ieee-black-75 text-sm mb-3 line-clamp-2">{award.description}</p>
              <a
                href={award.link}
                className="text-ieee-blue-75 hover:underline text-sm"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Achievements;
