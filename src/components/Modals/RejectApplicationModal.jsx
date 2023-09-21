import React from "react";
// import { useMsal } from "@azure/msal-react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";

/**
 * Renders a sign-out button
 */
export const RejectApplicationModal = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { data, mutate, isLoading, isError, isSuccess, error } = useMutation({
    mutationFn: async (id) => {
      return await UserQuery.HumanResourceQuery.deletePositionQuestion(id);
    },
    onSuccess: (data) => {
      setOpen(false);
      setTimeout(() => {
        queryClient.invalidateQueries(["position"]);
      }, 1000);
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
      <Button sx={{ fontSize: 12 }} color="error" onClick={handleClickOpen}>
        Reject
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
          <TextField multiline rows={3} fullWidth label="Reject Reason..." />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>

          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              mutate(id);
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
