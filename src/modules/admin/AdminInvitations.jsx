import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../../context/backend";

const STATUS_LABELS = {
  pending: "Pendiente",
  used: "Utilizada",
  revoked: "Revocada",
  expired: "Expirada",
};

const STATUS_COLORS = {
  pending: "warning",
  used: "success",
  revoked: "default",
  expired: "error",
};

export default function AdminInvitations() {
  const [invitations, setInvitations] = useState([]);
  const [form, setForm] = useState({ invitedName: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const loadInvitations = useCallback(async () => {
    try {
      const { data } = await api.get("admin/invitations");
      setInvitations(data);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInvitations();
  }, [loadInvitations]);

  const createInvitation = async () => {
    if (!form.invitedName.trim() || !form.email.trim()) {
      setMessage({ type: "error", text: "Nombre y correo son obligatorios." });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const { message: responseMessage } = await api.post(
        "admin/invitations",
        form
      );
      setForm({ invitedName: "", email: "" });
      setMessage({ type: "success", text: responseMessage });
      await loadInvitations();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      if (error.code === "EMAIL_DELIVERY_FAILED") {
        await loadInvitations();
      }
    } finally {
      setSaving(false);
    }
  };

  const resendInvitation = async (id) => {
    setMessage(null);
    try {
      const { message: responseMessage } = await api.post(
        `admin/invitations/${id}/resend`
      );
      setMessage({ type: "success", text: responseMessage });
      await loadInvitations();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      if (error.code === "EMAIL_DELIVERY_FAILED") {
        await loadInvitations();
      }
    }
  };

  const revokeInvitation = async (id) => {
    setMessage(null);
    try {
      await api.delete(`admin/invitations/${id}`);
      setMessage({ type: "success", text: "Invitación revocada." });
      await loadInvitations();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Invitaciones</Typography>
        <Typography color="text.secondary">
          Genera accesos únicos y revisa su estado.
        </Typography>
      </div>

      {message && <Alert severity={message.type}>{message.text}</Alert>}

      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-3">
            Nueva invitación
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Nombre"
              value={form.invitedName}
              onChange={({ target }) =>
                setForm((current) => ({
                  ...current,
                  invitedName: target.value,
                }))
              }
            />
            <TextField
              fullWidth
              type="email"
              label="Correo"
              value={form.email}
              onChange={({ target }) =>
                setForm((current) => ({ ...current, email: target.value }))
              }
            />
            <Button
              variant="contained"
              onClick={createInvitation}
              disabled={saving}
              sx={{ minWidth: 150 }}
            >
              {saving ? "Enviando..." : "Invitar"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-3">
            Historial
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Persona</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Vencimiento</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell>
                        <Typography>{invitation.invitedName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {invitation.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={STATUS_LABELS[invitation.status]}
                          color={STATUS_COLORS[invitation.status]}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(invitation.expiresAt).toLocaleString("es-MX")}
                      </TableCell>
                      <TableCell align="right">
                        {invitation.status === "pending" && (
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                          >
                            <Button
                              size="small"
                              onClick={() =>
                                resendInvitation(invitation.id)
                              }
                            >
                              Reenviar
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              onClick={() =>
                                revokeInvitation(invitation.id)
                              }
                            >
                              Revocar
                            </Button>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {invitations.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No hay invitaciones.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}
