import { useState } from "react";
import { MoreVertical } from "lucide-react";
import dummy1 from "./../assets/dummy/luffy.jpeg";

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
      <h2 className="max-w-[1078px] mx-auto text-[rgba(0,40,85,0.8)] text-3xl font-bold px-4 mt-10">
        Top 5 Performers
      </h2>

      <div className="flex gap-1 max-w-[1045px] mx-auto mt-2 mb-4">
        <div className="h-1 w-62 bg-[rgba(0,40,85,0.8)] rounded-xs"></div>
        <div className="h-1 w-2 bg-[rgba(0,40,85,0.8)] rounded-xs"></div>
        <div className="h-1 w-2 bg-[rgba(0,40,85,0.8)] rounded-xs"></div>
      </div>
      
      <div className="flex justify-end items-center w-full max-w-5xl px-4">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white border rounded shadow-md z-10 w-40">
              <ul className="text-sm text-gray-700">
                <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Top 5 Performers</li>
                {/* <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Top 5 Teams</li> */}
                {/* <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Rising Stars</li> */}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-4 justify-center items-end max-w-6xl overflow-x-auto px-4">
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
              <div className={`absolute ${ isActive? "top-4 left-6" : "top-4 left-14"} text-white font-bold text-lg bg-black/40 px-2 py-1 rounded-full`}>
                #{p.rank}
              </div>
              {isActive && (
                <div className="absolute bottom-0 bg-black/70 text-white p-4 w-full text-center">
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