import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { api } from "../../context/backend";

jest.mock("../../context/backend", () => ({
  api: {
    post: jest.fn(),
  },
}));

jest.mock("../../context/storaje", () => ({
  setLocalStorage: jest.fn(),
  setLocalStorageJWT: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test("muestra las políticas y el estado real de la bóveda", () => {
  render(<Login />);

  fireEvent.click(
    screen.getByRole("button", {
      name: /consulta cómo protegemos tu cuenta y tus datos/i,
    })
  );

  expect(
    screen.getByRole("heading", {
      name: /seguridad, privacidad y uso responsable/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/la bóveda de credenciales aún está en desarrollo/i)
  ).toBeInTheDocument();
});

test("envía usuario o correo y contraseña con el contrato actual", async () => {
  api.post.mockRejectedValueOnce(new Error("Credenciales incorrectas"));
  render(<Login />);

  fireEvent.change(screen.getByLabelText(/usuario o correo/i), {
    target: { value: "usuario@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/^contraseña$/i), {
    target: { value: "ClaveSegura!1" },
  });
  fireEvent.click(screen.getByRole("button", { name: /continuar/i }));

  await waitFor(() =>
    expect(api.post).toHaveBeenCalledWith(
      "usuarios/session",
      {
        login: "usuario@example.com",
        password: "ClaveSegura!1",
      },
      { auth: false }
    )
  );
  expect(
    await screen.findByText("Credenciales incorrectas")
  ).toBeInTheDocument();
});
