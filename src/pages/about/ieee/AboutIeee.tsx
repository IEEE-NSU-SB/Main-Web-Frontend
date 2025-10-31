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
      <div className="max-w-[1080px] m-auto p-5 flex flex-col md:flex-row gap-6 items-center mb-16">
        <img
          src={data.aboutImage}
          alt="About IEEE"
          className="w-full md:w-1/2"
        />
        <div>
          <SectionHeading title="About IEEE"/>
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
              <SectionHeading title="Largest Community"/>
              <p className="text-justify mb-6 pl-5">{data.communityDetails}</p>
              {data.communityLinks.map((link, i) => (
                <>
                  <a
                    key={i}
                    href={link.link}
                    className=" inline-flex items-center gap-2 text-[#002855] hover:text-[#FFC72C] mb-2 pl-5"
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
        <div className="max-w-[1080px] grid md:grid-cols-[1fr_1px_1fr] gap-10 p-6">
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
      <div className="max-w-[1080px] m-auto">
        <FadeIn yIndex={100} delay={0}>
          <SectionHeading title="Achievements"/>
          <p className="text-justify mb-6 md:p-5">{data.achievementsDetails}</p>
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
      <section className="w-full flex justify-center">
        <div className="max-w-[1080px] mb-6 flex flex-wrap lg:flex-nowrap gap-12">
          <FadeIn xIndex={-100} yIndex={0}>
            <div>
              <SectionHeading
                title="Innovations and Developments"
              />
              <p className="text-justify mb-6 pl-5">
                {data.innovationsDevelopmentsDetails}
              </p>
              {data.innovationsDevelopmentsLinks.map((link, i) => (
                <>
                  <a
                    key={i}
                    href={link.link}
                    className=" inline-flex items-center gap-2 text-[#002855] hover:text-[#FFC72C] mb-2 pl-5"
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
              src={data.innovationsDevelopmentsImage}
              alt="Largest Community"
              className="object-contain"
            />
          </div>
        </div>
      </section>
      {/* Student Activities */}
      <section className="w-full flex justify-center">
        <div className="max-w-[1080px] mb-6 flex flex-wrap lg:flex-nowrap gap-12">
          <div className="flex justify-center min-w-[355px] max-w-[500px] pr-5">
            <img
              src={data.studentsAndMemberActivitiesImage}
              alt="Students and Member Activities"
              className="object-contain"
            />
          </div>
          <FadeIn xIndex={-100} yIndex={0}>
            <div>
              <SectionHeading
                title="Students and Member Activities"
              />
              <p className="text-justify mb-6 pl-5">
                {data.studentsAndMemberActivitiesDetails}
              </p>
              {data.studentsAndMemberActivitiesLinks.map((link, i) => (
                <>
                  <a
                    key={i}
                    href={link.link}
                    className=" inline-flex items-center gap-2 text-[#002855] hover:text-[#FFC72C] mb-2 pl-5"
                  >
                    <ExternalLink size={16} />
                    {link.title}
                  </a>
                  <br />
                </>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
      {/* Quality */}
      <section className="w-full flex justify-center">
        <div className="max-w-[1080px] mb-6 flex flex-wrap lg:flex-nowrap gap-12">
          <FadeIn xIndex={-100} yIndex={0}>
            <div>
              <SectionHeading title="Quality"/>
              <p className="text-justify mb-6 pl-5">{data.qualityDetails}</p>
              {data.qualityLinks.map((link, i) => (
                <>
                  <a
                    key={i}
                    href={link.link}
                    className=" inline-flex items-center gap-2 text-[#002855] hover:text-[#FFC72C] mb-2 pl-5"
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
              src={data.qualityImage}
              alt="Quality"
              className="object-contain"
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
        <SectionHeading title="Contact IEEE R10"/>
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
