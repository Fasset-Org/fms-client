import { Grid, Stack } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Groups2Icon from '@mui/icons-material/Groups2';
import DashboardCard from "../../../components/DashboardCard";
import { useNavigate, useOutletContext } from "react-router-dom";

const HumanResource = () => {
  const navigate = useNavigate();
  const [open] = useOutletContext();
  const menuList = [
    {
      title: "Open Positions",
      icon: ArrowCircleDownIcon,
      url: "/humanResource/openPositions"
    },
    {
      title: "Previous Positions",
      icon: ArrowCircleUpIcon,
      url: "/humanResource/previousPositions"
    },
    {
      title: "Our Team",
      icon: Groups2Icon,
      url: "/humanResource/ourTeam"
    },
  ];
  return (
    <Stack>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Human Resource", url: "/humanResource" }
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
          <Tab label="Current Positions" />
          <Tab label="Previous Positions" />
          <Tab label="Applications" />
        </Tabs>
      </Box> */}
    </Stack>
  );
};

export default HumanResource;
