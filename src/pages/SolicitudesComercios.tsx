import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from "@mui/material"
import useFetch from "../hooks/useFetch"
import TableBox from "../components/TableBox"
import Container from "../components/Container"

const SolicitudesComercios = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { data: comercios, loading, error } = useFetch("solicitudes")
  console.log({ comercios })
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <Container title="Aprobación de solicitudes">
      <TableBox>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre del Comercio</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha de Solicitud</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comercios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((comercio) => (
                  <TableRow key={comercio.solicitudId}>
                    <TableCell>{comercio.nombreComercio}</TableCell>
                    <TableCell>{comercio.estado}</TableCell>
                    <TableCell>{comercio.fechaSolicitud}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={comercios.length}
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
