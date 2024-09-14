import {
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import React from "react";
import { Table } from "react-bootstrap";
import { MySwal, TablePaginationActions } from "../../../lib/GeneralesImports";
import { Link } from "react-router-dom";
import Loading from "../../../includes/Loading";
import AvatarDefault from "../../../includes/AvatarDefault";
import moment from "moment-timezone";
import AccEditarWhite from "../../../assets/AccEditarWhite.svg";
import AccEliminar from "../../../assets/AccEliminar.svg";
import { Eliminar } from "../functions/plataformas";

export default function Tabla({ Lista, IsLoading, setLista }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Lista.length) : 0;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(page);
  };

  const EliminarRegistro = (id) => {
    MySwal.fire({
      title: "¿Estas seguro de eliminar esta actividad?",
      text: "esta acción no se puede deshacer",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "No, cancelar",
      confirmButtonText: "Si, estoy seguro",
      confirmButtonColor: "#3ABE88",
      denyButtonColor: "#65748B",
      reverseButtons: true,
      background: "#333333",
      color: "#FFFFFF",
    }).then(function (isConfirm) {
      if (isConfirm.isConfirmed) {
        if (id != undefined) {
          Eliminar(id)
            .then((resp) => {
              MySwal.fire({
                title: "Exito!",
                text: "Eliminado correctamente",
                icon: "success",
                background: "#333333",
                color: "#FFFFFF",
              }).then(function () {
                eliminarClienteDeTabla(id);
              });
            })
            .catch((resp) => {
              MySwal.fire({
                title: "Error!",
                //text: "Error al eliminar actividad",
                text: resp.mensaje,
                icon: "error",
                background: "#333333",
                color: "#FFFFFF",
              });
            });
        }
      }
    });
  };

  const eliminarClienteDeTabla = (id) => {
    const filteredLibraries = Lista.filter((item) => {
      return item._id !== id;
    });
    setLista(filteredLibraries);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell
                className="d-none d-sm-table-cell font-Avenir font-AvenirBold"
                align="left"
              >
                FECHA
              </TableCell>
              <TableCell className="font-Avenir font-AvenirBold" align="left">
                NOMBRE
              </TableCell>

              <TableCell className="font-Avenir font-AvenirBold" align="left">
                AVATAR
              </TableCell>

              <TableCell className="font-Avenir font-AvenirBold" align="right">
                ACCIONES
              </TableCell>
            </TableRow>
          </TableHead>

          {IsLoading ? (
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={12}>
                  <Loading />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {(rowsPerPage > 0
                ? Lista.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : Lista
              ).map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell
                    component="th"
                    scope="row"
                    className="d-none d-sm-table-cell"
                  >
                    {
                      moment(row.fecha)
                        .tz("America/Mexico_City")
                        .format("YYYY-MM-DD")
                      //.format("YYYY-MM-DD h:mm:ss a")
                      //.format("YYYY-MM-DD HH:mm:ss")
                    }
                  </TableCell>
                  <TableCell component="th" scope="row" className="">
                    {row.name}
                  </TableCell>

                  <TableCell component="th" scope="row" className="">
                    <AvatarDefault src={row.url} />
                  </TableCell>

                  <TableCell align="right">
                    <Grid key={row._id} className="">
                      <Link
                        to={"./edit/" + row._id}
                        style={{ textDecoration: "none" }}
                      >
                        <Tooltip title="Editar" placement="top">
                          <IconButton>
                            <img src={AccEditarWhite} alt="" />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Tooltip title="Eliminar" placement="top">
                        <IconButton onClick={() => EliminarRegistro(row._id)}>
                          <img src={AccEliminar} alt="" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          )}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  15,
                  30,
                  100,
                  { label: "Todos", value: -1 },
                ]}
                count={Lista.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "Filas por pagína",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                labelRowsPerPage={"Registros por página"}
                labelDisplayedRows={({ from, to, count, page }) => {
                  return `${from} - ${to} de ${count}`;
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
