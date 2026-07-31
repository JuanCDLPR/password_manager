import React, { useState } from "react";

import {
  Alert,
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { setLocalStorage, setLocalStorageJWT } from "../../context/storaje";

import Logo from "../../assets/key.png";
import { api } from "../../context/backend";

export default function Login() {
  const [Values, setValues] = useState({
    Correo: "",
    Contraseña: "",
  });
  const [openLoading, setOpenLoading] = useState(false);
  const [CorreoError, setCorreoError] = useState(false);
  const [ContraseñaError, setContraseñaError] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [open, setOpen] = useState(false);

  const handlInputChange = ({ target }) => {
    setValues({
      ...Values,
      [target.name]: target.value,
    });

    if (!Values.Correo || Values.Correo === "") {
      setCorreoError(true);
    } else {
      setCorreoError(false);
    }
    if (!Values.Contraseña || Values.Contraseña === "") {
      setContraseñaError(true);
      return;
    } else {
      setContraseñaError(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      clicLogin();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clicLogin = () => {
    let error = false;
    if (!Values.Correo || Values.Correo === "") {
      setCorreoError(true);
      error = true;
    }
    if (!Values.Contraseña || Values.Contraseña === "") {
      setContraseñaError(true);
      error = true;
    }
    if (!error) {
      setOpenLoading(true);
      const info = {
        login: Values.Correo,
        password: Values.Contraseña,
      };
      api
        .post("usuarios/session", info, { auth: false })
        .then(({ data }) => {
          setOpenLoading(false);
          setLocalStorageJWT(data.token);
          setLocalStorage("nombre", data.name);
          setLocalStorage("user", data.user);
          setLocalStorage("email", data.email || "");
          setLocalStorage("role", data.role);
          window.location.reload();
        })
        .catch((error) => {
          setOpenLoading(false);
          setMensaje(error.message);
          setOpen(true);
        });
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center  aling-items-center flex-column"
        style={{
          height: "100vh",
          backgroundColor: "#242424",
        }}
      >
        <Snackbar
          direction="left"
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {mensaje}
          </Alert>
        </Snackbar>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
        <div className="mt-5 pt-5"></div>

        <Card className="shadow-lg p-4 m-auto mt-5" sx={{ maxWidth: 350 }}>
          <center>
            <img
              src={Logo}
              className="my-4"
              width={150}
              style={{ margin: "auto" }}
              alt=""
            />
          </center>
          <CardContent>
            <TextField
              error={CorreoError}
              fullWidth
              id="Correo"
              name="Correo"
              label="Usuario o correo"
              variant="outlined"
              value={Values.Correo}
              onChange={handlInputChange}
            />
            <TextField
              fullWidth
              error={ContraseñaError}
              id="Contraseña"
              name="Contraseña"
              label="Contraseña"
              variant="outlined"
              className="mt-3"
              type="password"
              value={Values.Contraseña}
              onChange={handlInputChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              className="btn-Crexendo mt-4"
              onClick={clicLogin}
            >
              <Typography
                style={{
                  textTransform: "none",
                }}
              >
                Iniciar sesión
              </Typography>
            </Button>
            <div className="d-flex flex-row justify-content-center align-items-center mt-4">
              <Typography variant="body2" color="text.secondary">
                El registro requiere una invitación.
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
