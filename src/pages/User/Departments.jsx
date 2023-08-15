import { Stack } from "@mui/material";
import React from "react";
import AddEditDepartment from "../../components/Modals/AddEditDepartment";

const Departments = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <AddEditDepartment />
    </Stack>
  );
};

export default Departments;
