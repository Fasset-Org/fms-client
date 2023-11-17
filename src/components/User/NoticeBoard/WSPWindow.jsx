import { Stack, Typography } from "@mui/material";
import React from "react";
import GrantsWindowModal from "../../Modals/GrantsWindowModal";

const WSPWindow = () => {
  return (
    <Stack spacing={2} width="100%">
      <Stack direction="row" justifyContent="space-between">
        <Typography fontSize={20} textAlign="center">
          WSP Window Notice
        </Typography>
        <GrantsWindowModal />
      </Stack>
    </Stack>
  );
};

export default WSPWindow;
