import React from "react"
import { TextField, Typography } from "@mui/material"

const StepOne = ({ handleChange }) => {
  return (
    <>
      <Typography width="100%" variant="h4">
        Formulario de Registro del Comercio
      </Typography>
      <TextField
        sx={{ width: "calc((100% - 4rem) / 3)" }}
        name="comercioNumero"
        label="Número de Comercio e Industria"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ width: "calc((100% - 4rem) / 3)" }}
        name="razonSocial"
        label="Razón Social"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ width: "calc((100% - 4rem) / 3)" }}
        name="cuit"
        label="CUIT"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ width: "48%" }}
        name="nombreFantasia"
        label="Nombre de Fantasía"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ width: "48%" }}
        name="direccion"
        label="Dirección"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ width: "48%" }}
        name="googleMaps"
        label="Google Maps (Link o código de inserción)"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ width: "48%" }}
        name="whatsapp"
        label="WhatsApp (Link)"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <Typography width="100%" variant="h4">
        Datos del Responsable del Comercio
      </Typography>
      <TextField
        sx={{ width: "48%" }}
        name="responsableNombre"
        label="Nombre y Apellido"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ width: "48%" }}
        name="dni"
        label="DNI"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ width: "48%" }}
        name="email"
        label="Email"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ width: "48%" }}
        name="telefono"
        label="Teléfono de Contacto"
        variant="outlined"
        onChange={handleChange}
        required
      />
    </>
  )
}

export default StepOne
