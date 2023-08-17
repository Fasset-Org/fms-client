import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./pages/User/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginUser from "./pages/auth/LoginUser";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeDark, themeLight } from "./fassetTheme";
import ITUserManagement from "./pages/User/ITUserManagement";
import WebsiteManagement from "./pages/User/WebsiteManagement";
import HumanResource from "./pages/User/HumanResource";
import SupplyChain from "./pages/User/SupplyChain";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Users from "./pages/User/Users";
import Departments from "./pages/User/Departments";
import Modules from "./pages/User/Modules";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3
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
                <Route path="/humanResource" element={<HumanResource />} />
                <Route path="/scm" element={<SupplyChain />} />
              </Route>
            </Route>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginUser />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Routes>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
