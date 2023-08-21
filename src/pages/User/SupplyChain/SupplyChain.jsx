import { Grid, Stack } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import { useNavigate, useOutletContext } from "react-router-dom";
import DashboardCard from "../../../components/DashboardCard";
import TaskIcon from "@mui/icons-material/Task";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import WebAssetOffIcon from "@mui/icons-material/WebAssetOff";

const SupplyChain = () => {
  const navigate = useNavigate();
  const [open] = useOutletContext();
  const menuList = [
    {
      title: "Current Tenders",
      icon: TaskIcon,
      url: "/scm/currentTenders"
    },
    {
      title: "Previous Tenders",
      icon: FileOpenIcon,
      url: "/scm/previousTenders"
    },
    {
      title: "Cancelled Tenders",
      icon: WebAssetOffIcon,
      url: "/scm/cancelledTenders"
    }
  ];
  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Supply Chain", url: "/scm" }
        ]}
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
          <Tab label="Current Tenders" />
          <Tab label="Previous Tenders" />
          <Tab label="Cancelled Tenders" />
        </Tabs>
      </Box> */}
    </Stack>
  );
};

export default SupplyChain;
