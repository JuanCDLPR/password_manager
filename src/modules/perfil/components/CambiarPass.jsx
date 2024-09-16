import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MySwal, StyledSnackbar } from "../../../lib/GeneralesImports";
import { update_pass } from "../functions/perfil";
import { setLocalStorageJWT } from "../../../context/storaje";

export default function CambiarPass() {
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(false);
  const [IsGuardando, setIsGuardando] = useState(false);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [Values, setValues] = useState({
    pass: "",
    rep_pass: "",
    old_pass: "",
  });

  const [Errores, setErrores] = useState({
    pass: false,
    rep_pass: false,
    old_pass: false,
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

  const Guardar = () => {
    setIsGuardando(true);
    update_pass(Values, Errores, setErrores)
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
            if (data.data[0]) {
              setLocalStorageJWT(data.data[0]);
            }
            navigate(-1);
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
            <Col xs={4} className="p-3">
              <TextField
                label="Contraseña actual"
                fullWidth
                name="old_pass"
                value={Values.old_pass}
                error={Errores.old_pass}
                onChange={handlInputChange}
                type="password"
                helperText={Errores.old_pass ? "Completar campo" : ""}
              />
            </Col>
            <Col xs={4} className="p-3">
              <TextField
                label="Nueva contraseña"
                fullWidth
                name="pass"
                value={Values.pass}
                error={Errores.pass}
                onChange={handlInputChange}
                type="password"
                helperText={Errores.pass ? "Completar campo" : ""}
              />
            </Col>
            <Col xs={4} className="p-3">
              <TextField
                label="Repite contraseña"
                fullWidth
                name="rep_pass"
                value={Values.rep_pass}
                error={Errores.rep_pass}
                onChange={handlInputChange}
                type="password"
                helperText={Errores.rep_pass ? "Completar campo" : ""}
              />
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
