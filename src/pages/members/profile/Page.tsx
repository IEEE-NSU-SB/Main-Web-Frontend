import Wave from "@/components/Wave";
import {
  Linkedin,
  Facebook,
  Mail,
  Briefcase,
  Calendar,
  Users,
} from "lucide-react";

type Position = {
  organization: string;
  isCurrent: boolean;
  position: string;
  team: string;
  tenure?: string;
};

// Profile information
const profileData = {
  name: "Md. Shakib SHahariar Junayed",
  id: "99579190",
  session: "Summer 2023",
  // Using a placeholder for the image. Replace with your actual image URL.
  imageUrl: "https://placehold.co/128x128/002855/FFFFFF?text=RR",
  social: {
    facebook: "https://facebook.com/your-profile",
    linkedin: "https://linkedin.com/in/your-profile",
    email: "mailto:rahiq.rahman@example.com",
  },
};

// List of all positions
const positions: Position[] = [
  {
    organization: "IEEE NSU Student Branch",
    isCurrent: true,
    position: "Co-ordinator",
    team: "Website Development",
  },
  {
    organization: "IEEE NSU PES SBC",
    isCurrent: true,
    position: "Core Volunteer",
    team: "Membership Development",
  },
  {
    organization: "IEEE NSU Student Branch",
    isCurrent: false,
    tenure: "2023-2024",
    position: "Team Volunteer",
    team: "Website Development",
  },
  {
    organization: "IEEE NSU PES SBC",
    isCurrent: false,
    tenure: "2023-2024",
    position: "Core Volunteer",
    team: "Media & Creative",
  },
];

// --- 2. Sub-component: TimelineItem ---
// This component renders a single card in the timeline

const TimelineItem = ({ position }: { position: Position }) => {
  return (
    // Base container for the timeline item, with padding for the line
    <div className="mb-10 pl-14 relative">
      {/* Timeline Dot: This is the circle on the vertical line */}
      <span className="absolute left-0 top-1.5 flex items-center justify-center w-10 h-10 bg-[#00629B] rounded-full border-4 border-slate-900 shadow-lg">
        <Briefcase className="w-5 h-5 text-white" />
      </span>

      {/* Timeline Card: The main content box */}
      <div className="bg-[#002855] rounded-lg shadow-xl p-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#00629B]/40 hover:scale-[1.02]">
        {/* Card Header: Organization and Status/Tenure */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
          <h3 className="text-xl font-bold text-white mb-2 sm:mb-0">
            {position.organization}
          </h3>

          {position.isCurrent ? (
            // "Current" badge with pulse animation
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse self-start sm:self-center">
              Current Position
            </span>
          ) : (
            // "Tenure" text
            <span className="text-sm text-gray-300 flex items-center self-start sm:self-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              {position.tenure}
            </span>
          )}
        </div>

        {/* Card Body: Position and Team */}
        <h4 className="text-lg font-semibold text-cyan-300 mb-2">
          {position.position}
        </h4>
        <p className="text-base text-gray-200 flex items-center">
          <Users className="w-4 h-4 mr-2" />
          {position.team}
        </p>
      </div>
    </div>
  );
};

// --- 3. Main Profile Component ---
// This is the default export that ties everything together

const Profile = () => {
  return (
    <>
      <Wave title="Member Profile" />
      <div className="min-h-screen max-w-[800px] mx-auto flex flex-col shadow-[2px_2px_8px_theme(colors.ieee-black-50)] rounded-md border-1">
        <div className="grid grid-cols-2  border-ieee-gray/5 p-6 text-center duration-300 transition-all items-center justify-items-center">
          <div className="w-52 h-52 rounded-full  border-4 border-[#00629B] shadow-lg overflow-hidden">
            <img
              src={profileData.imageUrl}
              alt="Profile"
              className="w-full h-full mx-auto hover:scale-110 cursor-pointer transition-all duration-300"
              onError={(e) => {
                // Fallback in case the image fails to load
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/128x128/002855/FFFFFF?text=RR";
              }}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-ieee-black-75 mt-4">
              {profileData.name}
            </h1>

            <div className="text-sm text-gray-400 mt-2 space-y-1">
              <p>ID: {profileData.id}</p>
              <p>Recruitment: {profileData.session}</p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center mt-6 space-x-6">
              <a
                href={profileData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00629B] hover:scale-110 transition-all duration-200"
                title="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href={profileData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00629B] hover:scale-110 transition-all duration-200"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={profileData.social.email}
                className="text-gray-400 hover:text-[#00629B] hover:scale-110 transition-all duration-200"
                title="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        {/* --- Right Column: Timeline --- */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="border-ieee-white border-1  rounded-md p-6 md:p-8">
            <h2 className="text-3xl font-bold mb-8 text-black border-b-2 border-[#00629B] pb-3">
              Branch Timeline
            </h2>

            {/* Timeline Container */}
            <div className="relative">
              {/* The Vertical Line: A dashed line on the left */}
              <div className="absolute left-5 top-2 h-full border-l-2 border-dashed border-[#00629B]/50"></div>

              {/* Map over the positions and render a TimelineItem for each */}
              {positions.map((pos, index) => (
                <TimelineItem key={index} position={pos} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
