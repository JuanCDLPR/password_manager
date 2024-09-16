import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

//icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import KeyIcon from "@mui/icons-material/Key";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { clearStorageJWT } from "../context/storaje";
import { Tooltip } from "@mui/material";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);
export default function ListOptions({ open }) {
  const CerrarSesion = () =>
    MySwal.fire({
      title: "¿Estas seguro de cerrar sesión?",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "No, cancelar",
      confirmButtonText: "Si, estoy seguro",
      confirmButtonColor: "#3ABE88",
      denyButtonColor: "#65748B",
      reverseButtons: true,
      background: "#333333",
      color: "#FFFFFF",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          icon: "success",
          title: "Cerrando sesión...",
          showConfirmButton: false,
          timer: 1500,
          background: "#333333",
          color: "#FFFFFF",
        }).then(clearStorageJWT);
      }
    });
  return (
    <>
      <List>
        <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
          <Tooltip title={open ? "" : "Dashboard"} placement="right-end">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Dahsboard"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </Link>

        <Link to={"grupos"} style={{ textDecoration: "none", color: "white" }}>
          <Tooltip title={open ? "" : "Grupos"} placement="right-end">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AutoAwesomeMotionIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Grupos"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </Link>

        <Link to={"accesos"} style={{ textDecoration: "none", color: "white" }}>
          <Tooltip title={open ? "" : "Accesos"} placement="right-end">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <KeyIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Accesos"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </Link>

        <Link
          to={"plataformas"}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Tooltip title={open ? "" : "Plataformas"} placement="right-end">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Plataformas"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </Link>
      </List>

      <Divider />

      <List>
        <Link to={"perfil"} style={{ textDecoration: "none", color: "white" }}>
          <Tooltip title={open ? "" : "Perfil"} placement="right-end">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Perfil"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </Link>

        <Tooltip title={open ? "" : "Cerrar Sesion"} placement="right-end">
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => CerrarSesion()}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Salir"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </>
  );
}
