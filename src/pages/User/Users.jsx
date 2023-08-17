import { Stack } from "@mui/material";
import React from "react";
import AddEditUserModal from "../../components/Modals/AddEditModuleModal";

const Users = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <AddEditUserModal />
    </Stack>
  );
};

export default Users;
