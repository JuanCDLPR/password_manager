import { getData, postdData, postUrl } from "../../../context/backend";
import { stringify } from "../../../lib/GeneralesImports";

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

export const getLista = async (
  query,
  Order = 1 /*, iTake = 5, iSkip = 0, */
) => {
  //onsole.log(query)
  /*  if (Order != "1" && query != "") {
    Order = "1";
  } */

  let data = [];
  let queryParamsObj = {
    Order: Order,
    query: query,
  };

  //console.log(queryParamsObj);
  const url = `plataformas/listar?${stringify(queryParamsObj)}`;
  //const url = `clientes/listar`;
  const res = await getData(url);
  //console.log(res);
  return new Promise((resolve, reject) => {
    if (!res.error) {
      //console.log(res.data);
      data = res.data;
      resolve(data);
    } else {
      reject(res);
    }
  });
};

export const Eliminar = async (id) => {
  if (id != undefined) {
    let data = [];
    let queryParamsObj = {
      ID: id,
    };
    const url = `plataformas/eliminar?${stringify(queryParamsObj)}`;
    const res = await postUrl(url);
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
      resolve({ mensaje: "No se pudo obtener el identificador" });
    });
  }
};

export const getInfoPlataforma = async (id) => {
  let data = [];
  let queryParamsObj = {
    ID: id,
  };
  const url = `plataformas/consultar?${stringify(queryParamsObj)}`;
  const res = await getData(url);
  //console.log(res);
  return new Promise((resolve, reject) => {
    if (!res.error) {
      data = res.data;

      if (data[0].length === 0) {
        resolve({
          err: [],
          mensaje: "No se encontró información de esta plataforma",
        });
      } else {
        data = data[0];
        //console.log(data);
        //console.log(res.data[1]);
        let Values = {
          id: data._id,
          nombre: data.name,
          url: data.url,
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
