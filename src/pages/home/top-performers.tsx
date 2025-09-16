import { useState } from "react";
import { MoreVertical } from "lucide-react";
import dummy1 from "@/assets/dummy/luffy.jpeg";
import SectionHeading from "@/components/ui/section-heading";
import topPerformersData from "./data/top-performers.json";
import FadeIn from "@/components/ui/fade-in";

type Performer = {
  id: number;
  name: string;
  role: string;
  team: string;
  rank: number;
  image: string;
};

const TopPerformers = () => {
  const [active, setActive] = useState<number>(1); // Rank 1 is active by default
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const performers: Performer[] = topPerformersData.map((p) => ({
    ...p,
    image: dummy1,
  }));

  return (
    <FadeIn>
      <div className="w-full flex flex-col items-center max-md:block py-6">
        <SectionHeading title="Top 5 Performers" widthClass="w-62"/>

        {/* Dropdown */}
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
                  <li className="hover:bg-[#fcfcfc] font-bold px-4 py-2 cursor-pointer">
                    Top 5 Performers
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Performers Cards */}
        <div className="container mt-6 flex flex-col md:flex-row gap-4 justify-center items-center max-w-6xl overflow-x-auto px-4">
          {performers.map((p) => {
            const isActive = p.rank === active;

            // Assign responsive order
            const orderClass = `
      ${p.rank === 1 ? "order-1 md:order-3" : ""}
      ${p.rank === 2 ? "order-2 md:order-4" : ""}
      ${p.rank === 3 ? "order-3 md:order-2" : ""}
      ${p.rank === 4 ? "order-4 md:order-5" : ""}
      ${p.rank === 5 ? "order-5 md:order-1" : ""}
    `;

            return (
              <div
                key={p.id}
                onClick={() => setActive(p.rank)}
                className={`cursor-pointer transition-all duration-300 overflow-hidden relative max-md:w-full  
          ${
            isActive
              ? "h-140 max-md:h-100 w-92 rounded-[50px]"
              : "h-140 max-md:h-20 w-35 rounded-[80px]"
          } 
          flex-shrink-0 ${orderClass}`}
                style={{
                  backgroundImage: `url(${p.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Rank Badge */}
                <div
                  className={`absolute ${
                    isActive ? "top-4 left-6" : "top-4 left-14"
                  } 
          text-ieee-white font-bold text-lg bg-ieee-black-50 px-2 py-1 rounded-full`}
                >
                  #{p.rank}
                </div>

                {/* Info for active */}
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
    </FadeIn>
  );
};

export default TopPerformers;
