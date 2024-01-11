import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, DialogActions, TextField } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export default function CroppedImageModal({ url, file, open, setOpen }) {
  const handleClose = () => {
    setOpen(!open);
  };

  console.log(file, url, open, setOpen);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Save Banner Image
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            position: "relative",
            height: 400,
            width: "auto",
            minWidth: { sm: 500 }
          }}
        >
          <Box
            sx={{
              border: 1,
              borderColor: "lightgray",
              mb: 2
            }}
          >
            <img
              src={URL.createObjectURL(file)}
              alt=""
              width="100%"
              height="100%"
              style={{ objectFit: "contain" }}
            />
          </Box>
          <TextField type="number" label="Slide Number" fullWidth />
        </DialogContent>

        <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
          <Box sx={{ width: "100%", mb: 1 }}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "end"
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleClose}
              >
                Back
              </Button>
              <Button variant="contained" startIcon={<ArrowForwardIcon />}>
                Submit
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
