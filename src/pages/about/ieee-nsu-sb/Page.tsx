import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import Wave from "@/components/Wave";
import CreativeGrid from "./creativeGrid";

interface LinkItem {
  image: string | undefined;
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
  chaptersDetails: string;
  chaptersImage: string;
  chaptersLinks: LinkItem[];
  creativeDetails: string;
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
  eventsDetails: string;
  eventsLinks: LinkItem[];
  joinUsLink: string;
}

export default function AboutNSUSB() {
  const { data, loading, error } = useFetchDataJSON<AboutIEEEData>({
    path: "pages/about/ieee-nsu-sb/data.json",
  });

  if (loading)
    return (
      <>
        <Wave title="About - IEEE NSU Student Branch" />
        <div className="flex justify-center items-center min-h-[500px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">
              Loading about ieee nsu sb...
            </p>
          </div>
        </div>
      </>
    );
  if (error) return <ErrorMessage message="Error loading data." />;
  if (!data) return null;

  return (
    <div className="">
      <Wave title="About - IEEE NSU Student Branch" />
      {/* About Section */}
      <div className="max-w-[1045px] m-auto flex flex-col md:flex-row gap-6 items-center mb-16">
        <img
          src={data.aboutImage}
          alt="About IEEE"
          className="w-full md:h-[280px] h-[180px] md:w-1/2 object-contain mt-10 md:mt-18"
        />
        <div>
          <SectionHeading title="About" />
          <p className="px-5">{data.aboutDetails}</p>
        </div>
      </div>

      {/* Chapters */}
      <div className="max-w-[1080px]  m-auto">
        <FadeIn yIndex={100} delay={0}>
          <SectionHeading title="Chapters" />
          <p className="md:text-justify mb-6 p-6">{data.chaptersDetails}</p>
          <div className="flex flex-wrap gap-7 justify-center max-md:p-5">
            {data.chaptersLinks.map((a, i) => (
              <div
                key={i}
                className="w-60 h-93 rounded-lg overflow-hidden shadow hover:shadow-lg border-1 transition cursor-pointer"
              >
                <div>
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-70 object-contain hover:scale-110 duration-300 transition-all"
                  />
                </div>
                <div className="p-4 text-center bg-ieee-darkblue">
                  <h4 className="text-white text-lg font-bold mb-2">
                    {a.title}
                  </h4>
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

      {/* Creative Team */}
      <div className="max-w-[1080px]  m-auto">
        <FadeIn yIndex={100} delay={0}>
          <SectionHeading title="Creative Team" />
          <p className="md:text-justify mb-6 p-6">{data.creativeDetails}</p>
        </FadeIn>
        <CreativeGrid />
      </div>

      <>
        <SectionHeading title="Mission & Vision" />

        <div className="md:max-w-[1080px] w-full mx-auto my-10 px-5 space-y-10">
          {/* Mission */}
          <FadeIn>
            <div className="flex flex-col md:flex-row rounded-md border overflow-hidden">
              <div className="w-full md:w-1/2 p-7 text-justify text-white bg-ieee-darkblue">
                <h1 className="text-4xl font-bold mb-6">Mission</h1>
                <p>
                  Our mission is to cultivate a strong community of aspiring
                  engineers by providing a wide range of opportunities for
                  personal and professional growth. Through pioneering
                  initiatives and collaboration, we are committed to inspiring
                  curiosity, stimulating creativity, and achieving excellence.
                  By providing a nurturing environment and fostering a culture
                  of continuous learning, we aim to enable students to reach
                  their full potential and make meaningful contributions to the
                  world. Together, we aim to create a vibrant ecosystem that
                  promotes innovation, strengthens connections and provides a
                  sense of empowerment and value to the members as they work
                  towards success in engineering and beyond.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src="https://api.ieeensusb.org//media_files/main_website_files/About/IEEE_NSU_Student_Branch/Mission_Image/inbound2802973171845234491.jpeg"
                  alt="Mission"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeIn>

          {/* Vision */}
          <FadeIn>
            <div className="flex flex-col md:flex-row-reverse rounded-md border overflow-hidden">
              <div className="w-full md:w-1/2 p-7 text-justify text-white bg-ieee-darkblue">
                <h1 className="text-4xl font-bold mb-6">Vision</h1>
                <p>
                  To be a leading Student Branch dedicated to the continual
                  advancement of engineering knowledge and skills among
                  students. Our goal is to create a dynamic environment where
                  members can master their technical skills, network, and
                  advance their professional careers. With an unwavering
                  commitment to excellence, we strive to shape the future of
                  engineering for the betterment of humanity by developing a
                  culture of lifelong learning and empowering future leaders.
                  Through collaborative efforts and relentless dedication, we
                  aspire to be at the forefront of engineering education and
                  practice, leaving a lasting impact on society and inspiring
                  future generations.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src="https://api.ieeensusb.org//media_files/main_website_files/About/IEEE_NSU_Student_Branch/Vision_Image/IMG_0264.jpeg"
                  alt="Vision"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </>

      {/* Events */}
      <div className="max-w-[1080px]  m-auto">
        <FadeIn yIndex={100} delay={0}>
          <SectionHeading title="Events" />
          <p className="md:text-justify mb-6 p-6">{data.eventsDetails}</p>
        </FadeIn>
        {data.eventsLinks.map((link) => (
          <>
            <div className="mt-4 flex max-md:flex-col gap-4 px-5">
            <a
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4  py-2 bg-[#002855] text-white rounded text-center font-bold hover:bg-[#FFC72C] transition duration-300 ease-in-out"
            >
              All Events
            </a>
          </div>
          </>
        ))}
      </div>

      {/* Join Us */}
      <div className="w-full bg-[#002855]">
        <div className="max-w-[1080px] m-auto text-white my-12 p-5 py-10 flex flex-col md:flex-row justify-between items-center">
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
            <button className="bg-[#FFC72C] text-white font-bold py-4 px-12 cursor-pointer rounded-full mt-6 md:mt-0 hover:bg-white hover:text-[#FFC72C] transition">
              Join Now
            </button>
          </a>
        </div>
      </div>

      {/* Achievements */}
      <div className="max-w-[1080px]  m-auto">
        <FadeIn yIndex={100} delay={0}>
          <SectionHeading title="Achievements" />
          <p className="md:text-justify mb-6 p-6">{data.achievementsDetails}</p>
        </FadeIn>
      </div>
    </div>
  );
}
