import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import * as React from "react";

import SearchIcon from "@mui/icons-material/Search";
import "../lib/Prototipos";

const Buscador = ({
  placeholder = "",
  ValueBusqueda,
  setValueBusqueda,
  handleRender,
}) => {
  const [query, setQuery] = React.useState("");
  const [intervalo, setIntervalo] = React.useState("");

  // evento para detectar cuando se deja de escribir en el inoput
  const handleChangeBuscador = (event) => {
    clearInterval(intervalo);
    setQuery(event.target.value.toValidInput());
    let id = setInterval(function () {
      clearInterval(id);
      setValueBusqueda(event.target.value.toValidInput());
    }, 1000);
    setIntervalo(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      clearInterval(intervalo);
      setValueBusqueda(e.target.value);
    }
  };

  React.useEffect(() => {
    if (ValueBusqueda == "" && handleRender != undefined) {
      setQuery("");
    }
  }, [handleRender]);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Buscar</InputLabel>
      <OutlinedInput
        id="Buscar"
        placeholder={placeholder}
        value={query}
        onChange={handleChangeBuscador}
        onKeyDown={handleKeyDown}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        label="Buscar"
      />
    </FormControl>
  );
};

export default Buscador;
