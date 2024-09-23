import React, { useEffect, useState } from "react";
import { MySwal, StyledSnackbar } from "../../../lib/GeneralesImports";
import { Alert, Col, Row } from "react-bootstrap";
import ButtonBack from "../../../includes/ButtonBack";
import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { getInfoGrupo, guardar } from "../functions/grupos";

export default function Grupo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);
  const [IsGuardando, setIsGuardando] = useState(false);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [Values, setValues] = useState({
    id: id ?? "0",
    nombre: "",
    acron: "",
  });

  const [Errores, setErrores] = useState({
    nombre: false,
    acron: false,
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

  useEffect(() => {
    setIsLoading(true);

    if (id != undefined) {
      getInfoGrupo(id)
        .then((resp) => {
          //console.log(resp);
          if (resp?.err?.length == 0) {
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
    } else {
      setIsLoading(false);
    }
  }, []);

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

      <ButtonBack title="Grupos" onClick={() => navigate(-1)} />

      <Card elevation={3} className="mb-4">
        <CardContent className="p-0">
          <div className="p-3">
            <h6 className="mb-0 text-left font-AvenirBold">
              {id ? "Editar grupo" : "Nuevo grupo"}
            </h6>
          </div>
          <hr
            style={{ backgroundColor: "#DFDEE0", height: "1px", opacity: "1" }}
            className="m-0 p-0"
          />

          <Row className="p-3">
            <Col sm={12} md={6} className="p-3">
              <TextField
                fullWidth
                name="nombre"
                label="Nombre"
                variant="outlined"
                value={Values.nombre}
                error={Errores.nombre}
                onChange={handlInputChange}
              />
            </Col>

            <Col sm={12} md={6} className="p-3">
              <TextField
                fullWidth
                name="acron"
                label="Acronimo"
                variant="outlined"
                value={Values.acron}
                error={Errores.acron}
                onChange={handlInputChange}
              />
            </Col>
          </Row>
          <Stack
            className="p-3"
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
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
                {IsGuardando ? "Guardando..." : id ? "Guardar" : "Crear"}
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
        </CardContent>
      </Card>
    </>
  );
}
