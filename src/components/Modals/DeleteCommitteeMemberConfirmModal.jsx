import React from "react";
// import { useMsal } from "@azure/msal-react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";

/**
 * Renders a sign-out button
 */
export const DeleteCommitteeMemberConfirmModal = ({ id }) => {
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCommitteeMemberMutation = useMutation({
    mutationFn: async (id) => {
      return UserQuery.CSEQuery.deleteCommitteeMember(id);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("committeeMembers");
        setOpen(false);
      }, 2000);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return (
    <div>
      {deleteCommitteeMemberMutation.isError && (
        <AlertPopup
          open={true}
          message={
            deleteCommitteeMemberMutation.error?.response?.data?.message ||
            "Server Error"
          }
          severity="error"
        />
      )}
      {deleteCommitteeMemberMutation.isSuccess && (
        <AlertPopup
          open={true}
          message={deleteCommitteeMemberMutation.data?.message}
        />
      )}
      <Tooltip title="Delete">
        <IconButton color="error" onClick={handleClickOpen}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        sx={{ border: "3px solid #F44336 " }}
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "fontWeightBold",
              color: "text.primary"
            }}
          >
            Are you sure you want to delete?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => deleteCommitteeMemberMutation.mutate(id)}
          >
            {deleteCommitteeMemberMutation.isLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
