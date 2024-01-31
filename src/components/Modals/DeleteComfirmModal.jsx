import React from "react";
// import { useMsal } from "@azure/msal-react";
import {
  Button,
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
export const DeleteConfirmModal = ({ id, status }) => {
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const markTenderAsPastQuery = useMutation({
    mutationFn: async (id) => {
      return await UserQuery.SCMQuery.markTenderAsPast(id);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("tenders");
      }, 3000);
      handleClose();
    }
  });

  const markAsCancelledQuery = useMutation({
    mutationFn: async (id) => {
      return await UserQuery.SCMQuery.markTenderAsCancelled(id);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        queryClient.invalidateQueries("tenders");
      }, 3000);
      handleClose();
    }
  });

  const markTenderAsActiveQuery = useMutation({
    mutationFn: async (id) => {
      return await UserQuery.SCMQuery.markTenderAsActive(id);
    },
    onSuccess: (data) => {
      handleClose();

      setTimeout(() => {
        queryClient.invalidateQueries("tenders");
      }, 3000);
    }
  });

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={handleClickOpen}>
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
      {markTenderAsPastQuery.isError && (
        <AlertPopup
          open={true}
          message={
            markTenderAsPastQuery.error?.response?.data?.message ||
            "Server Error"
          }
          severity="error"
        />
      )}
      {markTenderAsPastQuery.isSuccess && (
        <AlertPopup open={true} message={markTenderAsPastQuery.data?.message} />
      )}
      {markAsCancelledQuery.isError && (
        <AlertPopup
          open={true}
          message={
            markAsCancelledQuery.error?.response?.data?.message ||
            "Server Error"
          }
          severity="error"
        />
      )}
      {markAsCancelledQuery?.isSuccess && (
        <AlertPopup open={true} message={markAsCancelledQuery.data?.message} />
      )}
      {markTenderAsActiveQuery?.isError && (
        <AlertPopup
          open={true}
          message={
            markTenderAsActiveQuery.error?.response?.data?.message ||
            "Server Error"
          }
          severity="error"
        />
      )}
      {markTenderAsActiveQuery?.isSuccess && (
        <AlertPopup
          open={true}
          message={markTenderAsActiveQuery.data?.message}
        />
      )}
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
          {status === "active" && (
            <>
              <Button
                color="warning"
                variant="outlined"
                onClick={() => {
                  markTenderAsPastQuery.mutate(id);
                }}
              >
                Mark As Past
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  markAsCancelledQuery.mutate(id);
                }}
              >
                Mark As Cancelled
              </Button>
            </>
          )}
          {status === "inactive" && (
            <>
              <Button
                color="success"
                variant="outlined"
                onClick={() => {
                  markTenderAsActiveQuery.mutate(id);
                }}
              >
                Mark As Active
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  markAsCancelledQuery.mutate(id);
                }}
              >
                Mark As Cancelled
              </Button>
            </>
          )}
          {status === "cancelled" && (
            <>
              <Button
                color="success"
                variant="outlined"
                onClick={() => {
                  markTenderAsActiveQuery.mutate(id);
                }}
              >
                Mark As active
              </Button>
              <Button
                color="warning"
                variant="outlined"
                onClick={() => {
                  markTenderAsPastQuery.mutate(id);
                }}
              >
                Mark As Past
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
