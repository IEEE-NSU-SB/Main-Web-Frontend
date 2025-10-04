import VisionSection from "@/pages/home/our-vision";
import StatsSection from "./stats";
import HeroCarousel from "./hero-carousel";
import PerksCardGrid from "./perks-card-grid";
import LogoSection from "./logo-section";
import EventCarousel from "./events-carousel";
import TopPerformers from "./performers-tab";
import Blog from "@/components/common_card/blog-card";
import Tag from "../publications/blogs/tag";
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
      <StatsSection />
      <EventCarousel title="Featured Events" width="62" />
      <TopPerformers />
      <Blog />
      <Tag />
    </>
  );
};

export default HomePage;
