import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useNavigate, useParams } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { getInfoPlataforma, guardar } from "../functions/plataformas";

const MySwal = withReactContent(Swal);

export default function Plataforma() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    id: id ?? "0",
    nombre: "",
    url: "",
  });
  const [errors, setErrors] = useState({ nombre: false, url: false });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: false }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSaving) return;

    if (values.url.length > 200) {
      setErrors((current) => ({ ...current, url: true }));
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      const data = await guardar(values, errors, setErrors);
      await MySwal.fire({
        title: isEditing ? "Cambios guardados" : "Plataforma creada",
        text: data.message,
        icon: "success",
        confirmButtonColor: "#6366f1",
        background: "#0c1727",
        color: "#f8fafc",
      });
      navigate(-1);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    getInfoPlataforma(id)
      .then((response) => setValues(response.Values))
      .catch((error) => {
        MySwal.fire({
          title: "No se pudo abrir la plataforma",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#6366f1",
          allowEscapeKey: false,
          allowOutsideClick: false,
          background: "#0c1727",
          color: "#f8fafc",
        }).then(() => navigate(-1));
      })
      .finally(() => setIsLoading(false));
  }, [id, navigate]);

  return (
    <Box sx={{ minHeight: "calc(100dvh - 112px)", py: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg" disableGutters>
        <Stack spacing={3}>
          <Box>
            <Button
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ mb: 2, textTransform: "none" }}
            >
              Volver a plataformas
            </Button>
            <Typography component="h1" variant="h4" fontWeight={800}>
              {isEditing ? "Editar plataforma" : "Nueva plataforma"}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.75 }}>
              {isEditing
                ? "Actualiza la identidad visual y los datos del servicio."
                : "Registra un servicio para relacionarlo con tus accesos."}
            </Typography>
          </Box>

          <Paper
            component="form"
            onSubmit={handleSubmit}
            noValidate
            variant="outlined"
            sx={{ borderRadius: 3, overflow: "hidden" }}
          >
            <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    alignItems: "center",
                    bgcolor: "rgba(99, 102, 241, .14)",
                    borderRadius: 2,
                    color: "primary.light",
                    display: "flex",
                    height: 42,
                    justifyContent: "center",
                    width: 42,
                  }}
                >
                  <LanguageRoundedIcon />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Información de la plataforma
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    El nombre es obligatorio; el icono es opcional.
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Divider />

            {isLoading ? (
              <Stack alignItems="center" spacing={2} sx={{ py: 10 }}>
                <CircularProgress size={32} />
                <Typography color="text.secondary">Cargando información…</Typography>
              </Stack>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gap: { xs: 3, md: 5 },
                  gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.35fr) minmax(260px, .65fr)" },
                  p: { xs: 2.5, md: 3.5 },
                }}
              >
                <Stack spacing={3}>
                  <TextField
                    autoFocus
                    fullWidth
                    name="nombre"
                    label="Nombre de la plataforma"
                    placeholder="Ej. GitHub, Google o Microsoft"
                    value={values.nombre}
                    error={errors.nombre}
                    helperText={errors.nombre ? "Ingresa un nombre." : "Así identificarás el servicio en el sistema."}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 100 }}
                  />
                  <TextField
                    fullWidth
                    name="url"
                    label="URL del icono"
                    placeholder="https://ejemplo.com/icono.png"
                    value={values.url}
                    error={errors.url}
                    helperText={
                      errors.url
                        ? "La URL no es válida o supera los 200 caracteres."
                        : "Usa una imagen HTTPS cuadrada para obtener mejores resultados."
                    }
                    onChange={handleInputChange}
                    multiline
                    minRows={2}
                    inputProps={{ maxLength: 201 }}
                  />
                </Stack>

                <Paper
                  variant="outlined"
                  sx={{
                    alignItems: "center",
                    bgcolor: "rgba(15, 23, 42, .5)",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: 220,
                    p: 3,
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    src={values.url || undefined}
                    alt={values.nombre || "Vista previa"}
                    sx={{
                      bgcolor: "rgba(99, 102, 241, .16)",
                      border: "1px solid rgba(129, 140, 248, .3)",
                      color: "primary.light",
                      height: 88,
                      width: 88,
                    }}
                  >
                    <ImageOutlinedIcon sx={{ fontSize: 38 }} />
                  </Avatar>
                  <Typography fontWeight={800} sx={{ mt: 2 }}>
                    {values.nombre.trim() || "Vista previa"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Así se mostrará en el catálogo.
                  </Typography>
                </Paper>
              </Box>
            )}

            <Divider />
            <Stack
              direction={{ xs: "column-reverse", sm: "row" }}
              justifyContent="flex-end"
              spacing={1.5}
              sx={{ p: { xs: 2.5, md: 3 } }}
            >
              <Button
                disabled={isSaving}
                onClick={() => navigate(-1)}
                variant="outlined"
                sx={{ minWidth: 120, textTransform: "none" }}
              >
                Cancelar
              </Button>
              <LoadingButton
                loading={isSaving}
                loadingPosition="start"
                disabled={isLoading}
                startIcon={<SaveOutlinedIcon />}
                type="submit"
                variant="contained"
                sx={{ minWidth: 170, textTransform: "none", fontWeight: 800 }}
              >
                {isEditing ? "Guardar cambios" : "Crear plataforma"}
              </LoadingButton>
            </Stack>
          </Paper>
        </Stack>
      </Container>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setMessage("")} severity="error" variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
