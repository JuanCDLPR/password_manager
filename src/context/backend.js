import { clearStorageJWT, getLocalStorageJWT } from "./storaje";

const configuredUrl =
  process.env.REACT_APP_API_URL || "http://localhost:3024/";

export const BACKEND_URL = configuredUrl.endsWith("/")
  ? configuredUrl
  : `${configuredUrl}/`;

export class ApiError extends Error {
  constructor({
    status = 0,
    code = "UNKNOWN_ERROR",
    message = "Ocurrió un error inesperado",
    details,
    requestId,
  } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.requestId = requestId;
  }
}

export const createClientError = (message, details) =>
  new ApiError({
    status: 422,
    code: "CLIENT_VALIDATION_ERROR",
    message,
    details,
  });

const parsePayload = async (response) => {
  if (response.status === 204) {
    return { success: true, message: "", data: null };
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError({
      status: response.status,
      code: "INVALID_RESPONSE",
      message: "El servidor devolvió una respuesta no válida",
      requestId: response.headers.get("x-request-id"),
    });
  }
};

const request = async (path, { method = "GET", body, auth = true } = {}) => {
  const token = auth ? getLocalStorageJWT() : "";

  try {
    const response = await fetch(BACKEND_URL + path, {
      method,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: {
        ...(body !== undefined && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    const payload = await parsePayload(response);

    if (!response.ok) {
      const error = new ApiError({
        status: response.status,
        code: payload?.error?.code || "HTTP_ERROR",
        message: payload?.error?.message || `Error HTTP ${response.status}`,
        details: payload?.error?.details,
        requestId:
          payload?.error?.requestId || response.headers.get("x-request-id"),
      });

      if (
        (error.status === 401 &&
          ["AUTH_REQUIRED", "SESSION_INVALID"].includes(error.code)) ||
        error.code === "ACCOUNT_DISABLED"
      ) {
        clearStorageJWT();
      }

      throw error;
    }

    if (payload.success !== true) {
      throw new ApiError({
        status: response.status,
        code: "INVALID_RESPONSE",
        message: "La respuesta del servidor no cumple el contrato esperado",
        requestId: response.headers.get("x-request-id"),
      });
    }

    return payload;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new ApiError({
      status: 0,
      code: "NETWORK_ERROR",
      message: "No fue posible conectar con el servidor",
    });
  }
};

export const api = Object.freeze({
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) =>
    request(path, { ...options, method: "POST", body }),
  patch: (path, body, options) =>
    request(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
});
