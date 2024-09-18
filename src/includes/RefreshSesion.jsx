import React, { useEffect, useState, useCallback } from "react";
import { Tooltip, Menu, MenuItem, IconButton, Alert } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { getLocalStorageJWT, setLocalStorageJWT } from "../context/storaje";
import { jwtDecode } from "jwt-decode";
import { getData } from "../context/backend";
import { MySwal, StyledSnackbar } from "../lib/GeneralesImports";
import Trees from "../assets/trees.png";
import NyanCat from "../assets/nyan-cat.gif";
import Logo from "../assets/key.png";

const RefreshSesion = () => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [token, setToken] = useState(getLocalStorageJWT());
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openA, setOpenA] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseA = () => {
    setOpenA(false);
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { exp } = decodedToken;

        // Convierte el tiempo de expiración en un objeto Date
        const expiresAt = new Date(exp * 1000);

        const updateTimer = () => {
          const now = new Date();
          const timeLeft = expiresAt - now;

          if (timeLeft >= 0) {
            setTimeRemaining(timeLeft);
          } else {
            setTimeRemaining(0);
            clearInterval(intervalId);
          }
        };

        // Actualiza el temporizador inmediatamente y luego cada segundo
        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  const formatTime = useCallback((time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }, []);

  const RefrescarToken = () => {
    const decodedToken = jwtDecode(token);
    const { iat, exp } = decodedToken;

    // Tiempo de emisión y expiración en milisegundos
    const issuedAt = new Date(iat * 1000);
    const now = new Date();

    const timeElapsed = now - issuedAt;

    // Validar que hayan pasado al menos 5 minutos (300,000 ms) desde la última actualización
    if (timeElapsed < 300000) {
      //if (false) {
      setMensaje("No puedes actualizar el token antes de 5 minutos.");
      setOpenA(true);
    } else {
      MySwal.fire({
        title: "Ingresa tu contraseña para continuar",
        width: 600,
        padding: "2em",
        color: "#716add",
        background: `#fff url(${Trees})`,
        backdrop: `
          rgba(0,0,123,0.4)
          url(${NyanCat})
          right top
          no-repeat
        `,
        confirmButtoColor: "#3ABE88",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        timer: 12700,
        input: "password",
        imageUrl: Logo,
        imageWidth: 70,
        imageHeight: 70,
        imageAlt: "Custom image",
      }).then((result) => {
        if (result.value) {
          getData(`usuarios/refresh?pass_confirm=${result.value}`)
            .then((data) => {
              if (!data.error) {
                //console.log(data.data);

                setLocalStorageJWT(data.data[0]);
                setToken(data.data[0]);
              } else {
                //setMensaje("No se pudo actualizar el token");
                setMensaje(data.mensaje);
                setOpenA(true);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          setMensaje("Ingresa la contraseña para actualizar el token");
          setOpenA(true);
        }
      });
    }
  };

  return (
    <>
      <StyledSnackbar
        direction="right"
        open={openA}
        autoHideDuration={3000}
        onClose={handleCloseA}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseA} severity="error" sx={{ width: "100%" }}>
          {mensaje}
        </Alert>
      </StyledSnackbar>

      <div className="me-2 d-none d-sm-flex align-items-center justify-content-center">
        <div>Sesion expira en:</div>
        <div className="ms-1">{formatTime(timeRemaining)}</div>
        <Tooltip title="Refrescar Token">
          <IconButton className="ms-3" onClick={RefrescarToken}>
            <HistoryIcon style={{ color: "#A0A0A0" }} />
          </IconButton>
        </Tooltip>
      </div>

      <div className="me-2 d-block d-sm-none">
        <Tooltip title="Refrescar Token">
          <IconButton className="mx-2" onClick={handleClick}>
            <HistoryIcon style={{ color: "#A0A0A0" }} />
          </IconButton>
        </Tooltip>
      </div>

      <Menu
        anchorEl={anchorEl}
        id="account-notificaciones"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "auto",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <div>exp:</div>
          <div className="ms-1 fw-bold">{formatTime(timeRemaining)}</div>
        </MenuItem>
        <MenuItem onClick={RefrescarToken}>
          <div>Refrescar token</div>
          <div className="ms-2">
            <HistoryIcon style={{ color: "#A0A0A0" }} />
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

export default RefreshSesion;
