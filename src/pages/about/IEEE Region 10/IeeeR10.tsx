import React from "react";
import { useFetchDataJSON } from "@/hooks/fetchdata";
import FadeIn from "@/components/ui/FadeIn";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SectionHeading from "@/components/ui/SectionHeading";

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

  HomePageLink: string;
  WebsiteLink: string;
  MembershipInquiryLink: string;
  ForVolunteersLink: string;
  Contact: string;
}

const IEEERegion10: React.FC = () => {
  const { loading, data, error } = useFetchDataJSON<IEEERegion10Data>({
    path: "pages/about/IEEE Region 10/data.json",
  });

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <FadeIn>
      <div className="w-full flex flex-col items-center">
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
            <div>
              <SectionHeading title="IEEE Region 10" widthClass="w-52" />
              <p className="text-justify mb-6 pl-5">
                {data.region10Description}
              </p>
              <a
                href={data.historyLink}
                className="bg-[#002855] text-white font-bold py-2 px-4 rounded hover:bg-[#FFC72C] transition mx-5"
              >
                Region 10 History
              </a>
            </div>
          </div>
        </section>

        {/* Young Professionals */}
        <section className="w-full bg-[#75787b17] flex justify-center">
          <div className="max-w-[1080px] mb-6 flex flex-wrap lg:flex-nowrap gap-12">
            <div>
              <SectionHeading title="Young Professionals" widthClass="w-62" />
              <p className="text-justify mb-6 pl-5">
                {data.youngProfDescription}
              </p>
              {data.youngProfLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.link}
                  className="block text-[#002855] font-bold hover:text-[#FFC72C] mb-2"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square mr-2 mx-5"></i>
                  {link.title}
                </a>
              ))}
            </div>
            <div className="flex justify-center min-w-[355px] max-w-[500px] pr-5">
              <img
                src={data.youngProfImage}
                alt="Young Professionals"
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Student Activities */}
        <section className="w-full bg-[#002855] flex justify-center">
          <div className="max-w-[1080px] grid md:grid-cols-[1fr_1px_1fr] gap-10 p-6">
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Women in Engineering
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.WIEDescription}</p>
              {data.WIELinks.map((l, i) => (
                <a
                  key={i}
                  href={l.link}
                  className="block text-[#FFD100] font-bold hover:text-white mb-2"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
                  {l.title}
                </a>
              ))}
            </div>

            <div className="hidden md:block border-l border-white"></div>

            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Students and Member Activities
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.StudentMemDescription}</p>
              {data.StudentMemLinks.map((l, i) => (
                <a
                  key={i}
                  href={l.link}
                  className="block text-[#FFD100] font-bold hover:text-white mb-2"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
                  {l.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Relations */}
        <section className="w-full bg-[#002855] flex justify-center mt-0 md:mt-[1px]">
          <div className="max-w-[1080px] grid md:grid-cols-[1fr_1px_1fr] gap-10 p-6">
            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Educational Activities and Involvements
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.EduActivitiesDescription}</p>
              {data.EduActivitiesLinks.map((l, i) => (
                <a
                  key={i}
                  href={l.link}
                  className="block text-[#FFD100] font-bold hover:text-white mb-2"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
                  {l.title}
                </a>
              ))}
            </div>

            <div className="hidden md:block border-l border-white"></div>

            <div>
              <h2 className="text-white font-bold text-xl mb-1">
                Industry Relations
              </h2>
              <div className="w-[90px] h-[3px] bg-white rounded mb-4"></div>
              <p className="text-white mb-4">{data.IndustryDescription}</p>
              {data.IndustryLinks.map((l, i) => (
                <a
                  key={i}
                  href={l.link}
                  className="block text-[#FFD100] font-bold hover:text-white mb-2"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
                  {l.title}
                </a>
              ))}
            </div>
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
            <div>
              <SectionHeading
                title="Membership Development"
                widthClass="w-62"
              />
              <p className="text-justify mb-6 pl-5">
                {data.MembershipDescription}
              </p>
              {data.MembershipLinks.map((l, i) => (
                <a
                  key={i}
                  href={l.link}
                  className="block text-[#002855] font-bold hover:text-[#FFC72C] mb-2 pl-5"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
                  {l.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Events and Conferences */}
        <section className="w-full bg-[#75787b17] flex justify-center">
          <div className="max-w-[1080px] m-6">
            <SectionHeading title="Events and Conferences" widthClass="w-62" />              
            <p className="pl-5 text-justify mb-4">{data.EventConferenceDetails}</p>
            {data.EventConferenceLinks.map((l, i) => (
              <a
                key={i}
                href={l.link}
                className="pl-5 block text-[#002855] font-bold hover:text-[#FFC72C] mb-2"
              >
                <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
                {l.title}
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white flex flex-col justify-baseline items-start max-w-[1080px] m-6">
            <SectionHeading title="Contact IEEE R10" widthClass="w-62"/>
            <p className="text-left font-medium mb-6">
              For getting in touch with us please go through this site and join
              IEEE R10 community as soon as possible.
            </p>
            <div className="grid gap-3">
              <div className="grid grid-cols-[1fr_2fr]">
                <p>Home page:</p>
                <a
                  href={data.HomePageLink}
                  className="link text-[#002855] font-bold hover:text-[#FFC72C]"
                >
                  {data.HomePageLink}
                </a>
              </div>
              <div className="grid grid-cols-[1fr_2fr]">
                <p>Website:</p>
                <a
                  href={data.WebsiteLink}
                  className="link text-[#002855] font-bold hover:text-[#FFC72C]"
                >
                  IEEE Asia Pacific Region 10
                </a>
              </div>
              <div className="grid grid-cols-[1fr_2fr]">
                <p>Membership enquiry:</p>
                <a
                  href={data.MembershipInquiryLink}
                  className="link text-[#002855] font-bold hover:text-[#FFC72C]"
                >
                  IEEE Support Center
                </a>
              </div>
              <div className="grid grid-cols-[1fr_2fr]">
                <p>Volunteers:</p>
                <a
                  href={data.ForVolunteersLink}
                  className="link text-[#002855] font-bold hover:text-[#FFC72C]"
                >
                  Ewell Tan
                </a>
              </div>
              <div className="grid grid-cols-[1fr_2fr]">
                <p>Contact number:</p>
                <p>{data.Contact}</p>
              </div>
          </div>
        </section>
      </div>
    </FadeIn>
  );
};

export default IEEERegion10;
