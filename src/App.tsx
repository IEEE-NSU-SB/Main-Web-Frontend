import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LearningCardGrid from './components/Main Website/Home/LearningCardGrid'
import Logo from './components/Main Website/Home/LogoSection'
import VisionSection from './components/OurVision'
import StatsSection from './components/Main Website/Home/Stats'
import Footer from './components/Footer'
import Event from './components/Main Website/Home/FeaturedEventsCarousel'
import Blog from './components/BlogCard'
import TopPerformers from './components/Main Website/Home/TopPerformers'
import Navbar from './components/Navbar'
import HeroCarousel from './components/Main Website/Home/HeroCarousel'
import AboutIEEE from './components/Main Website/IEEE/Ieee';
import IEEENSUSBRAS from './components/Main Website/Societies & AG/IeeeNsuSbRas'
import JoinINSB from './components/Main Website/Get Involved/JoinInsb'
import AllMembers from './components/Main Website/Members/AllMembers&Statistcs'
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
        <Route path="/IEEE" element={<AboutIEEE />} />
        <Route path="/ieee-nsu-ras-sbc" element={<IEEENSUSBRAS />} />
        <Route path="/all-members" element={<AllMembers/>} />
        <Route path="/join-ieee-nsu-sb" element={<JoinINSB recruitSession={{
    session_end_date_time: '2025-08-20T23:59:59Z',
    recruitment_event_link: 'https://facebook.com/ieeensu/events/xyz',
  }} />}/>      
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
