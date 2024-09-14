import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Avatar,
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
import { getInfoPlataforma, guardar } from "../functions/plataformas";
import AvatarDefault from "../../../includes/AvatarDefault";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

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

    /* if (Name == "nombre") {
      NewValue = { ...NewValue, [Name]: Value.removeAccents() };
    } */

    if (Name == "url") {
      if (Value.length > 200) {
        NewValue = { ...NewValue, [Name]: "" };
      }
    }

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
      getInfoPlataforma(id)
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
            <Col sm={12} md={6} className="p-3">
              <div className="d-flex justify-content-start align-items-center h-100 ps-5">
                {Values.url !== "" && <AvatarDefault src={Values.url} />}
              </div>
            </Col>

            {/*   <Col sm={12} md={12} className="p-3">
                 <label for="file" class="custum-file-upload">
                <div class="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </div>
                <div class="text">
                  <span>
                    {selectedFile !== null
                      ? selectedFile.name
                      : "Click para subir imagenes"}
                  </span>
                </div>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple={false}
                />
              </label> 
            </Col> */}

            <Col sm={12} md={12} className="p-3 ">
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
