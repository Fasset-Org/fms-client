import { Button, Stack } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import { useNavigate } from "react-router-dom";

const CurrentPositions = () => {
  const navigate = useNavigate()
  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Human Resource", url: "/humanResource" },
          { name: "Current Positions", url: "/currentPositions" }
        ]}
        sx={{ mb: 2, width: "100%" }}
      />
      <Button variant="contained" onClick={() => navigate('/humanResource/addEditPositiosn')}>Add Position</Button>
    </Stack>
  );
};

export default CurrentPositions;
