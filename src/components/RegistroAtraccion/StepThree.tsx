import React from "react"
import { Button, Typography } from "@mui/material"
import "./ContentForm.css"

const StepThree = ({ handleAccept }) => {
  return (
    <div className="formulario-container__confirmation">
      <svg
        width="159"
        height="144"
        viewBox="0 0 159 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect opacity="0.5" x="14.8691" width="51.5427" height="51.5427" rx="10" fill="#98FF96" />
        <rect
          opacity="0.5"
          x="128.82"
          y="32.8701"
          width="29.3594"
          height="29.3594"
          rx="10"
          fill="#98FF96"
        />
        <rect
          opacity="0.5"
          x="0.820312"
          y="74.8701"
          width="31.5329"
          height="31.5329"
          rx="8"
          fill="#1FFF6B"
        />
        <rect
          opacity="0.5"
          x="115.107"
          y="106.821"
          width="36.5935"
          height="36.5935"
          rx="8"
          fill="#1FFF6B"
        />
        <circle cx="84.2969" cy="78.3755" r="60" fill="#FF9500" />
        <path
          d="M62.0039 78.3813L74.3354 89.3022L105.164 62"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <Typography variant="h2" align="center" gutterBottom>
        Registro Exitoso
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        La atracción se a registrado correctamente.
      </Typography>
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            width: "20rem",
            maxWidth: "80vw",
            height: "4rem",
            borderRadius: "20rem",
            alignSelf: "end",
            color: "white",
          }}
          color="primary"
          onClick={handleAccept}
        >
          Aceptar
        </Button>
      </div>
    </div>
  )
}

export default StepThree
