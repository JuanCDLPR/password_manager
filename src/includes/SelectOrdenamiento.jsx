import * as React from "react";
import { MenuItem, TextField } from "@mui/material";

const SelectOrdenamiento = ({
  ValueSelect,
  setValueSelect,
  size = "medium",
  currencies = [
    {
      value: "1",
      label: "Más recientes",
    },
    {
      value: "2",
      label: "Más antiguos",
    },
    {
      value: "3",
      label: "Alfabéticamente descendente",
    },
    {
      value: "4",
      label: "Alfabéticamente ascendente",
    },
  ],
}) => {
  const handlInputChange = ({ target }) => {
    setValueSelect(target.value);
  };
  /*const currencies = [
   
  ];*/

  return (
    <TextField
      fullWidth
      id="outlined-select-currency"
      select
      onChange={handlInputChange}
      label="Ordenar por"
      value={ValueSelect}
      className="mt-3 mt-sm-3 mt-md-0"
      size={size}
    >
      {currencies.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectOrdenamiento;
