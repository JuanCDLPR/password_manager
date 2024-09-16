import { LoadingButton } from "@mui/lab";
import {
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

export default function CambiarPass() {
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(false);
  const [IsGuardando, setIsGuardando] = useState(false);

  const [Values, setValues] = useState({
    nombre: "",
    usuario: "",
    url: "",
  });

  const [Errores, setErrores] = useState({
    nombre: false,
    usuario: false,
    url: false,
  });

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

  return (
    <>
      <Card>
        <CardContent>
          <Row>
            <Col xs={4} className="p-3">
              <TextField
                label="Contraseña actual"
                fullWidth
                name="nombre"
                value={Values.nombre}
                error={Errores.nombre}
                onChange={handlInputChange}
              />
            </Col>
            <Col xs={4} className="p-3">
              <TextField
                label="Nueva contraseña"
                fullWidth
                name="usuario"
                value={Values.usuario}
                error={Errores.usuario}
                onChange={handlInputChange}
              />
            </Col>
            <Col xs={4} className="p-3">
              <TextField
                label="Repite contraseña"
                fullWidth
                name="usuario"
                value={Values.usuario}
                error={Errores.usuario}
                onChange={handlInputChange}
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
              onClick={() => {}}
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
