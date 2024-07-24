import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../includes/NotFound";
import PlataformasIndex from "./components/PlataformasIndex";
import Plataforma from "./components/Plataforma";

export default function PlataformasRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PlataformasIndex />} />
      <Route path="/add" element={<Plataforma />} />
      <Route path="/edit/:id" element={<Plataforma />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
