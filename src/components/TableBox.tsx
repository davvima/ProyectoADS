import { Paper } from "@mui/material"
import React from "react"

const TableBox = ({ children }) => {
  return <Paper sx={{ borderRadius: "1rem" }}>{children}</Paper>
}

export default TableBox
