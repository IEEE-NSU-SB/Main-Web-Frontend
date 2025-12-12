import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
// import { HiUserGroup } from "react-icons/hi2";
import { FaEnvelope, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Member {
  id: number;
  name: string;
  position: string;
  image?: string;
  facebook?: string;
  linkedin?: string;
  email?: string;
}

interface ExecutiveProps {
  advisor: Member[];
  executives: Member[];
  color?: string;
}

const Executive: React.FC<ExecutiveProps> = ({
  advisor,
  executives,
  color = "#00629b",
}) => {
  const defaultImage = "/src/assets/dummy/placeholder.png";

  const MemberCard = ({ member }: { member: Member }) => (
    
    
    <FadeIn>
      <div
        className="w-[235px] bg-white rounded-xl border text-center pt-4 pb-10 shadow-[4px_4px_10px_var(--color-ieee-black-25)] transition-all duration-300 relative"
        style={{ borderColor: color }}
      >
        <Link
          to={member.id ? `/member-profile/${member.id}` : "#"}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[65%] w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-200 hover:scale-105 transition-transform"
        >
          <img
            src={member.image || defaultImage}
            alt={member.name}
            className="object-cover w-full h-full"
          />
        </Link>

        <h3 className="font-semibold text-[16px] text-gray-800 mt-12">
          {member.name}
        </h3>
        <p className="text-sm text-gray-600 mt-2 mb-6">{member.position}</p>

        <div className="flex justify-center gap-6 mt-auto">
          {member.email && (
            <a href={`mailto:${member.email}`} style={{ color }}>
              <FaEnvelope size={20} />
            </a>
          )}
          {member.facebook && (
            <a href={member.facebook} target="_blank" style={{ color }}>
              <FaFacebook size={20} />
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" style={{ color }}>
              <FaLinkedin size={20} />
            </a>
          )}
        </div>
      </div>
    </FadeIn>
  );

  return (
    <section className="max-w-[1080px] mx-auto py-2">
      <SectionHeading
        title="Our Executive Body"
        titleColor={color}
        underlineColor={color}
      />
      {/* Faculty Advisor */}
      <div className="flex flex-wrap justify-center items-center mt-26 gap-x-8 gap-y-27 px-5">
        {advisor.length > 0 && advisor.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Executive Members */}
      <div className="flex flex-wrap justify-center items-center mt-26 gap-x-8 gap-y-27 px-5">
        {executives.length > 0 && executives.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* <div className="text-center flex justify-center my-16">
        <Link to="/panels">
          <button
            className="cursor-pointer flex items-center gap-2 border-1 font-bold py-2 px-4 duration-300 rounded-[4px]"
            style={{
              backgroundColor: "white",
              borderColor: color,
              color: color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = color;
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = color;
            }}
          >
            <HiUserGroup className="w-4 h-4" /> See All Panels
          </button>
        </Link>
      </div> */}
    </section>
  );
};

export default Executive;
