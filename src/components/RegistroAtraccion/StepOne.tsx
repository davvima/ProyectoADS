import React, { useState } from "react"
import { TextField } from "@mui/material"

const StepOne = ({ handleChange }) => {
  const [description, setDescription] = useState("")

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 300) {
      setDescription(e.target.value)
    }
  }

  return (
    <>
      <TextField
        sx={{ width: { xs: "100%", sm: "calc((100% - 4rem) / 3)" } }}
        name="nombreAtraccion"
        label="Nombre  de la atracción"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        name="descripcion"
        label="Breve descripción del comercio (máximo 300 caracteres)"
        variant="outlined"
        fullWidth
        multiline
        rows="4"
        value={description}
        onChange={handleDescriptionChange}
        helperText={`${description.length ?? 0}/300`}
        sx={{ height: "15rem" }}
      />
    </>
  )
}

export default StepOne
