import { useTheme } from "@emotion/react"
import { Box } from "@mui/material"
import React from "react"

export const CalendarNotification = ({ text }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        background: theme.palette.primary["600"],
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        fontSize: "0.65rem",
        fontWeight: "300",
      }}
    >
      <Box
        sx={{
          background: theme.palette.primary.main,
          height: "100%",
          width: "0.25rem",
          marginRight: "0.2rem",
        }}
      />
      {text}
    </Box>
  )
}
