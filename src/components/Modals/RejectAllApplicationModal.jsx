import React from "react";
// import { useMsal } from "@azure/msal-react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";

/**
 * Renders a sign-out button
 */
export const RejectAllApplicationModal = ({ position }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { data, mutate, isLoading, isError, isSuccess, error } = useMutation({
    mutationFn: async (id) => {
      return await UserQuery.HumanResourceQuery.rejectAllApplications(id);
    },
    onSuccess: (data) => {
      setOpen(false);
        queryClient.invalidateQueries(["applications"]);

    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ fontSize: 11, height: 60, fontWeight: "bolder" }}
        color="error"
        onClick={handleClickOpen}
      >
        Reject All Applications
      </Button>

      {isError && (
        <AlertPopup
          open={true}
          message={error?.response?.data?.message || "Server Error"}
          severity="error"
        />
      )}
      {isSuccess && <AlertPopup open={true} message={data?.message} />}

      <Dialog
        sx={{ border: "3px solid #F44336 " }}
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Reject</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to reject all &nbsp;
            <Typography
              component="span"
              sx={{ color: "warning.main", fontWeight: "bolder" }}
            >
              {position.jobTitle}'s
            </Typography>
            &nbsp;remaining applications?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>

          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              mutate(position.id);
            }}
            autoFocus
          >
            {isLoading ? <CircularProgress color="warning" /> : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
