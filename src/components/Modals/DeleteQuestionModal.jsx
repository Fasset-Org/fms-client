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
import { Delete } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";

/**
 * Renders a sign-out button
 */
export const DeleteQuestionModal = ({ id }) => {
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
    <div>
      <Tooltip title="Delete Question">
        <IconButton
          color="error"
          size="small"
          aria-label="logout"
          onClick={handleClickOpen}
        >
          <Delete />
        </IconButton>
      </Tooltip>

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
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "fontWeightBold",
              color: "text.primary"
            }}
          >
            Are you sure you want to permanently delete?
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
              mutate(id);
            }}
            autoFocus
          >
            {isLoading ? <CircularProgress color="warning" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
