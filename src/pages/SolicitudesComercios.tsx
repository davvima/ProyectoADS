import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
} from "@mui/material"

import useFetch from "../hooks/useFetch"
import TableBox from "../components/Table/TableBox"
import Container from "../components/Container"
import StateCell from "../components/Table/Statecell"
import { Link } from "react-router-dom"
import { useTheme } from "@emotion/react"
import Filters from "../components/Table/Filters"

const SolicitudesComercios = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedStatus, setSelectedStatus] = useState("Todos") // Estado para el filtro

  const theme = useTheme()
  const { data: comercios, loading, error } = useFetch("solicitudes")

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value)
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  // Filtrar comercios por estado seleccionado
  const filteredComercios =
    selectedStatus === "Todos"
      ? comercios
      : comercios.filter((comercio) => comercio.estado === selectedStatus)

  return (
    <Container title="Aprobación de solicitudes">
      <Filters>
        <Select value={selectedStatus} onChange={handleStatusChange}>
          <MenuItem value="Todos">Estado</MenuItem>
          <MenuItem value="aprobado">Aprobado</MenuItem>
          <MenuItem value="rechazado">Rechazado</MenuItem>
          <MenuItem value="pendiente">Pendiente</MenuItem>
        </Select>
      </Filters>

      <TableBox>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del Comercio</TableCell>
                <TableCell>Fecha de Solicitud</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredComercios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((comercio) => (
                  <Link
                    to={`/admin/solicitudes-comercios/${comercio.solicitudId}`}
                    style={{ display: "contents" }}
                    key={comercio.solicitudId} // Mover key aquí para evitar advertencias
                  >
                    <TableRow>
                      <TableCell>{comercio.nombreComercio}</TableCell>
                      <TableCell>{comercio.fechaSolicitud}</TableCell>
                      <StateCell estado={comercio.estado} />
                    </TableRow>
                  </Link>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredComercios.length} // Cambiar a filteredComercios
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableBox>
    </Container>
  )
}

export default SolicitudesComercios
