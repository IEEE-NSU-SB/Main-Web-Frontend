import LearningCardGrid from './components/LearningCardGrid'
import Logo from './components/LogoSection'
import Footer from './components/Footer'
import Event from './components/FeaturedEventsCarousel'
import Blog from './components/BlogCard'
import TopPerformers from './components/TopPerformers'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar/>
      <LearningCardGrid/>
      <Logo/>
      <Event/>
      <TopPerformers/>
      <Blog/>
      <Footer/>
    </>
  )
}

export default App
