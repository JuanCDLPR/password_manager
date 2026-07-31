import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../context/backend";

export default function Reigister() {
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get("invitation") || "";
  const [Values, setValues] = useState({
    Usuario: "",
    Correo: "",
    Contrasena: "",
    Nombre: "",
  });

  const [IsLoading, setIsLoading] = useState(false);
  const [InvitationLoading, setInvitationLoading] = useState(true);
  const [InvitationValid, setInvitationValid] = useState(false);
  const [InvitationError, setInvitationError] = useState("");

  const [Errores, setErrores] = useState({
    Usuario: false,
    Correo: false,
    Contrasena: false,
    Nombre: false,
  });

  const [mensaje, setMensaje] = useState("");
  const [open, setOpen] = useState(false);

  const [severity, setSeverity] = useState("error");

  useEffect(() => {
    if (!invitationToken) {
      setInvitationError(
        "El registro solo está disponible mediante una invitación."
      );
      setInvitationLoading(false);
      return;
    }

    api
      .get(`invitations/${encodeURIComponent(invitationToken)}`, {
        auth: false,
      })
      .then(({ data }) => {
        setValues((current) => ({
          ...current,
          Correo: data.email,
          Nombre: data.invitedName,
        }));
        setInvitationValid(true);
      })
      .catch((error) => {
        setInvitationError(error.message);
      })
      .finally(() => setInvitationLoading(false));
  }, [invitationToken]);

  const handlInputChange = ({ target }) => {
    setValues({
      ...Values,
      [target.name]: target.value,
    });

    setErrores({ ...Errores, [target.name]: false });
  };

  const registrar = () => {
    let error = false;

    if (!Values.Usuario || Values.Usuario === "") {
      Errores.Usuario = true;
      error = true;
    }

    if (!Values.Correo || Values.Correo === "") {
      Errores.Correo = true;
      error = true;
    }

    if (!Values.Contrasena || Values.Contrasena === "") {
      Errores.Contrasena = true;
      error = true;
    }

    if (!Values.Nombre || Values.Nombre === "") {
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
      email: Values.Correo,
      password: Values.Contrasena,
      invitationToken,
    };

    api
      .post("usuarios", body, { auth: false })
      .then(({ message }) => {
        setSeverity("success");
        setMensaje(message);
        setOpen(true);
        setValues({
          Usuario: "",
          Correo: "",
          Contrasena: "",
          Nombre: "",
        });
        setTimeout(() => {
          window.location = "../";
        }, 2000);
      })
      .catch((error) => {
        setMensaje(error.message);
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
          {InvitationLoading && (
            <Alert severity="info" className="mb-3">
              Validando invitación...
            </Alert>
          )}
          {InvitationError && (
            <Alert severity="error" className="mb-3">
              {InvitationError}
            </Alert>
          )}
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
            error={Errores.Correo}
            fullWidth
            id="Correo"
            name="Correo"
            label="Correo electrónico"
            variant="outlined"
            type="email"
            value={Values.Correo}
            onChange={handlInputChange}
            className="mt-3"
            disabled
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
            disabled={IsLoading || InvitationLoading || !InvitationValid}
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
