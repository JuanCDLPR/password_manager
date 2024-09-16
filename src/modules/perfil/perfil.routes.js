import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../includes/NotFound";
import PerfilIndex from "./components/PerfilIndex";
import CambiarPass from "./components/CambiarPass";

export default function PerfilRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PerfilIndex />} />
      <Route path="/update-password" element={<CambiarPass />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
