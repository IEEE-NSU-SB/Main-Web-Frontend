import VisionSection from "@/pages/home/our-vision";
import StatsSection from "./stats";
import HeroCarousel from "./hero-carousel";
import LearningCardGrid from "./learning-card-grid";
import LogoSection from "./logo-section";
import EventCarousel from "./events-carousel";
import TopPerformers from "./top-performers";
import Blog from "@/components/common_card/blog-card";
import { useFetchDataJSON } from "@/hooks/fetchdata";

const HomePage = () => {
  const { loading, data } = useFetchDataJSON({ path: "pages/home/data/vision-stats.json" });
  // const { loading, data } = useFetchDataAPI({ path: "" });

  return (
    <>
      <HeroCarousel />
      <LearningCardGrid />
      <LogoSection />
      <VisionSection data={data} loading={loading} />
      <StatsSection data={data} loading={loading} />
      <EventCarousel title="Featured Events" width="62" />
      <TopPerformers />
      <Blog />
    </>
  );
};

export default HomePage;
