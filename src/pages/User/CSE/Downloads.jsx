import { Stack } from "@mui/material";
import React from "react";
import AddEditDownloadsModal from "../../../components/Modals/AddDownloadsModal";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";

const Downloads = () => {
  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Website Management", url: "/websiteManagement" },
          {name: 'Downloads', url: '/cse/downloads'}
        ]}
        sx={{ mb: 2 }}
      />
      <Stack justifyContent="center" alignItems="center">
        <AddEditDownloadsModal />
      </Stack>
    </Stack>
  );
};

export default Downloads;
