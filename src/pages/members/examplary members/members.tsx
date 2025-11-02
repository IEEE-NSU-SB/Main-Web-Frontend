import Wave from "@/components/Wave";
import { useState } from "react";

interface Member {
  member_name: string;
  former_position: string;
  activity_year: string;
  current_activity: string;
  member_picture: string;
  facebook_account_link?: string;
  email?: string;
  achievements: string; // HTML allowed
}

interface MembersProps {
  members: Member[];
}

export default function Members({ members }: MembersProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <>
      <Wave title="Exemplary Members" />
      <div className="max-w-[1080px] mx-auto my-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((m, index) => (
            <MemberCard
              key={index}
              member={m}
              onOpen={() => setSelectedMember(m)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-51 bg-black/60 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-[#002855] mb-4 text-center">
              {selectedMember.member_name}'s Achievements
            </h2>
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedMember.achievements }}
            />

            <div className="text-center mt-6">
              <button
                className="px-5 py-2 bg-[#002855] text-white rounded-md hover:bg-[#001A3C] transition"
                onClick={() => setSelectedMember(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MemberCard({
  member,
  onOpen,
}: {
  member: Member;
  onOpen: () => void;
}) {
  return (
    <div className="relative rounded-md shadow overflow-hidden border group">
      <div
        className="flex max-md:flex-col max-md:gap-10 p-8 items-center gap-10"
        style={{ backgroundColor: "#00629B" }}
      >
        <div className="w-28 h-28 flex-shrink-0">
          <img
            src={member.member_picture}
            onError={(e) =>
              (e.currentTarget.src = "/images/default_profile_picture.png")
            }
            alt={member.member_name}
            className="w-full h-full object-cover rounded-full shadow"
          />
        </div>

        <div className="ml-5 text-white flex flex-col justify-center h-45 max-md:h-auto">
          <h3 className="font-bold text-xl capitalize">{member.member_name}</h3>
          <h6 className="font-semibold mt-2">
            {member.former_position} {member.activity_year}
          </h6>
          <p className="text-sm">{member.current_activity}</p>

          <div className="flex gap-4 mt-4 text-lg">
            <a
              href={member.facebook_account_link}
              target="_blank"
              className="hover:text-gray-200"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href={`mailto:${member.email}`} className="hover:text-gray-200">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Hover Reveal Bar */}
      <div
        className="absolute bottom-0 left-0 w-full bg-[#f0f0f1] text-[#002855] font-semibold text-center py-2 cursor-pointer 
        translate-y-full group-hover:translate-y-0 transition-transform duration-300 max-md:translate-y-0"
        onClick={onOpen}
      >
        View Some Achievements
      </div>
    </div>
  );
}
