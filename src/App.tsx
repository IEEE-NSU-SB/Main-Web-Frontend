import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LearningCardGrid from './components/Main Website/Home/LearningCardGrid'
import Logo from './components/Main Website/Home/LogoSection'
import VisionSection from './components/OurVision'
import StatsSection from './components/Main Website/Home/stats'
import Footer from './components/Footer'
import Event from './components/Main Website/Home/FeaturedEventsCarousel'
import Blog from './components/BlogCard'
import TopPerformers from './components/Main Website/Home/TopPerformers'
import Navbar from './components/Navbar'
import HeroCarousel from './components/Main Website/Home/HeroCarousel'
import AboutIEEE from './components/Main Website/IEEE/IEEE';

const HomePage = () => (
  <>
    <HeroCarousel/>
    <LearningCardGrid/>
    <Logo/>
    <VisionSection/>
    <StatsSection/>
    <Event/>
    <TopPerformers/>
    <Blog/>
  </>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/IEEE" element={<AboutIEEE />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
