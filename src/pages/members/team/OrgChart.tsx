import SectionHeading from "@/components/ui/SectionHeading";
import React, { useRef, useLayoutEffect, useState } from "react";
import { Link } from "react-router";

interface Member {
  name: string;
  position: string;
  image: string;
  id: string;
}

interface OrgChartProps {
  data: {
    subExecutive: Member[];
    incharge: Member[];
    coreVolunteers: Member[];
    volunteers: Member[];
  };
}

const OrgChart: React.FC<OrgChartProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const DEFAULT_IMAGE = `${
    import.meta.env.VITE_API_URL
  }/static/images/default_profile_picture.png`;

  // Detect screen size
  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderLevel = (
    members: Member[],
    showTopLine: boolean,
    showBottomLine: boolean,
    conditionalBottomLine = false,
    isLastLevel = false
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [topLines, setTopLines] = useState<
      { left: number; right: number; top: number }[]
    >([]);
    const [bottomLines, setBottomLines] = useState<
      { left: number; right: number; top: number }[]
    >([]);
    const [verticalLines, setVerticalLines] = useState<
      { left: number; top: number; height: number }[]
    >([]);
    const [animate, setAnimate] = useState(false);

    useLayoutEffect(() => {
      if (isMobile || !containerRef.current) return;

      const children = Array.from(
        containerRef.current.children
      ) as HTMLElement[];
      if (!children.length) return;

      const rows: HTMLElement[][] = [];
      children.forEach((child) => {
        const top = child.offsetTop;
        if (
          !rows.length ||
          Math.abs(rows[rows.length - 1][0].offsetTop - top) > 5
        ) {
          rows.push([child]);
        } else {
          rows[rows.length - 1].push(child);
        }
      });

      const containerRect = containerRef.current.getBoundingClientRect();

      // --- TOP HORIZONTAL LINES ---
      const topPositions = rows.map((row) => {
        const first = row[0].getBoundingClientRect();
        const last = row[row.length - 1].getBoundingClientRect();
        const vertical = (
          row[0].firstElementChild as HTMLElement | null
        )?.getBoundingClientRect();
        const topOffset =
          showTopLine && vertical
            ? vertical.top - containerRect.top
            : first.top - containerRect.top;

        return {
          left: first.left + first.width / 2 - containerRect.left,
          right: last.left + last.width / 2 - containerRect.left,
          top: topOffset,
        };
      });

      // --- BOTTOM HORIZONTAL LINES ---
      const bottomPositions = rows.map((row) => {
        const first = row[0].getBoundingClientRect();
        const last = row[row.length - 1].getBoundingClientRect();
        const vertical = (
          row[0].lastElementChild as HTMLElement | null
        )?.getBoundingClientRect();
        const topOffset =
          showBottomLine && vertical
            ? vertical.bottom - containerRect.top
            : first.bottom - containerRect.top;

        return {
          left: first.left + first.width / 2 - containerRect.left,
          right: last.left + last.width / 2 - containerRect.left,
          top: topOffset,
        };
      });

      // --- VERTICAL LINES ---
      const verticals: { left: number; top: number; height: number }[] = [];
      if (rows.length > 1) {
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          for (let j = 0; j < row.length - 1; j++) {
            const leftChild = row[j].getBoundingClientRect();
            verticals.push({
              left: (leftChild.left + leftChild.right) / 2 - containerRect.left,
              top: topPositions[i].top,
              height: row[0].offsetTop - topPositions[i].top,
            });
          }
        }
      }

      setTopLines(topPositions);
      setBottomLines(
        !isLastLevel &&
          ((conditionalBottomLine && rows.length > 1) || !conditionalBottomLine)
          ? bottomPositions
          : []
      );
      setVerticalLines(verticals);

      setTimeout(() => setAnimate(true), 50);
    }, [
      members.length,
      showTopLine,
      showBottomLine,
      conditionalBottomLine,
      isLastLevel,
      isMobile,
    ]);

    return (
      <div className="relative flex justify-center items-start w-full">
        {/* Bottom horizontal lines */}
        {bottomLines.map((pos, idx) => (
          <div
            key={`bottom-${idx}`}
            className="absolute h-[2px] bg-[#002855] z-0"
            style={{
              left: `${pos.left}px`,
              width: `${pos.right - pos.left}px`,
              top: `${pos.top}px`,
            }}
          />
        ))}

        {/* Top horizontal lines */}
        {topLines.map((pos, idx) => (
          <div
            key={`top-${idx}`}
            className="absolute h-[2px] bg-[#002855] z-0"
            style={{
              left: `${pos.left}px`,
              width: `${pos.right - pos.left}px`,
              top: `${pos.top}px`,
            }}
          />
        ))}

        {/* Vertical lines */}
        {verticalLines.map((v, idx) => (
          <div
            key={`v-${idx}`}
            className="absolute w-[2px] bg-[#002855] z-0 transition-all duration-700 ease-out"
            style={{
              left: `${v.left}px`,
              top: `${v.top}px`,
              height: animate ? `${v.height}px` : `0px`,
            }}
          />
        ))}

        {/* Members */}
        <div
          ref={containerRef}
          className="flex justify-center items-start gap-x-4 sm:gap-x-8 md:gap-x-12 relative z-10 w-full flex-wrap"
        >
          {members.map((member, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center group"
            >
              {showTopLine && <div className="w-[2px] h-10 bg-[#002855]"></div>}

              <div className="w-[270px] relative flex flex-row items-center p-5 bg-[#153457] border-[#ffffff] border-2 rounded-2xl">
                <Link to={"https://ieeensusb.org/member_profile/99579190"}>
                  <div
                    className="w-25 h-25 rounded-full overflow-hidden shadow-md bg-gray-100 border-2
                  transition-all duration-300 ease-out hover:shadow-xl cursor-pointer"
                  >
                    <img
                      src={member.image || DEFAULT_IMAGE}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.onerror = null; // prevent loop
                        target.src = `${DEFAULT_IMAGE}`;
                      }}
                    />
                  </div>
                </Link>

                <div className="text-ieee-white text-sm px-3 py-2 rounded-md transition-opacity duration-300 z-50 pointer-events-none text-center">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-ieee-yellow text-xs">{member.position}</p>
                </div>
                {showBottomLine && !isLastLevel && (
                  <div className="absolute bottom-[-8px] right-[128px]  w-3 h-3 bg-[#002855] rotate-45 z-[-1] shadow-sm"></div>
                )}
              </div>

              {showBottomLine && !isLastLevel && (
                <div className="reletive z-[-2] w-[2px] h-8 bg-[#002855]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVolunteers = (volunteers: Member[]) => (
    <div className="max-w-[1080px] mt-8 ">
      <SectionHeading title="Our Volunteers" />
      <div className="flex flex-wrap gap-11 justify-center mt-12">
        {volunteers.map((vol, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center border-2 border-ieee-white pb-4 w-[227px] bg-ieee-darkblue/90 rounded-lg hover:shadow-[4px_4px_10px_theme(colors.ieee-gray-50)] shadow-[2px_2px_8px_theme(colors.ieee-gray-50)] transition cursor-pointer overflow-hidden"
          >
            <Link to={`/member_profile/${vol.id}`}>
              <div className="w-56 h-55 rounded mb-4">
                <img
                  src={vol.image || DEFAULT_IMAGE}
                  alt={vol.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null; // prevent loop
                    target.src = `${DEFAULT_IMAGE}`;
                  }}
                />
              </div>
            </Link>
            <p className="font-semibold text-md text-center text-ieee-white">
              {vol.name}
            </p>
            <p className="font-semibold text-md text-ieee-yellow text-center">
              {vol.position}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full mt-10">
      {renderLevel(data.subExecutive, false, true)}
      {renderLevel(data.incharge, true, true)}
      {renderLevel(data.coreVolunteers, true, false, false, true)}
      {renderVolunteers(data.volunteers)}
    </div>
  );
};

export default OrgChart;
