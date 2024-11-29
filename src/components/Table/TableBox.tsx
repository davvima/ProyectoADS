import { Paper } from "@mui/material"
import React from "react"

const TableBox = ({ children }) => {
  return (
    <Paper
      sx={{
        borderRadius: "1rem",
        boxShadow: "6px 6px 54px 0px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >
      {children}
    </Paper>
  )
}

export default TableBox
