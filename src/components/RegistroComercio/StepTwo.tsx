// StepTwo.js
import React from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import "./ContentForm.css"

const StepTwo = ({ setFormData, formData, errors, handleChange }) => {
  const handlePhotoRemove = (index) => {
    setFormData({
      ...formData,
      photos: formData.photos?.filter((_, i) => i !== index),
    })
  }

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData("text/plain", index)
  }

  const handleDrop = (event, targetIndex) => {
    event.preventDefault()
    const draggedIndex = event.dataTransfer.getData("text/plain")
    if (draggedIndex !== targetIndex) {
      const updatedPhotos = [...formData.photos]
      const draggedPhoto = updatedPhotos.splice(draggedIndex, 1)[0]
      updatedPhotos.splice(targetIndex, 0, draggedPhoto)
      setFormData({
        ...formData,
        photos: updatedPhotos,
      })
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
              accept="image/*"
              name="photos"
              type="file"
              multiple
              onChange={handleChange}
              style={{ display: "none" }}
              id="upload-photo-input"
            />
            <label htmlFor="upload-photo-input">
              <Button
                variant="text"
                component="span"
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <CameraAltIcon style={{ fontSize: "40px" }} />
                Subir Foto
              </Button>
            </label>
            {formData?.photos?.map((photo, index) => (
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
                  src={photo}
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
      <div className="formulario-container__description">
        <Typography variant="h4">Descripción del Comercio</Typography>
        <TextField
          name="description"
          label="Descripción"
          variant="outlined"
          fullWidth
          multiline
          maxRows={4}
          value={formData.description}
          onChange={handleChange}
          error={Boolean(errors.description)}
          helperText={`${formData?.description?.length ?? 0}/300`}
          slotProps={{
            htmlInput: {
              maxLength: 300,
            },
          }}
        />
      </div>
    </div>
  )
}

export default StepTwo
