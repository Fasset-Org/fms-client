import { Stack } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import AddEditCommitteeMemberModal from "../../../components/Modals/AddEditCommitteeMemberModal";

const Committees = () => {
  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Website Management", url: "/websiteManagement" },
          { name: "Committees", url: "/cse/committees" }
        ]}
        sx={{ mb: 2 }}
      />

      <Stack alignItems="center">
        <AddEditCommitteeMemberModal />
      </Stack>
    </Stack>
  );
};

export default Committees;
