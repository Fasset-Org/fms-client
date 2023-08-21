import { Stack } from "@mui/material";
import React from "react";
import AddEditTenderModal from "../../../components/Modals/AddEditTenderModal";

const CurrentTenders = () => {
  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <AddEditTenderModal />
    </Stack>
  );
};

export default CurrentTenders;
