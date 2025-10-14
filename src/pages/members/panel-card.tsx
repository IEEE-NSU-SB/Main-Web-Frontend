// components/PanelCard.tsx
import React from "react";
import { FaLinkedin, FaFacebookSquare, FaCheckCircle } from "react-icons/fa";
import { ImGoogle2 } from "react-icons/im";

interface Counselor {
  id: string;
  name: string;
  position: string;
  picture: string;
  linkedin?: string;
  facebook?: string;
  email?: string;
  profileLink?: string;
}

interface PanelCardProps {
  counselors: Counselor[];
  sectionTitle: string;
}

const PanelCard: React.FC<PanelCardProps> = ({ counselors, sectionTitle }) => {
  return (
    <div className="flex justify-center my-10">
      <div className="flex flex-col max-w-[1140px] w-full">
        <div className="mt-12 mb-8 flex flex-col items-center">
          <h3 className="text-[35px] font-semibold text-ieee-black uppercase text-center">
            {sectionTitle}
          </h3>
          <div className="h-[5px] w-[150px] bg-ieee-yellow rounded-md"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-[40px] gap-y-[80px]">
          {counselors.map((counselor) => (
            <a
              key={counselor.id}
              href={counselor.profileLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-[270px] h-[420px] rounded-[30px] overflow-hidden
                         border-[10px] border-white shadow-[0_14px_40px_rgba(0,0,0,0.18)]
                         bg-white cursor-pointer flex flex-col justify-end items-center text-center"
            >
              <img
                src={counselor.picture || "/images/default_profile_picture.png"}
                alt={counselor.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div
                className="absolute bottom-0 w-full h-[40%] pointer-events-none"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
                  maskImage:
                    "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
                  backdropFilter: "blur(12px)",
                }}
              ></div>

              <div className="absolute bottom-0 w-full h-[55%] bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center justify-end h-[180px] w-full p-5 text-center">
                <div className="flex items-center justify-center gap-2 w-full">
                  <h3 className="text-white font-semibold text-[22px] leading-tight tracking-tight">
                    {counselor.name}
                  </h3>
                  <FaCheckCircle className="text-white/80 text-[18px]" />
                </div>

                <p className="text-white/85 text-[15px] font-medium mt-2 leading-snug max-w-[230px] break-words text-center">
                  {counselor.position}
                </p>

                <div className="flex justify-center items-center gap-4 mt-3 h-[30px] w-full">
                  {counselor.linkedin && (
                    <a
                      href={counselor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex justify-center items-center"
                    >
                      <FaLinkedin className="text-white/85 hover:text-white transition-all duration-300 text-[22px]" />
                    </a>
                  )}
                  {counselor.facebook && (
                    <a
                      href={counselor.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex justify-center items-center"
                    >
                      <FaFacebookSquare className="text-white/85 hover:text-white transition-all duration-300 text-[22px]" />
                    </a>
                  )}
                  {counselor.email && (
                    <a
                      href={`mailto:${counselor.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex justify-center items-center"
                    >
                      <ImGoogle2 className="text-white/85 hover:text-white transition-all duration-300 text-[20px]" />
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

export default PanelCard;
