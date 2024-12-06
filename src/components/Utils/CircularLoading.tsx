import { Box, CircularProgress } from "@mui/material"
import React from "react"

const CircularLoading = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default CircularLoading
