import { Button, Card, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Buscador from "../../../includes/Buscador";
import SelectOrdenamiento from "../../../includes/SelectOrdenamiento";
import Tabla from "./Tabla";
import { getLista } from "../functions/grupos";

export default function IndexGrupos() {
  const [IsLoading, setIsLoading] = useState(false);
  const [ValueBusqueda, setValueBusqueda] = useState("");
  const [ValueSelect, setValueSelect] = useState("1");
  const [Lista, setLista] = useState([]);

  const getListaGrupos = () => {
    setIsLoading(true);
    getLista(ValueBusqueda, ValueSelect)
      .then((resp) => {
        setLista(resp);
      })
      .catch((resp) => {
        setLista([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getListaGrupos();
  }, [ValueBusqueda, ValueSelect]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap my-4">
        <div className="p-2 d-flex  flex-row align-items-center">
          <h4 className=" font-AvenirBold">Grupos</h4>
        </div>

        <div className="p-2">
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <Link to="./add" style={{ textDecoration: "none" }}>
              <Button
                className="btn btn-create font-AvenirMedium px-4 "
                variant="contained"
              >
                Crear nuevo
              </Button>
            </Link>
          </Stack>
        </div>
      </div>

      <Card variant="outlined" className="p-0 shadow">
        <Row className="p-3">
          <Col xs={12} md={8}>
            <Buscador
              placeholder="Buscar grupo por nombre"
              ValueBusqueda={ValueBusqueda}
              setValueBusqueda={setValueBusqueda}
            />
          </Col>
          <Col xs={12} md={4}>
            <SelectOrdenamiento
              currencies={[
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
              ]}
              ValueSelect={ValueSelect}
              setValueSelect={setValueSelect}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Tabla
              Lista={Lista ?? []}
              //Lista={[{}, {}, {}, {}]}
              IsLoading={IsLoading}
              setLista={setLista}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}
