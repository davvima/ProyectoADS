// ContentForm.js
import React from "react"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"

function ContentForm({ activeStep, formData, setFormData, handleBack, handleNext }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAccept = () => {
    alert("Gracias por registrarse!")
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepOne handleChange={handleChange} />
      case 1:
        return <StepTwo handleBack={handleBack} handleNext={handleNext} />
      case 2:
        return <StepThree handleAccept={handleAccept} />
      default:
        return null
    }
  }

  return <div className="formulario-container__content">{renderStepContent(activeStep)}</div>
}

export default ContentForm
