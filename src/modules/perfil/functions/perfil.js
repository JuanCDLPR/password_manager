import {
  api,
  createClientError,
} from "../../../context/backend";

export const getInfoPerfil = async () => {
  const { data } = await api.get("perfil");
  return {
    Values: {
      nombre: data.name,
      usuario: data.user,
      url: data.img,
      actualizado: data.actualizado,
    },
  };
};

export const guardar = async (values = {}) => api.patch("perfil", values);

export const update_pass = async (
  values = {},
  errores = {},
  setErrores = () => {}
) => {
  const missingFields = ["old_pass", "pass", "rep_pass"].filter(
    (field) => !values[field]
  );

  if (missingFields.length) {
    setErrores({
      ...errores,
      ...Object.fromEntries(missingFields.map((field) => [field, true])),
    });
    throw createClientError("Completa todos los campos requeridos", {
      fields: missingFields,
    });
  }

  if (values.pass !== values.rep_pass) {
    throw createClientError("Las contraseñas no coinciden", {
      fields: ["pass", "rep_pass"],
    });
  }

  return api.patch("perfil/password", values);
};
