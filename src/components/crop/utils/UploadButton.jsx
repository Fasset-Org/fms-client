import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

export default function UploadButton({
  setPhotoURL,
  setCropOpen,
  setOriginalFile,
  title
}) {
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhotoURL(URL.createObjectURL(file));
      setOriginalFile(file);
      setCropOpen(true);
    }
  };

  return (
    <Button component="label" variant="contained" startIcon={<AddAPhotoIcon />}>
      {title}
      <VisuallyHiddenInput
        type="file"
        onChange={handleChange}
        accept="image/*"
      />
    </Button>
  );
}
