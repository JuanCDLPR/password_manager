import React, { useEffect, useMemo, useState } from "react";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import KeyIcon from "@mui/icons-material/Key";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import { Link, useLocation } from "react-router-dom";
import { clearStorageJWT } from "../context/storaje";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

const BASE_SECTIONS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    items: [
      { label: "Resumen de seguridad", path: "/", icon: SecurityOutlinedIcon },
      {
        label: "Accesos recientes",
        path: "/dashboard/accesos-recientes",
        icon: UpdateOutlinedIcon,
      },
      {
        label: "Alertas",
        path: "/alertas",
        icon: NotificationsActiveOutlinedIcon,
      },
    ],
  },
  {
    id: "vault",
    label: "Bóveda",
    icon: LockOutlinedIcon,
    items: [
      { label: "Grupos", path: "/grupos", icon: AutoAwesomeMotionIcon },
      { label: "Plataformas", path: "/plataformas", icon: SportsEsportsIcon },
      { label: "Accesos", path: "/accesos", icon: KeyIcon },
      {
        label: "Notas seguras",
        path: "/notas-seguras",
        icon: NoteAltOutlinedIcon,
      },
      { label: "Favoritos", path: "/favoritos", icon: StarOutlineIcon },
      { label: "Papelera", path: "/papelera", icon: DeleteSweepOutlinedIcon },
    ],
  },
  {
    id: "security",
    label: "Seguridad",
    icon: SecurityOutlinedIcon,
    items: [
      {
        label: "Análisis de contraseñas",
        path: "/analisis-seguridad",
        icon: AnalyticsOutlinedIcon,
      },
      { label: "Generador", path: "/generador", icon: PasswordOutlinedIcon },
      {
        label: "Sesiones y dispositivos",
        path: "/sesiones",
        icon: DevicesOutlinedIcon,
      },
      { label: "Auditoría", path: "/auditoria", icon: HistoryOutlinedIcon },
    ],
  },
  {
    id: "account",
    label: "Cuenta",
    icon: AccountCircleOutlinedIcon,
    items: [
      { label: "Perfil", path: "/perfil", icon: PersonOutlineIcon },
      {
        label: "Preferencias",
        path: "/preferencias",
        icon: SettingsOutlinedIcon,
      },
      {
        label: "Importar / exportar",
        path: "/importar-exportar",
        icon: ImportExportOutlinedIcon,
      },
      {
        label: "Recuperación",
        path: "/recuperacion",
        icon: RestoreOutlinedIcon,
      },
      { label: "Respaldos", path: "/respaldos", icon: BackupOutlinedIcon },
    ],
  },
];

const ADMIN_SECTION = {
  id: "admin",
  label: "Administración",
  icon: AdminPanelSettingsIcon,
  items: [
    { label: "Usuarios", path: "/admin/users", icon: PeopleOutlineIcon },
    {
      label: "Invitaciones",
      path: "/admin/invitations",
      icon: MailOutlineIcon,
    },
    {
      label: "Auditoría administrativa",
      path: "/admin/audit",
      icon: ManageAccountsOutlinedIcon,
    },
  ],
};

function isCurrentPath(currentPath, optionPath) {
  if (optionPath === "/") return currentPath === "/";
  return currentPath === optionPath || currentPath.startsWith(`${optionPath}/`);
}

function MenuOption({ label, path, icon: Icon, selected }) {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        component={Link}
        to={path}
        selected={selected}
        sx={{
          minHeight: 44,
          pl: 4,
          pr: 2.5,
          color: "white",
          textDecoration: "none",
          "&:visited": {
            color: "white",
          },

          "&:hover": {
            color: "white",
            textDecoration: "none",
          },

          "&.Mui-selected": {
            color: "white",
          },

          "&.Mui-selected:hover": {
            color: "white",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
          <Icon fontSize="small" />
        </ListItemIcon>

        <ListItemText
          primary={label}
          primaryTypographyProps={{
            fontSize: ".875rem",
            noWrap: true,
            color: "inherit",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

function MenuSection({ section, open, expanded, onToggle, currentPath }) {
  const Icon = section.icon;

  return (
    <>
      <Tooltip title={open ? "" : section.label} placement="right-end">
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            aria-expanded={open ? expanded : undefined}
            onClick={() => onToggle(section.id)}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
                minWidth: 0,
                mr: open ? 3 : "auto",
              }}
            >
              <Icon />
            </ListItemIcon>
            <ListItemText
              primary={section.label}
              sx={{ opacity: open ? 1 : 0 }}
            />
            {open && (expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </ListItemButton>
        </ListItem>
      </Tooltip>

      <Collapse in={open && expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {section.items.map((option) => (
            <MenuOption
              key={option.path}
              {...option}
              selected={isCurrentPath(currentPath, option.path)}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default function ListOptions({ open, isSuperadmin }) {
  const { pathname } = useLocation();
  const sections = useMemo(
    () => (isSuperadmin ? [...BASE_SECTIONS, ADMIN_SECTION] : BASE_SECTIONS),
    [isSuperadmin],
  );
  const activeSection =
    sections.find((section) =>
      section.items.some((option) => isCurrentPath(pathname, option.path)),
    )?.id ?? "dashboard";
  const [expandedSection, setExpandedSection] = useState(activeSection);

  useEffect(() => {
    setExpandedSection(activeSection);
  }, [activeSection]);

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

  const toggleSection = (sectionId) => {
    setExpandedSection((current) => (current === sectionId ? "" : sectionId));
  };

  return (
    <>
      <List>
        {sections.map((section) => (
          <MenuSection
            key={section.id}
            section={section}
            open={open}
            expanded={expandedSection === section.id}
            onToggle={toggleSection}
            currentPath={pathname}
          />
        ))}
      </List>

      <Divider />

      <List>
        <Tooltip title={open ? "" : "Cerrar sesión"} placement="right-end">
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={closeSession}
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
              <ListItemText primary="Salir" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </>
  );
}
