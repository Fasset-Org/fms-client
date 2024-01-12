import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, CircularProgress, DialogActions } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserQuery from "../../stateQueries/User";
import AlertPopup from "../AlertPopup";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export default function CroppedImageModal({
  url,
  file,
  open,
  setOpen,
  setCropOpen
}) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(!open);
  };

  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation({
    mutationFn: async (formData) => {
      return await UserQuery.CSEQuery.addBannerImageFile(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("banners");
      setTimeout(() => {
        setOpen(false);
        setCropOpen(false);
      }, 2000);
    }
  });

  return (
    <React.Fragment>
      {isError && (
        <AlertPopup
          open={true}
          severity="error"
          message={error?.response?.data?.message || "Server Error"}
        />
      )}
      {/* Edit Tender Popups */}
      {isSuccess && <AlertPopup open={true} message={data?.message} />}
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
          {/* <TextField type="number" label="Slide Number" fullWidth /> */}
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
              <Button
                variant="contained"
                startIcon={<ArrowForwardIcon />}
                onClick={() => {
                  const formData = new FormData();
                  formData.append("imageFile", file, file.name);
                  mutate(formData);
                }}
              >
                {isLoading ? <CircularProgress color="secondary" /> : "Submit"}
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
