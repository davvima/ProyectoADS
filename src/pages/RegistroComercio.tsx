// src/pages/RegistroComercio.tsx
import React, { useState } from "react"
import { Button, Stepper, Step, StepLabel, Typography } from "@mui/material"
import ContentForm from "../components/RegistroComercio/ContentForm"
import "../components/RegistroComercio/ContentForm.css"

const steps = ["Información del Comercio", "Datos del Propietario", "Confirmación"]

const RegistroComercio = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    comercioNombre: "",
    comercioDireccion: "",
    propietarioNombre: "",
    propietarioEmail: "",
    confirmacion: false,
  })

  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    console.log("Datos enviados:", formData)
    setActiveStep((prev) => prev + 1)
  }

  return (
    <div className="formulario-container">
      <section className="formulario-container__header">
        <Typography variant="h1" gutterBottom>
          Formulario de registro de comercio
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
      </section>

      <ContentForm
        activeStep={activeStep}
        formData={formData}
        setFormData={setFormData}
        steps={steps}
        handleBack={handleBack}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
      {activeStep === 1 && <Button onClick={handleBack}>Atrás</Button>}
      {activeStep === 1 && <Button onClick={handleSubmit}>Enviar</Button>}
      {activeStep === 0 && <Button onClick={handleNext}>Siguiente</Button>}
    </div>
  )
}

export default RegistroComercio
