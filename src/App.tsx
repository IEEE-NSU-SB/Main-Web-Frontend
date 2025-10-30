import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import ScrollToTopButton from "./components/ui/scroll-to-top-btn";

import HomePage from "./pages/home/page";
import SocietyOrAg from "./pages/society-and-ag/pages[id]/ScAgPages";
// import About from "@/pages/about/pages[id]/pages";

import JoinINSB from "@/pages/get-involved/join-insb/page";
import AllMembers from "@/pages/members/all-members-statistcs/page";
import Achievements from "./pages/activities/achievements/page";
import ResearchPapers from "./pages/publications/research Paper/page";
import Blogs from "./pages/publications/blogs/page";
import Toolkit from "./pages/publications/toolkit/pages";
import Panel from "./pages/members/panel/page";
import WriteBlog from "./pages/get-involved/write-a-blog/page";
import WelcomePage from "./pages/welcome/page";
import ScrollToTop from "./components/ui/scroll-to-top";
import Contact from "./pages/contact/page";
import Events from "./pages/activities/events/page";
import IEEER10 from "./pages/about/IEEE Region 10/page";
import ExecutiveBodySection from "@/pages/society-and-ag/pages[id]/ScAgExecutive";
import EventDescription from "./pages/activities/events/EventDescription";
import Pages from "./pages/activities/News/Pages";
import FAQ from "./pages/about/faq";
import MagazinesPage from "@/pages/publications/magazines/pages";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollToTopButton />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/welcome-page" element={<WelcomePage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* Activities */}
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<Events />} />
          <Route path="/event_details" element={<EventDescription/>} />
          <Route path="/achievements" element={<Achievements />} />

          {/* news  */}
          <Route path="news" element={<Pages></Pages>}></Route>
          {/* Societies & AG */}
          <Route path="/society-ag/:id" element={<SocietyOrAg />} />

          {/* Members */}
          <Route path="/all-members" element={<AllMembers />} />
          <Route path="/panels" element={<Panel />} />

          {/* About */}
          {/* <Route path="/about/:id" element={<About />} /> */}
          <Route path="/about/ieee-region-10" element={< IEEER10/>} />
          <Route path="/about/FAQ" element={<FAQ />} />
          <Route path="magazines" element={<MagazinesPage />} />
          

          {/* Publications */}
          <Route path="/research-papers" element={<ResearchPapers />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/toolkit" element={<Toolkit />} />

          {/* Contact  */}
          <Route path="/contact" element={<Contact/>} />
          <Route path="/executive-body" element={<ExecutiveBodySection />} />

          {/* Get Involved */}
          <Route
            path="/join-ieee-nsu-sb"
            element={
              <JoinINSB
                recruitSession={{
                  session_end_date_time: "2025-08-20T23:59:59Z",
                  recruitment_event_link:
                    "https://facebook.com/ieeensu/events/xyz",
                }}
              />
            }
          />
          <Route path="/write-a-blog" element={<WriteBlog />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;