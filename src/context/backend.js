import { getLocalStorageJWT, clearStorageJWT } from "./storaje";

export const BACKEND_URL = "http://localhost:3024/";

export async function postdData(url, body) {
  let bearer_token = getLocalStorageJWT();
  return fetch(BACKEND_URL + url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Autorizacion: bearer_token,
      Administracion: bearer_token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        clearStorageJWT();
      }
      if (response.status !== 200) {
        console.log(response);
        return {
          codigo: String(response.status),
          mensaje: "Error: " + response.statusText,
        };
      }
      return response.json();
    })
    .then((response) => {
      if (response.codigo == 200) {
        return { error: false, data: response };
      } else {
        return {
          error: true,
          mensaje: response.mensaje + " (" + response.codigo + ")",
        };
      }
    })
    .catch((error) => {
      return {
        error: true,
        mensaje: "Error al conectar con los servidores (503)",
      };
    });
}

export const getData = async (url) => {
  let bearer_token = getLocalStorageJWT();
  return fetch(BACKEND_URL + url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + bearer_token,
      "Content-Type": "application/json",
      Autorizacion: bearer_token,
      Administracion: bearer_token,
    },
  })
    .then((response) => {
      //console.log(response);
      if (response.status === 401) {
        clearStorageJWT();
      }
      if (response.status !== 200) {
        console.log(response);
        return {
          codigo: String(response.status),
          mensaje: "Error: " + response.statusText,
        };
      }
      return response.json();
    })
    .then((response) => {
      //console.log(response);
      if (response.codigo == 200) {
        return { error: false, data: response.data };
      } else {
        return {
          error: true,
          mensaje: response.mensaje + " (" + response.codigo + ")",
        };
      }
    })
    .catch((error) => {
      console.log(error);
      return {
        error: true,
        mensaje: "Error al conectar con los servidores (503)",
      };
    });
};
