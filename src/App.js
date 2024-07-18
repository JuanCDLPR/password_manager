import React, { useEffect } from "react";
import { useState } from "react";
import PreLoad from "./includes/PreLoad";
import { getLocalStorageJWT } from "./context/storaje";
import { Route, Routes } from "react-router-dom";
import Login from "./modules/login/Login";
import Reigister from "./modules/register/Reigister";

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
    <>acceso al administrador de contraseñas</>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="registrar" element={<Reigister />} />
    </Routes>
  );
}

export default App;
