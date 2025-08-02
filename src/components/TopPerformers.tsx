import { useState } from "react";
import { MoreVertical } from "lucide-react";
import dummy1 from "./../assets/dummy/luffy.jpeg";
import SectionHeading from "./ui/SectionHeading";

type Performer = {
  id: number;
  name: string;
  role: string;
  team: string;
  rank: number;
  image: string;
};

const performers: Performer[] = [
  {
    id: 5,
    name: "Performer 5",
    role: "General Member",
    team: "Website Development Team",
    rank: 5,
    image: dummy1,
  },
  {
    id: 3,
    name: "Performer 3",
    role: "General Member",
    team: "Website Development Team",
    rank: 3,
    image: dummy1,
  },
  {
    id: 1,
    name: "Md. Shakib Shahriar Junayed",
    role: "General Member",
    team: "Website Development Team",
    rank: 1,
    image: dummy1,
  },
  {
    id: 2,
    name: "Performer 2",
    role: "General Member",
    team: "Website Development Team",
    rank: 2,
    image: dummy1,
  },
  {
    id: 4,
    name: "Performer 4",
    role: "General Member",
    team: "Website Development Team",
    rank: 4,
    image: dummy1,
  },
];

const TopPerformers = () => {
  const [active, setActive] = useState<number>(1); // Rank 1 is active by default
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center py-6">

      <SectionHeading title="Top 5 Performers" widthClass="w-62" />
      
      <div className="flex justify-end items-center w-full max-w-5xl px-4">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="p-2 hover:bg-ieee-gray-15 rounded-full"
          >
            <MoreVertical />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 bg-ieee-white border rounded shadow-md z-10 w-40">
              <ul className="text-sm text-ieee-blue">
                <li className="hover:bg-[#fcfcfc] font-bold px-4 py-2 cursor-pointer">Top 5 Performers</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="container mt-6 flex gap-4 justify-center items-end max-w-6xl overflow-x-auto px-4">
        {performers.map((p) => {
          const isActive = p.rank === active;
          return (
            <div
              key={p.id}
              onClick={() => setActive(p.rank)}
              className={`cursor-pointer transition-all duration-300 overflow-hidden relative h-140 ${
                isActive ? "w-92 rounded-[50px]" : "w-35 rounded-[80px]"
              }`}
              style={{
                backgroundImage: `url(${p.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className={`absolute ${ isActive? "top-4 left-6" : "top-4 left-14"} text-ieee-white font-bold text-lg bg-ieee-black-50 px-2 py-1 rounded-full`}>
                #{p.rank}
              </div>
              {isActive && (
                <div className="absolute bottom-0 bg-ieee-black-75 text-ieee-white p-4 w-full text-center">
                  <h3 className="font-bold text-sm">{p.name}</h3>
                  <p className="text-xs">{p.team}</p>
                  <p className="text-xs">{p.role}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopPerformers;