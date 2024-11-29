import React from "react"
import { TextField, Typography } from "@mui/material"

const StepOne = ({ formData, errors, handleChange }) => {
  return (
    <>
      <Typography width="100%" variant="h4">
        Formulario de Registro del Comercio
      </Typography>
      <TextField
        sx={{ width: { xs: "100%", sm: "calc((100% - 4rem) / 3)" } }}
        name="comercioNumero"
        value={formData.comercioNumero}
        label="Número de Comercio e Industria"
        variant="outlined"
        onChange={handleChange}
        error={Boolean(errors.comercioNumero)}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "calc((100% - 4rem) / 3)" } }}
        name="razonSocial"
        value={formData.razonSocial}
        label="Razón Social"
        variant="outlined"
        onChange={handleChange}
        error={Boolean(errors.razonSocial)}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "calc((100% - 4rem) / 3)" } }}
        name="cuit"
        value={formData.cuit}
        label="CUIT"
        variant="outlined"
        onChange={handleChange}
        error={Boolean(errors.cuit)}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="nombreFantasia"
        value={formData.nombreFantasia}
        label="Nombre de Fantasía"
        variant="outlined"
        onChange={handleChange}
        error={Boolean(errors.nombreFantasia)}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="direccion"
        value={formData.direccion}
        label="Dirección"
        variant="outlined"
        onChange={handleChange}
        error={Boolean(errors.direccion)}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="googleMaps"
        value={formData.googleMaps}
        label="Google Maps (Link o código de inserción)"
        variant="outlined"
        onChange={handleChange}
        error={Boolean(errors.googleMaps)}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="whatsapp"
        value={formData.whatsapp}
        label="WhatsApp (Link)"
        variant="outlined"
        onChange={handleChange}
        error={Boolean(errors.whatsapp)}
        required
      />
      <Typography width="100%" variant="h4">
        Datos del Responsable del Comercio
      </Typography>
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="responsableNombre"
        value={formData.responsableNombre}
        label="Nombre y Apellido"
        variant="outlined"
        onChange={handleChange}
        error={Boolean(errors.responsableNombre)}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="dni"
        value={formData.dni}
        label="DNI"
        variant="outlined"
        onChange={handleChange}
        error={Boolean(errors.dni)}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="email"
        value={formData.email}
        label="Email"
        variant="outlined"
        onChange={handleChange}
        error={Boolean(errors.email)}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="telefono"
        value={formData.telefono}
        label="Teléfono de Contacto"
        variant="outlined"
        onChange={handleChange}
        error={Boolean(errors.telefono)}
        required
      />
    </>
  )
}

export default StepOne
