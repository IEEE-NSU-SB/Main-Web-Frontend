import VisionSection from "@/pages/home/OurVision";
import HeroCarousel from "./HeroCarousel";
import PerksCardGrid from "./PerksCardGrid";
import EventCarousel from "./FeaturedEventsCarousel";
import PerformersTab from "./PerformersTab";
import Blog from "@/components/BlogCard";
import AchievementCard from "../../components/AchievementCard";
import LogoSection from "./LogoSection";
import Stats from "./staats";
import MegaEvents from "@/components/MegaEventCard";
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
      <MegaEvents events={[]}/>
      <AchievementCard />
      <Blog />
    </>
  );
};

export default HomePage;
