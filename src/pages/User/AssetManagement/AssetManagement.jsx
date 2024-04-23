import { Grid, Stack } from "@mui/material";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import BreadCrumbsHeader from "../../../components/BreadCrumbsHeader";
import DashboardCard from "../../../components/DashboardCard";
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
//import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
//import FolderIcon from '@mui/icons-material/Folder';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';



const AssetManagement = () => {
  const navigate = useNavigate();
  const [open] = useOutletContext();
  const menuList = [
    {
      title: "Devices",
      icon: LaptopChromebookIcon,
      url: "/assetManagement/devices"
    },
    {
      title: "License/Subscription",
      icon: PanToolAltIcon,
      url: "/assetManagement/licensesubscription"
    },
    {
      title: "Simcards",
      icon: PhoneIphoneIcon,
      url: "/assetManagement/simcards"
    },
    
    /*{
      title: "Disposal",
      icon: DeleteForeverIcon,
      url: "/assetManagement/disposal"
    },
    {
      title: "Reports",
      icon: FolderIcon,
      url: "/assetManagement/reports"
    },*/

    
  ];
  return (
    <Stack>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "Asset Management", url: "/assetManagement" }
        ]}
        sx={{ mb: 2 }}
      />
      <Stack sx={{ width: "100%" }} justifyContent="center" alignItems="center">
        <Grid container spacing={2}>
          {menuList.map((menu, i) => {
            return (
              <Grid item xs={12} md={open ? 4 : 3} key={i}>
                <DashboardCard
                  title={menu.title}
                  Icon={menu.icon}
                  onClick={() => navigate(menu.url)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default AssetManagement;