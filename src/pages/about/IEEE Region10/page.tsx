import Wave from "@/components/wave";
import React from "react";
import Membership from "./membership-section";

import InfoCardSection from "@/components/common_card/InfoCard";
import AgParallax from "@/pages/society-and-ag/pages[id]/ScAgParallax";
import R10 from "@/assets/R10.jpeg"
import Description from "./description";
const imagePromise = Promise.resolve({
        rasImg: R10,
        pesImg: R10,
        iasImg: R10,    
        wieImg: R10,
    });

//THe main navigation apge 
const IEEER10 = () => {

  return (
    <>
        <Wave title="About- IEEE region10" />
        <Description />
    
        <div className="bg-gray-50 border-b border-blue-200 py-12 px-6">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto gap-8 text-center md:text-left">
            {/* Left Content */}
            <div className="flex flex-col justify-center items-center md:items-start max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#002855] relative">
                Young Professionals
                <span className="absolute left-0 -bottom-1 w-16 h-1 bg-[#FFC72C] rounded"></span>
            </h2>

            <p className="mt-4 text-gray-700 leading-relaxed">
                Institute of Electrical and Electronics Engineers (<b>IEEE</b>)
                Region 10 <b>Young Professionals (YP)</b> is a community of imaginative
                and creative members and volunteers across Asia Pacific. The Institute of
                Electrical and Electronics Engineers (<b>IEEE</b>) was established to assist
                young professionals in achieving their career goals, cultivating a dazzling
                professional image, and establishing a high profile in a variety of fields.
            </p>

            <a href="#" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#002855] hover:underline">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
                </svg>
                IEEE R10 YP
            </a>
                </div>
                    <img src="../../../assets/ieee_yp.jpg" alt="IEEE Region 10 Young Professionals" className="w-72 md:w-80 rounded-md object-cover contain"/>
                </div>
        </div>

        <InfoCardSection className="bg-[#04284B] border-b text-white"  data={section1} />
        <InfoCardSection className="bg-[#04284B]  text-white"  data={section2} />
        <Membership />
       
        <div className="">
            <AgParallax parallaxImagePromise={imagePromise} />
        </div>
       
    </>
  )
};

const section1 = [
    {
      title: "Women in Engineering",
      description:
        "IEEE Region 10 Women in Engineering (WIE) is one of the largest international technical organizations dedicated to supporting women engineers and encouraging girls around the world to pursue a career in engineering.",
      linkText: "IEEE R10 WIE",
      linkUrl: "#",
    },
    {
      title: "Students and Member Activities",
      description:
        "IEEE Region 10 Student Activities Committee supports student needs across Asia-Pacific, helping newcomers and volunteers engage in IEEE-related projects quickly.",
      linkText: "IEEE R10 SAC",
      linkUrl: "#",
    },
  ];

  const section2 = [
    {
      title: "Educational Activities and Involvements",
      description:
        "IEEE Region 10 focuses on educational and edification events, aiming to make students as effective as professionals.",
      linkText: "Region 10 Educational Involvements",
      linkUrl: "#",
    },
    {
      title: "Industry Relations",
      description:
        "The IEEE R10 Industry Relations Committee strengthens collaboration between students, early researchers, and industry professionals.",
      linkText: "R10 Industry Relations",
      linkUrl: "#",
    },
  ];

export default IEEER10;
