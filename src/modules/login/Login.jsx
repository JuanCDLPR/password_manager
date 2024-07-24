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
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../context/backend";

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

    if (!Values.Correo || Values.Correo == "") {
      setCorreoError(true);
    } else {
      setCorreoError(false);
    }
    if (!Values.Contraseña || Values.Contraseña == "") {
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
    if (!Values.Correo || Values.Correo == "") {
      setCorreoError(true);
      error = true;
    }
    if (!Values.Contraseña || Values.Contraseña == "") {
      setContraseñaError(true);
      error = true;
    }
    if (!error) {
      setOpenLoading(true);
      const info = {
        user: Values.Correo,
        password: Values.Contraseña,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      };

      fetch(`${BACKEND_URL}usuarios/auth`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          //console.log(response);
          setOpenLoading(false);
          if (response.codigo == 200) {
            //console.log(response);

            setLocalStorageJWT(response.data.token);
            setLocalStorage("nombre", response.data.name);
            setLocalStorage("user", response.data.user);

            window.location.reload();
          } else {
            setMensaje(response.mensaje);
            setOpen(true);
          }
        })
        .catch((error) => {
          setOpenLoading(false);
          setMensaje(
            "Ha ocurrido un error al conectar con nuestros servidores, intenta mas tarde."
          );
          setOpen(true);
          return;
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
              label="Usuario"
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
              <Link to={"registrar"} style={{ textDecoration: "none" }}>
                <Typography>Registrar</Typography>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
