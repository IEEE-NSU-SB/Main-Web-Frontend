import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import ScrollToTopButton from "./components/ui/scroll-to-top";

import HomePage from "./pages/home/page";
import SocietyOrAg from "./pages/society-and-ag/pages[id]/ScAgPages";
import About from "@/pages/about/pages[id]/pages";
import JoinINSB from "@/pages/get-involved/join-insb/page";
import AllMembers from "@/pages/members/all-members-statistcs/page";
import Achievements from "./pages/activities/achievements/page";
import ResearchPapers from "./pages/publications/research Paper/page";
import Blogs from "./pages/publications/blogs/page";
import Toolkit from "./pages/publications/toolkit/pages";
import Panel from "./pages/members/panel/page";
import WriteBlog from "./pages/get-involved/write-a-blog/page";
import WelcomePage from "./pages/welcome/page";
import ExecutiveBodySection from "@/pages/society-and-ag/pages[id]/ScAgExecutive";

import "odometer/themes/odometer-theme-default.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <Routes>
        <Route path="/welcome-page" element={<WelcomePage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/society-ag/:id" element={<SocietyOrAg />} />
          <Route path="/all-members" element={<AllMembers />} />
          <Route path="/panels" element={<Panel />} />
          <Route path="/about/:id" element={<About />} />
          <Route path="/research-papers" element={<ResearchPapers />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/toolkit" element={<Toolkit />} />
          <Route path="/executive-body" element={<ExecutiveBodySection />} />
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
