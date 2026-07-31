import React, { useEffect } from "react";
import { useState } from "react";
import PreLoad from "./includes/PreLoad";
import {
  getLocalStorageJWT,
  setLocalStorage,
} from "./context/storaje";
import { Route, Routes } from "react-router-dom";
import Login from "./modules/login/Login";
import Reigister from "./modules/register/Reigister";
import Menu from "./includes/Menu";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NotFound from "./includes/NotFound";
import { api } from "./context/backend";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const authTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1",
      light: "#818cf8",
    },
    background: {
      default: "#07111f",
      paper: "#0c1727",
    },
    text: {
      secondary: "#94a3b8",
    },
    divider: "rgba(148, 163, 184, .18)",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [isLoged, setIsLoged] = useState(false);
  const [load, setLoad] = useState(true);

  const getInfoUsuario = async () => {
    if (getLocalStorageJWT() !== "") {
      const { data } = await api.get("usuarios/session");
      setLocalStorage("nombre", data.name);
      setLocalStorage("user", data.user);
      setLocalStorage("email", data.email || "");
      setLocalStorage("role", data.role);
      setIsLoged(true);
    }
  };

  useEffect(() => {
    setLoad(true);

    getInfoUsuario()
      .catch(() => setIsLoged(false))
      .finally(() => {
        setLoad(false);
      });
  }, []);

  return load ? (
    <PreLoad />
  ) : isLoged ? (
    <ThemeProvider theme={darkTheme}>
      <Menu />
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={authTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="registrar/*" element={<Reigister />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
