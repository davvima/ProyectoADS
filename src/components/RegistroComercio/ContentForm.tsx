// ContentForm.js
import React from "react"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"
import { Alert, Box, Snackbar } from "@mui/material"
import validateInputs from "../../modules/validateInputs"
import { useFormContext } from "../../context/FormContext"
import useFetch from "../../hooks/useFetch"

function ContentForm({ comercioNumeroRef }) {
  const { state, dispatch } = useFormContext()
  const { activeStep, formData, errors, visitedFields, alertMessage } = state
  const { execute, data } = useFetch()

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = event.target.name
    validateInputs(formData, dispatch)
    if (!visitedFields.includes(fieldName)) {
      dispatch({ type: "SET_VISITED_FIELDS", payload: [...visitedFields, fieldName] })
    }

    if (fieldName === "cuit" && formData.cuit) {
      try {
        const response: any = await execute(`/Tur_comercio/getByPk?cuit=${formData.cuit}`, "GET")
        console.log({ response, if: response && !response.ok })
        if (response && !response.status) {
          dispatch({
            type: "SET_ALERT_MESSAGE",
            payload: "Ya existe un registro con este CUIT. Datos autocompletados.",
          })
          dispatch({
            type: "SET_FORM_DATA",
            payload: {
              comercioNumero: response?.nro_comercio_e_industria ?? "",
              razonSocial: response?.razon_social ?? "",
              cuit: response?.cuit ?? "",
              categoria: response.id_categoria ?? "",
              nombreFantasia: response.nombre_fantacia ?? "",
              direccion: response.direccion ?? "",
              googleMaps: response.codigo_insercion_maps ?? "",
              whatsapp: response.whatsapp ?? "",
              responsableNombre: response.responsablenombre ?? "",
              dni: response.cuit_responsable ?? "",
              mail: response.mail ?? "",
              telefono: response.cel ?? "",
              descripcion: response.descripcion ?? "",
            },
          })
          dispatch({ type: "SET_ACTION", payload: "update" })
        } else if (response?.status === "not_found") {
          dispatch({ type: "SET_ALERT_MESSAGE", payload: null })
        }
      } catch (error) {
        console.error("Error al verificar el CUIT:", error)
      }
    }
  }

  const handleChange = (e) => {
    if (e.target.name === "imagenes") {
      const files = Array.from((e.target as HTMLInputElement)?.files || [])
      if (formData.imagenes?.length + files.length > 5) {
        alert("Puedes subir hasta 5 fotos.")
        return
      }
      const newPhotos = files.map((file) => file) as File[]
      dispatch({
        type: "SET_FORM_DATA",
        payload: {
          ["imagenes"]: formData.imagenes ? [...formData.imagenes, ...newPhotos] : newPhotos,
        },
      })
    } else {
      validateInputs(formData, dispatch)
      dispatch({ type: "SET_FORM_DATA", payload: { [e.target.name]: e.target.value } })
    }
  }

  const handleAccept = () => {
    window?.location?.reload()
  }

  const handleCloseSnackbar = () => {
    dispatch({ type: "SET_ALERT_MESSAGE", payload: null })
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepOne handleChange={handleChange} handleBlur={handleBlur} />
      case 1:
        return (
          <StepTwo
            handleChange={handleChange}
            handleBlur={handleBlur}
            comercioNumeroRef={comercioNumeroRef}
          />
        )
      case 2:
        return <StepThree handleAccept={handleAccept} />
      default:
        return null
    }
  }

  return (
    <Box className="formulario-container__content">
      {" "}
      <Snackbar
        open={Boolean(alertMessage)}
        autoHideDuration={6000} // Se cierra automáticamente después de 6 segundos
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={handleCloseSnackbar}>
          {alertMessage}
        </Alert>
      </Snackbar>
      {renderStepContent(activeStep)}
    </Box>
  )
}

export default ContentForm
