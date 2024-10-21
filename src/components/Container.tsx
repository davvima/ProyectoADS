import { Typography } from "@mui/material"
import React from "react"

const Container = ({ title, children }) => {
  return (
    <div className="container">
      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>
      {children}
    </div>
  )
}

export default Container
