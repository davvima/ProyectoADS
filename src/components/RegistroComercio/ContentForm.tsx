// ContentForm.js
import React from "react"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"
import { Box } from "@mui/material"

function ContentForm({ activeStep, formData, errors, setFormData }) {
  const handleChange = (e) => {
    if (e.target.name === "photos") {
      const files = Array.from(event?.target?.files)
      if (formData.photos?.length + files.length > 5) {
        alert("Puedes subir hasta 5 fotos.")
        return
      }
      const newPhotos = files.map((file) => URL.createObjectURL(file))
      setFormData({
        ...formData,
        photos: formData.photos ? [...formData.photos, ...newPhotos] : newPhotos,
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleAccept = () => {
    window?.location?.reload()
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepOne formData={formData} errors={errors} handleChange={handleChange} />
      case 1:
        return (
          <StepTwo
            setFormData={setFormData}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        )
      case 2:
        return <StepThree handleAccept={handleAccept} />
      default:
        return null
    }
  }

  return <Box className="formulario-container__content">{renderStepContent(activeStep)}</Box>
}

export default ContentForm
