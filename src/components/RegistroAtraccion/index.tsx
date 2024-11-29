import React, { useState } from "react"
import { Button, Stepper, Step, StepLabel, Box } from "@mui/material"
import ContentForm from "./ContentForm"
import "./ContentForm.css"
import Container from "../Container"

const steps = ["Información de la Atracción", "Ubicación y Contacto", "Confirmación"]

const RegistroAtraccion = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    atraccionNombre: "",
    descripcion: "",
    ubicacion: "",
    googleMaps: "",
    whatsapp: "",
    confirmacion: false,
  })

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)
  const handleSubmit = () => {
    setActiveStep((prev) => prev + 1)
  }

  return (
    <Container title="Formulario de registro de atracción">
      <Box className="formulario-container">
        <section className="formulario-container__header">
          <Stepper activeStep={activeStep} className="formulario-container__stepper">
            {steps.map((label) => (
              <Step key={label} className="formulario-container__step">
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
      </Box>
      <Box sx={{ display: "flex", gap: "2rem", justifyContent: "end" }}>
        {activeStep === 1 && (
          <Button
            variant="contained"
            sx={{
              width: "20rem",
              height: "4rem",
              borderRadius: "20rem",
              alignSelf: "end",
              color: "white",
            }}
            onClick={handleBack}
          >
            Atrás
          </Button>
        )}
        {activeStep === 1 && (
          <Button
            variant="contained"
            sx={{
              width: "20rem",
              height: "4rem",
              borderRadius: "20rem",
              alignSelf: "end",
              color: "white",
            }}
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        )}
        {activeStep === 0 && (
          <Button
            variant="contained"
            sx={{
              width: "20rem",
              height: "4rem",
              borderRadius: "20rem",
              alignSelf: "end",
              color: "white",
            }}
            onClick={handleNext}
          >
            Ir al paso 2
          </Button>
        )}
      </Box>
    </Container>
  )
}

export default RegistroAtraccion
