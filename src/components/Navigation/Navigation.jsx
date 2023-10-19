import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import EdgesensorHighIcon from '@mui/icons-material/EdgesensorHigh';
import LanguageIcon from "@mui/icons-material/Language";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Avatar, Badge, CssBaseline, Stack } from "@mui/material";
import logo from "../../assets/images/blue_bg_only_logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useQuery } from "@tanstack/react-query";
import AuthQuery from "../../stateQueries/Auth";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function Navigation({ currentTheme, setTheme }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      return await AuthQuery.isUserLoggedIn();
    }
  });

  const menuList = [
    {
      title: "Dashboard",
      icon: DashboardIcon,
      url: "/dashboard"
    },
    {
      title: "CSE",
      icon: LanguageIcon,
      url: "/websiteManagement",
      userType: "admin",
      department: "cse"
    },
    {
      title: "Supply Chain",
      icon: ProductionQuantityLimitsIcon,
      url: "/scm",
      userType: "admin",
      department: "scm"
    },
    {
      title: "Human Resource",
      icon: WorkIcon,
      url: "/humanResource",
      userType: "admin",
      department: "humanResource"
    },
    {
      title: "Asset Management",
      icon: EdgesensorHighIcon,
      url: "/assetmanagement",
      userType: "admin",
      department: "assetmanagement"
    },
    {
      title: "IT User Management",
      icon: ManageAccountsIcon,
      url: "/userManagement",
      userType: "Super",
      department: "IT"
    }
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: currentTheme === "light" && "primary.main",
          height: 64,
          borderRadius: 0
        }}
      >
        <Stack height="100%" width="100%" borderColor="white" direction="row">
          {!open && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: `calc(${theme.spacing(7)} + 1px)`,
                [theme.breakpoints.up("sm")]: {
                  width: `calc(${theme.spacing(8)} + 1px)`
                }
              }}
              padding={0}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                sx={{
                  ...(open && { display: "none" })
                }}
              >
                <MenuIcon fontSize="medium" sx={{ color: "#FFFFFF" }} />
              </IconButton>
            </Stack>
          )}
          <Stack
            height="100%"
            sx={{
              width: `calc(100% - ${theme.spacing(7)} + 1px)`,
              [theme.breakpoints.up("sm")]: {
                width: `100% - calc(${theme.spacing(8)} + 1px)`
              }
            }}
            direction="row"
          >
            <Stack direction="row" alignItems="center" width="100%">
              <IconButton onClick={() => navigate("/home")}>
                <Avatar src={logo} />
              </IconButton>
              <Stack width="100%">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  // textTransform="uppercase"
                  fontSize={14}
                  onClick={() => navigate("/home")}
                  textTransform="uppercase"
                  fontWeight="bolder"
                  // letterSpacing={6}
                >
                  Fasset CMS
                </Typography>
                <Typography
                  fontSize={9}
                  // border={1}
                  sx={{ position: "relative", bottom: 5, height: 10 }}
                >
                  <i>Make the future count</i>
                </Typography>
              </Stack>
            </Stack>

            <Stack
              flexGrow={15}
              height="100%"
              direction="row"
              justifyContent="end"
              alignItems="center"
              spacing={3}
              pr={2}
            >
              {currentTheme === "light" ? (
                <NightlightIcon
                  onClick={() => {
                    localStorage.setItem("theme", "dark");
                    setTheme("dark");
                  }}
                />
              ) : (
                <LightModeIcon
                  onClick={() => {
                    localStorage.setItem("theme", "light");
                    setTheme("light");
                  }}
                />
              )}

              <Badge badgeContent={4} color="error">
                <NotificationsIcon
                  fontSize="medium"
                  sx={{ color: "#FFFFFF" }}
                />
              </Badge>

              <Avatar>T</Avatar>
            </Stack>
          </Stack>
        </Stack>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: currentTheme === "light" && "primary.main",
            color: "#FFFFFF",
            borderRadius: 0
          }
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "#FFFFFF" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "#FFFFFF" }} fontSize="medium" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {menuList.map((menuItem, i) => {
            return (
              <>
                {(data?.user?.userType === "Super" ||
                  (data?.user?.userType === "admin" &&
                    data?.user?.department?.departmentName ===
                      menuItem.department)) && (
                  <ListItem
                    key={i}
                    disablePadding
                    sx={{ display: "block" }}
                    onClick={() => navigate(menuItem.url)}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center"
                        }}
                      >
                        <menuItem.icon
                          sx={{ color: "#FFFFFF" }}
                          fontSize="medium"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={menuItem.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
              </>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, px: { md: 3, xl: 30 } }} p={3}>
        <DrawerHeader />
        <Outlet context={[open]} />
      </Box>
    </Box>
  );
}
