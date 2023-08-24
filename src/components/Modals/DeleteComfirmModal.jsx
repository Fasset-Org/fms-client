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
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
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
          <LogoutTwoToneIcon />
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
        <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "fontWeightBold",
              color: "text.primary"
            }}
          >
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel</Button>
          <Button color="error" variant="outlined" onClick={() => {}} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
