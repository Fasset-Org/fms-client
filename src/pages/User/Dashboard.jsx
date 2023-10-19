import { Grid, Stack } from "@mui/material";
import React from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WorkIcon from "@mui/icons-material/Work";
import EdgesensorHighIcon from '@mui/icons-material/EdgesensorHigh';
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate, useOutletContext } from "react-router-dom";
import DashboardCard from "../../components/DashboardCard";
import BreadCrumbsHeader from "../../components/BreadCrumbsHeader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [open] = useOutletContext();
  const menuList = [
    {
      title: "CSE",
      icon: LanguageIcon,
      url: "/websiteManagement"
    },
    {
      title: "Supply Chain",
      icon: ProductionQuantityLimitsIcon,
      url: "/scm"
    },
    {
      title: "Human Resource",
      icon: WorkIcon,
      url: "/humanResource"
    },
    {
      title: "Asset Management",
      icon: EdgesensorHighIcon,
      url: "/assetmanagement"
    },
    {
      title: "IT User Management",
      icon: ManageAccountsIcon,
      url: "/userManagement"
    }
  ];

  return (
    <Stack>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[{ name: "Dashboard", url: "/dashboard" }]}
      />
      <Grid container spacing={2} mt={0}>
        {menuList.map((menuItem, i) => {
          return (
            <Grid item md={open ? 4 : 3} xs={12} key={i}>
              <DashboardCard
                title={menuItem.title}
                Icon={menuItem.icon}
                onClick={() => navigate(menuItem.url)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Dashboard;
