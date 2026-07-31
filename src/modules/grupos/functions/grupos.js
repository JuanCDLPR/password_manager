import {
  api,
  createClientError,
} from "../../../context/backend";
import { stringify } from "../../../lib/GeneralesImports";

export const getLista = async (search, order = 1) => {
  const query = stringify({ order, search });
  const { data } = await api.get(`grupos?${query}`);
  return data;
};

export const Eliminar = async (id) => {
  if (!id) throw createClientError("No se pudo obtener el identificador");
  return api.delete(`grupos/${id}`);
};

export const getInfoGrupo = async (id) => {
  if (!id) throw createClientError("No se pudo obtener el identificador");
  const { data } = await api.get(`grupos/${id}`);
  return {
    Values: {
      id: data._id,
      nombre: data.name,
      url: data.url,
    },
  };
};

export const guardar = async (
  values = {},
  errores = {},
  setErrores = () => {}
) => {
  if (!values.nombre?.trim()) {
    setErrores({ ...errores, nombre: true });
    throw createClientError("Completa todos los campos requeridos", {
      fields: ["nombre"],
    });
  }

  return values.id && values.id !== "0"
    ? api.patch(`grupos/${values.id}`, values)
    : api.post("grupos", values);
};
