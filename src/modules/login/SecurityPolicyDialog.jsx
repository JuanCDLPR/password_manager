import React from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";

function PolicyBlock({ icon, title, children }) {
  return (
    <Box>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <Box
          sx={{
            alignItems: "center",
            bgcolor: "rgba(99, 102, 241, 0.12)",
            borderRadius: 2,
            color: "primary.light",
            display: "flex",
            height: 36,
            justifyContent: "center",
            width: 36,
          }}
        >
          {icon}
        </Box>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
      </Stack>
      <Typography
        component="div"
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: 1.75, pl: { sm: 6.5 } }}
      >
        {children}
      </Typography>
    </Box>
  );
}

export default function SecurityPolicyDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="security-policy-title"
      PaperProps={{
        sx: {
          backgroundImage: "none",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle component="div" id="security-policy-title" sx={{ pb: 1 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <PolicyOutlinedIcon color="primary" />
          <Box>
            <Typography component="h2" variant="h6" fontWeight={800}>
              Seguridad, privacidad y uso responsable
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Estado funcional actualizado al 30 de julio de 2026
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <Alert
            severity="warning"
            icon={<ConstructionRoundedIcon />}
            sx={{ alignItems: "center" }}
          >
            <strong>La bóveda de credenciales aún está en desarrollo.</strong>{" "}
            No guardes contraseñas de otros servicios en nombres, URLs, perfil
            u otros campos actuales.
          </Alert>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              icon={<CheckCircleOutlineRoundedIcon />}
              label="Autenticación disponible"
              color="success"
              variant="outlined"
            />
            <Chip
              icon={<CheckCircleOutlineRoundedIcon />}
              label="Acceso por invitación"
              color="success"
              variant="outlined"
            />
            <Chip
              icon={<ConstructionRoundedIcon />}
              label="Bóveda cifrada: en diseño"
              color="warning"
              variant="outlined"
            />
          </Stack>

          <Divider />

          <PolicyBlock
            icon={<CheckCircleOutlineRoundedIcon fontSize="small" />}
            title="Protección de tu cuenta"
          >
            La contraseña de acceso se transforma con bcrypt y no puede
            recuperarse en texto legible. Las sesiones pueden invalidarse al
            cambiar la contraseña y las cuentas desactivadas pierden acceso.
            El registro está limitado a invitaciones únicas y expirables.
          </PolicyBlock>

          <PolicyBlock
            icon={<StorageOutlinedIcon fontSize="small" />}
            title="Datos almacenados actualmente"
          >
            El sistema conserva nombre, usuario, correo, datos básicos del
            perfil, información de sesión, invitaciones y metadatos de
            plataformas. MongoDB no recibe la contraseña de acceso en texto
            plano. Los logs HTTP omiten cuerpos, tokens y encabezados de
            autorización.
          </PolicyBlock>

          <PolicyBlock
            icon={<DevicesRoundedIcon fontSize="small" />}
            title="Responsabilidades del usuario"
          >
            Utiliza una contraseña exclusiva de al menos 12 caracteres,
            protege el acceso al dispositivo y cierra sesión en equipos
            compartidos. No compartas invitaciones ni tokens. El JWT se guarda
            actualmente en el perfil local del navegador, por lo que debes
            tratar ese perfil como un entorno confiable.
          </PolicyBlock>

          <PolicyBlock
            icon={<ConstructionRoundedIcon fontSize="small" />}
            title="Alcance y evolución del producto"
          >
            Grupos, accesos y cifrado de credenciales se habilitarán únicamente
            después de aprobar el diseño criptográfico. Esta pantalla informa
            el estado técnico actual y no sustituye términos legales o un aviso
            de privacidad formal para una operación comercial pública.
          </PolicyBlock>

          <Alert severity="info">
            Si detectas actividad inesperada, cierra la sesión y contacta al
            administrador responsable de esta instancia.
          </Alert>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained">
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
}
