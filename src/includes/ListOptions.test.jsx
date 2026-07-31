import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListOptions from "./ListOptions";

jest.mock("sweetalert2-react-content", () => () => ({ fire: jest.fn() }));
jest.mock("sweetalert2", () => ({}));

const renderSidebar = ({ path = "/", isSuperadmin = false } = {}) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <ListOptions open isSuperadmin={isSuperadmin} />
    </MemoryRouter>
  );

test("muestra una sola agrupación abierta y permite cambiarla", async () => {
  renderSidebar();

  expect(screen.getByText("Resumen de seguridad")).toBeVisible();
  expect(screen.queryByText("Plataformas")).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("Bóveda"));

  expect(screen.getByText("Plataformas")).toBeVisible();
  expect(screen.getByText("Notas seguras")).toBeVisible();
  await waitFor(() =>
    expect(screen.queryByText("Resumen de seguridad")).not.toBeInTheDocument()
  );
});

test("abre la sección de la ruta activa y protege el menú administrativo", () => {
  const { rerender } = renderSidebar({ path: "/plataformas/edit/platform-1" });

  expect(screen.getByText("Plataformas")).toBeVisible();
  expect(screen.queryByText("Administración")).not.toBeInTheDocument();

  rerender(
    <MemoryRouter initialEntries={["/admin/invitations"]}>
      <ListOptions open isSuperadmin />
    </MemoryRouter>
  );

  expect(screen.getByText("Administración")).toBeInTheDocument();
});
