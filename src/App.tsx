import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Global Components
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ScrollToTopButton from './components/ui/scroll-to-top';

import HomePage from './pages/home/page'
import SocietyOrAg from './pages/society-and-ag/pages[id]/pages'

import About from '@/pages/about/pages[id]/pages';

import JoinINSB from '@/pages/get-involved/join-insb/page'
import AllMembers from '@/pages/members/all-members-statistcs/page'
import Achievements from './pages/activities/achievements/page';

import "odometer/themes/odometer-theme-default.css";
import ResearchPapers from './pages/publications/research Paper/page';
import Blogs from './pages/publications/blogs/page';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />
        {/* Activities */}
        <Route path="/achievements" element={<Achievements />} />
        {/* Societies & AG */}
        <Route path="/society-ag/:id" element={<SocietyOrAg />} />
        {/* Members  */}
        <Route path="/all-members" element={<AllMembers/>} />
        {/* About  */}
        <Route path="/about/:id" element={<About />} />
        {/* Publications  */}
        <Route path="/research-papers" element={<ResearchPapers />} />
        <Route path="/blogs" element={<Blogs />} />
        {/* Get Involved  */}
        <Route path="/join-ieee-nsu-sb" element={<JoinINSB recruitSession={{
    session_end_date_time: '2025-08-20T23:59:59Z',
    recruitment_event_link: 'https://facebook.com/ieeensu/events/xyz',
  }} />}/>      
      </Routes>
      <ScrollToTopButton />
      <Footer />
    </Router>
  );
};

export default App;
