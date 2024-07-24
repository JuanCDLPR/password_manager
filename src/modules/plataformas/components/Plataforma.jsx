import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  Stack,
  styled,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonBack from "../../../includes/ButtonBack";

export default function Plataforma() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);
  const [IsGuardando, setIsGuardando] = useState(false);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [Values, setValues] = useState({
    id: id ?? "0",
    nombre: "",
    url: "",
  });

  const [Errores, setErrores] = useState({
    nombre: false,
    url: false,
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

    if (Name == "nombre") {
      NewValue = { ...NewValue, [Name]: Value.removeAccents() };
    }

    setValues(NewValue);
    setErrores({
      ...Errores,
      [Name]: false,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const StyledSnackbar = styled((props) => <Snackbar {...props} />)(
    ({ theme }) => ({
      "& .MuiSnackbar-root": {
        top: theme.spacing(15),
      },
    })
  );

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

      <ButtonBack title="Plataformas" onClick={() => navigate(-1)} />

      <Card elevation={3} className="mb-4">
        <CardContent className="p-0">
          <div className="p-3">
            <h6 className="mb-0 text-left font-AvenirBold">
              {id ? "Editar plataforma" : "Nueva plataforma"}
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

            <Col sm={12} md={12} className="p-3">
              <TextField
                fullWidth
                name="url"
                label="Url Imagen"
                variant="outlined"
                helperText={Errores.url ? "inválido" : ""}
                value={Values.url}
                error={Errores.url}
                onChange={handlInputChange}
                multiline
                rows={2}
              />
            </Col>
          </Row>
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
