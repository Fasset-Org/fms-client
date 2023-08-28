import { Stack } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";

const JobApplications = () => {
  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Human Resource", url: "/humanResource" },
          { name: "Job Applications", url: "/jobApplications" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      
    </Stack>
  );
};

export default JobApplications;
