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

export const update_pass = async (
  Values = {},
  Errores = {},
  setErrores = () => {}
) => {
  try {
    let error = false;

    if (!Values.old_pass || Values.old_pass === "") {
      error = true;
      Errores.old_pass = true;
      setErrores(Errores);
    }

    if (!Values.pass || Values.pass === "") {
      error = true;
      Errores.pass = true;
      setErrores(Errores);
    }

    if (!Values.rep_pass || Values.rep_pass === "") {
      error = true;
      Errores.rep_pass = true;
      setErrores(Errores);
    }

    if (Values.pass !== Values.rep_pass) {
      return new Promise((resolve, reject) => {
        resolve({ mensaje: "La contraseña no es igual" });
      });
    }

    if (!error) {
      let data = [];

      const url = "perfil/update_pass";

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
