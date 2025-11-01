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
import ScrollToTop from "./components/ui/ScrollToTop";

//Home
import HomePage from "./pages/home/Page";

//Activities
import Events from "./pages/activities/events/Page";
import EventDetails from "./pages/activities/events/EventsDetails/Page";
import Achievements from "./pages/activities/achievements/Page";
import News from "./pages/activities/News/Page";
import NewsDetails from "./pages/activities/News/NewsDetails";

//Societies & AG
import SocietyOrAg from "./pages/society-and-ag/Page";
import ScAgAchievements from "./pages/society-and-ag/ScAgAchievements";

//Members
import Panel from "./pages/members/panel/Page";
import Officers from "./pages/members/officers/Page";
import Volunteers from "./pages/members/volunteers/Page";
import TeamPage from "./pages/members/team/Page";
import AllMembers from "@/pages/members/all-members-statistics/Page";
import Profile from "./pages/members/profile/Page";

//About
import AboutIEEE from "./pages/about/ieee/Page";
import AboutIEEER10 from "./pages/about/ieee-region-10/Page";
import AboutIEEEBDS from "./pages/about/ieee-bds-section/Page";
import FAQPage from "./pages/about/faq";

//Publications
import Blogs from "./pages/publications/blogs/Page";
import ResearchPapers from "./pages/publications/research-paper/Page";
import Magazines from "./pages/publications/magazines/pages";
import Gallery from "./pages/publications/gallery/Page";
import Toolkit from "./pages/publications/toolkit/Page";

//Contact
import Contact from "./pages/Contact/Page";

//Get Involved
import JoinINSB from "@/pages/get-involved/join-insb/Page";
import WriteBlog from "./pages/get-involved/write-a-blog/Page";
import AddResearchPaper from "./pages/get-involved/add-research-paper/Page";
import WelcomePage from "./pages/welcome/Page";
import TrailingSlashRedirect from "./hooks/TrailingSlashRedirect";

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
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/ieee-nsu-ras-sbc/achievements" element={<ScAgAchievements />} />
          <Route path="/ieee-nsu-pes-sbc/achievements" element={<ScAgAchievements />} />
          <Route path="/ieee-nsu-ias-sbc/achievements" element={<ScAgAchievements />} />
          <Route path="/ieee-nsu-wie-ag/achievements" element={<ScAgAchievements />} />

          {/* Societies & AG */}
          <Route path="/ieee-nsu-ras-sbc" element={<SocietyOrAg />} />
          <Route path="/ieee-nsu-pes-sbc" element={<SocietyOrAg />} />
          <Route path="/ieee-nsu-ias-sbc" element={<SocietyOrAg />} />
          <Route path="/ieee-nsu-wie-ag" element={<SocietyOrAg />} />

          {/* Members */}
          <Route path="/panels" element={<Panel />} />
          <Route path="/panels/:year" element={<Panel />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="/officers/:id" element={<Officers />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/team/:id" element={<TeamPage />} />
          <Route path="/exemplary-members" />
          <Route path="/member_profile/:id" element={<Profile />} />
          <Route path="/all-members" element={<AllMembers />} />

          {/* About */}
          <Route path="/ieee" element={<AboutIEEE />} />
          <Route path="/ieee-region-10" element={<AboutIEEER10 />} />
          <Route path="/ieee-bangladesh-section" element={<AboutIEEEBDS/>} />
          <Route path="/FAQ" element={<FAQPage />} />

          {/* Publications */}
          <Route path="/research-papers" element={<ResearchPapers />} />
          <Route path="/magazines" element={<Magazines />} />
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
