import { Stack } from "@mui/material";
import React from "react";
import AddEditDownloadsModal from "../../../components/Modals/AddDownloadsModal";

const Downloads = () => {
  return (
    <Stack spacing={2}>
      <Stack justifyContent="center" alignItems="center">
        <AddEditDownloadsModal />
      </Stack>
    </Stack>
  );
};

export default Downloads;
