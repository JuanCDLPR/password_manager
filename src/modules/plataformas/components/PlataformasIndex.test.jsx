import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PlataformasIndex from "./PlataformasIndex";
import { getLista } from "../functions/plataformas";

jest.mock("../functions/plataformas", () => ({
  getLista: jest.fn(),
  Eliminar: jest.fn(),
}));

jest.mock("../../../lib/GeneralesImports", () => ({
  MySwal: { fire: jest.fn() },
  TablePaginationActions: () => null,
}));

const theme = createTheme({
  palette: { mode: "dark", primary: { main: "#6366f1" } },
});

const renderView = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <PlataformasIndex />
      </MemoryRouter>
    </ThemeProvider>
  );

test("presenta el catálogo y consulta las plataformas con el orden inicial", async () => {
  getLista.mockResolvedValueOnce([
    {
      _id: "platform-1",
      name: "GitHub",
      url: "",
      fecha: "2026-07-31T12:00:00.000Z",
    },
  ]);

  renderView();

  expect(screen.getByRole("heading", { name: "Plataformas" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /nueva plataforma/i })).toHaveAttribute(
    "href",
    "/add"
  );

  await waitFor(() => expect(getLista).toHaveBeenCalledWith("", "1"));
  expect(await screen.findAllByText("GitHub")).not.toHaveLength(0);
});

test("muestra un estado vacío entendible", async () => {
  getLista.mockResolvedValueOnce([]);

  renderView();

  expect(
    await screen.findByRole("heading", { name: "No encontramos plataformas" })
  ).toBeInTheDocument();
  expect(screen.getByText(/cambia los criterios de búsqueda/i)).toBeInTheDocument();
});
