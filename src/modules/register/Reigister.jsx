import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { json, Link } from "react-router-dom";
import { BACKEND_URL } from "../../context/backend";

export default function Reigister() {
  const [Values, setValues] = useState({
    Usuario: "",
    Contrasena: "",
    Nombre: "",
  });

  const [IsLoading, setIsLoading] = useState(false);

  const [Errores, setErrores] = useState({
    Usuario: false,
    Contrasena: false,
    Nombre: false,
  });

  const [mensaje, setMensaje] = useState("");
  const [open, setOpen] = useState(false);

  const [severity, setSeverity] = useState("error");

  const handlInputChange = ({ target }) => {
    setValues({
      ...Values,
      [target.name]: target.value,
    });

    setErrores({ ...Errores, [target.name]: false });
  };

  const registrar = () => {
    let error = false;

    if (!Values.Usuario || Values.Usuario == "") {
      Errores.Usuario = true;
      error = true;
    }

    if (!Values.Contrasena || Values.Contrasena == "") {
      Errores.Contrasena = true;
      error = true;
    }

    if (!Values.Nombre || Values.Nombre == "") {
      Errores.Nombre = true;
      error = true;
    }

    if (error) {
      setMensaje("Ingresa todos los campos");
      setOpen(true);
      setErrores(Errores);
      return;
    }

    setIsLoading(true);

    const body = {
      name: Values.Nombre,
      user: Values.Usuario,
      password: Values.Contrasena,
    };

    fetch(`${BACKEND_URL}usuarios/registrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.codigo == 200) {
          setSeverity("success");
          setMensaje("registrado correctamente");
          setOpen(true);

          setValues({
            Correo: "",
            Contraseña: "",
            Nombre: "",
          });

          setTimeout(() => {
            window.location = "../";
          }, 2000);
        } else {
          setMensaje(res.mensaje);
          setSeverity("error");
          setOpen(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setMensaje("error");
        setSeverity("error");
        setOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          //severity="success"
          sx={{ width: "100%" }}
        >
          {mensaje}
        </Alert>
      </Snackbar>

      <Card
        className="shadow-lg p-4 m-auto"
        sx={{ maxWidth: 350 }}
        style={{
          marginTop: "60px",
        }}
      >
        <CardContent>
          <TextField
            error={Errores.Nombre}
            fullWidth
            id="Nombre"
            name="Nombre"
            label="Nombre"
            variant="outlined"
            value={Values.Nombre}
            onChange={handlInputChange}
          />

          <TextField
            error={Errores.Usuario}
            fullWidth
            id="Usuario"
            name="Usuario"
            label="Usuario"
            variant="outlined"
            value={Values.Usuario}
            onChange={handlInputChange}
            className="mt-3"
          />
          <TextField
            fullWidth
            error={Errores.Contrasena}
            id="Contrasena"
            name="Contrasena"
            label="Contraseña"
            variant="outlined"
            className="mt-3"
            type="password"
            value={Values.Contrasena}
            onChange={handlInputChange}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            className="btn-Crexendo mt-4"
            onClick={registrar}
            disabled={IsLoading}
          >
            <Typography
              style={{
                textTransform: "none",
              }}
            >
              Registrarse
            </Typography>
          </Button>

          <Typography className="text-center mt-4">
            <Link to={"/"} style={{ textDecoration: "none", color: "#000000" }}>
              Regresar
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
