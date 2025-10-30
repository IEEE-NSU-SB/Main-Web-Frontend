import React from "react";
import { FaFacebookF, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import data from "./data.json";
import Wave from "@/components/Wave";

const MemberProfile: React.FC = () => {
  return (
    <>
      <Wave title={`${data.name}'s Profile`} />
      <div className="max-w-[1080px] mx-auto px-4 py-10 space-y-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          <div className="flex flex-col md:flex-row  gap-8 items-center md:items-start">
            <div className="w-32 h-32 md:w-42 md:h-42 rounded-full overflow-hidden shadow-[2px_2px_8px_var(--color-ieee-gray-50)] border-1 border-ieee-white hover:border-ieee-blue transition-all duration-300">
              <img className="w-full h-full hover:scale-105 object-cover transition-all duration-300 ease-in cursor-pointer" src={data.image} alt={data.name} />
            </div>

            <div className="flex flex-col justify-center items-center md:items-start">
              <h1 className="text-[20px] md:text-[26px] shine-text">{data.name}</h1>
              <p className="text-ieee-black text-[18px] md:text-[24px]">{data.position}</p>
              <p className="text-[12px] md:text-[16px] text-ieee-black-75">{data.memberId}</p>
              <p className="text-[12px] md:text-[16px] text-ieee-black-75">{data.tenure}</p>

              <div className="flex gap-3 mt-3 text-gray-700">
                <a href={data.socials.facebook}>
                  <FaFacebookF />
                </a>
                <a href={data.socials.linkedin}>
                  <FaLinkedinIn />
                </a>
                <a href={data.socials.email}>
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="border-ieee-darkyellow orange border-[2px_2px] rounded-[6px_20px] w-full md:w-80 bg-amber-200 overflow-hidden shadow-[2px_2px_8px_var(--color-ieee-gray-50)]">
            <h2 className="font-semibold px-4 py-2">Achievements</h2>
            <ul className="text-sm text-gray-600 space-y-3 max-h-33 overflow-y-auto ieee-scrollbar bg-white p-2">
              {data.achievements.map((ach, i) => (
                <li key={i} className="flex items-center gap-2">
                  ⭐ {ach}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* About Me */}
        <div className="rounded-lg p-6 space-y-6 shadow-[2px_2px_8px_var(--color-ieee-gray-50)] border-black/50 border-1">
          <div>
            <h2 className="text-[20px] font-semibold mb-2">About Me</h2>
            <p className="text-[16px] text-gray-700">
              IEEE Mail: {data.emails.ieee}
            </p>
            <p className="text-[16px] text-gray-700">NSU Mail: {data.emails.nsu}</p>
            <p className="text-[16px] text-gray-700">
              Blood Group: {data.bloodGroup}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {data.roles.map((role, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-ieee-blue to-ieee-cyan rotate-45 "></div>
                  <h3 className="font-bold text-[20px]">{role.organization}</h3>
                </div>
                <p>Current Position: {role.currentPosition}</p>
                <p>Current Team: {role.team}</p>
                <p>Tenure: {role.tenure}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberProfile;
