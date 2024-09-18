import React, { createContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Logo from "../assets/key.png";
import ListOptions from "./ListOptions";
import { Route, Routes } from "react-router-dom";
import { getLocalStorage } from "../context/storaje";
import NotFound from "./NotFound";
import PlataformasRoutes from "../modules/plataformas/plataformas.routes";
import PerfilRoutes from "../modules/perfil/perfil.routes";
import RefreshSesion from "./RefreshSesion";
import GruposRoutes from "../modules/grupos/grupos.routes";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const ContextGeneral = createContext();

export default function Menu() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  //contexto vars
  const [Name, setName] = useState(getLocalStorage("nombre"));

  const [showLogo, setShowLogo] = useState(true);

  const handleDrawerOpen = () => {
    setShowLogo(true);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setShowLogo(false);
  };

  return (
    <>
      <ContextGeneral.Provider value={{ Name, setName }}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <div className="ps-5 d-flex justify-content-between  w-100">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  className="ms-2 fw-bold"
                >
                  Password Manager
                </Typography>

                <RefreshSesion />

                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  className="me-4 fw-bold"
                >
                  Bienvenido, {Name} :)
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              {showLogo && (
                <div className="w-100 d-flex justify-content-center p-3">
                  <img src={Logo} alt="" width={70} height={70} />
                </div>
              )}
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />

            <ListOptions open={open} />
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Routes>
              <Route path="/" element={<>asdasd</>} />
              <Route path="/plataformas/*" element={<PlataformasRoutes />} />
              <Route path="/perfil/*" element={<PerfilRoutes />} />
              <Route path="/grupos/*" element={<GruposRoutes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </ContextGeneral.Provider>
    </>
  );
}
