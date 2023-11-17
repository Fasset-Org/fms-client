import { Stack, Typography } from "@mui/material";
import React from "react";
import AddEditGeneralNoticeModal from "../../Modals/AddEditGeneralNoticeModal";

const Notices = () => {
  return (
    <Stack spacing={2} width="100%">
      <Stack direction="row" justifyContent="space-between">
        <Typography fontSize={20} textAlign="center">
          Notices
        </Typography>
       <AddEditGeneralNoticeModal />
      </Stack>
    </Stack>
  );
};

export default Notices;
