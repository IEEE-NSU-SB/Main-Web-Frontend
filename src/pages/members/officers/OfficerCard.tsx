import SectionHeading from "@/components/ui/SectionHeading";
import React from "react";
import { FaLinkedin, FaFacebookSquare, FaEnvelope } from "react-icons/fa";

export interface Member {
  id: string | number;
  name: string;
  position: string;
  image: string;
  linkedin?: string | null;
  facebook?: string | null;
  email?: string | null;
  profileLink?: string;
  team?: string;
}

interface OfficerCardProps {
  members: Member[];
  sectionTitle: string;
}

const OfficerCard: React.FC<OfficerCardProps> = ({ members, sectionTitle }) => {
  if (!members.length) return null;
  const DEFAULT_IMAGE = "/default_profile_picture.png";
  const BACKEND_DEFAULT =
    "https://api.ieeensusb.org/static/images/default_profile_picture.png";

  return (
    <div className="flex justify-center my-10">
      <div className="flex flex-col max-w-[1140px] w-full">
        <SectionHeading title={sectionTitle} align="center" />

        <div className="flex flex-wrap justify-center gap-x-[40px] gap-y-[80px] mt-10">
          {members.map((member) => (
            <a
              key={member.id}
              href={member.id ? `/member-profile/${member.id}` : "#"}
              rel="noopener noreferrer"
              className="group relative w-[230px] h-[350px] rounded-[35px] overflow-hidden
              shadow-[0_14px_40px_rgba(0,0,0,0.18)]
              bg-white cursor-pointer flex flex-col justify-end items-center text-center border-2 border-ieee-white"
            >
              <img
                src={
                  member.image === BACKEND_DEFAULT
                    ? DEFAULT_IMAGE
                    : member.image
                }
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 duration-300"
              />

              <div className="absolute bottom-0 w-full h-[55%] bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center justify-end h-[180px] w-full p-5 text-center">
                <h3 className="text-white font-semibold text-[20px] leading-tight tracking-tight transition-transform duration-300 -translate-y-[-40px] group-hover:-translate-y-2 group-hover:scale-115 max-md:-translate-y-2 max-md:scale-115">
                  {member.name}
                </h3>

                <p className="text-white/85 text-[16px] font-medium mt-2 leading-snug max-w-[230px] break-words text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-100">
                  {member.position}
                </p>

                <div className="flex justify-center items-center gap-4 mt-3 h-[30px] w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-100">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex justify-center items-center"
                    >
                      <FaLinkedin className="text-white/85 hover:text-white transition-all duration-300 text-[22px]" />
                    </a>
                  )}
                  {member.facebook && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex justify-center items-center"
                    >
                      <FaFacebookSquare className="text-white/85 hover:text-white transition-all duration-300 text-[22px]" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex justify-center items-center"
                    >
                      <FaEnvelope className="text-white/85 hover:text-white transition-all duration-300 text-[20px]" />
                    </a>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficerCard;
