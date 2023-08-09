import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./pages/User/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginUser from "./pages/auth/LoginUser";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeLight } from "./fassetTheme";
import ITUserManagement from "./pages/User/ITUserManagement";
import WebsiteManagement from "./pages/User/WebsiteManagement";
import HumanResource from "./pages/User/HumanResource";
import SupplyChain from "./pages/User/SupplyChain";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ThemeProvider theme={themeLight}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/userManagement" element={<ITUserManagement />} />
              <Route path="/websiteManagement" element={<WebsiteManagement />} />
              <Route path='/humanResource' element={<HumanResource />} />
              <Route path="/scm" element={<SupplyChain />} />
            </Route>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginUser />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
