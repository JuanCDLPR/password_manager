import React, { useEffect } from "react";
import { useState } from "react";
import PreLoad from "./includes/PreLoad";
import { getLocalStorageJWT } from "./context/storaje";
import { Route, Routes } from "react-router-dom";
import Login from "./modules/login/Login";
import Reigister from "./modules/register/Reigister";
import Menu from "./includes/Menu";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NotFound from "./includes/NotFound";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isLoged, setIsLoged] = useState(false);
  const [load, setLoad] = useState(true);

  const getInfoUsuario = async () => {
    if (getLocalStorageJWT() != "") {
      setIsLoged(true);
    }
  };

  useEffect(() => {
    setLoad(true);

    getInfoUsuario().then(
      setTimeout(() => {
        setLoad(false);
      }, 1000)
    );
  }, []);

  return load ? (
    <PreLoad />
  ) : isLoged ? (
    <ThemeProvider theme={darkTheme}>
      <Menu />
    </ThemeProvider>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="registrar/*" element={<Reigister />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
