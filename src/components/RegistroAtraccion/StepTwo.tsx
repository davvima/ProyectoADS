// StepTwo.js
import React, { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import "./ContentForm.css"
import { overflow } from "html2canvas/dist/types/css/property-descriptors/overflow"

const StepTwo = ({ handleBack, handleNext }) => {
  const [photos, setPhotos] = useState([])
  const [description, setDescription] = useState("")

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files)
    if (photos.length + files.length > 5) {
      alert("Puedes subir hasta 5 fotos.")
      return
    }
    const newPhotos = files.map((file) => URL.createObjectURL(file))
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
  }

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 300) {
      setDescription(e.target.value)
    }
  }

  const handlePhotoRemove = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index))
  }

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData("text/plain", index)
  }

  const handleDrop = (event, targetIndex) => {
    event.preventDefault()
    const draggedIndex = event.dataTransfer.getData("text/plain")
    if (draggedIndex !== targetIndex) {
      const updatedPhotos = [...photos]
      const draggedPhoto = updatedPhotos.splice(draggedIndex, 1)[0]
      updatedPhotos.splice(targetIndex, 0, draggedPhoto)
      setPhotos(updatedPhotos)
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
              type="file"
              multiple
              onChange={handlePhotoChange}
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
            {photos.map((photo, index) => (
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
    </div>
  )
}

export default StepTwo
