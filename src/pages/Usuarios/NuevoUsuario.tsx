import React, { useState } from "react"
import {
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material"
import Container from "../../components/Container"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import { useTheme } from "@emotion/react"

const NuevoUsuario = () => {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [dni, setDni] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [rol, setRol] = useState("")
  const [activo, setActivo] = useState(true)

  const theme = useTheme()
  const navigate = useNavigate()

  const handleGuardarUsuario = () => {
    const nuevoUsuario = {
      nombre,
      apellido,
      dni,
      email,
      telefono,
      rol,
      estado: activo ? "activo" : "inactivo",
    }
    navigate("/admin/usuarios")
  }

  return (
    <Container title="Nuevo Usuario">
      <Box
        sx={{ background: "white", borderRadius: "0.875rem", padding: { xs: "1rem", sm: "5rem" } }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          gap="1.5rem"
          justifyContent="center"
          sx={{
            padding: { xs: "1rem", sm: "2rem", rowGap: { xs: "2rem", sm: "3rem" } },
          }}
        >
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{ width: { xs: "100%", sm: "30%" }, flexGrow: "1" }}
          />
          <TextField
            label="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            sx={{ width: { xs: "100%", sm: "30%" }, flexGrow: "1" }}
          />
          <TextField
            label="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            sx={{ width: { xs: "100%", sm: "30%" }, flexGrow: "1" }}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ minWidth: "45%", flexGrow: "1" }}
          />
          <TextField
            label="Teléfono de Contacto"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            sx={{ minWidth: "45%", flexGrow: "1" }}
          />

          <FormControl sx={{ minWidth: "45%", flexGrow: "1" }}>
            <InputLabel>Rol del Usuario</InputLabel>
            <Select value={rol} onChange={(e) => setRol(e.target.value)}>
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="recolector">Recolector</MenuItem>
              <MenuItem value="comerciante">Comerciante</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            sx={{ minWidth: "45%", flexGrow: "1" }}
            control={<Switch checked={activo} onChange={(e) => setActivo(e.target.checked)} />}
            label="Activo"
          />

          <Button
            variant="contained"
            onClick={handleGuardarUsuario}
            sx={{ background: theme.palette.primary["500"] }}
          >
            Guardar Usuario
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default NuevoUsuario
