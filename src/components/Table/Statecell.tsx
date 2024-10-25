import React from "react"
import { TableCell, Typography } from "@mui/material"
import { useTheme } from "@emotion/react"

// Objeto que mapea los colores a los estados correspondientes
const estadoColores = {
  green: ["aprobado", "activo"],
  red: ["rechazado", "inactivo"],
  orange: ["pendiente", "en revisión"],
}

const getColorForEstado = (estado) => {
  const theme = useTheme()
  // Encuentra el color correspondiente al estado
  for (const [color, estados] of Object.entries(estadoColores)) {
    if (estados.includes(estado.toLowerCase())) {
      return theme.palette.customColors[color]
    }
  }
  return "gray" // Color por defecto si el estado no coincide
}

const StateCell = ({ estado }) => {
  const bgColor = getColorForEstado(estado)

  return (
    <TableCell>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "0.75rem",
          backgroundColor: bgColor + "3b",
          color: bgColor,
          borderRadius: "4px",
          padding: "0",
          textAlign: "center",
          height: "1.75rem",
          width: "5.75rem",
          placeContent: "center",
          textTransform: "capitalize",
        }}
        variant="body2"
      >
        {estado}
      </Typography>
    </TableCell>
  )
}

export default StateCell
