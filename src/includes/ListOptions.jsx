import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import KeyIcon from "@mui/icons-material/Key";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Link } from "react-router-dom";
import { clearStorageJWT } from "../context/storaje";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

const MAIN_OPTIONS = [
  { label: "Dashboard", path: "/", icon: DashboardIcon },
  { label: "Grupos", path: "grupos", icon: AutoAwesomeMotionIcon },
  { label: "Accesos", path: "accesos", icon: KeyIcon },
  { label: "Plataformas", path: "plataformas", icon: SportsEsportsIcon },
  { label: "Favoritos y etiquetas", path: "favoritos", icon: LabelOutlinedIcon },
  { label: "Notas seguras", path: "notas-seguras", icon: NoteAltOutlinedIcon },
  { label: "Generador", path: "generador", icon: PasswordOutlinedIcon },
  {
    label: "Análisis de seguridad",
    path: "analisis-seguridad",
    icon: AnalyticsOutlinedIcon,
  },
  { label: "Seguridad", path: "seguridad", icon: SecurityOutlinedIcon },
  { label: "Auditoría", path: "auditoria", icon: HistoryOutlinedIcon },
  { label: "Papelera", path: "papelera", icon: DeleteSweepOutlinedIcon },
  {
    label: "Importar / exportar",
    path: "importar-exportar",
    icon: ImportExportOutlinedIcon,
  },
  { label: "Respaldos", path: "respaldos", icon: BackupOutlinedIcon },
  { label: "Alertas", path: "alertas", icon: NotificationsActiveOutlinedIcon },
];

function MenuOption({ label, path, icon: Icon, open }) {
  return (
    <Link to={path} style={{ textDecoration: "none", color: "white" }}>
      <Tooltip title={open ? "" : label} placement="right-end">
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
              <Icon />
            </ListItemIcon>
            <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Tooltip>
    </Link>
  );
}

export default function ListOptions({ open, isSuperadmin }) {
  const closeSession = () =>
    MySwal.fire({
      title: "¿Estás seguro de cerrar sesión?",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "No, cancelar",
      confirmButtonText: "Sí, estoy seguro",
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
        {MAIN_OPTIONS.map((option) => (
          <MenuOption key={option.path} {...option} open={open} />
        ))}
      </List>

      <Divider />

      <List>
        <MenuOption
          label="Preferencias"
          path="preferencias"
          icon={SettingsOutlinedIcon}
          open={open}
        />
        {isSuperadmin && (
          <MenuOption
            label="Administración"
            path="admin/invitations"
            icon={AdminPanelSettingsIcon}
            open={open}
          />
        )}
        <MenuOption
          label="Perfil"
          path="perfil"
          icon={AccountCircleIcon}
          open={open}
        />

        <Tooltip title={open ? "" : "Cerrar sesión"} placement="right-end">
          <ListItem disablePadding sx={{ display: "block" }} onClick={closeSession}>
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
              <ListItemText primary="Salir" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </>
  );
}
