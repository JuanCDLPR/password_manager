export const getLocalStorageJWT = () => {
  try {
    const value = window.localStorage.getItem("JWT");
    //  alert(value);
    if (value != null) {
      return value;
    } else {
      return "";
    }
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const setLocalStorageJWT = (token) => {
  try {
    window.localStorage.setItem("JWT", token);
  } catch (error) {
    console.log(error);
  }
};

export const clearStorageJWT = () => {
  try {
    const value = window.localStorage.getItem("dark-mode");
    const rec = getBoleanSaveData();
    const mail = window.localStorage.getItem("MAIL");
    const pref = window.localStorage.getItem("minimenu");

    window.localStorage.clear();
    window.localStorage.setItem("dark-mode", value);
    window.localStorage.setItem("REC-MAIL", rec);
    window.localStorage.setItem("minimenu", pref);
    if (rec) {
      window.localStorage.setItem("MAIL", mail);
    } else {
      window.localStorage.setItem("MAIL", "");
    }
    window.location.href = "/inicio";
  } catch (error) {
    console.log(error);
  }
};

export const getBoleanSaveData = () => {
  const RECORDAR = getLocalStorage("REC-MAIL");

  switch (RECORDAR) {
    case "":
      return false;
    case "false":
      return false;
    case "true":
      return true;
    default:
      return false;
  }
};

export const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const getLocalStorage = (key) => {
  try {
    const value = window.localStorage.getItem(key);
    //  alert(value);
    if (value != null) {
      return value;
    } else {
      return "";
    }
  } catch (error) {
    console.log(error);
    return "";
  }
};
