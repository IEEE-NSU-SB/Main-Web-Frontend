// components/PanelCard.tsx
import React from "react";
import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
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
        {/* Section Heading */}
        <div className="mt-12 mb-8 flex flex-col items-center">
          <h3 className="text-[35px] font-semibold text-ieee-black uppercase text-center">
            {sectionTitle}
          </h3>
          <div className="h-[5px] w-[150px] bg-ieee-yellow rounded-md"></div>
        </div>

        {/* Profile Cards */}
        <div className="flex flex-wrap justify-center gap-x-[30px] gap-y-[100px]">
          {counselors.map((counselor) => (
            <div
              key={counselor.id}
              className="relative w-[230px] max-md:w-[250px] bg-gradient-to-t from-ieee-darkblue via-ieee-blue to-[#00B5E2] 
             rounded-[10px_69px_10px_10px] shadow-lg border border-ieee-darkblue 
             transition-all duration-500 hover:rounded-lg overflow-hidden
             group bg-gradient-animate-card"
            >
              {/* Image */}
              <div
                className="w-[250px] h-[250px] bg-ieee-white rounded-[10px_69px_10px_69px] overflow-hidden 
               transition-all duration-500 group-hover:rounded-none"
              >
                <a
                  href={counselor.profileLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={
                      counselor.picture || "/images/default_profile_picture.png"
                    }
                    alt={counselor.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </a>
              </div>

              {/* Caption */}
              <div className="text-center relative p-4 flex flex-col justify-between">
                <h3 className="text-ieee-white font-semibold text-[21px]">
                  {counselor.name}
                </h3>
                <p className="text-ieee-darkyellow text-[15px] font-medium mb-3">
                  {counselor.position}
                </p>
                <div className="flex justify-center space-x-3">
                  {counselor.linkedin && (
                    <a
                      href={counselor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="rounded-md text-ieee-white-75 hover:text-ieee-white transition-transform duration-300 transform hover:-translate-y-1 text-[21px]" />
                    </a>
                  )}
                  {counselor.facebook && (
                    <a
                      href={counselor.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookSquare className="rounded-md text-ieee-white-75 hover:text-ieee-white transition-transform duration-300 transform hover:-translate-y-1 text-[21px]" />
                    </a>
                  )}
                  {counselor.email && (
                    <a
                      href={`mailto:${counselor.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ImGoogle2 className="rounded text-ieee-white-75 hover:text-ieee-white transition-transform duration-300 transform hover:-translate-y-1 text-[19px] mt-[1px]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PanelCard;
