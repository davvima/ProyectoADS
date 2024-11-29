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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextareaAutosize,
  DialogActions,
  Box,
} from "@mui/material"
import useFetch from "../../hooks/useFetch"
import TableBox from "../../components/Table/TableBox"
import Container from "../../components/Container"
import StateCell from "../../components/Table/StateCell"
import Filters from "../../components/Table/Filters"
import Button from "../../components/Button/Button"
import { useTheme } from "@emotion/react"
import { Link } from "react-router-dom"

const Usuarios = () => {
  const { data: usuarios, loading, error } = useFetch("usuarios")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedStatus, setSelectedStatus] = useState("Todos")
  const [newUserModal, setNewUserModal] = useState(false)

  const theme = useTheme()
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

  const handleCloseModal = () => {
    setNewUserModal(false)
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  const filteredUsuarios =
    selectedStatus === "Todos"
      ? usuarios
      : usuarios.filter((usuario) => usuario.estado === selectedStatus)

  return (
    <Container title="Gestión de Usuarios">
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <Filters>
          <Select value={selectedStatus} onChange={handleStatusChange}>
            <MenuItem value="Todos">Estado</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
            <MenuItem value="pendiente">Pendiente</MenuItem>
          </Select>
        </Filters>
        <Link to="/admin/usuarios/nuevo">
          <Button variant="contained" sx={{ background: theme.palette.primary["500"] }}>
            Crear Usuario
          </Button>
        </Link>
      </Box>

      <TableBox>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Tipo de Usuario</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsuarios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>
                      {usuario.nombre} {usuario.apellido}
                    </TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.tipoUsuario}</TableCell>
                    <StateCell estado={usuario.estado} />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsuarios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableBox>

      <Dialog open={newUserModal} onClose={handleCloseModal}>
        <DialogTitle>Crear Nuevo Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>Completa los campos para agregar un nuevo usuario.</DialogContentText>
          <TextareaAutosize
            minRows={4}
            placeholder="Detalles del usuario..."
            style={{
              width: "100%",
              marginTop: "1rem",
              borderRadius: "8px",
              padding: "1rem",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            sx={{ background: theme.palette.primary["500"] }}
            onClick={handleCloseModal}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{ background: theme.palette.primary["500"] }}
            onClick={handleCloseModal}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Usuarios
