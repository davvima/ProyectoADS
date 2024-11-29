import React from "react"
import { Box } from "@mui/material"
import logo from "../../assets/logo.jpeg"
import { Link } from "react-router-dom"

const Logo = ({ width = "4.4rem" }) => {
  return (
    <Link to="/">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: width,
          maxWidth: "20vw",
          height: "auto",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
    </Link>
  )
}

export default Logo
