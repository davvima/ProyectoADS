import React from "react"
import { Button, Typography } from "@mui/material"
import "./ContentForm.css"

const StepThree = ({ handleAccept }) => {
  return (
    <div className="formulario-container__confirmation">
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          Solicitud Enviada
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Su registro fue exitoso. En breve recibirá un correo de confirmación del estado de su
          solicitud de alta en la aplicación del turista.
        </Typography>
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleAccept}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StepThree
