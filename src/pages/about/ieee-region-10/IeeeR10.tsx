import React from "react";
import { useFetchDataAPI } from "@/hooks/fetchdata";
import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SectionHeading from "@/components/ui/SectionHeading";
import { ExternalLink } from "lucide-react";

interface LinkItem {
  title: string;
  link: string;
}

interface IEEERegion10Data {
  region10Description: string;
  region10image: string;
  historyLink: string;

  youngProfDescription: string;
  youngProfImage: string;
  youngProfLinks: LinkItem[];

  StudentMemDescription: string;
  StudentMemLinks: LinkItem[];

  EduActivitiesDescription: string;
  EduActivitiesLinks: LinkItem[];

  IndustryDescription: string;
  IndustryLinks: LinkItem[];

  WIEDescription: string;
  WIELinks: LinkItem[];

  MembershipDescription: string;
  MembershipLinks: LinkItem[];
  MembershipImage: string;

  EventConferenceDetails: string;
  EventConferenceImage: string;
  EventConferenceLinks: LinkItem[];

  Parallax: string;
  HomePageLink: string;
  WebsiteLink: string;
  MembershipInquiryLink: string;
  ForVolunteersLink: string;
  Contact: string;
}

const IEEERegion10: React.FC = () => {
  const { loading, data, error } = useFetchDataAPI<IEEERegion10Data>({
    apiUrl: "main_website/get_ieee_r10_details/",
  });

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <div>
      {/* IEEE Region 10 */}
      <section className="bg-white flex justify-center">
        <div className="max-w-[1040px] m-6 flex flex-wrap lg:flex-nowrap gap-5">
          <div className="flex justify-center min-w-[255px] max-w-[500px]">
            <img
              src={data.region10image}
              alt="IEEE Region 10"
              className="object-contain"
            />
          </div>
          <FadeIn xIndex={100} yIndex={0} delay={0.1}>
            <div>
              <SectionHeading title="IEEE Region 10"/>
              <p className="text-justify mb-6 pl-5" dangerouslySetInnerHTML={{ __html: data.region10Description }}/>
              <a
                href={data.historyLink}
                className="bg-[#002855] text-white font-bold py-2 px-4 rounded hover:bg-[#FFC72C] transition mx-5"
              >
                Region 10 History
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Young Professionals */}
      <section className="w-full bg-[#75787b17] flex justify-center">
        <div className="max-w-[1080px] mb-6 flex flex-wrap lg:flex-nowrap gap-12">
          <FadeIn xIndex={-100} yIndex={0}>
            <div>
              <SectionHeading title="Young Professionals"/>
              <p className="text-justify mb-6 pl-5" dangerouslySetInnerHTML={{ __html: data.youngProfDescription }}/>
              {data.youngProfLinks.map((link, i) => (
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
              src={data.youngProfImage}
              alt="Young Professionals"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Women in Engineering */}
      <section className="w-full bg-[#002855] flex justify-center">
        <div className="max-w-[1080px] grid md:grid-cols-[1fr_1px_1fr] gap-10 p-6">
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Women in Engineering
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4" dangerouslySetInnerHTML={{ __html: data.WIEDescription }}/>
              {data.WIELinks.map((l, i) => (
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

          {/* Student Activities */}
          <div className="hidden md:block border-l border-white"></div>
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Students and Member Activities
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4" dangerouslySetInnerHTML={{ __html: data.StudentMemDescription }}/>
              {data.StudentMemLinks.map((l, i) => (
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

      {/* Educational Activities */}
      <section className="w-full bg-[#002855] flex justify-center mt-0 md:mt-[1px]">
        <div className="max-w-[1080px] grid md:grid-cols-[1fr_1px_1fr] gap-10 p-6">
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Educational Activities and Involvements
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4" dangerouslySetInnerHTML={{ __html: data.EduActivitiesDescription }}/>
              {data.EduActivitiesLinks.map((l, i) => (
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

          {/* Industry Relations */}
          <div className="hidden md:block border-l border-white"></div>
          <FadeIn>
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Industry Relations
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4" dangerouslySetInnerHTML={{ __html: data.IndustryDescription }}/>
              {data.IndustryLinks.map((l, i) => (
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

      {/* Membership Development */}

      <section className="bg-white flex justify-center">
        <div className="max-w-[1080px] m-6 flex flex-wrap lg:flex-nowrap gap-6">
          <div className="flex justify-center min-w-[255px] max-w-[500px]">
            <img
              src={data.MembershipImage}
              alt="Membership Development"
              className="object-contain"
            />
          </div>
          <FadeIn xIndex={100} yIndex={0}>
            <div>
              <SectionHeading
                title="Membership Development"
              />
              <p className="text-justify mb-6 pl-5" dangerouslySetInnerHTML={{ __html: data.MembershipDescription }}/>
              {data.MembershipLinks.map((l, i) => (
                <>
                  <a
                    key={i}
                    href={l.link}
                    className="inline-flex items-center gap-2 text-[#002855] hover:text-[#FFC72C] mb-2 pl-5"
                  >
                    <ExternalLink size={18} />
                    {l.title}
                  </a>
                  <br />
                </>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <FadeIn>
        <div className="min-h-[350px] relative [clip-path:inset(0)]">
          <img
            className="object-cover fixed brightness-75 left-0 top-0 w-full h-full"
            src={data.Parallax}
            alt="Chapter Parallax"
          />
        </div>
      </FadeIn>

      {/* Events and Conferences */}
      <section className="w-full bg-[#75787b17] flex justify-center">
        <FadeIn xIndex={-100} yIndex={0}>
          <div className="max-w-[1080px] m-6">
            <SectionHeading title="Events and Conferences"/>
            <p className="pl-5 text-justify mb-4" dangerouslySetInnerHTML={{ __html: data.EventConferenceDetails }}/>
            {data.EventConferenceLinks.map((l, i) => (
              <>
                <a
                  key={i}
                  href={l.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 pl-5 text-[#002855] hover:text-[#FFC72C] mb-2"
                >
                  <ExternalLink size={18} />
                  {l.title}
                </a>
                <br />
              </>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Contact Section */}
      <div className="bg-white flex flex-col justify-baseline max-w-[1080px] m-auto mb-15">
        <SectionHeading title="Contact IEEE R10"/>
        <FadeIn>
          <p className="text-left font-medium mb-6 pl-5">
            For getting in touch with us please go through this site and join
            IEEE R10 community as soon as possible.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="grid gap-3 pl-5">
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Home page:</p>
              <a
                href={data.HomePageLink}
                className="link text-[#002855] hover:text-[#FFC72C]"
              >
                {data.HomePageLink}
              </a>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Website:</p>
              <a
                href={data.WebsiteLink}
                className="link text-[#002855] hover:text-[#FFC72C]"
              >
                IEEE Asia Pacific Region 10
              </a>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Membership enquiry :</p>
              <a
                href={data.MembershipInquiryLink}
                className="link text-[#002855] hover:text-[#FFC72C]"
              >
                IEEE Support Center
              </a>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Volunteers:</p>
              <a
                href={data.ForVolunteersLink}
                className="link text-[#002855] hover:text-[#FFC72C]"
              >
                Ewell Tan
              </a>
            </div>
            <div className="grid grid-cols-[1fr_2fr]">
              <p>Contact number:</p>
              <p>{data.Contact}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default IEEERegion10;
