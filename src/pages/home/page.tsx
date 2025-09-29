import VisionSection from "@/components/our-vision"
import HeroCarousel from "./hero-carousel"
import LearningCardGrid from "./learning-card-grid"
import LogoSection from "./logo-section"
import StatsSection from "./stats"
import EventCarousel from "./events-carousel"
import TopPerformers from "./top-performers"
import Blog from "@/components/common_card/blog-card"

const HomePage = () => {
  return (
    <>
        <HeroCarousel/>
        <LearningCardGrid/>
        <LogoSection/>
        <VisionSection/>
        <StatsSection/>
        <EventCarousel title="Featured Events" width="62"/>
        <TopPerformers/>
        <Blog/>
    </>
  )
}

export default HomePage
