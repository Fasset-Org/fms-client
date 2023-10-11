import { Grid, Stack } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../components/BreadCrumbsHeader";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import DownloadIcon from "@mui/icons-material/Download";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import DashboardCard from "../../components/DashboardCard";
import { useNavigate, useOutletContext } from "react-router-dom";

const WebsiteManagement = () => {
  const navigate = useNavigate();
  const [open] = useOutletContext();

  const menuList = [
    {
      title: "Banners",
      icon: ViewCarouselIcon,
      url: "/cse/banners"
    },
    {
      title: "Board",
      icon: Diversity3Icon,
      url: "/cse/board"
    },
    {
      title: "Committees",
      icon: Diversity1Icon,
      url: "/cse/committees"
    },
    {
      title: "Downloads",
      icon: DownloadIcon,
      url: "/cse/downloads"
    },
    {
      title: "Notice Board",
      icon: PriorityHighIcon,
      url: "/cse/noticeBoard"
    },
    {
      title: "Annual Reports",
      icon: AssignmentLateIcon,
      url: "/cse/annualReports"
    },
    {
      title: "Research Reports",
      icon: NewReleasesIcon,
      url: "/cse/researchReports"
    }
  ];

  return (
    <Stack>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Website Management", url: "/websiteManagement" }
        ]}
        sx={{ mb: 2 }}
      />

      <Stack sx={{ width: "100%" }} justifyContent="center" alignItems="center">
        <Grid container spacing={2}>
          {menuList.map((menu, i) => {
            return (
              <Grid item xs={12} md={open ? 4 : 3} key={i}>
                <DashboardCard
                  title={menu.title}
                  Icon={menu.icon}
                  onClick={() => navigate(menu.url)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Stack>

      {/* <Box sx={{ bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          sx={{ borderRadius: 0, padding: 2 }}
          component={Paper}
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Banners" />
          <Tab label="Board" />
          <Tab label="Committees" />
          <Tab label="Downloads" />
          <Tab label="Notice Board" />
          <Tab label="Annual Reports" />
          <Tab label="Research Reports" />
        </Tabs>
      </Box> */}
    </Stack>
  );
};

export default WebsiteManagement;
