import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import BreadCrumbsHeader from "../../components/BreadCrumbsHeader";

const SupplyChain = () => {
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
        href="/scm"
      />

      <Box sx={{ bgcolor: "background.paper" }}>
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
      </Box>
    </Stack>
  );
};

export default SupplyChain;
