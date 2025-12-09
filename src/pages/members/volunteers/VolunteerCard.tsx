import SectionHeading from "@/components/ui/SectionHeading";
import React from "react";
import { FaLinkedin, FaFacebookSquare, FaEnvelope } from "react-icons/fa";

interface Member {
  id: string;
  name: string;
  position: string;
  position_of: string;
  image: string | null;
  linkedin?: string;
  facebook?: string;
  email?: string;
  team?: string;
}

interface VolunteerCardProps {
  members: Member[];
  sectionTitle: string;
}

const VolunteerCard: React.FC<VolunteerCardProps> = ({
  members,
  sectionTitle,
}) => {
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
              href={member.id ? `/member-profile/${member.id}` : "#"}
              key={member.id}
              className="group relative w-[230px] h-[350px] rounded-[35px] overflow-hidden
              shadow-[0_14px_40px_rgba(0,0,0,0.18)]
              bg-white cursor-pointer flex flex-col justify-end items-center text-center border-2 border-ieee-white"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 duration-300"
                src={member.image && member.image !== BACKEND_DEFAULT ? member.image : DEFAULT_IMAGE}
                alt={member.name}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src !== DEFAULT_IMAGE) {
                    target.src = DEFAULT_IMAGE;
                  }
                }}
              />

              <div className="absolute bottom-0 w-full h-[55%] bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center justify-end h-[180px] w-full p-5 text-center">
                <h3 className="text-white font-semibold text-[20px] leading-tight tracking-tight transition-transform duration-300 -translate-y-[-40px] group-hover:-translate-y-2 group-hover:scale-115">
                  {member.name}
                </h3>

                <p className="text-white/85 text-[16px] font-medium mt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {member.position}
                </p>

                <div className="flex justify-center items-center gap-4 mt-3 h-[30px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="text-white/85 hover:text-white text-[22px] z-10" />
                    </a>
                  )}

                  {member.facebook && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookSquare className="text-white/85 hover:text-white text-[22px] z-10" />
                    </a>
                  )}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaEnvelope className="text-white/85 hover:text-white text-[20px] z-10" />
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

export default VolunteerCard;
