// ContentForm.js
import React from "react"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"
import { useNavigate } from "react-router-dom"

function ContentForm({ activeStep, formData, setFormData, handleBack, handleNext }) {
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAccept = () => {
    navigate("/admin/atracciones")
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
