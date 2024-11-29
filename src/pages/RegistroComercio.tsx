import React, { useState } from "react"
import { Button, Stepper, Step, StepLabel, Box } from "@mui/material"
import ContentForm from "../components/RegistroComercio/ContentForm"
import Container from "../components/Container"
import useFetch from "../hooks/useFetch"
import validateInputs from "../modules/validateInputs"
import "../components/RegistroComercio/ContentForm.css"

const steps = ["Información del Comercio", "Datos del Propietario", "Confirmación"]

const RegistroComercio = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    confirmacion: false,
  })
  const [errors, setErrors] = useState<any>({})
  const { execute } = useFetch()

  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    const validateErrors = validateInputs(formData)
    setErrors(validateErrors)

    if (Object.keys(validateErrors).length === 0) {
      try {
        const response: any = await execute("/backend", "POST", formData, {
          "Content-Type": "application/json",
        })

        if (response.status === "success") {
          setActiveStep((prev) => prev + 1)
        } else {
          console.error("Error en la respuesta del servidor:", response.message)
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error)
      }
    } else {
      console.log("Hay errores en el formulario:", validateErrors)
    }
  }

  return (
    <Container title="Formulario de registro de comercio">
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
          errors={errors}
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

export default RegistroComercio
