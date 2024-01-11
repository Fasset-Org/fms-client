import { Stack } from "@mui/material";
import React, { useState } from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import ImageCropModal from "../../../components/crop/ImageCropModal";
import UploadButton from "../../../components/crop/utils/UploadButton";

const Banners = () => {
  const [photoURL, setPhotoURL] = React.useState("");
  const [cropOpen, setCropOpen] = useState(false);

  return (
    <Stack spacing={2}>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Website Management", url: "/websiteManagement" },
          { name: "Banners", url: "/cse/banners" }
        ]}
        sx={{ mb: 2 }}
      />
      <Stack justifyContent="center" alignItems="center">
        <UploadButton setPhotoURL={setPhotoURL} setCropOpen={setCropOpen} title="Upload Banner" />
        {cropOpen && (
          <ImageCropModal
            photoURL={photoURL}
            cropOpen={cropOpen}
            setCropOpen={setCropOpen}
            setPhotoURL={setPhotoURL}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default Banners;
