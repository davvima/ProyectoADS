import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextareaAutosize,
  DialogActions,
  Box,
  TextField,
} from "@mui/material"
import useFetch from "../hooks/useFetch"
import TableBox from "../components/Table/TableBox"
import Container from "../components/Container"
import Filters from "../components/Table/Filters"
import Button from "../components/Button/Button"
import { useTheme } from "@emotion/react"
import { Link } from "react-router-dom"
import TablaPermisos from "../components/GestionRoles/RolesTable"

const GestionRoles = () => {
  const { data: roles, loading, error } = useFetch("roles")

  const [selectedRol, setSelectedRol] = useState("rol")
  const [newUserModal, setNewUserModal] = useState(false)
  const [newRol, setNewRol] = useState({ id: "", descripcion: "" })

  const theme = useTheme()

  const handleStatusChange = (event) => {
    setSelectedRol(event.target.value)
  }

  const handleCloseModal = () => {
    setNewUserModal(false)
  }

  const handleOpenModal = () => {
    setNewUserModal(true)
  }

  const handleChange = (event) => {
    setNewRol({ ...newRol, descripcion: event.target.value })
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <Container title="Gestión de Roles">
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <Filters>
          <Select value={selectedRol} onChange={handleStatusChange} sx={{ width: "10rem" }}>
            <MenuItem value="rol">Rol</MenuItem>
            {roles?.map((rol: any) => <MenuItem value={rol.nombre}>{rol.nombre}</MenuItem>)}
          </Select>
        </Filters>
        <Button
          variant="contained"
          sx={{ background: theme.palette.primary["500"] }}
          onClick={handleOpenModal}
        >
          Crear Rol
        </Button>
      </Box>

      <TableBox>
        <TableContainer>
          <Table>
            {selectedRol !== "rol" ? (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell>Permisos Disponibles para {selectedRol}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TablaPermisos />
                </TableBody>
              </>
            ) : (
              <TableCell>Selecciona el rol que deseas editar</TableCell>
            )}
          </Table>
        </TableContainer>
      </TableBox>

      <Dialog
        open={newUserModal}
        onClose={handleCloseModal}
        sx={{
          height: "65vh",
          maxHeight: "35rem",
          alignSelf: "center",
          "& .MuiDialog-paper": {
            width: "70vw",
            height: "100%",
            maxWidth: "none",
            borderRadius: "12px",
            padding: "2rem",
          },
        }}
      >
        <DialogTitle fontSize="1.5rem" fontWeight="bold" textAlign="left">
          Nuevo rol
        </DialogTitle>
        <DialogContent sx={{ background: "none" }}>
          <DialogContentText sx={{ textAlign: "left", marginBottom: "1rem", color: "black" }}>
            Rol
          </DialogContentText>
          <TextField
            label="id"
            id="id"
            variant="outlined"
            value={newRol.id}
            onChange={handleChange}
            sx={{ marginRight: 2, width: "100%", background: "#E6E0E9", marginBottom: "1rem" }}
          />
          <DialogContentText sx={{ textAlign: "left", marginBottom: "1rem", color: "black" }}>
            Descripción
          </DialogContentText>
          <TextareaAutosize
            minRows={3}
            placeholder="Escribe un comentario..."
            value={newRol.descripcion}
            onChange={handleChange}
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "1rem",
              fontSize: "1rem",
              resize: "none",
              background: "#E6E0E9",
              color: "black",
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: "1rem", paddingBottom: "1rem" }}>
          <Button variant="text" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{ background: theme.palette.primary["500"] }}
            onClick={handleCloseModal}
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default GestionRoles
