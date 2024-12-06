import React, { useRef } from "react"
import { Button, Stepper, Step, StepLabel, Box } from "@mui/material"
import ContentForm from "../components/RegistroComercio/ContentForm"
import Container from "../components/Container"
import useFetch from "../hooks/useFetch"
import validateInputs from "../modules/validateInputs"

import "../components/RegistroComercio/ContentForm.css"
import { FormProvider, useFormContext } from "../context/FormContext"
import CircularLoading from "../components/Utils/CircularLoading"

const steps = ["Información del Comercio", "Datos del Propietario", "Confirmación"]

const RegistroComercio = () => {
  const { error, execute, loading } = useFetch()
  const { state, dispatch } = useFormContext()

  const comercioNumeroRef = useRef<HTMLInputElement>(null)
  const { activeStep, formData, errors, action } = state
  const handleNext = () => {
    const validationErrors = validateInputs(formData, dispatch)
    dispatch({ type: "SET_ERRORS", payload: validationErrors })
    dispatch({
      type: "SET_VISITED_FIELDS",
      payload: [
        "razonSocial",
        "comercioNumero",
        "cuit",
        "direccion",
        "nombreFantasia",
        "googleMaps",
        "whatsapp",
        "dni",
        "responsableNombre",
        "mail",
        "telefono",
      ],
    })
    if (Object.keys(validationErrors).length <= 1)
      dispatch({ type: "SET_ACTIVE_STEP", payload: activeStep + 1 })
  }

  const handleBack = () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: activeStep - 1 })
  }

  const handleSubmit = async () => {
    if (loading) return
    const validationErrors = validateInputs(formData, dispatch)
    dispatch({ type: "SET_ERRORS", payload: validationErrors })

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataToSend = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
          if (key === "imagenes" && Array.isArray(value) && comercioNumeroRef.current) {
            const fileInput = comercioNumeroRef.current
            const files = fileInput?.files
            if (files && files.length > 0) {
              for (const file of files) {
                console.log({ file })
                formDataToSend.append("images", file, file.name)
              }
            } else {
              console.warn("No se seleccionaron archivos.")
            }
          } else if (key !== "imagenes") {
            formDataToSend.append(key, value as string)
          }
        })
        for (const [key, value] of formDataToSend.entries()) {
          console.log(`${key}:`, value)
        }
        const response =
          action === "create"
            ? await execute("/Tur_comercio/insert", "POST", formDataToSend)
            : await execute("/Tur_comercio/update", "POST", formDataToSend)

        if (response && !response?.message?.toLowerCase()?.includes("error")) {
          dispatch({ type: "SET_ACTIVE_STEP", payload: activeStep + 1 })
        } else {
          console.error("Error en la respuesta del servidor:", response)
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error)
      }
    } else {
      console.log("Hay errores en el formulario:", errors)
    }
  }
  console.log({ loading })
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

        <ContentForm comercioNumeroRef={comercioNumeroRef} />
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
          <>
            {loading ? (
              <Box
                sx={{
                  position: "relative",
                  width: "20rem",
                  height: "4rem",
                }}
              >
                <CircularLoading />
              </Box>
            ) : (
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
          </>
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

const FormWithContext = () => {
  return (
    <FormProvider>
      <RegistroComercio />
    </FormProvider>
  )
}

export default FormWithContext
