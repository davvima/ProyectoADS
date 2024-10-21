import React from "react"
import { Box } from "@mui/material"
import logo from "../../assets/logo.jpeg"
import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to="/admin">
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <img src={logo} alt="Logo" style={{ width: "4.4rem", height: "auto" }} />
      </Box>
    </Link>
  )
}

export default Logo
