import { Box, Card, CardContent, Typography } from "@mui/material"
import React from "react"

const CardEstadisticas = ({ titulo, valor, color, icono }) => {
  return (
    <Card
      sx={{
        boxShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "0.875rem",
        height: "9rem",
        minWidth: "18rem",
        flex: "1",
        padding: "1.5rem",
      }}
    >
      <CardContent sx={{ padding: "0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography
              sx={{
                color: "#202224",
                fontSize: " 1rem",
                fontWeight: "600",
                maxWidth: "232px",
              }}
              variant="h5"
            >
              {titulo}
            </Typography>
            <Typography
              sx={{
                color: "#202224",
                fontWeight: "600",
                maxWidth: "232px",
              }}
              variant="h2"
            >
              {valor}
            </Typography>
          </Box>

          <div
            style={{
              width: "72px",
              height: "72px",
              background: color + "50",
              color: color,
              borderRadius: "22px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icono}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardEstadisticas
