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

const DEFAULT_IMAGE = "/default_profile_picture.png";
const BACKEND_DEFAULT =
  "https://api.ieeensusb.org/static/images/default_profile_picture.png";

const OrgChart: React.FC<OrgChartProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and handle resize
  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Member Card Component
  const MemberCard = ({ member }: { member: Member }) => (
    <Link to={`/member-profile/${member.id}`} className="group">
      <div className="relative flex flex-col items-center transition-transform duration-300 hover:scale-105">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-ieee-blue to-ieee-darkblue p-1 group-hover:shadow-2xl group-hover:shadow-ieee-blue/30 transition-all duration-300">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <img
                src={
                  member.image === BACKEND_DEFAULT
                    ? DEFAULT_IMAGE
                    : member.image
                }
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = `${DEFAULT_IMAGE}`;
                }}
              />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-ieee-yellow opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-300"></div>
        </div>

        {/* Name and Position */}
        <div className="mt-2 md:mt-3 bg-gradient-to-b from-ieee-darkblue to-[#0a1929] px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-md border border-ieee-blue/30 group-hover:border-ieee-yellow/50 transition-all duration-300 min-w-[160px] md:min-w-[180px] max-w-[180px] md:max-w-[200px]">
          <p className="font-bold text-xs md:text-xs text-ieee-white text-center leading-tight mb-1">
            {member.name}
          </p>
          <p className="text-[10px] md:text-[10px] text-ieee-yellow text-center font-medium uppercase tracking-wide">
            {member.position}
          </p>
        </div>
      </div>
    </Link>
  );

  const hasCoordinators = data.subExecutive.length > 0;
  const hasIncharges = data.incharge.length > 0;
  const hasCoreVolunteers = data.coreVolunteers.length > 0;

  // Level component with dynamic horizontal line
  const HierarchyLevel = ({
    members,
    showTopLine,
    showBottomLine,
  }: {
    members: Member[];
    showTopLine: boolean;
    showBottomLine: boolean;
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [topHorizontalLine, setTopHorizontalLine] = useState<{
      left: number;
      width: number;
    } | null>(null);
    const [bottomHorizontalLine, setBottomHorizontalLine] = useState<{
      left: number;
      width: number;
    } | null>(null);

    useLayoutEffect(() => {
      if (isMobile || !containerRef.current || members.length <= 1) {
        setTopHorizontalLine(null);
        setBottomHorizontalLine(null);
        return;
      }

      const memberDivs = Array.from(
        containerRef.current.querySelectorAll(".member-container")
      ) as HTMLElement[];

      if (memberDivs.length === 0) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const firstMember = memberDivs[0].getBoundingClientRect();
      const lastMember =
        memberDivs[memberDivs.length - 1].getBoundingClientRect();

      // Calculate center points of first and last members
      const leftPoint =
        firstMember.left + firstMember.width / 2 - containerRect.left;
      const rightPoint =
        lastMember.left + lastMember.width / 2 - containerRect.left;

      // Top horizontal line
      if (showTopLine) {
        setTopHorizontalLine({
          left: leftPoint,
          width: rightPoint - leftPoint,
        });
      }

      // Bottom horizontal line
      if (showBottomLine) {
        setBottomHorizontalLine({
          left: leftPoint,
          width: rightPoint - leftPoint,
        });
      }
    }, [members.length, showTopLine, showBottomLine, isMobile]);

    return (
      <div
        ref={containerRef}
        className="relative flex flex-col items-center w-full"
      >
        {/* Top Horizontal Line */}
        {!isMobile &&
          showTopLine &&
          topHorizontalLine &&
          members.length > 1 && (
            <div
              className="absolute h-[2px] bg-[#002855] z-0"
              style={{
                left: `${topHorizontalLine.left}px`,
                width: `${topHorizontalLine.width}px`,
                top: "-1px",
              }}
            />
          )}

        {/* Members Row */}
        <div className="flex justify-center items-start gap-8 md:gap-12 flex-wrap relative z-10 px-2">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="member-container flex flex-col items-center"
            >
              {!isMobile && showTopLine && (
                <div className="w-[2px] h-12 bg-[#002855] mb-0"></div>
              )}

              <MemberCard member={member} />

              {!isMobile && showBottomLine && (
                <div className="w-[2px] h-12 bg-[#002855] mt-0"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Horizontal Line */}
        {!isMobile &&
          showBottomLine &&
          bottomHorizontalLine &&
          members.length > 1 && (
            <div
              className="absolute h-[2px] bg-[#002855] z-5"
              style={{
                left: `${bottomHorizontalLine.left}px`,
                width: `${bottomHorizontalLine.width}px`,
                bottom: "-1px",
              }}
            />
          )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full mt-6 md:mt-10 px-4">
      {/* Coordinators Level */}
      {hasCoordinators && (
        <div className="mb-6 md:mb-0 w-full">
          {isMobile && (
            <SectionHeading title="Co-ordinators" />
          )}
          <HierarchyLevel
            members={data.subExecutive}
            showTopLine={false}
            showBottomLine={hasIncharges}
          />
        </div>
      )}

      {/* Incharges Level */}
      {hasIncharges && (
        <div className="mb-6 md:mb-0 w-full">
          {isMobile && (
            <SectionHeading title="Incharges" />
          )}
          <HierarchyLevel
            members={data.incharge}
            showTopLine={hasCoordinators}
            showBottomLine={hasCoreVolunteers}
          />
        </div>
      )}

      {/* Core Volunteers Level */}
      {hasCoreVolunteers && (
        <div className="mb-6 md:mb-16 w-full">
          {isMobile && (
            <SectionHeading title="Core Volunteers" />
          )}
          <HierarchyLevel
            members={data.coreVolunteers}
            showTopLine={hasIncharges}
            showBottomLine={false}
          />
        </div>
      )}

      {/* Volunteers Section */}
      {data.volunteers.length > 0 && (
        <div className="max-w-[1200px] mt-4 md:mt-8 w-full">
          <SectionHeading title="Team Volunteers" />
          <div className="flex flex-wrap gap-6 md:gap-10 justify-center mt-8 md:mt-12">
            {data.volunteers.map((vol, idx) => (
              <Link key={idx} to={`/member-profile/${vol.id}`} className="group">
                <div className="flex flex-col items-center w-[160px] transition-transform duration-300 hover:scale-105">
                  <div className="relative mb-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-md bg-gradient-to-br from-ieee-blue to-ieee-darkblue p-[3px] group-hover:shadow-xl group-hover:shadow-ieee-blue/20 transition-all duration-300">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <img
                          src={
                            vol.image === BACKEND_DEFAULT
                              ? DEFAULT_IMAGE
                              : vol.image
                          }
                          alt={vol.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.onerror = null; // Prevent infinite loop
                            target.src = DEFAULT_IMAGE;
                            console.error(`Failed to load image for ${vol.name}`);
                          }}
                        />
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-ieee-yellow opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-300"></div>
                  </div>

                  <div className="bg-gradient-to-b from-ieee-darkblue to-[#0a1929] px-3 py-2 rounded-lg shadow-md border border-ieee-blue/30 group-hover:border-ieee-yellow/50 transition-all duration-300 w-full">
                    <p className="font-semibold text-xs text-ieee-white text-center leading-tight mb-1">
                      {vol.name}
                    </p>
                    <p className="text-[10px] text-ieee-yellow text-center font-medium uppercase tracking-wide">
                      {vol.position}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgChart;