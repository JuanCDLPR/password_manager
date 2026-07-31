import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { api } from "../../context/backend";
import { setLocalStorage, setLocalStorageJWT } from "../../context/storaje";
import Logo from "../../assets/key.png";
import SecurityPolicyDialog from "./SecurityPolicyDialog";

const INITIAL_VALUES = {
  login: "",
  password: "",
};

export default function Login() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState({});
  const [requestError, setRequestError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setValues((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: false }));
    setRequestError(null);
  };

  const validate = () => {
    const errors = {
      login: !values.login.trim(),
      password: !values.password,
    };
    setFieldErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate() || isLoading) return;

    setIsLoading(true);
    setRequestError(null);

    try {
      const { data } = await api.post(
        "usuarios/session",
        {
          login: values.login.trim(),
          password: values.password,
        },
        { auth: false }
      );

      setLocalStorageJWT(data.token);
      setLocalStorage("nombre", data.name);
      setLocalStorage("user", data.user);
      setLocalStorage("email", data.email || "");
      setLocalStorage("role", data.role);
      window.location.reload();
    } catch (error) {
      setRequestError({
        message: error.message,
        requestId: error.requestId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        bgcolor: "#07111f",
        display: "flex",
        minHeight: "100dvh",
        overflow: "hidden",
        py: { xs: 3, md: 5 },
        position: "relative",
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          background:
            "radial-gradient(circle, rgba(99,102,241,.24) 0%, rgba(99,102,241,0) 68%)",
          height: 720,
          left: -280,
          position: "absolute",
          top: -260,
          width: 720,
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          background:
            "radial-gradient(circle, rgba(14,165,233,.16) 0%, rgba(14,165,233,0) 70%)",
          bottom: -320,
          height: 720,
          position: "absolute",
          right: -250,
          width: 720,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            alignItems: "center",
            display: "grid",
            gap: { xs: 4, md: 8 },
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 460px" },
            minWidth: 0,
          }}
        >
          <Stack spacing={4} sx={{ display: { xs: "none", md: "flex" } }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  alignItems: "center",
                  bgcolor: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: 2.5,
                  display: "flex",
                  height: 48,
                  justifyContent: "center",
                  width: 48,
                }}
              >
                <img src={Logo} alt="" width={30} height={30} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={800}>
                  Password Manager
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Acceso privado y administrado
                </Typography>
              </Box>
            </Stack>

            <Box>
              <Chip
                icon={<SecurityRoundedIcon />}
                label="Instancia protegida por invitación"
                color="primary"
                variant="outlined"
                sx={{ mb: 3 }}
              />
              <Typography
                component="h1"
                sx={{
                  fontSize: { md: "3.4rem", lg: "4rem" },
                  fontWeight: 800,
                  letterSpacing: "-0.055em",
                  lineHeight: 1.02,
                  maxWidth: 620,
                }}
              >
                Un acceso claro para una seguridad seria.
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontSize: "1.05rem", lineHeight: 1.8, mt: 3, maxWidth: 590 }}
              >
                Administra tu cuenta en un entorno privado, con sesiones
                revocables, registro controlado y trazabilidad sin exponer
                credenciales en los logs.
              </Typography>
            </Box>

            <Stack spacing={2}>
              {[
                "Ingreso exclusivo para usuarios autorizados",
                "Sesiones verificadas contra el estado de la cuenta",
                "Invitaciones únicas, expirables y auditables",
              ].map((item) => (
                <Stack key={item} direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleRoundedIcon color="primary" fontSize="small" />
                  <Typography color="text.secondary">{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>

          <Paper
            component="section"
            elevation={0}
            sx={{
              backdropFilter: "blur(24px)",
              backgroundColor: "rgba(12, 23, 39, .92)",
              border: "1px solid rgba(148, 163, 184, .18)",
              borderRadius: 4,
              boxShadow: "0 30px 80px rgba(0,0,0,.38)",
              minWidth: 0,
              overflow: "hidden",
              p: { xs: 2.5, sm: 5 },
              width: "100%",
            }}
          >
            <Stack spacing={3.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    alignItems: "center",
                    bgcolor: "primary.main",
                    borderRadius: 2,
                    display: "flex",
                    height: 42,
                    justifyContent: "center",
                    width: 42,
                  }}
                >
                  <LockOutlinedIcon />
                </Box>
                <Box sx={{ display: { md: "none" } }}>
                  <Typography fontWeight={800}>Password Manager</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Acceso privado
                  </Typography>
                </Box>
              </Stack>

              <Box>
                <Typography variant="h4" component="h2" fontWeight={800}>
                  Iniciar sesión
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.7 }}>
                  Ingresa con tu usuario o correo autorizado.
                </Typography>
              </Box>

              {requestError && (
                <Alert severity="error">
                  <Typography variant="body2" fontWeight={700}>
                    {requestError.message}
                  </Typography>
                  {requestError.requestId && (
                    <Typography variant="caption" sx={{ opacity: 0.78 }}>
                      Referencia: {requestError.requestId}
                    </Typography>
                  )}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2.5}>
                  <TextField
                    autoComplete="username"
                    autoFocus
                    error={fieldErrors.login}
                    fullWidth
                    helperText={
                      fieldErrors.login
                        ? "Ingresa tu usuario o correo."
                        : "Usa el identificador asociado a tu invitación."
                    }
                    id="login"
                    label="Usuario o correo"
                    name="login"
                    onChange={handleInputChange}
                    value={values.login}
                  />
                  <TextField
                    autoComplete="current-password"
                    error={fieldErrors.password}
                    fullWidth
                    helperText={
                      fieldErrors.password
                        ? "Ingresa tu contraseña."
                        : "Tu contraseña nunca se muestra en esta pantalla."
                    }
                    id="password"
                    label="Contraseña"
                    name="password"
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                            }
                            edge="end"
                            onClick={() => setShowPassword((current) => !current)}
                          >
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <VisibilityOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    disabled={isLoading}
                    endIcon={
                      isLoading ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        <ArrowForwardRoundedIcon />
                      )
                    }
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ minHeight: 50, textTransform: "none", fontWeight: 800 }}
                  >
                    {isLoading ? "Verificando acceso..." : "Continuar"}
                  </Button>
                </Stack>
              </Box>

              <Stack spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
                <Typography
                  align="center"
                  variant="body2"
                  color="text.secondary"
                  sx={{ overflowWrap: "anywhere", width: "100%" }}
                >
                  El registro requiere una invitación emitida por un
                  administrador.
                </Typography>
                <Button
                  size="small"
                  onClick={() => setPolicyOpen(true)}
                  sx={{
                    lineHeight: 1.5,
                    maxWidth: "100%",
                    textAlign: "center",
                    textTransform: "none",
                    whiteSpace: "normal",
                  }}
                >
                  Consulta cómo protegemos tu cuenta y tus datos
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>

        <Typography
          align="center"
          color="text.secondary"
          variant="caption"
          sx={{ display: "block", mt: 4, opacity: 0.75 }}
        >
          © 2026 Password Manager · Acceso restringido a usuarios autorizados
        </Typography>
      </Container>

      <SecurityPolicyDialog
        open={policyOpen}
        onClose={() => setPolicyOpen(false)}
      />
    </Box>
  );
}
