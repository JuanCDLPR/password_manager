import { clearStorageJWT, getLocalStorageJWT } from "./storaje";

const configuredUrl =
  process.env.REACT_APP_API_URL || "http://localhost:3024/";

export const BACKEND_URL = configuredUrl.endsWith("/")
  ? configuredUrl
  : `${configuredUrl}/`;

const isSuccessCode = (code) => {
  const numericCode = Number(code);
  return numericCode >= 200 && numericCode < 300;
};

const request = async (
  url,
  { method = "GET", body, clearOnUnauthorized = true } = {}
) => {
  const token = getLocalStorageJWT();

  try {
    const response = await fetch(BACKEND_URL + url, {
      method,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...(token && { Administracion: token }),
      },
    });

    const payload = await response.json().catch(() => ({
      codigo: response.status,
      mensaje: "El servidor devolvió una respuesta no válida",
    }));

    if (response.status === 401 && clearOnUnauthorized) {
      clearStorageJWT();
    }

    if (!response.ok || !isSuccessCode(payload.codigo)) {
      return {
        error: true,
        codigo: payload.codigo || response.status,
        mensaje:
          payload.mensaje ||
          `Error al comunicarse con el servidor (${response.status})`,
      };
    }

    return { error: false, payload };
  } catch {
    return {
      error: true,
      codigo: 503,
      mensaje: "Error al conectar con los servidores (503)",
    };
  }
};

export const postdData = async (url, body, options = {}) => {
  const result = await request(url, { method: "POST", body, ...options });
  return result.error
    ? result
    : { error: false, data: result.payload };
};

export const getData = async (url, options = {}) => {
  const result = await request(url, { method: "GET", ...options });
  return result.error
    ? result
    : { error: false, data: result.payload.data };
};

export const postUrl = async (url, options = {}) => {
  const result = await request(url, { method: "POST", ...options });
  return result.error
    ? result
    : { error: false, data: result.payload };
};
