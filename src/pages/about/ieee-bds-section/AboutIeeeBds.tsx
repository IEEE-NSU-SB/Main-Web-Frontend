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

interface AboutIEEEBDSData {
  aboutDetails: string;
  aboutImage: string;
  ieeebdlink: string;
  memVolDetails: string;
  memVolImage: string;
  memVolLinks: LinkItem[];
  benefitsDetails: string;
  benefitsLinks: LinkItem[];
  stuBranchDetails: string;
  stuBranchLinks: LinkItem[];
  affinityDetails: string;
  affinityLinks: LinkItem[];
  communitySocietyDetails: string;
  communitySocietyLinks: LinkItem[];
  achievementsDetails: string;
  achievementsLinks: Achievement[];
  gallery: { image: string }[];
  joinUsLink: string;
  chair: string;
  chairEmail: string;
  secretary: string;
  secretaryEmail: string;
  officeSecretary: string;
}

export default function AboutIEEE() {
  const { data, loading, error } = useFetchDataJSON<AboutIEEEBDSData>({
    path: "pages/about/ieee-bds-section/data.json",
  });

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage message="Error loading data." />;
  if (!data) return null;

  return (
    <div>
      {/* About IEEE BDS Section */}
      <div className="max-w-[1080px] m-auto flex flex-col md:flex-row gap-6 items-center mb-16">
        <img
          src={data.aboutImage}
          alt="About IEEE Bangladesh Section"
          className="w-50 md:w-1/2"
        />
        <div>
          <SectionHeading title="About IEEE" />
          <p className="text-justify md:pl-5 max-md:mx-5">{data.aboutDetails}</p>
          <div className="mt-4 flex gap-4 md:pl-5 max-md:mx-5">
            <a
              href={data.ieeebdlink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#002855] text-white rounded"
            >
              IEEE BD.net
            </a>
          </div>
        </div>
      </div>

      <div className="m-auto max-w-[1080px] justify-center  mb-6 flex flex-wrap lg:flex-nowrap gap-12">
          <FadeIn xIndex={-100} yIndex={0}>
            <div>
              <SectionHeading title="Members and volunteers" />
              <p className="text-justify mb-6 pl-5 max-md:mx-5 max-md:pl-0">{data.memVolDetails}</p>
              {data.memVolLinks.map((link, i) => (
                <>
                  <a
                    key={i}
                    href={link.link}
                    className=" inline-flex items-center gap-2 text-[#002855] hover:text-[#FFC72C] mb-2 pl-5 max-md:mx-5 max-md:pl-0"
                  >
                    <ExternalLink size={16} />
                    {link.title}
                  </a>
                  <br />
                </>
              ))}
            </div>
          </FadeIn>
          <div className="flex justify-center min-w-[355px] max-w-[500px] pr-5 max-md:pr-0 max-md:min-w-auto max-md:w-50">
            <img
              src={data.memVolImage}
              alt="Largest Community"
              className="object-contain"
            />
          </div>
        </div>

      {/* Benefits */}
      <section className="w-full bg-[#002855] flex justify-center">
        <div className="max-w-[1080px] grid md:grid-cols-[1fr_1px_1fr] gap-10 p-6">
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">Benefits</h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.benefitsDetails}</p>
              {data.benefitsLinks.map((l, i) => (
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

          {/* Student Branch Links */}
          <div className="hidden md:block border-l border-white"></div>
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Student Branch Links
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.stuBranchDetails}</p>
              {data.stuBranchLinks.map((l, i) => (
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

      {/* Affinity Groups */}
      <section className="w-full bg-[#002855] flex justify-center mt-0 md:mt-[1px]">
        <div className="max-w-[1080px] grid md:grid-cols-[1fr_1px_1fr] gap-10 p-6">
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Affinity Groups
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.affinityDetails}</p>
              {data.affinityLinks.map((l, i) => (
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

          {/* Community and society
           */}
          <div className="hidden md:block border-l border-white"></div>
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Community and society
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.communitySocietyDetails}</p>
              {data.communitySocietyLinks.map((l, i) => (
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
        <FadeIn xIndex={-100} yIndex={0}>
          <SectionHeading title="Achievements" />
          <p className="text-justify mb-6 md:p-5 max-md:mx-5">{data.achievementsDetails}</p>
          <div className="flex flex-wrap gap-7 justify-baseline max-md:justify-center p-5">
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

      {/* Gallery */}
        <SectionHeading title="Gallery" />
      <section className="max-w-[1080px] p-5 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data.gallery.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-54 cursor-pointer object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <div className="bg-white flex flex-col justify-baseline max-w-[1080px] m-auto mb-15">
        <SectionHeading title="Contact Bangladesh Section" />
        <FadeIn>
          <div className="grid gap-3 pl-5">
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Chair:</p>
              <p>{data.chair}</p>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Email:</p>
              <a
                href={data.chairEmail}
                className="link text-[#002855] hover:text-[#FFC72C]"
              >
                {data.chairEmail}
              </a>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Secretary:</p>
              <p>{data.secretary}</p>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Email:</p>
              <a
                href={data.secretaryEmail}
                className="link text-[#002855] hover:text-[#FFC72C]"
              >
                {data.chairEmail}
              </a>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Ms. Salma [Office Secretary]:</p>
              <p>{data.officeSecretary}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
