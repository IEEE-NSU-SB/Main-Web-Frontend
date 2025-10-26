import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ui/ScrollToTopBtn";

import HomePage from "./pages/home/paage";
import SocietyOrAg from "./pages/society-and-ag/Pages";
// import About from "@/pages/about/pages[id]/pages";

import JoinINSB from "@/pages/get-involved/join-insb/paage";
import AllMembers from "@/pages/members/all-members-statistics/Page";
import Achievements from "./pages/activities/achievements/paage";
import ResearchPapers from "./pages/publications/research-paper/Page";
import Blogs from "./pages/publications/blogs/paage";
import Toolkit from "./pages/publications/toolkit/paages";
import WelcomePage from "./pages/welcome/paage";
import ScrollToTop from "./components/ui/ScrollToTop";
import Contact from "./pages/Contact/paage";
import Events from "./pages/activities/events/paage";
import IEEER10 from "./pages/about/ieee-region-10/Page";
import News from "./pages/activities/news/Pages";
import Gallery from "./pages/publications/gallery/Pages";
import AddResearchPaper from "./pages/get-involved/add-research-paper/Page";
import EventDetailsPages from "./pages/activities/events/EventsDetails/Pages";
import TrailingSlashRedirect from "./hooks/TrailingSlashRedirect";
import TeamPage from "./pages/members/team/paage";
import WriteBlog from "./pages/get-involved/write-a-blog/paage";
import Profile from "./pages/members/profile/paage";
import NewsPage from "./pages/activities/news/NewsDetails";
import Panel from "./pages/members/panel/paage";
import Officer from "./pages/members/officers/Page";
import Volunteers from "./pages/members/volunteers/Page";
import AboutIEEE from "./pages/about/ieee/paage";

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
      <TrailingSlashRedirect />
      <ScrollToTop />
      <Routes>
        <Route path="/welcome-page" element={<WelcomePage />} />

        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Activities */}
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/1" element={<NewsPage/>} />
          <Route path="/event_details" element={<EventDetailsPages />} />
          <Route path="/achievements" element={<Achievements />} />

          {/* Societies & AG */}
          <Route path="/ieee-nsu-ras-sbc" element={<SocietyOrAg />} />
          <Route path="/ieee-nsu-pes-sbc" element={<SocietyOrAg />} />
          <Route path="/ieee-nsu-ias-sbc" element={<SocietyOrAg />} />
          <Route path="/ieee-nsu-wie-ag" element={<SocietyOrAg />} />

          {/* Members */}
          <Route path="/panels" element={<Panel />} />
          <Route path="/officers" element={<Officer />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/all-members" element={<AllMembers />} />
          <Route path="/team" element={<AllMembers />} />
          <Route path="/team/:id" element={<TeamPage />} />
          <Route path="/profile" element={<Profile />} />

          {/* About */}
          <Route path="/about/ieee-region-10" element={<IEEER10 />} />
          <Route path="/about/ieee" element={<AboutIEEE />} />

          {/* Publications */}
          <Route path="/research-papers" element={<ResearchPapers />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/toolkit" element={<Toolkit />} />

          {/* Contact  */}
          <Route path="/contact" element={<Contact />} />

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
          <Route path="/add-research-paper" element={<AddResearchPaper />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
