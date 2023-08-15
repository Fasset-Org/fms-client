import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Alert, LinearProgress, Snackbar } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import AuthQuery from "../stateQueries/Auth";

const PrivateRoute = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      return await AuthQuery.isUserLoggedIn()
    },
    // staleTime: 1000 * 60 * 60 * 24
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error?.code === "ERR_NETWORK") {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          You not connected to the server/you device is offline
        </Alert>
      </Snackbar>
    );
  }

  if (error?.response?.status === 500) {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Technical issue, please note that fasset IT team is busy fixing the
          problem.
        </Alert>
      </Snackbar>
    );
  }

  if (error?.response?.status === 401) {
    return <Navigate to="/login" />;
  }

  return isSuccess && data ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;