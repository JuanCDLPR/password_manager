import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import { Link } from "react-router-dom";
import Buscador from "../../../includes/Buscador";
import SelectOrdenamiento from "../../../includes/SelectOrdenamiento";
import { getLista } from "../functions/plataformas";
import Tabla from "./Tabla";

const SORT_OPTIONS = [
  { value: "1", label: "Más recientes" },
  { value: "2", label: "Más antiguos" },
  { value: "3", label: "Nombre: Z a A" },
  { value: "4", label: "Nombre: A a Z" },
];

export default function PlataformasIndex() {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("1");
  const [platforms, setPlatforms] = useState([]);
  const [loadError, setLoadError] = useState("");

  const loadPlatforms = useCallback(() => {
    setIsLoading(true);
    setLoadError("");

    getLista(search, sort)
      .then((response) => setPlatforms(response ?? []))
      .catch((error) => {
        setPlatforms([]);
        setLoadError(error.message || "No fue posible consultar las plataformas.");
      })
      .finally(() => setIsLoading(false));
  }, [search, sort]);

  useEffect(() => {
    loadPlatforms();
  }, [loadPlatforms]);

  return (
    <Box sx={{ minHeight: "calc(100dvh - 112px)", py: { xs: 2, md: 4 } }}>
      <Container maxWidth="xl" disableGutters>
        <Stack spacing={3}>
          <Stack
            alignItems={{ xs: "stretch", sm: "center" }}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  alignItems: "center",
                  bgcolor: "rgba(99, 102, 241, .14)",
                  border: "1px solid rgba(129, 140, 248, .3)",
                  borderRadius: 3,
                  color: "primary.light",
                  display: "flex",
                  height: 52,
                  justifyContent: "center",
                  width: 52,
                }}
              >
                <AppsRoundedIcon />
              </Box>
              <Box>
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <Typography component="h1" variant="h4" fontWeight={800}>
                    Plataformas
                  </Typography>
                  <Chip
                    label={platforms.length}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Stack>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  Organiza los servicios asociados a tus accesos.
                </Typography>
              </Box>
            </Stack>

            <Button
              component={Link}
              to="./add"
              startIcon={<AddRoundedIcon />}
              variant="contained"
              size="large"
              sx={{ minHeight: 46, px: 2.5, textTransform: "none", fontWeight: 800 }}
            >
              Nueva plataforma
            </Button>
          </Stack>

          <Paper
            variant="outlined"
            sx={{
              bgcolor: "rgba(12, 23, 39, .82)",
              borderColor: "divider",
              borderRadius: 3,
              p: { xs: 2, md: 2.5 },
            }}
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Buscador
                  placeholder="Buscar por nombre"
                  ValueBusqueda={search}
                  setValueBusqueda={setSearch}
                />
              </Box>
              <Box sx={{ minWidth: { md: 270 } }}>
                <SelectOrdenamiento
                  currencies={SORT_OPTIONS}
                  ValueSelect={sort}
                  setValueSelect={setSort}
                />
              </Box>
            </Stack>
          </Paper>

          <Tabla
            Lista={platforms}
            IsLoading={isLoading}
            error={loadError}
            onRetry={loadPlatforms}
            setLista={setPlatforms}
          />
        </Stack>
      </Container>
    </Box>
  );
}
