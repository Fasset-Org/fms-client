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
export const DeleteDocumentModal = ({ id }) => {
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteDocumentQuery = useMutation({
    mutationFn: async (id) => {
      return UserQuery.CSEQuery.deleteDocument(id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("documents");
      setOpen(false);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return (
    <div>
      {deleteDocumentQuery.isError && (
        <AlertPopup
          open={true}
          message={
            deleteDocumentQuery.error?.response?.data?.message || "Server Error"
          }
          severity="error"
        />
      )}
      {deleteDocumentQuery.isSuccess && (
        <AlertPopup open={true} message={deleteDocumentQuery.data?.message} />
      )}
      <Tooltip title="Delete">
        <IconButton color="error" size="large" onClick={handleClickOpen}>
          <DeleteForeverIcon fontSize="large" />
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
            onClick={() => deleteDocumentQuery.mutate(id)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
