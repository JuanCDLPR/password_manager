import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../includes/NotFound";
import IndexGrupos from "./components/IndexGrupos";
import Grupo from "./components/Grupo";

export default function GruposRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IndexGrupos />} />
      <Route path="/add" element={<Grupo />} />
      <Route path="/edit/:id" element={<Grupo />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
