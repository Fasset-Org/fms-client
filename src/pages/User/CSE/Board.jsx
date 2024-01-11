import { Stack } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import AddEditBoardMemberModal from "../../../components/Modals/AddEditBoardMemberModal";

const Board = () => {
  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Website Management", url: "/websiteManagement" },
          { name: "Board", url: "/cse/board" }
        ]}
        sx={{ mb: 2 }}
      />

      <Stack alignItems="center">
        <AddEditBoardMemberModal />
      </Stack>
    </Stack>
  );
};

export default Board;
