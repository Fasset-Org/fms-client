import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Cropper from "react-easy-crop";
import { Box, Slider } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import CropIcon from "@mui/icons-material/Crop";
import getCroppedImg from "./utils/cropImage";
import CroppedImageModal from "./CroppedImageModal";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export default function ImageCropModal({
  photoURL,
  cropOpen,
  setCropOpen,
  originalFile
}) {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState(null);
  const [file, setFile] = React.useState(null);

  const onCropComplete = (croppedArea, croppedArreaPixels) => {
    setCroppedAreaPixels(croppedArreaPixels);
  };

  const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
  };

  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation,
        originalFile
      );
      setUrl(url);
      setFile(file);
      setOpen(!open);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setCropOpen(false);
  };

  return (
    <React.Fragment>
      {open && (
        <CroppedImageModal {...{ url, file, open, setOpen, setCropOpen }} />
      )}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={cropOpen}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Crop Banner Image
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
            background: "#333",
            position: "relative",
            height: 400,
            width: "auto",
            minWidth: { sm: 500 }
          }}
        >
          <Cropper
            image={photoURL}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={4 / 8}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
          />
        </DialogContent>
        <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
          <Box sx={{ width: "100%", mb: 1 }}>
            <Box>
              <Typography>Zoom: {zoomPercent(zoom)}</Typography>
              <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={zoomPercent}
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </Box>

            <Box>
              <Typography>Rotation: {rotation}</Typography>
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={360}
                value={rotation}
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </Box>
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
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<CropIcon />}
                onClick={cropImage}
              >
                Crop
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
