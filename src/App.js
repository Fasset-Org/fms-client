import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./pages/User/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginUser from "./pages/auth/LoginUser";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeDark, themeLight } from "./fassetTheme";
import ITUserManagement from "./pages/User/ITUserManagement";
import WebsiteManagement from "./pages/User/WebsiteManagement";
import HumanResource from "./pages/User/HumanResource/HumanResource";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Users from "./pages/User/Users";
import Departments from "./pages/User/Departments";
import Modules from "./pages/User/Modules";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";
import SupplyChain from "./pages/User/SupplyChain/SupplyChain";
import CurrentTenders from "./pages/User/SupplyChain/CurrentTenders";
import PreviousTenders from "./pages/User/SupplyChain/PreviousTenders";
import CancelledTenders from "./pages/User/SupplyChain/CancelledTenders";
import CurrentPositions from "./pages/User/HumanResource/CurrentPositions";
import PreviousPositions from "./pages/User/HumanResource/PreviousPositions";
import JobApplications from "./pages/User/HumanResource/JobApplications";
import AddEditPosition from "./pages/User/HumanResource/AddEditPosition";
import EditPosition from "./pages/User/HumanResource/EditPosition";
import ViewApplication from "./pages/User/HumanResource/ViewApplication";
import Banners from "./pages/User/CSE/Banners";
import Board from "./pages/User/CSE/Board";
import Committees from "./pages/User/CSE/Committees";
import Downloads from "./pages/User/CSE/Downloads";
import NoticeBoard from "./pages/User/CSE/NoticeBoard";
import AnnualReports from "./pages/User/CSE/AnnualReports";
import ResearchReports from "./pages/User/CSE/ResearchReports";
import DownloadsDocuments from "./pages/User/CSE/DownloadsDocuments";
import CommiteeList from "./pages/User/CSE/CommiteeList";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme === "light" ? themeLight : themeDark}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route
                path="/"
                element={
                  <Navigation currentTheme={theme} setTheme={setTheme} />
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/userManagement" element={<ITUserManagement />} />
                <Route path="/userManagement/users" element={<Users />} />
                <Route
                  path="/userManagement/departments"
                  element={<Departments />}
                />
                <Route path="/userManagement/modules" element={<Modules />} />
                <Route
                  path="/websiteManagement"
                  element={<WebsiteManagement />}
                />
                <Route path="/cse/banners" element={<Banners />} />
                <Route path="/cse/board" element={<Board />} />
                <Route path="/cse/committees" element={<Committees />} />
                <Route
                  path="/cse/committeeMembers/:committeeId"
                  element={<CommiteeList />}
                />
                <Route path="/cse/downloads" element={<Downloads />} />
                <Route
                  path="/cse/downloads/:titleId"
                  element={<DownloadsDocuments />}
                />
                <Route path="/cse/noticeBoard" element={<NoticeBoard />} />
                <Route path="/cse/annualReports" element={<AnnualReports />} />
                <Route
                  path="/cse/researchReports"
                  element={<ResearchReports />}
                />
                {/* Human Resource Routes */}
                <Route path="/humanResource" element={<HumanResource />} />
                <Route
                  path="/humanResource/openPositions"
                  element={<CurrentPositions />}
                />
                <Route
                  path="/humanResource/previousPositions"
                  element={<PreviousPositions />}
                />
                <Route
                  path="/humanResource/jobApplications/:positionId"
                  element={<JobApplications />}
                />
                <Route
                  path="/humanResource/jobApplications/:positionId/viewApplication/:applicationId"
                  element={<ViewApplication />}
                />
                <Route
                  path="/humanResource/addPositiosn"
                  element={<AddEditPosition />}
                />
                <Route
                  path="/humanResource/editPosition/:positionId"
                  element={<EditPosition />}
                />
                <Route
                  path="/humanResource/editPreviousPosition/:positionId"
                  element={<EditPosition />}
                />
                {/* Supply Chain Routes */}
                <Route path="/scm" element={<SupplyChain />} />
                <Route
                  path="/scm/currentTenders"
                  element={<CurrentTenders />}
                />
                <Route
                  path="/scm/previousTenders"
                  element={<PreviousTenders />}
                />
                <Route
                  path="/scm/cancelledTenders"
                  element={<CancelledTenders />}
                />
              </Route>
            </Route>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginUser currentTheme={theme} />} />
            <Route
              path="/forgotPassword"
              element={<ForgotPassword currentTheme={theme} />}
            />
            <Route
              path="/resetPassword/:resetToken"
              element={<ResetPassword currentTheme={theme} />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
