import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Global Components
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

import HomePage from './pages/home/page'
import SocietyOrAg from './pages/society-and-ag/pages[id]/pages'

import About from '@/pages/about/pages[id]/pages';

import JoinINSB from '@/pages/get-involved/join-insb'
import AllMembers from '@/pages/members/all-members-statistcs'
import Achievements from './pages/activities/achievements';

import "odometer/themes/odometer-theme-default.css";
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
        {/* Get Involved  */}
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
