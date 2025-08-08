import VisionSection from "@/components/our-vision"
import HeroCarousel from "./hero-carousel"
import LearningCardGrid from "./learning-card-grid"
import LogoSection from "./logo-section"
import StatsSection from "./stats"
import EventCarousel from "./featured-events-carousel"
import TopPerformers from "./top-performers"
import Blog from "@/components/blog-card"

const HomePage = () => {
  return (
    <>
        <HeroCarousel/>
        <LearningCardGrid/>
        <LogoSection/>
        <VisionSection/>
        <StatsSection/>
        <EventCarousel/>
        <TopPerformers/>
        <Blog/>
    </>
  )
}

export default HomePage
