import VisionSection from "@/pages/home/OurVision";
import HeroCarousel from "./HeroCarousel";
import PerksCardGrid from "./PerksCardGrid";
import EventCarousel from "./FeaturedEventsCarousel";
import PerformersTab from "./PerformersTab";
import Blog from "@/components/common_card/BlogCard";
// import Tag from "../publications/blogs/tag";
import AchievementCard from "../../components/common_card/AchievementCard";
import LogoSection from "./LogoSection";
import Stats from "./Stats";
import MegaEvents from "@/components/common_card/MegaEventCard";
// import { useFetchDataJSON } from "@/hooks/fetchdata";

const HomePage = () => {
  // const { loading, data } = useFetchDataJSON({ path: "pages/home/data/vision-stats.json" });
  // const { loading, data } = useFetchDataAPI({ path: "" });

  return (
    <>
      <HeroCarousel />
      <PerksCardGrid />
      <LogoSection />
      <VisionSection />
      <Stats />
      <EventCarousel/>
      <PerformersTab />
      <MegaEvents/>
      <AchievementCard />
      <Blog />
      {/* <Tag /> */}
    </>
  );
};

export default HomePage;
