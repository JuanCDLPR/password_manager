import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import { MySwal, TablePaginationActions } from "../../../lib/GeneralesImports";
import { Eliminar } from "../functions/plataformas";

const formatDate = (date) =>
  date
    ? moment(date).tz("America/Mexico_City").format("DD MMM YYYY")
    : "Sin fecha";

function PlatformAvatar({ name, src, size = 42 }) {
  return (
    <Avatar
      src={src || undefined}
      alt={name}
      sx={{
        bgcolor: "rgba(99, 102, 241, .15)",
        border: "1px solid rgba(129, 140, 248, .24)",
        color: "primary.light",
        height: size,
        width: size,
      }}
    >
      <LanguageRoundedIcon fontSize={size > 42 ? "large" : "small"} />
    </Avatar>
  );
}

export default function Tabla({
  Lista,
  IsLoading,
  error = "",
  onRetry,
  setLista,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const visibleRows =
    rowsPerPage > 0
      ? Lista.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : Lista;

  useEffect(() => {
    const lastPage = Math.max(0, Math.ceil(Lista.length / rowsPerPage) - 1);
    if (rowsPerPage > 0 && page > lastPage) setPage(lastPage);
  }, [Lista.length, page, rowsPerPage]);

  const handleDelete = (id, name) => {
    MySwal.fire({
      title: "¿Eliminar plataforma?",
      text: `${name} dejará de aparecer en tu catálogo. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#475569",
      reverseButtons: true,
      background: "#0c1727",
      color: "#f8fafc",
    }).then(({ isConfirmed }) => {
      if (!isConfirmed || !id) return;

      Eliminar(id)
        .then(() => {
          setLista((current) => current.filter((item) => item._id !== id));
          MySwal.fire({
            title: "Plataforma eliminada",
            icon: "success",
            timer: 1800,
            showConfirmButton: false,
            background: "#0c1727",
            color: "#f8fafc",
          });
        })
        .catch((deleteError) => {
          MySwal.fire({
            title: "No se pudo eliminar",
            text: deleteError.message,
            icon: "error",
            background: "#0c1727",
            color: "#f8fafc",
          });
        });
    });
  };

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={onRetry}>
            Reintentar
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  if (IsLoading) {
    return (
      <Paper variant="outlined" sx={{ borderRadius: 3, py: 8, textAlign: "center" }}>
        <CircularProgress size={30} />
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Consultando plataformas…
        </Typography>
      </Paper>
    );
  }

  if (Lista.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{ borderRadius: 3, px: 3, py: 8, textAlign: "center" }}
      >
        <InboxOutlinedIcon sx={{ color: "text.secondary", fontSize: 48 }} />
        <Typography variant="h6" fontWeight={800} sx={{ mt: 1.5 }}>
          No encontramos plataformas
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.75 }}>
          Crea una nueva o cambia los criterios de búsqueda.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Stack spacing={1.5} sx={{ display: { xs: "flex", md: "none" }, p: 2 }}>
        {visibleRows.map((row) => (
          <Paper
            key={row._id}
            variant="outlined"
            sx={{ bgcolor: "rgba(15, 23, 42, .5)", borderRadius: 2.5, p: 2 }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PlatformAvatar name={row.name} src={row.url} size={48} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography fontWeight={800} noWrap>
                  {row.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(row.fecha)}
                </Typography>
              </Box>
              <Tooltip title="Editar">
                <IconButton component={Link} to={`./edit/${row._id}`} color="primary">
                  <EditOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
                <IconButton color="error" onClick={() => handleDelete(row._id, row.name)}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
        <Table aria-label="Listado de plataformas">
          <TableHead>
            <TableRow>
              <TableCell>PLATAFORMA</TableCell>
              <TableCell>FECHA DE REGISTRO</TableCell>
              <TableCell>ESTADO</TableCell>
              <TableCell align="right">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row._id} hover>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PlatformAvatar name={row.name} src={row.url} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontWeight={750}>{row.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Servicio registrado
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(row.fecha)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip label="Disponible" color="success" size="small" variant="outlined" />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar plataforma">
                    <IconButton component={Link} to={`./edit/${row._id}`} color="primary">
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar plataforma">
                    <IconButton color="error" onClick={() => handleDelete(row._id, row.name)}>
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableFooter component="div">
        <TablePagination
          component="div"
          rowsPerPageOptions={[15, 30, 100, { label: "Todos", value: -1 }]}
          count={Lista.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { "aria-label": "Registros por página" },
            native: true,
          }}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          ActionsComponent={TablePaginationActions}
          labelRowsPerPage="Registros por página"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
        />
      </TableFooter>
    </Paper>
  );
}
