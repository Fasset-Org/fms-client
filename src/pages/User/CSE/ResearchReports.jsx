import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import AddEditResearchReportsModal from "../../../components/Modals/AddEditResearchReportsModal";
import { Stack } from "@mui/material";

const ResearchReports = () => {
  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Website Management", url: "/websiteManagement" },
          { name: "Research Reports", url: "/cse/researchReports" }
        ]}
        sx={{ mb: 2 }}
      />

      <Stack alignItems="center">
        <AddEditResearchReportsModal />
      </Stack>
    </Stack>
  );
};

export default ResearchReports;
