import VisionSection from "@/pages/home/OurVision";
import HeroCarousel from "./HeroCarousel";
import PerksCardGrid from "./PerksCardGrid";
import EventCarousel from "./FeaturedEventsCarousel";
import PerformersTab from "./PerformersTab";
import Blog from "@/components/BlogCard";
import AchievementCard from "../../components/AchievementCard";
import LogoSection from "./LogoSection";
import Stats from "./Stats";
import MegaEvents from "@/components/MegaEventCard";
import { useFetchDataAPI } from "@/hooks/fetchdata";

interface EventData {
  megaEvents: any[];
  featuredEvents: any[];
}

const HomePage = () => {
  // const { loading, data } = useFetchDataJSON({ path: "pages/home/data/vision-stats.json" });
  const { loading, data, error, refetch } = useFetchDataAPI<EventData>({ apiUrl: "main_website/get_mega_featured_events/1" });

  return (
    <>
      <HeroCarousel />
      <PerksCardGrid />
      <LogoSection />
      <VisionSection />
      <Stats />
      <EventCarousel events={data?.featuredEvents || []} loading={loading} error={error || ''} refetch={refetch}/>
      <PerformersTab />
      <MegaEvents events={data?.megaEvents || []}/>
      <AchievementCard />
      <Blog />
    </>
  );
};
// for commit 
export default HomePage;
