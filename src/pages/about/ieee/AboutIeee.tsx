import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import { ExternalLink } from "lucide-react";

interface LinkItem {
  title: string;
  link: string;
}

interface Achievement {
  title: string;
  link: string;
  image: string;
}

interface AboutIEEEData {
  aboutDetails: string;
  aboutImage: string;
  learnMoreLink: string;
  missionVisionLink: string;
  communityDetails: string;
  communityImage: string;
  communityLinks: LinkItem[];
  startWithIeeeDetails: string;
  startWithIeeeLinks: LinkItem[];
  collaborationDetails: string;
  collaborationLinks: LinkItem[];
  publicationsDetails: string;
  publicationsLinks: LinkItem[];
  eventsConferencesDetails: string;
  eventsConferencesLinks: LinkItem[];
  achievementsDetails: string;
  achievementsLinks: Achievement[];
  innovationsDevelopmentsDetails: string;
  innovationsDevelopmentsImage: string;
  innovationsDevelopmentsLinks: LinkItem[];
  studentsAndMemberActivitiesDetails: string;
  studentsAndMemberActivitiesImage: string;
  studentsAndMemberActivitiesLinks: LinkItem[];
  qualityDetails: string;
  qualityImage: string;
  qualityLinks: LinkItem[];
  joinUsLink: string;
  asiaPacificLink: string;
  IeeeComputerOrgLink: string;
  customerServiceNum: string;
  presidents: string;
  founders: string;
}

export default function AboutIEEE() {
  const { data, loading, error } = useFetchDataJSON<AboutIEEEData>({
    path: "pages/about/ieee/data.json",
  });

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage message="Error loading data." />;
  if (!data) return null;

  return (
    <div className="max-w-[1080px] mx-auto my-8 px-6">
      {/* About Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center mb-16">
        <img
          src={data.aboutImage}
          alt="About IEEE"
          className="w-full md:w-1/2"
        />
        <div>
          <SectionHeading title="About IEEE" widthClass="w-40" />
          <p className="text-justify md:pl-5">{data.aboutDetails}</p>
          <div className="mt-4 flex gap-4 md:pl-5">
            <a
              href={data.learnMoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#002855] text-white rounded"
            >
              Learn More
            </a>
            <a
              href={data.missionVisionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-[#FFC72C] text-[#002855] rounded hover:bg-[#FFC72C] hover:text-white transition"
            >
              Mission & Vision
            </a>
          </div>
        </div>
      </div>

      <section className="w-full flex justify-center">
        <div className="max-w-[1080px] mb-6 flex flex-wrap lg:flex-nowrap gap-12">
          <FadeIn xIndex={-100} yIndex={0}>
            <div>
              <SectionHeading title="Largest Community" widthClass="w-62" />
              <p className="text-justify mb-6 pl-5">
                {data.communityDetails}
              </p>
              {data.communityLinks.map((link, i) => (
                <>
                  <a
                    key={i}
                    href={link.link}
                    className=" inline-flex items-center gap-2 text-[#002855] font-bold hover:text-[#FFC72C] mb-2 pl-5"
                  >
                    <ExternalLink size={16} />
                    {link.title}
                  </a>
                  <br />
                </>
              ))}
            </div>
          </FadeIn>
          <div className="flex justify-center min-w-[355px] max-w-[500px] pr-5">
            <img
              src={data.communityImage}
              alt="Largest Community"
              className="object-contain"
            />
          </div>
        </div>
      </section>
      {/* Dynamic Sections */}
      {/* {[
        ["Largest Community", data.communityDetails, data.communityLinks],
        ["Start with IEEE", data.startWithIeeeDetails, data.startWithIeeeLinks],
        ["Collaboration", data.collaborationDetails, data.collaborationLinks],
        ["Publications", data.publicationsDetails, data.publicationsLinks],
        [
          "Events & Conferences",
          data.eventsConferencesDetails,
          data.eventsConferencesLinks,
        ],
      ].map(([title, desc, links], i) => (
        <div key={i} className="mb-16">
          <SectionHeading title={title as string} widthClass="w-52" />
          <p className="text-justify mb-3">{desc as string}</p>
          {(links as LinkItem[]).map((l, j) => (
            <a
              key={j}
              href={l.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#002855] hover:text-[#FFC72C]"
            >
              <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
              {l.title}
            </a>
          ))}
        </div>
      ))} */}

      {/* Achievements */}
      <SectionHeading title="Achievements" widthClass="w-52" />
      <p className="text-justify mb-6">{data.achievementsDetails}</p>
      <div className="flex flex-wrap gap-6 justify-center">
        {data.achievementsLinks.map((a, i) => (
          <div
            key={i}
            className="w-72 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={a.image}
              alt={a.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 bg-[#002855] text-white text-center">
              <h4 className="font-semibold mb-2">{a.title}</h4>
              <a href={a.link} className="text-[#FFC72C] hover:text-white">
                target="_blank" rel="noopener noreferrer"R ead More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Innovation Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center my-16">
        <img
          src={data.innovationsDevelopmentsImage}
          alt="Innovation"
          className="w-full md:w-1/2 rounded-xl shadow"
        />
        <div>
          <SectionHeading
            title="Innovations & Developments"
            widthClass="w-64"
          />
          <p className="text-justify mb-3">
            {data.innovationsDevelopmentsDetails}
          </p>
          {data.innovationsDevelopmentsLinks.map((l, i) => (
            <a
              key={i}
              href={l.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#002855] hover:text-[#FFC72C]"
            >
              <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
              {l.title}
            </a>
          ))}
        </div>
      </div>

      {/* Student Activities */}
      <div className="flex flex-col md:flex-row gap-6 items-center my-16">
        <img
          src={data.studentsAndMemberActivitiesImage}
          alt="Student Activities"
          className="w-full md:w-1/2 rounded-xl shadow"
        />
        <div>
          <SectionHeading
            title="Students and Member Activities"
            widthClass="w-72"
          />
          <p className="text-justify mb-3">
            {data.studentsAndMemberActivitiesDetails}
          </p>
          {data.studentsAndMemberActivitiesLinks.map((l, i) => (
            <a
              key={i}
              href={l.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#002855] hover:text-[#FFC72C]"
            >
              <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
              {l.title}
            </a>
          ))}
        </div>
      </div>

      {/* Quality Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center my-16">
        <img
          src={data.qualityImage}
          alt="Quality"
          className="w-full md:w-1/2 rounded-xl shadow"
        />
        <div>
          <SectionHeading title="Quality" widthClass="w-36" />
          <p className="text-justify mb-3">{data.qualityDetails}</p>
          {data.qualityLinks.map((l, i) => (
            <a
              key={i}
              href={l.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#002855] hover:text-[#FFC72C]"
            >
              <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
              {l.title}
            </a>
          ))}
        </div>
      </div>

      {/* Join Us */}
      <div className="bg-[#002855] text-white rounded-xl my-12 p-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Join us for new <span className="text-[#FFC72C]">Adventure</span>
          </h2>
          <p className="max-w-lg">
            Do you want to unleash your true potential? Join us and become a
            part of a distinguished society that builds and boosts brilliance.
          </p>
        </div>
        <a href={data.joinUsLink} target="_blank" rel="noopener noreferrer">
          <button className="bg-[#FFC72C] text-white font-bold py-2 px-6 rounded-full mt-6 md:mt-0 hover:bg-white hover:text-[#FFC72C] transition">
            Join Now
          </button>
        </a>
      </div>

      {/* Contact Section */}
      <SectionHeading title="Contact Section" widthClass="w-60" />
      <div className="grid gap-4">
        <div className="grid grid-cols-3 gap-4 items-center">
          <p className="font-semibold">Asia Pacific</p>
          <a
            href={data.asiaPacificLink}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 text-[#002855] hover:text-[#FFC72C]"
          >
            {data.asiaPacificLink}
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <p className="font-semibold">IEEE Computer Organization</p>
          <a
            href={data.IeeeComputerOrgLink}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 text-[#002855] hover:text-[#FFC72C]"
          >
            {data.IeeeComputerOrgLink}
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <p className="font-semibold">Customer Service</p>
          <p className="col-span-2">{data.customerServiceNum}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <p className="font-semibold">Presidents</p>
          <p className="col-span-2">{data.presidents}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <p className="font-semibold">Founders</p>
          <p className="col-span-2">{data.founders}</p>
        </div>
      </div>
    </div>
  );
}
