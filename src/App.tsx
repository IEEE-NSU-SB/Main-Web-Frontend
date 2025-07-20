import LearningCardGrid from './components/LearningCardGrid'
import Logo from './components/LogoSection'
import VisionSection from './components/vision'
import StatsSection from './components/stats'
import Footer from './components/Footer'
import Event from './components/FeaturedEventsCarousel'
import Blog from './components/BlogCard'
import TopPerformers from './components/TopPerformers'
import Navbar from './components/Navbar'
import HeroCarousel from './components/HeroCarousel'

const App = () => {
  return (
    <>
      <Navbar/>
      <HeroCarousel/>
      <LearningCardGrid/>
      <Logo/>
      <VisionSection/>
      <StatsSection/>
      <Event/>
      <TopPerformers/>
      <Blog/>
      <Footer/>

    </>
  )
}

export default App
