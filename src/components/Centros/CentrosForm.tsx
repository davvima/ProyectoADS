import React, { useState } from "react"
import { Box, TextField, FormHelperText, Button as MuiButton } from "@mui/material"
import Button from "../Button/Button"
import { CentroReciclado } from "../../pages/Centros"

interface CentrosFormProps {
  onSubmit: (data: any) => void
  onClose: () => void
  edtiData: CentroReciclado
}

const CentrosForm: React.FC<CentrosFormProps> = ({ onSubmit, onClose, edtiData }) => {
  const [data, setData] = useState(
    edtiData ?? {
      centroId: "",
      nombreCentro: "",
      direccion: "",
      nombreEncargado: [""],
      telefonoEncargado: "",
    }
  )

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = () => {
    // Validación básica
    const newErrors: { [key: string]: string } = {}

    if (!data.nombreCentro) {
      newErrors.nombreCentro = "El nombre del centro es obligatorio"
    }
    if (!data.direccion) {
      newErrors.direccion = "La dirección es obligatoria"
    }
    if (data.nombreEncargado.length === 0) {
      newErrors.nombreEncargado = "Debe haber al menos un encargado"
    }
    if (!data.telefonoEncargado) {
      newErrors.telefonoEncargado = "El teléfono del encargado es obligatorio"
    }

    if (Object.keys(newErrors).length === 0) {
      onSubmit(data)
      onClose()
    } else {
      setErrors(newErrors)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleEncargadoChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target
    const updatedEncargados = [...data.nombreEncargado]
    updatedEncargados[index] = value
    setData((prevData) => ({
      ...prevData,
      nombreEncargado: updatedEncargados,
    }))
  }

  const handleAddEncargado = () => {
    setData((prevData) => ({
      ...prevData,
      nombreEncargado: [...prevData.nombreEncargado, ""],
    }))
  }

  const handleRemoveEncargado = (index: number) => {
    const updatedEncargados = data.nombreEncargado.filter((_, i) => i !== index)
    setData((prevData) => ({
      ...prevData,
      nombreEncargado: updatedEncargados,
    }))
  }

  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxHeight="25rem"
      margin="2rem 0"
      sx={{ gap: { xs: "1rem", sm: "3rem" } }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "1rem",
          gap: { xs: "1rem", sm: "3rem" },
        }}
      >
        <TextField
          label="Nombre del Centro"
          name="nombreCentro"
          value={data.nombreCentro}
          onChange={handleChange}
          sx={{ background: "#fff" }}
          fullWidth
          error={Boolean(errors.nombreCentro)}
          helperText={errors.nombreCentro}
        />
        <TextField
          label="Dirección"
          name="direccion"
          value={data.direccion}
          onChange={handleChange}
          fullWidth
          sx={{ background: "#fff" }}
          error={Boolean(errors.direccion)}
          helperText={errors.direccion}
        />
        <Box>
          <label>Encargados/as</label>
          {data?.nombreEncargado?.length > 0 &&
            data.nombreEncargado.map((encargado, index) => (
              <Box display="flex" alignItems="center" gap={1} key={index}>
                <TextField
                  value={encargado}
                  onChange={(e) => handleEncargadoChange(e, index)}
                  fullWidth
                  sx={{ background: "#fff" }}
                />
                <MuiButton
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveEncargado(index)}
                >
                  Eliminar
                </MuiButton>
              </Box>
            ))}
          <MuiButton variant="text" onClick={handleAddEncargado}>
            Añadir encargado
          </MuiButton>
          {errors.nombreEncargado && (
            <FormHelperText error>{errors.nombreEncargado}</FormHelperText>
          )}
        </Box>
        <TextField
          label="Teléfono del Encargado"
          name="telefonoEncargado"
          value={data.telefonoEncargado}
          onChange={handleChange}
          fullWidth
          sx={{ background: "#fff" }}
          error={Boolean(errors.telefonoEncargado)}
          helperText={errors.telefonoEncargado}
        />
      </Box>
      <Box display="flex" justifyContent="center" gap={2} mt={2} pb={2}>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" sx={{ background: "#F48F007d" }} onClick={handleSubmit}>
          Guardar
        </Button>
      </Box>
    </Box>
  )
}

export default CentrosForm
