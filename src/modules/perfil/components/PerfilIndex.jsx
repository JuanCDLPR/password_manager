import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  TextField,
  Button,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Aldeano from "../../../assets/aldeano.jpg";
import { LoadingButton } from "@mui/lab";
import moment from "moment-timezone";
import { MySwal, StyledSnackbar } from "../../../lib/GeneralesImports";
import { getInfoPerfil, guardar } from "../functions/perfil";
import { setLocalStorage } from "../../../context/storaje";
import { ContextGeneral } from "../../../includes/Menu";

export default function PerfilIndex() {
  const AvatarSize = 90;

  const { setName } = useContext(ContextGeneral);

  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);
  const [IsGuardando, setIsGuardando] = useState(false);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [Values, setValues] = useState({
    nombre: "",
    usuario: "",
    url: "",
    actualizado: "",
  });

  const [Errores, setErrores] = useState({
    nombre: false,
    usuario: false,
    url: false,
    actualizado: false,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handlInputChange = ({ target }) => {
    const Name = target.name;
    const Value = target.value;
    let NewValue = {
      ...Values,
      [Name]: Value,
    };

    setValues(NewValue);
    setErrores({
      ...Errores,
      [Name]: false,
    });
  };

  const consultarInformacion = () => {
    getInfoPerfil()
      .then((resp) => {
        if (resp?.err?.length === 0) {
          MySwal.fire({
            title: "Error",
            html: resp.mensaje,
            icon: "error",
            confirmButtonColor: "#3ABE88",
            showConfirmButton: true,
            allowEscapeKey: false,
            allowEnterKey: false,
            allowOutsideClick: false,
            background: "#333333",
            color: "#FFFFFF",
          }).then(() => {
            navigate(-1);
          });
        } else {
          //console.log(resp);

          setValues(resp.Values);
        }
      })
      .catch((resp) => {
        MySwal.fire({
          title: "Error",
          html: resp.mensaje,
          icon: "error",
          confirmButtonColor: "#3ABE88",
          showConfirmButton: true,
          allowEscapeKey: false,
          allowEnterKey: false,
          allowOutsideClick: false,
          background: "#333333",
          color: "#FFFFFF",
        }).then(() => {
          navigate(-1);
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const Guardar = () => {
    setIsGuardando(true);
    guardar(Values, Errores, setErrores)
      .then((data) => {
        if (data.codigo == 200) {
          setIsGuardando(false);
          MySwal.fire({
            title: "Correcto",
            html: data.mensaje,
            icon: "success",
            confirmButtoColor: "#3ABE88",
            showConfirmButton: false,
            timer: 12700,
            background: "#333333",
            color: "#FFFFFF",
          }).then((result) => {
            //navigate(-1);
            setLocalStorage("nombre", data.data[0].name);
            setLocalStorage("user", data.data[0].user);
            setName(data.data[0].name);

            consultarInformacion();
          });
        } else {
          setMensaje(data.mensaje);
          setOpen(true);
          setIsGuardando(false);
        }
      })
      .catch((data) => {
        setMensaje(data.mensaje);
        setOpen(true);
        setIsGuardando(false);
      });
  };

  useEffect(() => consultarInformacion(), []);

  return (
    <>
      <StyledSnackbar
        direction="right"
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {mensaje}
        </Alert>
      </StyledSnackbar>
      <Card>
        <CardContent>
          <Row>
            <Col xs={3}>
              <div className="d-flex justify-content-start p-5">
                <Avatar
                  alt="Remy Sharp"
                  src={Values.url !== "" ? Values.url : Aldeano}
                  sx={{ width: AvatarSize, height: AvatarSize }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={Aldeano}
                    sx={{ width: AvatarSize, height: AvatarSize }}
                  />
                </Avatar>
              </div>
            </Col>
            <Col
              xs={9}
              className="d-flex justify-content-start align-items-center"
            >
              <Typography variant="h6">
                Actualizado por ultima vez:{" "}
                {Values.actualizado !== ""
                  ? moment(Values.actualizado)
                      .tz("America/Mexico_City")
                      .format("YYYY-MM-DD h:mm:ss a")
                  : "---------"}
              </Typography>
            </Col>
            <Col xs={4} className="p-3">
              <TextField
                label="Nombre"
                fullWidth
                name="nombre"
                value={Values.nombre}
                error={Errores.nombre}
                onChange={handlInputChange}
              />
            </Col>
            <Col xs={4} className="p-3">
              <TextField
                label="Usuario"
                fullWidth
                name="usuario"
                value={Values.usuario}
                error={Errores.usuario}
                onChange={handlInputChange}
              />
            </Col>
            <Col xs={5} className="p-3">
              <Link
                style={{
                  color: "orange",
                }}
                to={"./update-password"}
              >
                Cambiar Contraseña
              </Link>
            </Col>
          </Row>
        </CardContent>
        <CardActions className="">
          <Stack
            className="p-3"
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            //style={{}}
          >
            <LoadingButton
              loading={IsGuardando}
              loadingPosition="start"
              disabled={IsLoading}
              onClick={() => Guardar()}
              className="btn btn-create font-AvenirMedium  py-2 px-4 "
              variant="contained"
              xs={{ with: "100$" }}
              startIcon={<></>}
              endIcon={<></>}
            >
              <span className={IsGuardando ? "px-4" : "px-2"}>
                {IsGuardando ? "Guardando..." : "Guardar"}
              </span>
            </LoadingButton>
            <Button
              onClick={() => navigate(-1)}
              className="btn btn-cancel font-AvenirMedium py-2 px-4"
              variant="outlined"
            >
              Cancelar
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}
