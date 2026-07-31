import { api, ApiError } from "./backend";

const response = ({ status = 200, body, requestId = "request-1" }) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: { get: (name) => (name === "x-request-id" ? requestId : null) },
  json: jest.fn().mockResolvedValue(body),
});

beforeEach(() => {
  global.fetch = jest.fn();
  window.localStorage.clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("devuelve el contrato exitoso sin revisar códigos duplicados", async () => {
  global.fetch.mockResolvedValue(
    response({
      body: { success: true, message: "Correcto", data: { id: 1 } },
    })
  );

  await expect(api.get("recurso")).resolves.toEqual({
    success: true,
    message: "Correcto",
    data: { id: 1 },
  });
});

test("convierte una respuesta HTTP fallida en ApiError tipado", async () => {
  global.fetch.mockResolvedValue(
    response({
      status: 422,
      body: {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Datos inválidos",
          details: { fields: ["name"] },
          requestId: "request-422",
        },
      },
    })
  );

  await expect(api.post("recurso", {})).rejects.toMatchObject({
    name: "ApiError",
    status: 422,
    code: "VALIDATION_ERROR",
    message: "Datos inválidos",
    details: { fields: ["name"] },
    requestId: "request-422",
  });
});

test("acepta respuestas 204 sin intentar leer JSON", async () => {
  global.fetch.mockResolvedValue(
    response({ status: 204, body: undefined })
  );

  await expect(api.delete("recurso/1")).resolves.toEqual({
    success: true,
    message: "",
    data: null,
  });
});

test("distingue errores de red de errores HTTP", async () => {
  global.fetch.mockRejectedValue(new TypeError("Failed to fetch"));

  await expect(api.get("recurso")).rejects.toEqual(
    expect.objectContaining({
      name: "ApiError",
      status: 0,
      code: "NETWORK_ERROR",
    })
  );
  await api.get("recurso").catch((error) => {
    expect(error).toBeInstanceOf(ApiError);
  });
});
