import { getData, postdData } from "../../../context/backend";
import { stringify } from "../../../lib/GeneralesImports";

export const getInfoPerfil = async (id) => {
  let data = [];

  const url = `perfil/consultar`;
  const res = await getData(url);
  return new Promise((resolve, reject) => {
    if (!res.error) {
      data = res.data;

      if (data[0].length === 0) {
        resolve({
          err: [],
          mensaje: "No se encontró información del usuario",
        });
      } else {
        data = data[0];
        let Values = {
          nombre: data.name,
          usuario: data.user,
          url: data.img,
          actualizado: data.actualizado,
        };
        resolve({ Values });
      }
    } else {
      reject({
        mensaje: "Error al conectar a internet, revisa tu conexion a internet",
      });
    }
  });
};

export const guardar = async (
  Values = {},
  Errores = {},
  setErrores = () => {}
) => {
  try {
    let error = false;

    if (!error) {
      let data = [];

      const url = "perfil/actualizar";

      const res = await postdData(url, Values);

      return new Promise((resolve, reject) => {
        if (!res.error) {
          data = res.data;
          resolve(data);
        } else {
          reject(res);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve({ mensaje: "Completa todos los campos requeridos" });
      });
    }
  } catch (e) {
    console.log(e);
  }
};
