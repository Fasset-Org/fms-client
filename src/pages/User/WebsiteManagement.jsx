import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../components/BreadCrumbsHeader";
import { useLocation } from "react-router-dom";

const WebsiteManagement = () => {
  let { pathname } = useLocation();
  pathname = pathname.slice(1);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          "Dashboard",
          pathname.charAt(0).toUpperCase() + pathname.slice(1)
        ]}
        href="/websiteManagement"
      />

      <Box sx={{ bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          sx={{borderRadius: 0, padding: 2}}
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
      </Box>
    </Stack>
  );
};

export default WebsiteManagement;
