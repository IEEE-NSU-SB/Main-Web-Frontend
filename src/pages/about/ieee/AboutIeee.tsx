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
  ieeeComputerOrgLink: string;
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
    <div className="">
      {/* About Section */}
      <div className="max-w-[1045px] m-auto flex flex-col md:flex-row gap-6 items-center mb-16">
        <img
          src={data.aboutImage}
          alt="About IEEE"
          className="w-full md:h-auto h-[270px] md:w-1/2 object-contain"
        />
        <div>
          <SectionHeading title="About IEEE" />
          <p className="px-5">{data.aboutDetails}</p>
          <div className="mt-4 flex max-md:flex-col gap-4 px-5">
            <a
              href={data.learnMoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4  py-2 bg-[#002855] text-white rounded text-center"
            >
              Learn More
            </a>
            <a
              href={data.missionVisionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-[#FFC72C] text-[#002855] rounded hover:bg-[#FFC72C] hover:text-white transition text-center"
            >
              Mission & Vision
            </a>
          </div>
        </div>
      </div>

      <div className="m-auto max-w-[1080px] max-md:mx-5 justify-center  mb-6 flex flex-wrap lg:flex-nowrap gap-12">
          <FadeIn xIndex={-100} yIndex={0}>
              <SectionHeading title="Largest Community" />
              <div className="md:p-6">
                <p>{data.communityDetails}</p>
                {data.communityLinks.map((link, i) => (
                  <>
                    <a
                      key={i}
                      href={link.link}
                      className=" inline-flex items-center gap-2 text-[#002855] hover:text-[#FFC72C] mb-2"
                    >
                      <ExternalLink size={16} />
                      {link.title}
                    </a>
                    <br />
                  </>
                ))}
              </div>
          </FadeIn>
          <div className="flex justify-center min-w-[355px] max-w-[500px] px-5">
            <div className="flex justify-center w-full md:min-w-[355px] md:max-w-[500px] px-5">
              <img
                src={data.communityImage}
                alt="Largest Community"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

      {/* Start with IEEE */}
      <section className="w-full bg-[#002855] flex justify-center">
        <div className="max-w-[1080px] grid md:grid-cols-[1fr_1px_1fr] gap-10 p-6">
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Start with IEEE
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.startWithIeeeDetails}</p>
              {data.startWithIeeeLinks.map((l, i) => (
                <>
                  <a
                    key={i}
                    href={l.link}
                    className="inline-flex items-center gap-2 text-[#FFD100] hover:text-white mb-2"
                  >
                    <ExternalLink size={16} />
                    {l.title}
                  </a>
                  <br />
                </>
              ))}
            </div>
          </FadeIn>

          {/* Collab */}
          <div className="hidden md:block border-l border-white"></div>
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Collaboration
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.collaborationDetails}</p>
              {data.collaborationLinks.map((l, i) => (
                <>
                  <a
                    key={i}
                    href={l.link}
                    className="inline-flex items-center gap-2 text-[#FFD100] hover:text-white mb-2"
                  >
                    <ExternalLink size={16} />
                    {l.title}
                  </a>
                  <br />
                </>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Publications */}
      <section className="w-full bg-[#002855] flex justify-center mt-0 md:mt-[1px]">
        <div className="max-w-[1080px]  grid md:grid-cols-[1fr_1px_1fr] gap-10 p-6">
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Publications
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.publicationsDetails}</p>
              {data.publicationsLinks.map((l, i) => (
                <>
                  <a
                    key={i}
                    href={l.link}
                    className=" inline-flex items-center gap-2 text-[#FFD100] hover:text-white mb-2"
                  >
                    <ExternalLink size={16} />
                    {l.title}
                  </a>
                  <br />
                </>
              ))}
            </div>
          </FadeIn>

          {/* Events and Conference */}
          <div className="hidden md:block border-l border-white"></div>
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Events and Conference
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.eventsConferencesDetails}</p>
              {data.eventsConferencesLinks.map((l, i) => (
                <>
                  <a
                    key={i}
                    href={l.link}
                    className="inline-flex items-center gap-2 text-[#FFD100] hover:text-white mb-2"
                  >
                    <ExternalLink size={16} />
                    {l.title}
                  </a>
                  <br />
                </>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Achievements */}
      <div className="max-w-[1080px]  m-auto">
        <FadeIn yIndex={100} delay={0}>
          <SectionHeading title="Achievements" />
          <p className="text-justify mb-6 p-6">{data.achievementsDetails}</p>
          <div className="flex flex-wrap gap-7 justify-center p-5">
            {data.achievementsLinks.map((a, i) => (
              <div
                key={i}
                className="w-80 h-102 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover hover:scale-110 duration-300 transition-all"
                />
                <div className="p-4 relative bottom-65 text-center">
                  <h4 className="text-white text-lg font-bold mb-2">
                    {a.title}
                  </h4>
                  <br />
                  <br />
                  <br />
                  <br />
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FFC72C] text-white font-semibold"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Innovation Section */}
      <div className="m-auto max-w-[1080px] max-md:mx-5 justify-center p-8 md:p-5  mb-6 flex flex-wrap lg:flex-nowrap gap-12">
        <FadeIn xIndex={-100} yIndex={0}>
            <SectionHeading title="Innovations & Developments" />
            <div className="max-md:mx-5">
              <p className="mb-6">
                {data.innovationsDevelopmentsDetails}
              </p>
              {data.innovationsDevelopmentsLinks.map((link, i) => (
                <>
                  <a
                    key={i}
                    href={link.link}
                    className=" inline-flex items-center gap-2 text-[#002855] hover:text-[#FFC72C] mb-2 pl-5 max-md:pl-0"
                  >
                    <ExternalLink size={16} />
                    {link.title}
                  </a>
                  <br />
                </>
              ))}
          </div>
        </FadeIn>
        <div className="flex justify-center w-full md:min-w-[355px] md:max-w-[500px] pr-5">
          <img
            src={data.innovationsDevelopmentsImage}
            alt="Innovations"
            className="w-full h-[270px] md:h-auto object-contain"
          />
        </div>
      </div>
      

      {/* Student Activities */}
      <div className="m-auto max-w-[1080px] max-md:mx-5 justify-center  mb-6 flex flex-wrap lg:flex-nowrap gap-12 md:flex-row-reverse">
        <FadeIn xIndex={-100} yIndex={0}>
          <div>
            <SectionHeading title="Member Activities" />
            <div className="px-5">
              <p className="mb-6">{data.studentsAndMemberActivitiesDetails}</p>
              {data.studentsAndMemberActivitiesLinks.map((link, i) => (
                <>
                  <a
                    key={i}
                    href={link.link}
                    className=" inline-flex items-center gap-2 text-[#002855] hover:text-[#FFC72C] mb-2"
                  >
                    <ExternalLink size={16} />
                    {link.title}
                  </a>
                  <br />
                </>
              ))}
            </div>
          </div>
        </FadeIn>
        <div className="flex justify-center w-full md:min-w-[355px] md:max-w-[500px] pr-5 max-md:pr-0">
          <img
            src={data.studentsAndMemberActivitiesImage}
            alt="Innovations"
            className="w-full h-auto object-contain max-md:w-50"
          />
        </div>
      </div>
      {/* Quality */}
      <section className="w-full flex justify-center">
        <div className="max-w-[1080px] mb-6 flex flex-wrap lg:flex-nowrap gap-12">
          <FadeIn xIndex={-100} yIndex={0}>
            <div>
              <SectionHeading title="Quality" />
              <div className="px-5">
                <p className="mb-6">{data.qualityDetails}</p>
                {data.qualityLinks.map((link, i) => (
                  <>
                    <a
                      key={i}
                      href={link.link}
                      className=" inline-flex items-center gap-2 text-[#002855] hover:text-[#FFC72C] mb-2"
                    >
                      <ExternalLink size={16} />
                      {link.title}
                    </a>
                    <br />
                  </>
                ))}
              </div>
            </div>
          </FadeIn>
          <div className="flex justify-center w-full md:min-w-[355px] md:max-w-[500px] pr-5 max-md:pr-0">
            <img
              src={data.qualityImage}
              alt="Innovations"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Join Us */}
      <div className="w-full bg-[#002855]">
        <div className="max-w-[1080px] m-auto text-white my-12 p-5 flex flex-col md:flex-row justify-between items-center">
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
            <button className="bg-[#FFC72C] text-white font-bold py-4 px-8 cursor-pointer rounded-full mt-6 md:mt-0 hover:bg-white hover:text-[#FFC72C] transition">
              Join Now
            </button>
          </a>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white flex flex-col justify-baseline max-w-[1080px] m-auto mb-15">
        <SectionHeading title="Contact IEEE R10" />
        <FadeIn>
          <div className="grid gap-3 pl-5">
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Asia Pacific:</p>
              <a
                href={data.asiaPacificLink}
                className="link text-[#002855] hover:text-[#FFC72C]"
              >
                {data.asiaPacificLink}
              </a>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>IEEE Computer Organization:</p>
              <a
                href={data.ieeeComputerOrgLink}
                className="link text-[#002855] hover:text-[#FFC72C]"
              >
                {data.ieeeComputerOrgLink}
              </a>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Customer Service:</p>
              <p>{data.customerServiceNum}</p>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Presidents:</p>
              <p>{data.presidents}</p>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Founders:</p>
              <p>{data.founders}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
