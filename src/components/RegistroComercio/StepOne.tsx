import React from "react"
import { TextField, Typography } from "@mui/material"
import { useFormContext } from "../../context/FormContext"

const StepOne = ({ handleChange, handleBlur }) => {
  const { state } = useFormContext()
  const { formData, errors, visitedFields } = state

  return (
    <>
      <Typography width="100%" variant="h4">
        Formulario de Registro del Comercio
      </Typography>
      <TextField
        sx={{ width: { xs: "100%", sm: "calc((100% - 4rem) / 3)" } }}
        name="cuit"
        value={formData.cuit}
        label="CUIT"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.cuit)}
        helperText={(visitedFields.includes("cuit") && errors.cuit) || ""}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "calc((100% - 4rem) / 3)" } }}
        name="comercioNumero"
        value={formData.comercioNumero}
        label="Número de Comercio e Industria"
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.comercioNumero)}
        helperText={(visitedFields.includes("comercioNumero") && errors.comercioNumero) || ""}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "calc((100% - 4rem) / 3)" } }}
        name="razonSocial"
        value={formData.razonSocial}
        label="Razón Social"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.razonSocial)}
        helperText={(visitedFields.includes("razonSocial") && errors.razonSocial) || ""}
        required
      />

      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="nombreFantasia"
        value={formData.nombreFantasia}
        label="Nombre de Fantasía"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.nombreFantasia)}
        helperText={(visitedFields.includes("nombreFantasia") && errors.nombreFantasia) || ""}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="direccion"
        value={formData.direccion}
        label="Dirección"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.direccion)}
        helperText={(visitedFields.includes("direccion") && errors.direccion) || ""}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="googleMaps"
        value={formData.googleMaps}
        label="Google Maps (Link o código de inserción)"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.googleMaps)}
        helperText={(visitedFields.includes("googleMaps") && errors.googleMaps) || ""}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="whatsapp"
        value={formData.whatsapp}
        label="WhatsApp (Link)"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.whatsapp)}
        helperText={(visitedFields.includes("whatsapp") && errors.whatsapp) || ""}
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
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.responsableNombre)}
        helperText={(visitedFields.includes("responsableNombre") && errors.responsableNombre) || ""}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="dni"
        value={formData.dni}
        label="DNI"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.dni)}
        helperText={(visitedFields.includes("dni") && errors.dni) || ""}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="mail"
        value={formData.mail}
        label="Email"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.mail)}
        helperText={(visitedFields.includes("mail") && errors.mail) || ""}
        required
      />
      <TextField
        sx={{ width: { xs: "100%", sm: "48%" } }}
        name="telefono"
        value={formData.telefono}
        label="Teléfono de Contacto"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.telefono)}
        helperText={(visitedFields.includes("telefono") && errors.telefono) || ""}
        required
      />
    </>
  )
}

export default StepOne
