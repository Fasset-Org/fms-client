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

/**
 * Renders a sign-out button
 */
export const DeleteConfirmModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Logout">
        <IconButton
          color="error"
          size="large"
          aria-label="logout"
          onClick={handleClickOpen}
        >
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
          <Button onClick={handleClose} variant="outlined"> Cancel</Button>
          <Button color="warning" variant="outlined" onClick={() => {}} autoFocus>
            Mark As Past
          </Button>
          <Button color="error" variant="outlined" onClick={() => {}} autoFocus>
            Mark As Cancelled
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
