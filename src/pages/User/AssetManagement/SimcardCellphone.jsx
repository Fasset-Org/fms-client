import {Stack } from "@mui/material";
import React from "react";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";



const SimcardsCellphone = () => {

  return (
    <Stack>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Asset Management", url: "/assetMangement" },
          { name: "Simcards Cellphone", url: "/simcardscellphone" },
        ]}
        sx={{ mb: 2 }}
      />
      <Stack sx={{ width: "100%" }} justifyContent="center" alignItems="center">
       
      </Stack>
    </Stack>
  );
};

export default SimcardsCellphone;