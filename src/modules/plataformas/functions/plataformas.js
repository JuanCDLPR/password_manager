import { postdData } from "../../../context/backend";

export const guardar = async (
  Values = {},
  Errores = {},
  setErrores = () => {}
) => {
  try {
    let error = false;

    if (!Values.nombre || Values.nombre == "") {
      Errores.nombre = true;
      setErrores(Errores);
      error = true;
    }

    if (!error) {
      let data = [];

      const url =
        Values.id == undefined || Values.id == "" || Values.id == 0
          ? `plataformas/insertar`
          : "plataformas/actualizar";

      const res = await postdData(url, Values);
      //const res = { error: false, data: { codigo: "201", mensaje: "okey" } };

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
