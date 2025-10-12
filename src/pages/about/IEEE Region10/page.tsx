import Wave from "@/components/wave";
import Membership from "./membership-section";
import Events from "./events"
import InfoCardSection from "@/components/common_card/InfoCard";
import Description from "./description";
import ContactIEEER10 from "./Contact-IEEER10"
import YoungProfessionals from "./youngProfessionals";

import ParallaxSection from "./ParallaxImage";
import AgParallax from "@/pages/society-and-ag/pages[id]/ScAgParallax";
import R10 from "@/assets/R10.jpeg"

//THe main navigation apge 
const IEEER10 = () => {
    const section1 = [
      {
        title: "Women in Engineering",
        description:
          "Institute of Electrical and Electronics Engineers(IEEE) Region10 Women in Engineering (WIE) is one of the largest international technical organizations dedicated for supporting women engineers and scientists and encouraging girls around the world to pursue a career in engineering. With 20,000 members from various countries, we are here to shine with the power of women",
        linkText: "IEEE R10 WIE",
        linkUrl: "https://wie.ieeer10.org/",
      },
      {
        title: "Students and Member Activities",
        description:
          "The Institute of Electrical and Electronics Engineers (IEEE) Region 10 Student Activities Committee is responsible for the needs of students from different student divisions in Asia-Pacific. They are very involved with all of their projects and respond quickly to IEEE-related questions. This group is very welcoming to newcomers and volunteers, and they are quick to inform them of their opportunities.",
        linkText: "IEEE R10 SAC",
        linkUrl: "https://ea.ieeer10.org/",
      },
    ];

    const section2 = [
    {
      title: "Educational Activities and Involvements",
      description:
        "Institute of Electrical and Electronics Engineers(IEEE) Region 10 is very interested in educational websites. The bulk of the events here are related to education and edification. Every aspect of educational advancement is addressed here in order to make student participants as effective as professionals",
      linkText: "Region 10 Educational Involvements",
      linkUrl: "https://sac.ieeer10.org/",
    },
    {
      title: "Industry Relations",
      description:
        "Institute of Electrical and Electronics Engineers(IEEE) Region 10  Industry Relations Committee (IRC)  is very important and effective community for R10. Now a days Students and Early Researcher Conference fund (SERCF) is willing to offer financial assistance to IEEE Student members and other members  to enrich their exposure and experience. This community is working hard to incorporate the industry members",
      linkText: "R10 Industry Relations",
      linkUrl: "https://www.ieeer10.org/r10-industry-relations/",
    },
  ];

  return (
    <>
        <Wave title="About- IEEE region10" />
        <Description />
        <YoungProfessionals/>
        <InfoCardSection className="bg-[var(--color-ieee-darkblue)] border-b text-white "  data={section1} />
        <InfoCardSection className="bg-[var(--color-ieee-darkblue)]  text-white"  data={section2} />
        <Membership />
        {/* parallax */}
        <Events />
        <ContactIEEER10/>
    
       
    </>
  )
};


export default IEEER10;
