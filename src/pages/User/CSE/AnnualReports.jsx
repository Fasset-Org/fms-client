import { Stack } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import AddEditAnnualReportsModal from "../../../components/Modals/AddEditAnnualReportsModal";

const AnnualReports = () => {
  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Website Management", url: "/websiteManagement" },
          { name: "Annual Reports", url: "/cse/annualReports" }
        ]}
        sx={{ mb: 2 }}
      />

      <Stack alignItems="center">
        <AddEditAnnualReportsModal />
      </Stack>
    </Stack>
  );
};

export default AnnualReports;
