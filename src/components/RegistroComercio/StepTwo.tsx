import React from "react"
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import "./ContentForm.css"

import { useFormContext } from "../../context/FormContext"

const StepTwo = ({ handleChange, comercioNumeroRef, handleBlur }) => {
  const { state, dispatch } = useFormContext()
  const { formData, errors } = state

  const handlePhotoRemove = (index) => {
    const updatedImages = formData.imagenes.filter((_, i) => i !== index)
    dispatch({ type: "SET_FORM_DATA", payload: { ...formData, imagenes: updatedImages } })
  }

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData("text/plain", index)
  }

  const handleDrop = (event, targetIndex) => {
    event.preventDefault()
    const draggedIndex = event.dataTransfer.getData("text/plain")
    if (draggedIndex !== targetIndex) {
      const updatedPhotos = [...formData.imagenes]
      const draggedPhoto = updatedPhotos.splice(draggedIndex, 1)[0]
      updatedPhotos.splice(targetIndex, 0, draggedPhoto)
      dispatch({ type: "SET_FORM_DATA", payload: { ...formData, imagenes: updatedPhotos } })
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  return (
    <div className="formulario-container__content">
      <div className="formulario-container__imagesUploadContainer">
        <Typography variant="h4">Subir Fotos del Comercio</Typography>
        <Box sx={{ width: "100%", overflowX: "scroll" }}>
          <div className="photo-upload-container">
            <input
              ref={comercioNumeroRef}
              accept="image/*"
              name="imagenes"
              type="file"
              multiple
              onChange={handleChange}
              style={{ display: "none" }}
              id="uploadPhoto"
            />
            <label htmlFor="uploadPhoto">
              <Button
                variant="text"
                component="span"
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <CameraAltIcon style={{ fontSize: "40px" }} />
                Subir Foto
              </Button>
            </label>
            {Array.isArray(formData?.imagenes) &&
              formData?.imagenes?.map((photo, index) => (
                <div
                  key={index}
                  className="photo-preview"
                  style={{ position: "relative", display: "inline-block" }}
                  draggable
                  onDragStart={handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, index)}
                >
                  <img
                    src={typeof photo === "string" ? photo : URL.createObjectURL(photo)}
                    alt={`Foto ${index + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <CloseIcon
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer",
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%",
                      padding: "2px",
                    }}
                    onClick={() => handlePhotoRemove(index)}
                  />
                </div>
              ))}
          </div>
        </Box>
      </div>

      {/* Select de Categoría */}
      <div className="formulario-container__category">
        <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
          Categoría del Comercio
        </Typography>
        <FormControl fullWidth>
          <Select
            labelId="categoria-label"
            name="categoria"
            value={formData.categoria || ""}
            onChange={handleChange}
            error={Boolean(errors.categoria)}
          >
            <MenuItem value={2}>Alojamiento</MenuItem>
            <MenuItem value={3}>Gastronomía</MenuItem>
            <MenuItem value={4}>Comercio</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Descripción */}
      <div className="formulario-container__description">
        <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
          Descripción del Comercio
        </Typography>
        <TextField
          name="descripcion"
          label="Descripción"
          variant="outlined"
          fullWidth
          multiline
          maxRows={4}
          value={formData.descripcion}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.descripcion)}
          helperText={`${formData?.descripcion?.length ?? 0}/300`}
          slotProps={{
            htmlInput: {
              maxLength: 300,
            },
          }}
        />
        <Typography variant="caption" color="error">
          {errors.descripcion}
        </Typography>
      </div>
    </div>
  )
}

export default StepTwo
