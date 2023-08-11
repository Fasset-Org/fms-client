import { Grid, Stack } from "@mui/material";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import BreadCrumbsHeader from "../../components/BreadCrumbsHeader";
import DashboardCard from "../../components/DashboardCard";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import GroupIcon from "@mui/icons-material/Group";
import DomainIcon from "@mui/icons-material/Domain";

const ITUserManagement = () => {
  const navigate = useNavigate();
  const [open] = useOutletContext();
  const menuList = [
    {
      title: "Users",
      icon: GroupIcon,
      url: "/userManagement/users"
    },
    {
      title: "Departments",
      icon: DomainIcon,
      url: "/userManagement/departments"
    },
    {
      title: "Modules",
      icon: AddModeratorIcon,
      url: "/userManagement/modules"
    }
  ];
  return (
    <Stack>
      <BreadCrumbsHeader
        title="Welcome back Tiyisela Themba Makamu"
        menus={[
          { name: "Dashboard", url: "/dashboard" },
          { name: "User Management", url: "/userManagement" }
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

export default ITUserManagement;
